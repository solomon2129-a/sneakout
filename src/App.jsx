import React from 'react';
import Hero from './Hero.jsx';
import Problem from './Problem.jsx';
import Solution from './Solution.jsx';
import WhoItsFor from './WhoItsFor.jsx';
import SocialProof from './SocialProof.jsx';
import HowItWorks from './HowItWorks.jsx';
import FinalCTA from './FinalCTA.jsx';

const App = () => (
  <div className="font-sans text-gray-900">
    <Hero />
    <Problem />
    <Solution />
    <WhoItsFor />
    <SocialProof />
    <HowItWorks />
    <FinalCTA />
  </div>
);

export default App;
