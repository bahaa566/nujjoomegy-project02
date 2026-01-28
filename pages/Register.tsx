
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.PLAYER);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(name, phone, role);
      navigate('/');
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try a different phone number.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2">Join NujoomEGY</h1>
          <p className="text-zinc-500 text-sm">Egypt's Premier Talent Registry</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setRole(UserRole.PLAYER)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${role === UserRole.PLAYER ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-black opacity-50'}`}
            >
              <div className="font-black text-lg text-white">Player</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Be Discovered</div>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setRole(UserRole.SCOUT)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${role === UserRole.SCOUT ? 'border-emerald-400 bg-emerald-400/10' : 'border-zinc-800 bg-black opacity-50'}`}
            >
              <div className="font-black text-lg text-white">Scout</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Find Magic</div>
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Full Name</label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              placeholder="e.g. Mahmoud Trezeguet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 bg-black border border-zinc-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Phone Number</label>
            <input
              type="tel"
              required
              disabled={isSubmitting}
              placeholder="e.g. 01011223344"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-5 py-4 bg-black border border-zinc-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 text-black font-black rounded-xl transition-all shadow-lg flex items-center justify-center ${role === UserRole.PLAYER ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-500'} disabled:opacity-50`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              `Register as ${role === UserRole.PLAYER ? 'Player' : 'Scout'}`
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-zinc-500 text-sm">
          Already registered? <Link to="/login" className="text-emerald-500 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
