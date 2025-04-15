/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#818cf8', // Lighter indigo
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#4338ca', // indigo-700
        },
        secondary: {
          light: '#c4b5fd', // Lighter violet-300
          DEFAULT: '#8b5cf6', // violet-500
          dark: '#7c3aed', // violet-600
        },
        background: {
          light: '#ffffff',
          dark: '#111827', // Original dark gray-900
        },
        surface: {
          light: '#f9fafb', // Very light gray-50
          dark: '#1f2937', // Original dark gray-800
        },
        border: {
          light: '#e5e7eb', // Light gray-200
          dark: '#374151', // Original dark gray-700
        },
        text: {
          light: '#4b5563', // More subtle gray-600 for better readability
          dark: '#f9fafb', // Original gray-50 for dark mode
        },
        // Refined accent colors for light theme
        accent: {
          light: {
            blue: '#dbeafe', // Very light blue-50
            indigo: '#e0e7ff', // Very light indigo-50
            purple: '#f3e8ff', // Very light purple-50
            slate: '#f1f5f9', // Very light slate-50
          }
        },
        hero: {
          light: '#f5f7ff', // Very light blue-gray for hero background
        }
      },
    },
  },
  plugins: [],
}
