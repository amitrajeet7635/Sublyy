import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PasswordStrengthMeter } from '../../components/ui/PasswordStrengthMeter';
import FloatingBackground from '../../components/ui/FloatingBackground';
import { AuthContext } from '../../context/authContext';

const API_URL = "http://localhost:3000/api/auth";

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
      navigate('/dashboard');
    }
  }, []);

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

    try {
      const url = isLogin ? `${API_URL}/login` : `${API_URL}/signup`;
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.name, email: formData.email, password: formData.password };

      const response = await axios.post(url, payload, { withCredentials: true });

      if (!response.data || !response.data.accessToken) {
        throw new Error("No accessToken received");
      }

      handleLogin({ user: response.data.user, accessToken: response.data.accessToken });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:3000/api/auth/google", "_self");
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center">
      <FloatingBackground />
      <div className="w-full scale-[120%] max-w-lg p-8 backdrop-blur-lg bg-white/30 rounded-2xl shadow-lg border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-900">{isLogin ? 'Sign in to access your account' : 'Sign up to get started'}</p>
        </div>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-12 py-2 bg-white/20 border border-white/30 rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {!isLogin && <PasswordStrengthMeter password={formData.password} />}

          <button type="submit" className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <div className="flex items-center justify-center my-2">
            <div className="h-px bg-gray-400 w-1/3"></div>
            <p className="mx-2 text-gray-700 text-sm">or continue with</p>
            <div className="h-px bg-gray-400 w-1/3"></div>
          </div>

          <div className="flex justify-center ">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-white hover:bg-gray-900 text-black hover:text-white rounded-lg font-semibold"
            >
              <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google Logo" className="w-5 h-5" />
              Sign in with Google
            </button>
          </div>

          <p className="text-center text-gray-800 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-purple-700 hover:text-purple-500 font-semibold">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
