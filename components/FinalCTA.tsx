"use client";

import { useState } from "react";

export const FinalCTA = () => {
  const [form, setForm] = useState({ name: "", role: "Organizer", city: "", whatsapp: "", instagram: "" });

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <section id="join" className="py-20 px-6 bg-primary border-t border-[#141414]">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="heading-font text-3xl md:text-4xl font-bold text-secondary">Be part of the first wave</h3>
        <p className="text-secondary/70 mt-4">Sneakout is opening to a small group of organizers and providers first. If you run events, perform, or support events — we want to know you.</p>

        <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Name" className="p-3 bg-[#0F0F0F] border border-[#222] rounded text-secondary" />
          <select value={form.role} onChange={(e) => update('role', e.target.value)} className="p-3 bg-[#0F0F0F] border border-[#222] rounded text-secondary">
            <option>Organizer</option>
            <option>Artist</option>
            <option>Vendor</option>
            <option>Venue</option>
          </select>
          <input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="City" className="p-3 bg-[#0F0F0F] border border-[#222] rounded text-secondary" />
          <input value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} placeholder="WhatsApp Number" className="p-3 bg-[#0F0F0F] border border-[#222] rounded text-secondary" />
          <input value={form.instagram} onChange={(e) => update('instagram', e.target.value)} placeholder="Instagram Handle" className="p-3 bg-[#0F0F0F] border border-[#222] rounded sm:col-span-2 text-secondary" />

          <div className="sm:col-span-2 text-center mt-2">
            <button type="button" className="px-6 py-3 bg-accent text-primary font-semibold rounded">Join the first wave</button>
          </div>
        </form>
      </div>
    </section>
  );
};
