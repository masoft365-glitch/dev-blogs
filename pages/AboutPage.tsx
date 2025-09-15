// src/pages/AboutPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Author } from '../types';
import { GithubIcon, LinkedInIcon, TwitterIcon } from '../components/Icons';
import { useBlogData } from '../contexts/BlogDataContext';

/**
 * A reusable card component to display an author's profile summary.
 * It links to the author's dedicated page.
 */
const AuthorCard: React.FC<{ author: Author }> = ({ author }) => {
  // Create a URL-friendly slug from the author's name.
  const authorSlug = author.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/authors/${authorSlug}`} className="group block text-center glass-card p-6 rounded-lg">
      <img src={author.avatarUrl} alt={author.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-border-color group-hover:border-border-color-hover transition-colors" />
      <h3 className="text-xl font-bold font-display text-text-primary group-hover:text-glow-cyan transition-colors">{author.name}</h3>
      <p className="text-sm text-text-secondary mt-2">{author.bio}</p>
      {/* Social icons are for display purposes here */}
      <div className="flex justify-center space-x-4 mt-4">
          <span className="text-text-secondary group-hover:text-glow-cyan transition-colors"><TwitterIcon className="w-5 h-5" /></span>
          <span className="text-text-secondary group-hover:text-glow-cyan transition-colors"><GithubIcon className="w-5 h-5" /></span>
          <span className="text-text-secondary group-hover:text-glow-cyan transition-colors"><LinkedInIcon className="w-5 h-5" /></span>
      </div>
    </Link>
  );
}

/**
 * The About page, which introduces the blog's mission and its team of authors.
 */
const AboutPage: React.FC = () => {
  // Fetch author data and loading status from the global context.
  const { authors, isLoading } = useBlogData();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Page header section */}
      <section className="text-center mb-16 sm:mb-20">
        <h1 className="text-5xl sm:text-7xl font-black font-display text-text-primary mb-4">
          About DEV Blogs
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-text-secondary">
          We are a team of developers, analysts, and tech enthusiasts passionate about sharing high-quality insights on the future of technology.
        </p>
      </section>

      {/* Mission statement section */}
      <section className="max-w-4xl mx-auto mb-16 sm:mb-20 glass-card p-8 sm:p-12 rounded-lg">
        <h2 className="text-4xl font-bold font-display text-text-primary mb-6">Our Mission</h2>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            In an era of rapid technological advancement, staying informed is more critical than ever. Our mission at DEV Blogs is to cut through the noise and provide clear, concise, and expert-driven content on the topics that matter most. 
          </p>
          <p>
            From the latest breakthroughs in Artificial Intelligence to the evolving landscapes of Web3 and FinTech, we aim to be your trusted resource for deep dives, tutorials, and forward-thinking analysis. We believe in empowering our readers with the knowledge they need to build, innovate, and lead in the digital age.
          </p>
        </div>
      </section>
      
      {/* "Meet the Team" section displaying author cards */}
      <section>
        <h2 className="text-4xl font-bold font-display text-text-primary text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            // Display skeleton loaders while author data is being fetched.
            [...Array(4)].map((_, i) => (
                <div key={i} className="glass-card p-6 rounded-lg animate-pulse">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-border-color"></div>
                    <div className="h-6 bg-border-color rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-border-color rounded w-full mx-auto mb-2"></div>
                    <div className="h-4 bg-border-color rounded w-5/6 mx-auto"></div>
                </div>
            ))
          ) : (
            // Once loaded, render an AuthorCard for each author.
            authors.map(author => (
              <AuthorCard key={author.name} author={author} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
