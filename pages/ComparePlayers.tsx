
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MOCK_PLAYERS } from '../constants';
import { PlayerProfile } from '../types';
import { StatChart } from '../components/StatChart';
import { getScoutInsight } from '../services/gemini';

const ComparePlayers: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const playerIds = location.state?.playerIds as string[];
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [insight, setInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    if (!playerIds || playerIds.length < 2) {
      navigate('/scout');
      return;
    }
    const filtered = MOCK_PLAYERS.filter(p => playerIds.includes(p.id));
    setPlayers(filtered);
  }, [playerIds, navigate]);

  const generateInsight = async () => {
    setLoadingInsight(true);
    const text = await getScoutInsight(players);
    setInsight(text);
    setLoadingInsight(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <Link to="/scout" className="flex items-center text-zinc-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Registry
          </Link>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-emerald-500">Comparison Hub</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visual Comparison */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {players.map((p, i) => (
                <div key={p.id} className="text-center">
                  <div className="relative mb-4">
                    <img src={p.image} className="w-full aspect-square object-cover rounded-2xl border-4 border-zinc-900" />
                    <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center font-black text-sm text-emerald-500">
                      {i + 1}
                    </div>
                  </div>
                  <div className="font-black truncate">{p.name}</div>
                  <div className="text-xs text-zinc-500 uppercase">{p.position}</div>
                </div>
              ))}
            </div>

            <StatChart players={players} />
          </div>

          {/* AI Insight & Stats List */}
          <div className="space-y-8">
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/50">Nujoom AI v2.5</div>
              </div>
              <h2 className="text-2xl font-black mb-6 flex items-center">
                <span className="text-emerald-500 mr-3">✨</span>
                Scout Analysis
              </h2>
              
              {!insight ? (
                <div className="text-center py-8">
                  <p className="text-zinc-500 mb-6">Generate advanced AI tactical insights comparing these players' potential.</p>
                  <button 
                    onClick={generateInsight}
                    disabled={loadingInsight}
                    className="bg-emerald-500 text-black px-8 py-3 rounded-xl font-black hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    {loadingInsight ? 'Processing Potential...' : 'Generate Insight'}
                  </button>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none text-zinc-300 animate-fade-in leading-relaxed">
                  {insight}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'].map(stat => (
                <div key={stat} className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 flex items-center justify-between">
                  <div className="text-sm font-bold uppercase tracking-widest text-zinc-500">{stat}</div>
                  <div className="flex items-center space-x-6">
                    {players.map((p, i) => (
                      <div key={p.id} className="text-center min-w-[60px]">
                        <div className={`text-xl font-black ${i === 0 ? 'text-emerald-500' : i === 1 ? 'text-white' : 'text-zinc-400'}`}>
                          {(p.stats as any)[stat]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePlayers;
