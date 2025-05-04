import React, { createContext, useState, useEffect, useContext } from "react";
import { getUserSettings, updateUserSettings } from "../services/api";
import { AuthContext } from "./authContext";
import { io } from "socket.io-client";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const { accessToken, user } = useContext(AuthContext);
  const [settings, setSettings] = useState({ currency: "USD" });
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // Socket.IO setup
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (accessToken && user?._id) {
      const s = io("http://localhost:3000", { withCredentials: true });
      s.emit("register", user._id);
      setSocket(s);
      return () => s.disconnect();
    }
  }, [accessToken, user?._id]);

  useEffect(() => {
    if (accessToken) {
      getUserSettings().then(data => {
        setSettings(data.settings || { currency: "USD" });
        setUserInfo({
          username: data.username,
          email: data.email,
          profilePic: data.profilePic
        });
        setLoading(false);
      });
    }
  }, [accessToken]);

  useEffect(() => {
    if (!socket) return;
    socket.on("settingsUpdated", (data) => {
      setSettings(data.settings || {});
      setUserInfo({
        username: data.username,
        email: data.email,
        profilePic: data.profilePic
      });
    });
    return () => socket.off("settingsUpdated");
  }, [socket]);

  const saveSettings = async (newSettings) => {
    setSettings(newSettings);
    await updateUserSettings({ settings: newSettings });
  };

  const saveUserInfo = async (info) => {
    setUserInfo(info);
    await updateUserSettings(info);
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      setSettings: saveSettings,
      userInfo,
      setUserInfo: saveUserInfo,
      loading
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
