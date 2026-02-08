"use client";

export const ProofSection = () => {
  return (
    <section id="proof" className="py-16 px-6 bg-[#070707] border-t border-[#141414]">
      <div className="max-w-5xl mx-auto text-center">
        <div className="grid sm:grid-cols-3 gap-8 items-center">
          <div className="py-8">
            <div className="text-4xl font-extrabold">6+</div>
            <div className="text-sm text-secondary/70">live events</div>
          </div>
          <div className="py-8">
            <div className="text-4xl font-extrabold">₹42L+</div>
            <div className="text-sm text-secondary/70">in community-run experiences</div>
          </div>
          <div className="py-8">
            <div className="text-4xl font-extrabold">Bengaluru</div>
            <div className="text-sm text-secondary/70">Built with organizers in Bangalore</div>
          </div>
        </div>

        <blockquote className="mt-8 text-secondary/80 italic">"Finally, something built for people who actually throw events."</blockquote>
      </div>
    </section>
  );
};
