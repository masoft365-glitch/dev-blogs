// src/pages/NotFoundPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A simple, styled 404 "Not Found" page displayed for any unmatched routes.
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
      {/* Using the glass-card style for consistency with the site's design */}
      <div className="glass-card p-12 rounded-lg">
        <h1 className="text-8xl font-black font-display text-glow-cyan">404</h1>
        <p className="mt-4 text-3xl font-bold font-display text-text-primary">System Error</p>
        <p className="mt-2 text-text-secondary">
          Location not found in this sector.
        </p>
        {/* A link to safely navigate the user back to the homepage */}
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 text-base font-medium text-glow-cyan bg-glow-cyan/10 border border-glow-cyan rounded-md shadow-sm hover:bg-glow-cyan/20 transition-colors"
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
