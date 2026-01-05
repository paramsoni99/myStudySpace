import React from 'react';

const FocusAppButton: React.FC = () => {
  return (
    <a
      href="https://skyhigh-focus.netlify.app"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 transition-all duration-300"
    >
      Go to Flight Focus App
    </a>
  );
};

export default FocusAppButton;