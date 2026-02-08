import React from 'react';

const WhoItsFor = () => (
  <section className="bg-gray-100 py-20" id="who-its-for">
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Who It’s For
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Hosts column */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            For Hosts
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Manage events smoothly</li>
            <li>Coordinate vendors effortlessly</li>
            <li>Build credibility with verified providers</li>
          </ul>
        </div>
        {/* Providers column */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            For Providers
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Get booked by real hosts</li>
            <li>Work with verified organizers</li>
            <li>Build reputation and repeat business</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default WhoItsFor;
