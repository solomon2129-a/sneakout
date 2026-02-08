import React from 'react';

const HowItWorks = () => (
  <section className="bg-gray-100 py-20" id="how-it-works">
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-4xl mb-2">📸</div>
          <h3 className="text-xl font-semibold mb-2 text-primary">Discover</h3>
          <p className="text-gray-700">Find Sneakout on Instagram.</p>
        </div>
        {/* Step 2 */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-4xl mb-2">🚀</div>
          <h3 className="text-xl font-semibold mb-2 text-primary">Enter Sneakout</h3>
          <p className="text-gray-700">Create an account or request access.</p>
        </div>
        {/* Step 3 */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-xl font-semibold mb-2 text-primary">Execute</h3>
          <p className="text-gray-700">Run your event with coordinated vendors.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
