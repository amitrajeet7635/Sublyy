import React, { useContext, useState } from "react";
import { SettingsContext } from "../../context/settingsContext";
import { LogOut } from "lucide-react";

const currencyOptions = [
  { code: "USD", label: "US Dollar ($)" },
  { code: "INR", label: "Indian Rupee (₹)" },
  { code: "EUR", label: "Euro (€)" },
];

const sections = [
  { key: "general", label: "General" },
  { key: "account", label: "Account Info" },
  { key: "personal", label: "Personal Info" },
  { key: "connect", label: "Connect" }
];

const Settings = () => {
  const { settings, setSettings, userInfo, setUserInfo, loading } = useContext(SettingsContext);
  const [activeSection, setActiveSection] = useState("general");
  const [editInfo, setEditInfo] = useState(userInfo);
  const [editSettings, setEditSettings] = useState(settings);
  const [message, setMessage] = useState("");
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber || "");
  const [whatsappConnected, setWhatsappConnected] = useState(settings.whatsappConnected || false);

  if (loading) return <div className="p-8">Loading...</div>;

  // Section handlers
  const handleInfoChange = (e) => setEditInfo({ ...editInfo, [e.target.name]: e.target.value });
  const handleSettingsChange = (e) => setEditSettings({ ...editSettings, [e.target.name]: e.target.value });

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    await setUserInfo(editInfo);
    setMessage("Profile updated!");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await setSettings({ ...editSettings });
    setMessage("Preferences saved!");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSavePersonal = async (e) => {
    e.preventDefault();
    // Add personal info save logic here if you have more fields
    setMessage("Personal info saved!");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleConnectWhatsapp = async () => {
    setWhatsappConnected(true);
    await setSettings({ ...editSettings, whatsappNumber: whatsapp, whatsappConnected: true });
    setMessage("WhatsApp connected! You will receive reminders.");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 flex flex-col items-center py-12 px-4">
      {/* Horizontal Navigation Bar */}
      <nav className="w-full max-w-2xl mb-8">
        <ul className="flex justify-center gap-4 border-b border-indigo-100">
          {sections.map((sec) => (
            <li key={sec.key}>
              <button
                className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeSection === sec.key
                    ? "border-indigo-600 text-indigo-700 bg-indigo-50 rounded-t-lg"
                    : "border-transparent text-gray-500 hover:text-indigo-600"
                }`}
                onClick={() => setActiveSection(sec.key)}
              >
                {sec.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-2xl bg-white rounded-xl shadow border border-indigo-100 p-8">
        {/* Section Content */}
        {activeSection === "general" && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">General Preferences</h2>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Preferred Currency</label>
              <select
                name="currency"
                value={editSettings.currency}
                onChange={handleSettingsChange}
                className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              >
                {currencyOptions.map(opt => (
                  <option key={opt.code} value={opt.code}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Notifications</label>
              <select
                name="notifications"
                value={editSettings.notifications || "enabled"}
                onChange={handleSettingsChange}
                className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-all"
            >
              Save Preferences
            </button>
            {message && <div className="text-center text-green-600 mt-2">{message}</div>}
          </form>
        )}

        {activeSection === "account" && (
          <form onSubmit={handleSaveInfo} className="space-y-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Account Info</h2>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={editInfo.username || ""}
                onChange={handleInfoChange}
                className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editInfo.email || ""}
                onChange={handleInfoChange}
                className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                required
              />
            </div>
            {/* Add profilePic upload if needed */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-all"
            >
              Save Account Info
            </button>
            {message && <div className="text-center text-green-600 mt-2">{message}</div>}
          </form>
        )}

        {activeSection === "personal" && (
          <form onSubmit={handleSavePersonal} className="space-y-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Personal Info</h2>
            {/* Add more personal info fields here */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Profile Picture (coming soon)</label>
              <input
                type="file"
                disabled
                className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold shadow-lg transition-all"
              disabled
            >
              Save Personal Info
            </button>
            {message && <div className="text-center text-green-600 mt-2">{message}</div>}
          </form>
        )}

        {activeSection === "connect" && (
          <form onSubmit={e => e.preventDefault()} className="space-y-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Connect</h2>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Connect With WhatsApp</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="WhatsApp Number"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                  disabled={whatsappConnected}
                />
                {whatsappConnected ? (
                  <span className="text-green-600 font-semibold">Connected</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleConnectWhatsapp}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
                    disabled={!whatsapp}
                  >
                    Connect
                  </button>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {whatsappConnected
                  ? "You'll receive reminders on WhatsApp."
                  : "Enter your WhatsApp number to receive subscription reminders."}
              </div>
            </div>
          </form>
        )}

        {/* Logout button at the bottom */}
        <div className="mt-10 flex justify-end">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
