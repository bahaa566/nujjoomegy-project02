
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const success = await login(phone);
      if (success) {
        navigate('/');
      } else {
        setError('No account found with this phone number.');
      }
    } catch (err) {
      setError('A database error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
          <p className="text-zinc-500 text-sm">Sign in with your registered phone number</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Phone Number</label>
            <input
              type="tel"
              required
              disabled={isSubmitting}
              placeholder="e.g. 01012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-5 py-4 bg-black border border-zinc-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-zinc-500 text-sm">
          Don't have an account? <Link to="/register" className="text-emerald-500 font-bold hover:underline">Register Talent</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
