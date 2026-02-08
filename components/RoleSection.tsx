"use client";

export const RoleSection = () => {
  return (
    <section id="role" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="heading-font text-3xl md:text-4xl font-bold mb-6">Sneakout is the layer that brings trust to the chaos.</h3>

        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg">
            <h5 className="font-bold text-white mb-2">Trust</h5>
            <p className="text-sm text-secondary/70">Know who delivers</p>
          </div>
          <div className="p-6 bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg">
            <h5 className="font-bold text-white mb-2">Structure</h5>
            <p className="text-sm text-secondary/70">Keep things from falling apart</p>
          </div>
          <div className="p-6 bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg">
            <h5 className="font-bold text-white mb-2">Transactions</h5>
            <p className="text-sm text-secondary/70">Money handled properly</p>
          </div>
        </div>
      </div>
    </section>
  );
};
