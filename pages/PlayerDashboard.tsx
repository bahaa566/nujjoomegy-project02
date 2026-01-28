
import React from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';

const PlayerDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black">Captain's Dashboard</h1>
            <p className="text-zinc-500">Welcome back, {user?.name}</p>
          </div>
          <button onClick={logout} className="text-zinc-500 hover:text-white transition-colors">Logout</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="text-zinc-500 text-sm mb-1 uppercase font-bold tracking-tighter">Player ID</div>
            <div className="text-2xl font-mono text-emerald-500">{user?.id}</div>
          </div>
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="text-zinc-500 text-sm mb-1 uppercase font-bold tracking-tighter">Status</div>
            <div className="text-2xl font-black text-emerald-500">ACTIVE</div>
          </div>
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
            <div className="text-zinc-500 text-sm mb-1 uppercase font-bold tracking-tighter">Scout Views</div>
            <div className="text-2xl font-black">12</div>
          </div>
        </div>

        <div className="p-12 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-3xl text-center">
          <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">⚽</div>
          <h2 className="text-2xl font-black mb-2">Complete Your Profile</h2>
          <p className="text-zinc-500 mb-8 max-w-sm mx-auto">Add your stats, match highlights, and photos to start appearing in scout searches.</p>
          <button className="bg-white text-black px-8 py-3 rounded-xl font-black hover:bg-emerald-500 transition-all">Edit Professional Profile</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
