import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (username === 'star' && password === 'coder') {
      onLoginSuccess(username, password);
    } else {
      setError('Invalid credentials. Hint: star/coder');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm border border-yellow-500/50">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Star Access Required</h2>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 font-bold p-3 rounded hover:bg-yellow-400 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;