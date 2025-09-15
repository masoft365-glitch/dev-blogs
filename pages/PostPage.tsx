// src/pages/PostPage.tsx

import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useBlogData } from '../contexts/BlogDataContext';
import { TwitterIcon, LinkedInIcon } from '../components/Icons';
import { marked } from 'marked';

/**
 * Renders a single blog post page.
 * It fetches the post data based on the URL slug and renders the markdown content as HTML.
 */
const PostPage: React.FC = () => {
  // Get the 'slug' parameter from the URL.
  const { slug } = useParams<{ slug: string }>();
  // Access the data fetching functions from the context.
  const { getPostBySlug, isLoading } = useBlogData();
  // Find the specific post that matches the slug.
  const post = getPostBySlug(slug!);

  // Use `useMemo` to parse the markdown content only when the post content changes.
  // This prevents re-parsing on every render, which is a performance optimization.
  const postHtmlContent = useMemo(() => {
    if (post?.content) {
      // Use the 'marked' library to convert markdown string to an HTML string.
      return marked.parse(post.content);
    }
    return '';
  }, [post]);

  // While data is being fetched, show a loading message.
  if (isLoading) {
    return <div className="text-center py-20">Loading Transmission...</div>;
  }

  // If no post is found for the given slug after loading, navigate to the 404 page.
  if (!post) {
    return <Navigate to="/404" />;
  }
  
  // Format the publication date for display.
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Create a URL-friendly slug for the author's page link.
  const authorSlug = post.author.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="pb-16">
      {/* Hero section with the post's feature image as a background. */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src={post.imageUrl} alt={post.title} />
          {/* Overlay to darken the image and improve text readability */}
          <div className="absolute inset-0 bg-bg-primary/70" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight">
                {post.title}
            </h1>
            {/* Post metadata: author, date, and read time */}
            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-text-secondary">
                <Link to={`/authors/${authorSlug}`} className="flex items-center space-x-2 hover:text-glow-cyan transition-colors">
                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-8 h-8 rounded-full border-2 border-border-color-hover" />
                    <span className="font-medium">{post.author.name}</span>
                </Link>
                <span>&bull;</span>
                <span>{formattedDate}</span>
                <span>&bull;</span>
                <span>{post.readTime} min read</span>
            </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24">
        <div className="relative max-w-4xl mx-auto glass-card rounded-lg">
           {/* The article content, styled using Tailwind's typography plugin */}
           <article className="prose prose-lg dark:prose-invert prose-p:text-text-secondary prose-headings:text-text-primary prose-strong:text-text-primary prose-a:text-glow-cyan hover:prose-a:underline max-w-none p-6 sm:p-10">
               {/* Display the excerpt as a lead paragraph */}
               <p className="lead text-xl text-text-primary">{post.excerpt}</p>
               {/* 
                 Render the HTML generated from markdown.
                 `dangerouslySetInnerHTML` is used here because we are parsing trusted markdown content.
                 It's essential to ensure the source of the markdown is secure to prevent XSS attacks.
               */}
               <div dangerouslySetInnerHTML={{ __html: postHtmlContent }} />
           </article>
           
           {/* Post footer with tags and share links */}
           <div className="px-6 sm:px-10 pb-8 pt-4">
               <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-color pt-6">
                   {/* Tags section */}
                   <div className="flex flex-wrap gap-2">
                       {post.tags.map(tag => (
                           <Link key={tag} to={`/tags/${tag.toLowerCase()}`} className="text-xs font-medium bg-bg-surface text-text-secondary px-2.5 py-1 rounded-full border border-border-color hover:border-border-color-hover hover:text-glow-cyan transition-colors">
                               {tag}
                           </Link>
                       ))}
                   </div>
                   {/* Social share links */}
                   <div className="flex items-center space-x-4">
                       <span className="text-sm font-medium text-text-secondary">Share:</span>
                       <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-glow-cyan">
                           <TwitterIcon className="w-5 h-5"/>
                       </a>
                       <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-glow-cyan">
                           <LinkedInIcon className="w-5 h-5"/>
                       </a>
                   </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
