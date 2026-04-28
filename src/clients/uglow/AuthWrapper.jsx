import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // In a real app this would go to a backend. 
    // Here we check against Vite environment variables.
    const expectedUsername = import.meta.env.VITE_UGLOW_USERNAME;
    const expectedPassword = import.meta.env.VITE_UGLOW_PASSWORD;

    if (username === expectedUsername && password === expectedPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md animate-fade-in text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-blue-700" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-slate-800 mb-2">Secure Portal</h2>
        <p className="text-slate-600 mb-8">Please enter your credentials to access the client dashboard.</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 mt-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthWrapper;
