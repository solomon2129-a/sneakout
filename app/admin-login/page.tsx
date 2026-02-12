"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if already logged in
    const isLoggedIn = localStorage.getItem("sneakout_admin_logged_in");
    if (isLoggedIn === "true") {
      router.push("/admin-dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Verify password via API
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("sneakout_admin_logged_in", "true");
        localStorage.setItem("sneakout_admin_login_time", Date.now().toString());
        router.push("/admin-dashboard");
      } else {
        setError("Invalid password");
        setPassword("");
      }
    } catch (err) {
      setError("Authentication failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#980B07]/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#980B07]/5 blur-3xl rounded-full" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push("/")}
            className="inline-block cursor-pointer"
          >
            <img
              src="/photos/assets/logo.png"
              alt="Sneakout"
              className="w-16 h-16 mx-auto mb-6"
            />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Admin Access
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Enter your password to access the dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 sm:p-4 bg-red-900/20 border border-red-600/50 rounded-lg text-red-400 text-xs sm:text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Password input */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={loading}
              className="w-full px-4 py-3 sm:py-4 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all disabled:opacity-50 text-sm sm:text-base"
              required
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 sm:py-4 px-4 bg-gradient-to-r from-[#980B07] to-red-800 hover:from-[#b00d08] hover:to-red-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-400 transition-colors"
          >
            Back to Landing Page
          </button>
        </div>
      </motion.div>
    </div>
  );
}
