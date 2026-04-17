import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { loginWithGoogle, currentUser, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (currentUser) navigate(from, { replace: true });
  }, [currentUser, navigate, from]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (_) {
      // error already stored in authError via context
    }
  };

  return (
    <div className="min-h-screen bg-[#06111e] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] rounded-full bg-green-400/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 max-w-md w-full mx-4 shadow-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-blue-400 text-3xl">auto_graph</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-headline">StockSense AI</h1>
          <p className="text-slate-400 text-sm mt-1 font-label">Market Trend Prediction Platform</p>
        </div>

        <div className="border-t border-white/10 my-6" />

        <p className="text-center text-slate-300 text-sm mb-6 font-body">
          Sign in to access your AI-powered stock dashboard
        </p>

        {/* Error message */}
        {authError && (
          <div className="bg-red-500/10 border border-red-400/30 text-red-400 text-sm rounded-lg p-3 mb-4 text-center">
            {authError}
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3.5 px-4 bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 font-semibold rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="Google"
          />
          <span className="font-body text-sm">Continue with Google</span>
        </button>

        <p className="text-center text-slate-500 text-xs mt-6 font-label">
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
