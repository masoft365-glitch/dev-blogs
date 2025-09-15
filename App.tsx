// src/App.tsx

import React from 'react';
import { HashRouter, Routes, Route, Link, NavLink, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CategoryPage from './pages/CategoryPage';
import AuthorPage from './pages/AuthorPage';
import { TwitterIcon, LinkedInIcon, GithubIcon } from './components/Icons';
import { BlogDataProvider } from './contexts/BlogDataContext';

/**
 * Renders animated floating particles for the background effect.
 */
const Particles: React.FC = () => {
  const particleCount = 15; // Number of particles to render
  return (
    // This div sits behind all other content
    <div className="absolute inset-0 z-0 pointer-events-none">
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className="particle"
          // Randomize size, position, and animation timing for a natural effect
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 20 + 15}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * The main header component with navigation links.
 */
const Header: React.FC = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    // Sticky header that stays at the top of the viewport
    <header className="sticky top-0 z-50">
      {/* Background with blur and border for the glassmorphism effect */}
      <div className="absolute inset-0 bg-bg-primary/70 backdrop-blur-md border-b border-border-color"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Site logo/title linking to the homepage */}
          <Link to="/" className="text-3xl font-bold font-display text-text-primary tracking-wider">
            DEV Blogs
          </Link>
          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                // Dynamically apply styles for the active link
                className={({ isActive }) =>
                  `text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-glow-cyan drop-shadow-[0_0_5px_var(--glow-cyan)]' // Active link style
                      : 'text-text-secondary hover:text-text-primary' // Inactive link style
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

/**
 * The main footer component with navigation, social links, and a newsletter signup form.
 */
const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-color bg-bg-primary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Site info and social links */}
          <div>
            <h3 className="text-2xl font-bold font-display text-text-primary mb-2">DEV Blogs</h3>
            <p className="text-text-secondary text-sm">A Blog for Developers, by Developers.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-text-secondary hover:text-glow-cyan transition-colors"><TwitterIcon className="w-5 h-5" /></a>
              <a href="#" className="text-text-secondary hover:text-glow-cyan transition-colors"><GithubIcon className="w-5 h-5" /></a>
              <a href="#" className="text-text-secondary hover:text-glow-cyan transition-colors"><LinkedInIcon className="w-5 h-5" /></a>
            </div>
          </div>
          {/* Column 2: Quick navigation links */}
          <div>
            <h4 className="font-bold font-display text-text-primary mb-4 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-text-secondary hover:text-glow-cyan transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-text-secondary hover:text-glow-cyan transition-colors">Contact</Link></li>
                 <li><Link to="/" className="text-text-secondary hover:text-glow-cyan transition-colors">Latest Posts</Link></li>
            </ul>
          </div>
          {/* Column 3: Newsletter signup form */}
          <div>
            <h4 className="font-bold font-display text-text-primary mb-4 uppercase tracking-widest">Join the Mailing List</h4>
            <p className="text-sm text-text-secondary mb-4">Get the latest articles and updates delivered to your inbox.</p>
            <form className="flex space-x-2">
              <input type="email" placeholder="your.email@genesis.net" className="w-full px-3 py-2 text-sm bg-bg-primary border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-glow-cyan/50 focus:border-glow-cyan" />
              <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-md bg-glow-cyan/10 border border-glow-cyan text-glow-cyan hover:bg-glow-cyan/20 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>
        {/* Bottom footer bar with copyright info */}
        <div className="mt-8 border-t border-border-color pt-8 text-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} DEV Blogs. All rights reserved. System Online.</p>
        </div>
      </div>
    </footer>
  );
};

/**
 * The main layout structure for all pages, including the header, footer, and particle background.
 * The `Outlet` component from react-router-dom renders the active child route's component.
 */
const AppLayout: React.FC = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Particles />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                  {/* Child routes (HomePage, PostPage, etc.) will be rendered here */}
                  <Outlet />
              </main>
              <Footer />
            </div>
        </div>
    );
}

/**
 * The root component of the application.
 * It sets up the router and the global data provider.
 */
const App: React.FC = () => {
  return (
    // The BlogDataProvider fetches all blog data and makes it available to all components via a context.
    <BlogDataProvider>
      {/* HashRouter is used for client-side routing, compatible with static hosting. */}
      <HashRouter>
        <Routes>
          {/* All pages use the AppLayout which provides the consistent header and footer. */}
          <Route path="/" element={<AppLayout />}>
            {/* The index route for the root path "/" */}
            <Route index element={<HomePage />} />
            {/* Route for individual blog posts, using a URL parameter for the post slug */}
            <Route path="post/:slug" element={<PostPage />} />
            {/* Route for displaying posts filtered by a specific tag */}
            <Route path="tags/:tag" element={<CategoryPage />} /> 
            {/* Route for displaying an author's profile and their posts */}
            <Route path="authors/:authorName" element={<AuthorPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            {/* A catch-all route that displays the 404 page for any unmatched URLs */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </BlogDataProvider>
  );
};

export default App;
