// src/pages/CategoryPage.tsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';
import { useBlogData } from '../contexts/BlogDataContext';

/**
 * A page that displays all blog posts filtered by a specific tag or category.
 */
const CategoryPage: React.FC = () => {
  // Get the 'tag' parameter from the URL.
  const { tag } = useParams<{ tag: string }>();
  // Access the post filtering function and loading state from the context.
  const { getPostsByTag, isLoading } = useBlogData();
  
  // Filter the posts based on the current tag from the URL.
  const filteredPosts = getPostsByTag(tag || '');
  // Capitalize and format the tag for display as a page title.
  const capitalizedTag = tag ? tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ') : '';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Page header displaying the current tag being filtered */}
      <div className="text-center mb-12">
        <p className="text-sm text-text-secondary uppercase tracking-widest">Showing posts for</p>
        <h1 className="text-5xl font-black font-display text-text-primary mt-2">
          {capitalizedTag}
        </h1>
      </div>

      {isLoading ? (
        // Display a skeleton loader while posts are being fetched.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-lg animate-pulse min-h-[320px]">
                <div className="h-4 bg-border-color rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-border-color rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-border-color rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-border-color rounded w-full mb-2"></div>
                <div className="h-4 bg-border-color rounded w-full mb-6"></div>
                <div className="h-4 bg-border-color rounded w-2/3"></div>
              </div>
            ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        // If there are posts for this tag, render them in a grid.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        // If no posts are found for this tag, display a message.
        <div className="text-center py-16 glass-card rounded-lg">
          <h2 className="text-2xl font-bold text-text-primary">No Posts Found</h2>
          <p className="mt-2 text-text-secondary">
            We couldn't find any articles for "{capitalizedTag}".
          </p>
          <Link
            to="/"
            className="mt-8 inline-block px-6 py-3 text-base font-medium text-glow-cyan bg-glow-cyan/10 border border-glow-cyan rounded-md shadow-sm hover:bg-glow-cyan/20 transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
