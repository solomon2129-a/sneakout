import React from 'react';

const features = [
  {
    title: 'Event Management',
    description: 'Plan, schedule, and track every detail of your event in one place.',
    icon: '🗓️',
  },
  {
    title: 'Vendor Coordination',
    description: 'Communicate, assign tasks, and monitor progress with all providers.',
    icon: '🤝',
  },
  {
    title: 'Trust & Verification',
    description: 'Verified hosts and vendors, secure payments, and transparent reviews.',
    icon: '🔒',
  },
  {
    title: 'Ticketing & Confirmations',
    description: 'Integrated ticket sales, QR check‑ins, and real‑time confirmations.',
    icon: '🎟️',
  },
];

const Solution = () => (
  <section className="bg-white py-20" id="solution">
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        The Sneakout Solution
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f) => (
          <div key={f.title} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{f.title}</h3>
            <p className="text-gray-700">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Solution;
