// src/components/BlogPostCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Post, Category } from '../types';
import { ChevronRightIcon } from './Icons';

interface BlogPostCardProps {
  post: Post;
}

// A mapping from category names to Tailwind CSS gradient classes.
// This allows each category to have a unique, visually distinct color scheme.
const categoryGradients: Record<Category, string> = {
    'Code Alchemy': 'from-glow-cyan to-accent-purple',
    'Fintech Frontiers': 'from-accent-red to-accent-yellow',
    'AI Synapses': 'from-accent-light-blue to-glow-cyan',
    'Dev Nexus': 'from-accent-emerald to-accent-teal',
    'Trend Radar': 'from-accent-orange to-accent-yellow',
    'Career Constellation': 'from-accent-lavender to-accent-light-pink',
};


/**
 * A reusable card component to display a summary of a blog post.
 * Features a "frosted glass" effect and interactive hover animations.
 */
const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // The main link wraps the entire card, making it a large clickable target.
  return (
    <Link to={`/post/${post.slug}`} className="group block rounded-lg overflow-hidden glass-card relative p-6 flex flex-col justify-between min-h-[320px]">
      <div>
        {/* Category badge with a dynamic gradient background */}
        <div className={`inline-block text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${categoryGradients[post.category]} text-bg-primary px-2 py-1 rounded-full mb-4`}>
          {post.category}
        </div>
        {/* Post title with a hover effect */}
        <h3 className="text-2xl font-bold font-display text-text-primary mb-2 transition-colors duration-300 group-hover:text-glow-cyan">{post.title}</h3>
        {/* Post excerpt */}
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">{post.excerpt}</p>
      </div>

      <div className="mt-auto">
         {/* 
            Futuristic Terminal Hover Effect:
            A hidden line of "terminal text" that becomes visible on hover,
            simulating a command-line interface interaction.
         */}
        <div className="relative h-6 text-accent-mint font-mono text-xs overflow-hidden">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">$ echo "Read Article..."</span>
        </div>

        {/* Card footer with author info and an "Explore" prompt */}
        <div className="flex items-center justify-between text-xs text-text-secondary pt-4 border-t border-border-color">
            <div className="flex items-center space-x-2">
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-6 h-6 rounded-full border-2 border-border-color-hover" />
                <span>{post.author.name}</span>
            </div>
            <div className="flex items-center">
                <span>Explore</span>
                {/* Chevron icon moves to the right on hover */}
                <ChevronRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
