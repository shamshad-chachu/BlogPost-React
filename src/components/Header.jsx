import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/auth');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          My Blog
        </Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
                Create Blog
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-indigo-600 font-medium">
              Login / Signup
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;