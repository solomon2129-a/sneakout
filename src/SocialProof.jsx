import React from 'react';

const SocialProof = () => (
  <section className="bg-white py-20" id="social-proof">
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Trusted by Leading Events
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Sneakout powers real‑world events, from large venues to boutique showcases.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2 text-primary">Mall of Asia Pilot</h3>
          <p className="text-gray-700">Successfully coordinated multiple vendors for a high‑traffic event.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2 text-primary">Brand Collaborations</h3>
          <p className="text-gray-700">Enabled seamless execution for top‑tier brand activations.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2 text-primary">Live Music Showcases</h3>
          <p className="text-gray-700">Managed artist line‑ups, sound, and lighting logistics.</p>
        </div>
      </div>
    </div>
  </section>
);

export default SocialProof;
