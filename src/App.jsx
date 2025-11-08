import React from 'react';
import HomePage from './pages/HomePage';
import Login from './components/auth/Login';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isLoggedIn, login, logout } = useAuth();

  if (!isLoggedIn) {
  
    return <Login onLoginSuccess={login} />;
  }

  return (
    <div className="App">
      <button 
        onClick={logout} 
        className="absolute top-4 right-4 z-10 p-2 bg-red-700 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
      <HomePage />
    </div>
  );
}

export default App;