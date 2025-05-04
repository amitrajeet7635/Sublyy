import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordStrengthMeter } from '../../components/ui/PasswordStrengthMeter';
import FloatingBackground from '../../components/ui/FloatingBackground';
import { AuthContext } from '../../context/authContext';

// SVG for eye/eye-off (for password toggle)
const EyeIcon = ({ open }) => (
  open ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.383A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.364 6.364L19.07 4.93" />
    </svg>
  )
);

const API_URL = "http://localhost:3000/api/auth";

const isStrongPassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 number, 1 special char
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if (token) {
      handleLogin({ accessToken: token });
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, handleLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Prevent signup if password is not strong
    if (!isLogin && !isStrongPassword(formData.password)) {
      setError("Password must be at least 8 characters, include an uppercase letter, a number, and a special character.");
      setIsSubmitting(false);
      return;
    }

    try {
      const url = isLogin ? `${API_URL}/login` : `${API_URL}/signup`;
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.name, email: formData.email, password: formData.password };

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!data || !data.accessToken) {
        throw new Error("No accessToken received");
      }

      handleLogin({
        user: data.user || { email: formData.email },
        accessToken: data.accessToken
      });

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <FloatingBackground />
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-indigo-100 bg-white/80 backdrop-blur-lg transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-2 transition-all duration-300">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500">{isLogin ? 'Sign in to access your account' : 'Sign up to get started'}</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4 animate-pulse">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Username"
                className="w-full pl-4 pr-4 py-3 bg-indigo-50/60 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-4 pr-4 py-3 bg-indigo-50/60 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-gray-900 placeholder:text-gray-400"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full pl-4 pr-12 py-3 bg-indigo-50/60 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 text-gray-900 placeholder:text-gray-400"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-purple-500 transition-colors"
              tabIndex={-1}
            >
              <span className="sr-only">{showPassword ? "Hide" : "Show"} password</span>
              <span className="flex items-center justify-center">
                <EyeIcon open={showPassword} />
              </span>
            </button>
          </div>

          {!isLogin && (
            <div>
              <PasswordStrengthMeter password={formData.password} />
              <div className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters, include an uppercase letter, a number, and a special character.
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400
              ${!isLogin && !isStrongPassword(formData.password) ? "opacity-60 cursor-not-allowed" : ""}
            `}
            disabled={isSubmitting || (!isLogin && !isStrongPassword(formData.password))}
          >
            <span className="inline-block transition-all duration-200">
              {isSubmitting ? (
                <span className="animate-pulse">Processing...</span>
              ) : isLogin ? 'Sign In' : 'Sign Up'}
            </span>
          </button>

          <div className="flex items-center justify-center my-2">
            <div className="h-px bg-indigo-200 w-1/3"></div>
            <p className="mx-2 text-gray-400 text-sm">or continue with</p>
            <div className="h-px bg-indigo-200 w-1/3"></div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-white border border-indigo-100 hover:bg-indigo-50 text-indigo-700 hover:text-purple-700 rounded-lg font-semibold shadow transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <img
                src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                alt="Google Logo"
                className="w-5 h-5"
                style={{ display: "inline-block" }}
              />
              <span>Sign in with Google</span>
            </button>
          </div>

          <p className="text-center text-gray-700 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-purple-700 hover:text-indigo-600 font-semibold underline underline-offset-2 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
