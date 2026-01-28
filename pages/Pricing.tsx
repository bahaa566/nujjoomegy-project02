
import React from 'react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free Agent',
      price: '$0',
      desc: 'Perfect for local club scouts starting out.',
      features: ['Browse Registry', 'Basic Filters', 'Compare up to 2 Players', 'No AI Insights'],
      btnText: 'Current Plan',
      current: true
    },
    {
      name: 'Nujoom Pro',
      price: '$29',
      desc: 'The professional standard for elite scouting.',
      features: ['Unlimited Comparison', 'Gemini AI Tactical Insights', 'Download Stats PDF', 'Contact Players Directly', 'Priority Support'],
      btnText: 'Upgrade to PRO',
      featured: true
    },
    {
      name: 'Club Enterprise',
      price: 'Custom',
      desc: 'For professional agencies and major league clubs.',
      features: ['Multiple Scout Seats', 'Advanced API Access', 'Custom Player Tracking', 'On-ground scouting reports'],
      btnText: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Link to="/" className="text-emerald-500 font-black text-xl mb-4 inline-block underline decoration-2 underline-offset-4">NujoomEGY</Link>
          <h1 className="text-5xl font-black mb-4">Elevate Your Scouting</h1>
          <p className="text-zinc-500 max-w-xl mx-auto">Unlock professional data tools and AI insights to find the next generation of Egyptian talent before anyone else.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`p-10 rounded-3xl border transition-all flex flex-col ${plan.featured ? 'bg-emerald-500 text-black border-emerald-500 scale-105 shadow-[0_0_50px_rgba(16,185,129,0.25)]' : 'bg-zinc-900 border-zinc-800 text-white'}`}
            >
              <div className="text-sm font-black uppercase tracking-widest mb-2">{plan.name}</div>
              <div className="text-4xl font-black mb-4">{plan.price}<span className="text-lg font-normal">{plan.price !== 'Custom' && '/mo'}</span></div>
              <p className={`mb-8 ${plan.featured ? 'text-black/70' : 'text-zinc-500'}`}>{plan.desc}</p>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start">
                    <svg className={`w-5 h-5 mr-3 mt-0.5 ${plan.featured ? 'text-black' : 'text-emerald-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-medium text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-black transition-all ${plan.featured ? 'bg-black text-white hover:bg-zinc-900' : 'bg-white text-black hover:bg-emerald-500'}`}>
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/scout" className="text-zinc-500 hover:text-white underline font-bold">Back to Talent Registry</Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
