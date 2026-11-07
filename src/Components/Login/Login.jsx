import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAuthError } from "../../features/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import welcomeAnimation from "../../assets/images/Animation - 1727201692012.json";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const reduxError = useSelector((state) => state.user.error);

  // Live validation checks
  const isUserValid = /^[A-Za-z]{4,10}$/i.test(username);
  const isPassValid =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/i.test(
      password
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearAuthError());

    if (!isUserValid) {
      setLocalError("Username must be 4 to 10 alphabetic letters only.");
      return;
    }
    if (!isPassValid) {
      setLocalError(
        "Password must be 4-10 characters with at least 1 letter, 1 number, and 1 special symbol (!@#$%^&*)."
      );
      return;
    }

    dispatch(
      login({
        name: username,
        password: password,
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      })
    );
  };

  const handleDemoLogin = () => {
    setUsername("admin");
    setPassword("Pass1!");
    setLocalError("");
    dispatch(clearAuthError());
    dispatch(
      login({
        name: "admin",
        password: "Pass1!",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      })
    );
  };

  const errorMessage = localError || reduxError;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-8 overflow-hidden font-inter">
      {/* Decorative background light orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/40 text-white"
      >
        {/* Lottie Header Animation */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-36 h-36 -my-2 flex items-center justify-center">
            <Lottie
              animationData={welcomeAnimation}
              loop={true}
              className="w-full h-full"
            />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent mt-2"
          >
            Welcome Back
          </motion.h1>
          <p className="text-sm text-slate-300 mt-1">
            Sign in to access your curated store & cart
          </p>
        </div>

        {/* Error notification banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5"
            >
              <svg
                className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (localError) setLocalError("");
                }}
                placeholder="e.g. admin or alex"
                className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                required
              />
              {username.length > 0 && (
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                  {isUserValid ? (
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs text-amber-400">4-10 letters</span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (localError) setLocalError("");
                }}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Validation Requirements Checklist */}
          <div className="pt-1 pb-2 space-y-1 text-xs text-slate-300/80">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                  isUserValid
                    ? "bg-emerald-500/20 text-emerald-300 font-bold"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {isUserValid ? "✓" : "•"}
              </span>
              <span>Username: 4-10 letters only</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                  isPassValid
                    ? "bg-emerald-500/20 text-emerald-300 font-bold"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {isPassValid ? "✓" : "•"}
              </span>
              <span>Password: 4-10 chars, 1 letter, 1 number, 1 symbol</span>
            </div>
          </div>

          {/* Primary Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.button>
        </form>

        {/* Quick Demo Fill Shortcut */}
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-xs text-indigo-300 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
          >
            ⚡ One-Click Demo Sign In (admin / Pass1!)
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
