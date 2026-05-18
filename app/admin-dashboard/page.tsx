"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface PreRegistration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  timestamp: string;
}

interface StatCard {
  icon: string;
  label: string;
  value: number;
  color: string;
  bgColor: string;
  trend?: number;
  chartData?: any[];
  chartType?: "line" | "bar" | "pie";
}

export default function AdminDashboard() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<PreRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [exporting, setExporting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [invitedStatus, setInvitedStatus] = useState<{ [key: string]: boolean }>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    total: number;
    thisWeek: number;
    today: number;
    thisMonth: number;
    withPhone: number;
    withInsta: number;
    avgPerDay: number;
    dailyData?: any[];
    contactData?: any[];
  }>({
    total: 0,
    thisWeek: 0,
    today: 0,
    thisMonth: 0,
    withPhone: 0,
    withInsta: 0,
    avgPerDay: 0,
    dailyData: [],
    contactData: [],
  });

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("sneakout_admin_logged_in");
    if (isLoggedIn !== "true") {
      router.push("/admin-login");
      return;
    }

    // Load theme preference
    const savedTheme = localStorage.getItem("sneakout_admin_theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }

    // Fetch registrations
    fetchRegistrations();
  }, [router]);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem(
      "sneakout_admin_theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/registrations");
      const data = await response.json();

      if (data.success) {
        // Sort by newest first
        const sorted = (data.registrations || []).sort(
          (a: PreRegistration, b: PreRegistration) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setRegistrations(sorted);
        calculateStats(sorted);
      } else {
        console.error("Failed to fetch registrations");
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (regs: PreRegistration[]) => {
    const now = Date.now();
    const today = new Date().toDateString();
    const thisWeek = regs.filter(
      (r) => now - new Date(r.timestamp).getTime() < 7 * 24 * 60 * 60 * 1000
    ).length;
    const thisMonth = regs.filter(
      (r) => now - new Date(r.timestamp).getTime() < 30 * 24 * 60 * 60 * 1000
    ).length;
    const todayCount = regs.filter(
      (r) => new Date(r.timestamp).toDateString() === today
    ).length;
    const withPhone = regs.filter((r) => r.phone).length;
    const withInsta = regs.filter((r) => r.instagram).length;
    const daysActive = new Set(
      regs.map((r) => new Date(r.timestamp).toDateString())
    ).size;
    const avgPerDay = daysActive > 0 ? Math.round(regs.length / daysActive) : 0;

    // Generate daily data for charts (last 7 days)
    const dailyMap: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dailyMap[dateStr] = 0;
    }

    regs.forEach((reg) => {
      const regDate = new Date(reg.timestamp);
      const dateStr = regDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (dateStr in dailyMap) {
        dailyMap[dateStr]++;
      }
    });

    const dailyData = Object.entries(dailyMap).map(([date, count]) => ({
      date,
      registrations: count,
    }));

    // Contact info breakdown data for pie chart
    const contactData = [
      { name: "Phone Only", value: withPhone - withInsta, color: "#dc2626" },
      { name: "Instagram Only", value: withInsta - (withPhone > 0 ? Math.min(withPhone, withInsta) : 0), color: "#991b1b" },
      { name: "Both", value: Math.min(withPhone, withInsta), color: "#f87171" },
      { name: "Neither", value: regs.length - Math.max(withPhone, withInsta), color: "#475569" },
    ].filter((item) => item.value > 0);

    setStats({
      total: regs.length,
      thisWeek,
      today: todayCount,
      thisMonth,
      withPhone,
      withInsta,
      avgPerDay,
      dailyData,
      contactData,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("sneakout_admin_logged_in");
    localStorage.removeItem("sneakout_admin_login_time");
    router.push("/");
  };

  const handleInvited = async (id: string, currentStatus: boolean) => {
    setInvitedStatus((prev) => ({
      ...prev,
      [id]: !currentStatus,
    }));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this registration?")) {
      setDeletingId(id);
      try {
        const response = await fetch("/api/admin/registrations", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
          alert("Registration deleted successfully");
        } else {
          alert("Failed to delete registration");
        }
      } catch (error) {
        console.error("Error deleting registration:", error);
        alert("Error deleting registration");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      alert("No data to export");
      return;
    }

    setExporting(true);

    try {
      // Prepare CSV content
      const headers = ["Name", "Email", "Phone", "Instagram", "Date/Time"];
      const rows = filteredData.map((reg) => [
        reg.name,
        reg.email,
        reg.phone || "",
        reg.instagram || "",
        new Date(reg.timestamp).toLocaleString(),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row.map((cell) => `"${cell.toString().replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");

      // Download
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sneakout-preregistrations-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export CSV");
    } finally {
      setExporting(false);
    }
  };

  // Filter registrations
  const filteredData = registrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCardComponent = ({
    icon,
    label,
    value,
    color,
    bgColor,
    trend,
    chartData,
    chartType,
  }: StatCard) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative overflow-hidden rounded-lg border p-3 sm:p-4 backdrop-blur-sm group cursor-pointer transition-all ${
        isDarkMode
          ? "bg-slate-900/40 border-red-600/30 hover:border-red-600/50"
          : "bg-white/40 border-red-200/60 hover:border-red-300/80 shadow-sm"
      }`}
    >
      {/* Subtle red glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
        isDarkMode ? "bg-red-600/10" : "bg-red-400/5"
      }`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="text-lg sm:text-xl">
            {icon}
          </div>
          {trend !== undefined && (
            <div
              className={`text-xs px-2 py-0.5 rounded-full ${
                trend > 0
                  ? isDarkMode
                    ? "bg-red-600/30 text-red-400"
                    : "bg-red-100/80 text-red-700"
                  : isDarkMode
                    ? "bg-slate-600/30 text-slate-400"
                    : "bg-slate-200/80 text-slate-700"
              }`}
            >
              {trend > 0 ? "+" : ""}{trend}%
            </div>
          )}
        </div>

        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${isDarkMode ? "text-slate-400 group-hover:text-slate-300" : "text-slate-600 group-hover:text-slate-700"}`}>{label}</p>
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r ${
            isDarkMode ? "from-red-400 to-red-200" : "from-red-600 to-red-500"
          } bg-clip-text text-transparent`}
        >
          {value.toLocaleString()}
        </motion.div>

        {/* Mini Chart with better styling */}
        {chartData && chartData.length > 0 && (
          <div className="mt-3 -mx-4 sm:-mx-6 pt-3 border-t border-slate-600/20">
            {chartType === "line" && (
              <ResponsiveContainer width="100%" height={40}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#334155" : "#cbd5e1"} vertical={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                      border: isDarkMode ? "1.5px solid #dc2626" : "1.5px solid #f87171",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: isDarkMode ? "#fff" : "#000",
                      boxShadow: isDarkMode ? "0 8px 16px rgba(220,38,38,0.2)" : "0 4px 12px rgba(220,38,38,0.1)"
                    }}
                    cursor={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#dc2626"
                    dot={false}
                    strokeWidth={2.5}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            {chartType === "bar" && (
              <ResponsiveContainer width="100%" height={40}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#334155" : "#cbd5e1"} vertical={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                      border: isDarkMode ? "1.5px solid #dc2626" : "1.5px solid #f87171",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: isDarkMode ? "#fff" : "#000",
                      boxShadow: isDarkMode ? "0 8px 16px rgba(220,38,38,0.2)" : "0 4px 12px rgba(220,38,38,0.1)"
                    }}
                    cursor={false}
                  />
                  <Bar
                    dataKey="registrations"
                    fill="#dc2626"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            {chartType === "pie" && (
              <ResponsiveContainer width="100%" height={60}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={14}
                    outerRadius={28}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {chartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-3 border-slate-700 border-t-red-600 rounded-full"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="ml-4 text-slate-400"
        >
          Loading admin dashboard...
        </motion.p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      isDarkMode
        ? "bg-black text-white"
        : "bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900"
    }`}>
      {/* Animated Grain/Particle Background */}
      {isDarkMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Grain overlay with animation */}
          <div className="absolute inset-0 bg-black">
            {/* SVG filter for grain effect */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
              <defs>
                <filter id="grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" />
                  <feDisplacementMap in="SourceGraphic" scale="1" />
                </filter>
              </defs>
              <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>

            {/* Animated particles */}
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              style={{
                backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, rgba(255,255,255,0)),
                                 radial-gradient(2px 2px at 60% 70%, white, rgba(255,255,255,0)),
                                 radial-gradient(1px 1px at 50% 50%, white, rgba(255,255,255,0)),
                                 radial-gradient(1px 1px at 80% 10%, white, rgba(255,255,255,0)),
                                 radial-gradient(2px 2px at 90% 60%, white, rgba(255,255,255,0))`,
                backgroundSize: "200% 200%",
                backgroundRepeat: "repeat",
              }}
            />

            {/* Additional floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white opacity-20"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Original gradient background for light mode */}
      {!isDarkMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl bg-red-400/5"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl bg-red-300/5"
          />
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
        isDarkMode
          ? "bg-black/60 border-slate-800/50"
          : "bg-white/60 border-slate-200/50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link href="/admin-login">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
              >
                <img
                  src="/photos/assets/logo.png"
                  alt="Sneakout"
                  className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent group-hover:from-red-500 group-hover:to-red-300 transition-all duration-300">
                    Control Center
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    Sneakout Admin Dashboard
                  </p>
                </div>
              </motion.div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                whileHover={{ scale: 1.08, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl transition-all font-bold shadow-lg relative overflow-hidden group ${
                  isDarkMode
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500/50 hover:from-yellow-500/30 hover:to-yellow-600/30 hover:border-yellow-500/70 text-yellow-300 shadow-yellow-600/20 hover:shadow-yellow-600/40"
                    : "bg-gradient-to-r from-slate-700 to-slate-800 border-2 border-slate-600/60 hover:from-slate-600 hover:to-slate-700 hover:border-slate-500/80 text-slate-100 shadow-slate-700/30 hover:shadow-slate-700/50"
                }`}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? "☀️ Light" : "🌙 Dark"}
              </motion.button>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-gradient-to-r from-red-900/40 to-red-800/40 hover:from-red-900/60 hover:to-red-800/60 border border-red-600/40 hover:border-red-600/60 rounded-xl transition-all font-semibold"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12`}>
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }}>
            <StatCardComponent
              icon="📊"
              label="Total"
              value={stats.total}
              color="red-600"
              bgColor="bg-red-950/20"
              chartData={stats.dailyData}
              chartType="line"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <StatCardComponent
              icon="⚡"
              label="This Week"
              value={stats.thisWeek}
              color="red-600"
              bgColor="bg-red-950/20"
              trend={stats.thisWeek > stats.today ? 25 : -10}
              chartData={stats.dailyData}
              chartType="bar"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <StatCardComponent
              icon="🔥"
              label="Today"
              value={stats.today}
              color="red-600"
              bgColor="bg-red-950/20"
              chartData={stats.dailyData?.slice(-1)}
              chartType="bar"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <StatCardComponent
              icon="📅"
              label="This Month"
              value={stats.thisMonth}
              color="red-600"
              bgColor="bg-red-950/20"
              chartData={stats.dailyData}
              chartType="line"
            />
          </motion.div>
        </motion.div>

        {/* Secondary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <StatCardComponent
              icon="📱"
              label="Phone"
              value={stats.withPhone}
              color="red-600"
              bgColor="bg-red-950/20"
              chartData={[
                { name: "Has Phone", value: stats.withPhone, color: "#dc2626" },
                { name: "No Phone", value: Math.max(0, stats.total - stats.withPhone), color: "#475569" }
              ]}
              chartType="pie"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <StatCardComponent
              icon="📸"
              label="Instagram"
              value={stats.withInsta}
              color="red-600"
              bgColor="bg-red-950/20"
              chartData={[
                { name: "Has Instagram", value: stats.withInsta, color: "#dc2626" },
                { name: "No Instagram", value: Math.max(0, stats.total - stats.withInsta), color: "#475569" }
              ]}
              chartType="pie"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <StatCardComponent
              icon="📈"
              label="Avg/Day"
              value={stats.avgPerDay}
              color="red-600"
              bgColor="bg-red-950/20"
              chartData={stats.contactData}
              chartType="pie"
            />
          </motion.div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="🔍 Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 sm:px-5 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600/20 text-sm sm:text-base backdrop-blur-sm transition-all ${
                isDarkMode
                  ? "bg-slate-900/40 border border-slate-700/50 text-white placeholder-slate-500 focus:border-red-600"
                  : "bg-slate-100/40 border border-slate-300/50 text-slate-900 placeholder-slate-500 focus:border-red-500"
              }`}
            />
          </div>

          <motion.button
            onClick={() => {
              setRefreshing(true);
              fetchRegistrations().finally(() => setRefreshing(false));
            }}
            disabled={refreshing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-600/90 rounded-lg font-semibold disabled:opacity-50 transition-all text-sm sm:text-base relative overflow-hidden"
          >
            <motion.span
              animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={refreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
              className="inline-block"
            >
              🔄
            </motion.span>
            {refreshing && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>

          <motion.button
            onClick={handleExportCSV}
            disabled={exporting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-600/90 rounded-lg font-semibold disabled:opacity-50 transition-all text-sm sm:text-base"
          >
            {exporting ? "⬇️" : "⬇️"}
          </motion.button>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`rounded-lg overflow-hidden backdrop-blur-sm border ${
            isDarkMode
              ? "border-slate-700/50 bg-slate-900/40"
              : "border-slate-300/50 bg-white/40 shadow-sm"
          }`}
        >
          {/* Header */}
          <div className={`px-3 sm:px-5 py-3 sm:py-4 border-b ${
            isDarkMode
              ? "bg-red-950/50 border-slate-700/50"
              : "bg-red-50/60 border-slate-300/50"
          }`}>
            <h2 className={`text-base sm:text-lg font-bold ${
              isDarkMode ? "text-red-500" : "text-red-700"
            }`}>
              Registrations ({filteredData.length}/{registrations.length})
            </h2>
          </div>

          {filteredData.length === 0 ? (
            <div className="p-8 sm:p-16 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl sm:text-6xl mb-4"
              >
                {registrations.length === 0 ? "📭" : "🔍"}
              </motion.div>
              <p className={`text-sm sm:text-base ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                {registrations.length === 0
                  ? "No registrations yet. They'll appear here when people sign up!"
                  : "No results found. Try adjusting your search."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className={`border-b ${
                    isDarkMode
                      ? "border-slate-700/50 bg-slate-800/30"
                      : "border-slate-300/50 bg-slate-200/30"
                  }`}>
                    <th className={`px-4 sm:px-6 py-3 sm:py-4 text-left font-bold ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}>
                      👤 Name
                    </th>
                    <th className={`px-4 sm:px-6 py-3 sm:py-4 text-left font-bold ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}>
                      ✉️ Email
                    </th>
                    <th className={`hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left font-bold ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}>
                      📞 Phone
                    </th>
                    <th className={`hidden lg:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left font-bold ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}>
                      📸 Instagram
                    </th>
                    <th className={`px-4 sm:px-6 py-3 sm:py-4 text-left font-bold ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}>
                      🕐 Date
                    </th>
                    <th className={`px-4 sm:px-6 py-3 sm:py-4 text-left font-bold ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}>
                      ✉️ Invited
                    </th>
                    <th className={`px-4 sm:px-6 py-3 sm:py-4 text-left font-bold ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}>
                      ⚙️ Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((reg, index) => (
                    <motion.tr
                      key={reg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className={`border-b hover:backdrop-filter hover:backdrop-blur-sm transition-all duration-300 ${
                        index % 2 === 0
                          ? isDarkMode
                            ? "border-slate-700/30 hover:bg-slate-800/30"
                            : "border-slate-300/30 bg-white/20 hover:bg-white/30"
                          : isDarkMode
                            ? "border-slate-700/30 bg-slate-900/20 hover:bg-slate-800/40"
                            : "border-slate-300/30 hover:bg-slate-100/30"
                      }`}
                    >
                      <td className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold ${
                        isDarkMode ? "text-slate-100" : "text-slate-900"
                      }`}>
                        {reg.name}
                      </td>
                      <td className={`px-4 sm:px-6 py-3 sm:py-4 break-all text-xs sm:text-base ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}>
                        {reg.email}
                      </td>
                      <td className={`hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {reg.phone ? (
                          <span className={`px-2 py-1 rounded-lg text-xs font-mono ${
                            isDarkMode
                              ? "bg-green-500/20 text-green-300"
                              : "bg-green-200/40 text-green-700"
                          }`}>
                            {reg.phone}
                          </span>
                        ) : (
                          <span className={isDarkMode ? "text-slate-600" : "text-slate-400"}>-</span>
                        )}
                      </td>
                      <td className={`hidden lg:table-cell px-4 sm:px-6 py-3 sm:py-4 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {reg.instagram ? (
                          <span className={`px-2 py-1 rounded-lg text-xs font-mono ${
                            isDarkMode
                              ? "bg-pink-500/20 text-pink-300"
                              : "bg-pink-200/40 text-pink-700"
                          }`}>
                            @{reg.instagram}
                          </span>
                        ) : (
                          <span className={isDarkMode ? "text-slate-600" : "text-slate-400"}>-</span>
                        )}
                      </td>
                      <td className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {new Date(reg.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <input
                          type="checkbox"
                          checked={invitedStatus[reg.id] || false}
                          onChange={() => handleInvited(reg.id, invitedStatus[reg.id] || false)}
                          className="w-5 h-5 cursor-pointer accent-red-600 rounded"
                        />
                      </td>
                      <td className={`px-4 sm:px-6 py-4 transition-colors ${
                        isDarkMode
                          ? "bg-red-900/10 hover:bg-red-900/20"
                          : "bg-red-50/40 hover:bg-red-100/40"
                      }`}>
                        <motion.button
                          onClick={() => handleDelete(reg.id)}
                          disabled={deletingId === reg.id}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 disabled:opacity-50 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 relative overflow-hidden group ${
                            isDarkMode
                              ? "bg-gradient-to-r from-red-900/80 to-red-800/80 hover:from-red-800 hover:to-red-700 text-red-200 shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
                              : "bg-gradient-to-r from-red-200/80 to-red-100/80 hover:from-red-300 hover:to-red-200 text-red-800 shadow-lg shadow-red-400/20 hover:shadow-red-400/40"
                          }`}
                        >
                          {deletingId === reg.id ? "⏳" : "🗑️"}
                          {!deletingId && deletingId !== reg.id && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{ pointerEvents: "none" }}
                            />
                          )}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={`mt-12 pt-6 border-t ${
            isDarkMode
              ? "border-slate-700/30 text-slate-500"
              : "border-slate-300/30 text-slate-600"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm mb-2">
            <span>✨</span>
            <p className="font-medium">Real-time registration dashboard • Last updated: {new Date().toLocaleTimeString()}</p>
            <span>✨</span>
          </div>
          <p className={`text-xs text-center ${
            isDarkMode ? "text-slate-600" : "text-slate-500"
          }`}>
            Sneakout Admin Control Center
          </p>
        </motion.div>
      </main>
    </div>
  );
}
