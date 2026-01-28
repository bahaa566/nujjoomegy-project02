
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { MOCK_PLAYERS } from '../constants';
import { PlayerPosition, PlayerProfile } from '../types';

const ScoutDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerProfile[]>([]);
  const [filter, setFilter] = useState<string>('All');

  const toggleSelection = (player: PlayerProfile) => {
    setSelectedPlayers(prev => {
      if (prev.find(p => p.id === player.id)) {
        return prev.filter(p => p.id !== player.id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, player];
    });
  };

  const filteredPlayers = filter === 'All' 
    ? MOCK_PLAYERS 
    : MOCK_PLAYERS.filter(p => p.position === filter);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-2xl font-black text-emerald-500">NujoomEGY</span>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/scout" className="text-white font-bold underline underline-offset-8 decoration-emerald-500 decoration-2">Talent Registry</Link>
              <Link to="/pricing" className="text-zinc-500 hover:text-white transition-colors">Go PRO</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right mr-4 hidden sm:block">
              <div className="text-sm font-black">{user?.name}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest">{user?.tier} TIER</div>
            </div>
            <button onClick={logout} className="p-2 text-zinc-500 hover:text-emerald-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">Talent Registry</h1>
            <p className="text-zinc-500">Showing {filteredPlayers.length} verified Egyptian players</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All', ...Object.values(PlayerPosition)].map(pos => (
              <button
                key={pos}
                onClick={() => setFilter(pos)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${filter === pos ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map(player => (
            <div 
              key={player.id}
              className={`group relative bg-zinc-900 rounded-3xl border transition-all cursor-pointer overflow-hidden ${selectedPlayers.find(p => p.id === player.id) ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-zinc-800 hover:border-zinc-700'}`}
              onClick={() => toggleSelection(player)}
            >
              <div className="aspect-[4/5] relative">
                <img src={player.image} alt={player.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedPlayers.find(p => p.id === player.id) ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-black/40 border-white/20 text-transparent'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block px-3 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                    {player.position}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">{player.name}</h3>
                  <div className="flex items-center text-zinc-400 text-sm space-x-3">
                    <span>{player.age} Years</span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                    <span>{player.club}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-zinc-900 border-t border-zinc-800">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Pace</div>
                    <div className="text-lg font-black text-emerald-500">{player.stats.pace}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Shooting</div>
                    <div className="text-lg font-black text-white">{player.stats.shooting}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Dribble</div>
                    <div className="text-lg font-black text-white">{player.stats.dribbling}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Comparison Floating Bar */}
      {selectedPlayers.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
          <div className="bg-white text-black p-4 rounded-3xl shadow-2xl flex items-center space-x-6 border-4 border-emerald-500 min-w-[320px]">
            <div className="flex -space-x-3">
              {selectedPlayers.map(p => (
                <img key={p.id} src={p.image} className="w-12 h-12 rounded-full border-2 border-white object-cover" />
              ))}
              {Array.from({ length: 3 - selectedPlayers.length }).map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-300 bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold text-xs">
                  +
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="font-black text-lg">{selectedPlayers.length}/3 Selected</div>
              <div className="text-[10px] uppercase font-bold text-zinc-500">Compare Talents</div>
            </div>
            <button 
              disabled={selectedPlayers.length < 2}
              onClick={() => navigate('/compare', { state: { playerIds: selectedPlayers.map(p => p.id) } })}
              className={`px-6 py-3 rounded-2xl font-black transition-all ${selectedPlayers.length >= 2 ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
            >
              Compare Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoutDashboard;
