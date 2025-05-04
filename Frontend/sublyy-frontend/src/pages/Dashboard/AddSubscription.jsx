import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { addSubscription } from "../../services/api";

// Only main categories
const categories = [
  "Movies & TV",
  "Gaming",
  "Music & Audio",
  "Productivity & Utilities",
  "Education",
  "Lifestyle & Health",
  "Finance",
  "Other"
];

const billingCycles = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
  { label: "Weekly", value: "weekly" },
  { label: "Custom", value: "custom" }
];
const colorOptions = [
  "#6366f1", "#a78bfa", "#f472b6", "#f59e42", "#34d399", "#60a5fa", "#fbbf24", "#f87171"
];
const paymentMethods = [
  "Credit Card", "Debit Card", "PayPal", "UPI", "Net Banking", "Cash", "Other"
];

const initialState = {
  name: "",
  price: "",
  nextPaymentDate: "",
  color: "#6366f1",
  category: "",
  billingCycle: "monthly",
  description: "",
  notes: "",
  paymentMethod: "",
};

// Popular services for autocomplete (add more as needed)
const serviceSuggestions = [
  {
    name: "YouTube Premium",
    category: "Music & Audio"
  },
  {
    name: "Netflix",
    category: "Movies & TV"
  },
  {
    name: "Spotify",
    category: "Music & Audio"
  },
  {
    name: "Amazon Prime",
    category: "Movies & TV"
  },
  {
    name: "Apple Music",
    category: "Music & Audio"
  },
  {
    name: "Google One",
    category: "Productivity & Utilities"
  },
  {
    name: "Twitch",
    category: "Gaming"
  },
  {
    name: "Disney+",
    category: "Movies & TV"
  },
  {
    name: "Coursera",
    category: "Education"
  },
  {
    name: "Notion",
    category: "Productivity & Utilities"
  },
  {
    name: "Starbucks",
    category: "Lifestyle & Health"
  }
];

function AddSubscription() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color) => {
    setForm((prev) => ({ ...prev, color }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameInput(value);
    setShowSuggestions(true);
    setForm((prev) => ({ ...prev, name: value }));
  };

  const handleSuggestionClick = (suggestion) => {
    setForm((prev) => ({
      ...prev,
      name: suggestion.name,
      category: suggestion.category
    }));
    setNameInput(suggestion.name);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await addSubscription(form);
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      setSubmitting(false);
      setError(err.message || "Failed to add subscription.");
    }
  };

  const filteredSuggestions = nameInput.length > 0
    ? serviceSuggestions.filter(s =>
        s.name.toLowerCase().includes(nameInput.toLowerCase())
      )
    : [];

  return (
    <motion.div
      className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-indigo-100 p-8 mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-indigo-600 hover:text-purple-600 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Subscription</h2>
      <p className="text-gray-500 mb-6">Fill in the details below to add a new subscription.</p>
      {error && (
        <div className="mb-2 text-red-500 text-sm text-center">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              placeholder="e.g. Netflix, YouTube, Spotify"
              value={nameInput}
              onChange={handleNameChange}
              onFocus={() => setShowSuggestions(true)}
              autoComplete="off"
              required
            />
          </div>
          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 left-0 right-0 bg-white border border-indigo-100 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
              {filteredSuggestions.map((s, idx) => (
                <li
                  key={s.name}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-indigo-50"
                  onClick={() => handleSuggestionClick(s)}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="ml-auto text-xs text-gray-400">{s.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              placeholder="e.g. 9.99"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Next Payment Date</label>
            <input
              type="date"
              name="nextPaymentDate"
              className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              value={form.nextPaymentDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Billing Cycle</label>
          <select
            name="billingCycle"
            className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            value={form.billingCycle}
            onChange={handleChange}
            required
          >
            {billingCycles.map((cycle) => (
              <option key={cycle.value} value={cycle.value}>{cycle.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Color Label</label>
          <div className="flex gap-2 mt-1 items-center flex-wrap">
            {colorOptions.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${form.color === color ? "border-indigo-600 scale-110" : "border-transparent"} focus:outline-none`}
                style={{ background: color }}
                onClick={() => handleColorChange(color)}
                aria-label={color}
              />
            ))}
            {/* Custom color picker */}
            <label className="flex items-center gap-1 ml-2 cursor-pointer">
              <input
                type="color"
                value={form.color}
                onChange={e => handleColorChange(e.target.value)}
                className="w-7 h-7 p-0 border-0 bg-transparent cursor-pointer"
                style={{ borderRadius: "9999px" }}
                aria-label="Pick custom color"
              />
              <span className="text-xs text-gray-500">Custom</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Payment Method</label>
          <select
            name="paymentMethod"
            className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            value={form.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select payment method</option>
            {paymentMethods.map((pm) => (
              <option key={pm} value={pm}>{pm}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            placeholder="Short description (optional)"
            value={form.description}
            onChange={handleChange}
            rows={2}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            className="w-full px-4 py-3 rounded-lg border border-indigo-200 bg-indigo-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            placeholder="Any notes (optional)"
            value={form.notes}
            onChange={handleChange}
            rows={2}
          />
        </div>
        <motion.button
          type="submit"
          className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
          disabled={submitting || success}
        >
          {success ? (
            <>
              <CheckCircle size={20} className="text-green-300 animate-bounce" />
              Added!
            </>
          ) : submitting ? (
            <span className="animate-pulse">Adding...</span>
          ) : (
            <>Add Subscription</>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AddSubscription;
