import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-700 via-blue-400 to-blue-900 animate-fade-in">
      <h1 className="text-5xl font-bold text-white mb-8 animate-bounce">Welcome to NotesGlory</h1>
      <div className="flex gap-6">
        <button
          className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-100 transition-all duration-300 animate-fade-in"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-900 transition-all duration-300 animate-fade-in"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Welcome;
