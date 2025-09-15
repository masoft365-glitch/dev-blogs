// src/pages/AuthorPage.tsx

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useBlogData } from '../contexts/BlogDataContext';
import BlogPostCard from '../components/BlogPostCard';
import { GithubIcon, LinkedInIcon, TwitterIcon } from '../components/Icons';

/**
 * A page dedicated to a single author, showing their bio and a list of their posts.
 */
const AuthorPage: React.FC = () => {
  // Get the author's name slug from the URL parameters.
  const { authorName } = useParams<{ authorName: string }>();
  // Fetch all authors, posts, and loading state from the global context.
  const { authors, posts, isLoading } = useBlogData();

  // Find the author object that matches the slug from the URL.
  const author = authors.find(
    a => a.name.toLowerCase().replace(/\s+/g, '-') === authorName
  );
  
  // Filter the posts to find only those written by the current author.
  const authorPosts = posts.filter(post => post.author.name === author?.name);

  // While data is loading, show a loading indicator.
  if (isLoading) {
    return <div className="text-center py-20">Loading Author Profile...</div>;
  }

  // If no author is found for the given slug, redirect to the 404 page.
  if (!author) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Author Header Section: Displays the author's profile information. */}
      <section className="mb-12 glass-card p-8 rounded-lg flex flex-col md:flex-row items-center text-center md:text-left gap-8">
        <img 
          src={author.avatarUrl} 
          alt={author.name} 
          className="w-32 h-32 rounded-full flex-shrink-0 border-4 border-border-color" 
        />
        <div>
          <h1 className="text-4xl font-black font-display text-text-primary">
            {author.name}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            {author.bio}
          </p>
          {/* Social media links for the author */}
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
              <a href="#" className="text-text-secondary hover:text-glow-cyan transition-colors"><TwitterIcon className="w-6 h-6" /></a>
              <a href="#" className="text-text-secondary hover:text-glow-cyan transition-colors"><GithubIcon className="w-6 h-6" /></a>
              <a href="#" className="text-text-secondary hover:text-glow-cyan transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
          </div>
        </div>
      </section>

      {/* Section for displaying posts written by the author */}
      <section>
        <h2 className="text-3xl font-bold font-display text-text-primary mb-6 border-b border-border-color pb-4">
          Posts by {author.name}
        </h2>
        {authorPosts.length > 0 ? (
          // If the author has posts, render them in a grid.
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          // If the author has no posts, display a message.
          <div className="text-center py-16 glass-card rounded-lg">
            <h3 className="text-2xl font-bold text-text-primary">No Posts Yet</h3>
            <p className="mt-2 text-text-secondary">
              {author.name} hasn't published any articles yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AuthorPage;
