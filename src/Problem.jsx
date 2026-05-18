import React from 'react';

const Problem = () => (
  <section className="bg-gray-100 py-16" id="problem">
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        The pain points
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <ul className="list-disc list-inside text-gray-700 space-y-4">
          <li>Events managed across scattered chats</li>
          <li>No trust layer between hosts and vendors</li>
          <li>Ticketing and logistics split across tools</li>
          <li>Last‑minute chaos</li>
        </ul>
        <div className="flex items-center justify-center">
          <img
            src="https://source.unsplash.com/featured/400x300?chaos"
            alt="Chaos illustration"
            className="rounded shadow-md"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Problem;
