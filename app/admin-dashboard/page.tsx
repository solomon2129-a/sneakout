"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface PreRegistration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<PreRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem("sneakout_admin_logged_in");
    if (isLoggedIn !== "true") {
      router.push("/admin-login");
      return;
    }

    // Fetch registrations
    fetchRegistrations();
  }, [router]);

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
      } else {
        console.error("Failed to fetch registrations");
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sneakout_admin_logged_in");
    localStorage.removeItem("sneakout_admin_login_time");
    router.push("/");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-slate-700 border-t-red-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 sm:gap-4"
            >
              <img
                src="/photos/assets/logo.png"
                alt="Sneakout"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <h1 className="text-lg sm:text-2xl font-black">Admin Dashboard</h1>
            </motion.div>

            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-red-900/30 hover:bg-red-900/50 border border-red-600/30 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8"
        >
          <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="text-xs sm:text-sm text-slate-400 mb-1">
              Total Registrations
            </div>
            <div className="text-2xl sm:text-4xl font-black text-red-600">
              {registrations.length}
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="text-xs sm:text-sm text-slate-400 mb-1">
              This Week
            </div>
            <div className="text-2xl sm:text-4xl font-black text-slate-200">
              {
                registrations.filter(
                  (r) =>
                    new Date(r.timestamp).getTime() >
                    Date.now() - 7 * 24 * 60 * 60 * 1000
                ).length
              }
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="text-xs sm:text-sm text-slate-400 mb-1">
              Today
            </div>
            <div className="text-2xl sm:text-4xl font-black text-slate-200">
              {
                registrations.filter(
                  (r) =>
                    new Date(r.timestamp).toDateString() ===
                    new Date().toDateString()
                ).length
              }
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-red-600 focus:outline-none text-sm sm:text-base"
          />
          <motion.button
            onClick={handleExportCSV}
            disabled={exporting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#980B07] to-red-800 hover:from-[#b00d08] hover:to-red-700 rounded-lg font-semibold disabled:opacity-50 transition-all text-sm sm:text-base"
          >
            {exporting ? "Exporting..." : "Export CSV"}
          </motion.button>
          <motion.button
            onClick={fetchRegistrations}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700 rounded-lg font-semibold transition-all text-sm sm:text-base"
          >
            Refresh
          </motion.button>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden"
        >
          {filteredData.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <p className="text-slate-400">
                {registrations.length === 0
                  ? "No registrations yet"
                  : "No results found"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50">
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-red-600">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-red-600">
                      Email
                    </th>
                    <th className="hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-red-600">
                      Phone
                    </th>
                    <th className="hidden lg:table-cell px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-red-600">
                      Instagram
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-red-600">
                      Date/Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((reg, index) => (
                    <motion.tr
                      key={reg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                        {reg.name}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-300">
                        {reg.email}
                      </td>
                      <td className="hidden md:table-cell px-4 sm:px-6 py-3 sm:py-4 text-slate-400">
                        {reg.phone || "-"}
                      </td>
                      <td className="hidden lg:table-cell px-4 sm:px-6 py-3 sm:py-4 text-slate-400">
                        {reg.instagram ? `@${reg.instagram}` : "-"}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-400 text-xs sm:text-sm">
                        {new Date(reg.timestamp).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs sm:text-sm text-slate-500">
          <p>Showing {filteredData.length} of {registrations.length} registrations</p>
        </div>
      </main>
    </div>
  );
}
