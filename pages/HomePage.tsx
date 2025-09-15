// src/pages/HomePage.tsx

import React from 'react';
import { CATEGORIES } from '../constants';
import BlogPostCard from '../components/BlogPostCard';
import { useBlogData } from '../contexts/BlogDataContext';
import {
  CodeAlchemyIcon,
  FintechFrontiersIcon,
  AiSynapsesIcon,
  DevNexusIcon,
  TrendRadarIcon,
  CareerConstellationIcon
} from '../components/Icons';
import { Category } from '../types';

// Maps each category string to its corresponding icon component for easy rendering.
const iconMap: Record<Category, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'Code Alchemy': CodeAlchemyIcon,
  'Fintech Frontiers': FintechFrontiersIcon,
  'AI Synapses': AiSynapsesIcon,
  'Dev Nexus': DevNexusIcon,
  'Trend Radar': TrendRadarIcon,
  'Career Constellation': CareerConstellationIcon,
};

/**
 * The main landing page of the blog.
 * Features a hero section with animated icons and a grid of the latest posts.
 */
const HomePage: React.FC = () => {
  // Fetch posts and loading status from the global blog data context.
  const { posts, isLoading } = useBlogData();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero Section: The main visual and introductory part of the page. */}
      <section className="text-center mb-20 sm:mb-32">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display text-text-primary mb-6">
          DEV Blogs
        </h1>
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary mb-12">
          A Blog for Developers, by Developers.
        </p>
        
        {/* Display of the 6 main categories with their animated holographic icons. */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-4xl mx-auto mb-16">
          {CATEGORIES.map(category => {
            const Icon = iconMap[category];
            return (
              <div key={category} className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 holo-icon p-2">
                  <Icon className="w-full h-full" />
                </div>
                <p className="text-xs text-text-secondary uppercase tracking-widest group-hover:text-glow-cyan transition-colors">{category}</p>
              </div>
            );
          })}
        </div>

        {/* Call-to-action button that smoothly scrolls to the latest posts section. */}
        <a href="#latest-posts" className="inline-block rounded-md px-8 py-3 text-sm font-semibold transition-colors bg-glow-cyan/10 border border-glow-cyan text-glow-cyan hover:bg-glow-cyan/20">
          Read the Latest
        </a>
      </section>

      {/* All Posts Section: Displays a grid of blog post cards. */}
      <section id="latest-posts">
        <h2 className="text-4xl font-bold font-display text-text-primary mb-10 text-center">Latest Transmissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // If data is loading, display a skeleton loader to provide visual feedback.
            [...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-lg animate-pulse min-h-[320px]">
                <div className="h-4 bg-border-color rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-border-color rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-border-color rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-border-color rounded w-full mb-2"></div>
                <div className="h-4 bg-border-color rounded w-full mb-6"></div>
                <div className="h-4 bg-border-color rounded w-2/3"></div>
              </div>
            ))
          ) : (
            // Once data is loaded, map over the posts and render a BlogPostCard for each.
            posts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
