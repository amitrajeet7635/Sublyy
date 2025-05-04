import React, { useState, useContext, useEffect } from "react";
import { SettingsContext } from "../../context/settingsContext";

export default function Settings() {
  const { userInfo, setUserInfo } = useContext(SettingsContext);
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [locale, setLocale] = useState("en-IN");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [categoriesCount] = useState(78);
  const [tagsCount] = useState(0);

  // Sync username input with backend userInfo
  useEffect(() => {
    setUsername(userInfo?.username || "");
  }, [userInfo?.username]);

  // Save username to backend
  const handleUsernameSave = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      await setUserInfo({ ...userInfo, username });
      setSaveMsg("Username updated!");
    } catch (err) {
      setSaveMsg("Failed to update username.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(""), 2000);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sublyy settings</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button className="px-4 py-2 -mb-px border-b-2 border-indigo-600 text-indigo-600 font-medium focus:outline-none">
          General
        </button>
      </div>

      {/* Change Username */}
      <section className="bg-white rounded-xl shadow border border-gray-100 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Change Username</h2>
        <p className="text-gray-500 mb-4">Update your username for your Sublyy account.</p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            className="w-64 px-4 py-2 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter new username"
          />
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            onClick={handleUsernameSave}
            disabled={saving || !username.trim() || username === userInfo?.username}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {saveMsg && (
            <span className={`ml-2 text-sm ${saveMsg.includes("updated") ? "text-green-600" : "text-red-500"}`}>
              {saveMsg}
            </span>
          )}
        </div>
      </section>

      {/* Currency and Format */}
      <section className="bg-white rounded-xl shadow border border-gray-100 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Currency and format</h2>
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-1">Currency</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg border border-indigo-200 font-medium text-indigo-700">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg" alt="INR" className="w-5 h-5 rounded-full" />
              Indian rupee (INR)
            </span>
            <button className="ml-2 text-gray-400 hover:text-indigo-600">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1">The currency you want to see your expenses in. You can add expenses in other currencies.</div>
        </div>
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-1">Date and Time Format</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg border border-indigo-200 font-medium text-indigo-700">
              {locale}
            </span>
            <button className="ml-2 text-gray-400 hover:text-indigo-600">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1">Choose how you want to see dates and times, based on the selected region</div>
        </div>
        <div>
          <div className="font-medium text-gray-700 mb-1">Time zone</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg border border-indigo-200 font-medium text-indigo-700">
              {timezone}
            </span>
            <button className="ml-2 text-gray-400 hover:text-indigo-600">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1">Specify your time zone to get accurate notifications</div>
        </div>
      </section>

      {/* Connect with WhatsApp */}
      <section className="bg-white rounded-xl shadow border border-green-100 p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Connect with WhatsApp</h2>
        <p className="text-gray-500 mb-4">
          You can connect with WhatsApp to get updates related to your subscriptions directly.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            className="w-64 px-4 py-2 rounded-lg border border-green-200 bg-green-50/60 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            placeholder="Enter your WhatsApp number"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all">
            Connect
          </button>
        </div>
      </section>
    </div>
  );
}
