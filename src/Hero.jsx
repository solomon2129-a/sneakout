import React from 'react';

const Hero = () => (
  <section className="bg-white py-20" id="hero">
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          The infrastructure behind<br />
          <span className="text-primary">better events</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Sneakout helps hosts &amp; providers manage, coordinate, and execute events with confidence.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-gray-800 transition">
            Host an Event
          </a>
          <a href="#" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            Join as a Provider
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
