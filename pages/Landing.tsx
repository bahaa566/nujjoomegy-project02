
import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-200 bg-clip-text text-transparent">NujoomEGY</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-zinc-400 hover:text-white transition-colors">Sign In</Link>
            <Link to="/register" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-emerald-400 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-sm font-semibold tracking-wide uppercase">
            Egypt's #1 Talent Pipeline
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            The Bridge Between <br /> 
            <span className="text-emerald-500 italic">Streets</span> & <span className="text-white italic">Stadiums</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-zinc-400 mb-12">
            NujoomEGY uses data-driven scouting to find the next Mohamed Salah. 
            Whether you're a player looking for a chance or a scout looking for magic, we connect you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-12 py-4 bg-emerald-500 text-black font-extrabold rounded-xl text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              Build Your Profile
            </Link>
            <Link to="/register" className="w-full sm:w-auto px-12 py-4 bg-zinc-900 border border-zinc-800 text-white font-extrabold rounded-xl text-xl hover:bg-zinc-800 transition-colors">
              I'm a Scout
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Registered Talent', val: '2,500+' },
            { label: 'Verified Scouts', val: '120+' },
            { label: 'Pro Trials Held', val: '450' },
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-center">
              <div className="text-4xl font-black text-white mb-2">{stat.val}</div>
              <div className="text-zinc-500 font-medium uppercase tracking-widest text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Social Proof */}
      <footer className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-600">© 2024 NujoomEGY. All rights reserved. Built for Egyptian Football.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
