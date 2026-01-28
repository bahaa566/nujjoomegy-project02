
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { PlayerProfile } from '../types';

interface StatChartProps {
  players: PlayerProfile[];
}

const COLORS = ['#10b981', '#ffffff', '#ef4444']; // Emerald, White, Red (for contrast)

export const StatChart: React.FC<StatChartProps> = ({ players }) => {
  const data = [
    { subject: 'Pace', ...players.reduce((acc, p, i) => ({ ...acc, [`val${i}`]: p.stats.pace }), {}) },
    { subject: 'Shooting', ...players.reduce((acc, p, i) => ({ ...acc, [`val${i}`]: p.stats.shooting }), {}) },
    { subject: 'Passing', ...players.reduce((acc, p, i) => ({ ...acc, [`val${i}`]: p.stats.passing }), {}) },
    { subject: 'Dribbling', ...players.reduce((acc, p, i) => ({ ...acc, [`val${i}`]: p.stats.dribbling }), {}) },
    { subject: 'Defending', ...players.reduce((acc, p, i) => ({ ...acc, [`val${i}`]: p.stats.defending }), {}) },
    { subject: 'Physical', ...players.reduce((acc, p, i) => ({ ...acc, [`val${i}`]: p.stats.physical }), {}) },
  ];

  return (
    <div className="w-full h-[400px] bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#3f3f46" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          {players.map((p, i) => (
            <Radar
              key={p.id}
              name={p.name}
              dataKey={`val${i}`}
              stroke={COLORS[i]}
              fill={COLORS[i]}
              fillOpacity={0.3}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
