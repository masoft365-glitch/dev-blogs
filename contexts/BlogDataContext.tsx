// src/contexts/BlogDataContext.tsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Post, Author } from '../types';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * Defines the shape of the data and functions provided by the BlogDataContext.
 */
interface BlogDataContextType {
  posts: Post[];
  authors: Author[];
  isLoading: boolean;
  error: Error | null;
  getPostBySlug: (slug: string) => Post | undefined;
  getAuthorByName: (name: string) => Author | undefined;
  getPostsByAuthor: (authorName: string) => Post[];
  getPostsByTag: (tag: string) => Post[];
}

// Create the React Context with an undefined initial value.
const BlogDataContext = createContext<BlogDataContextType | undefined>(undefined);

/**
 * A provider component that fetches all blog data from external files,
 * processes it, and makes it available to all child components via the BlogDataContext.
 * This is the core of the dynamic, file-based content architecture.
 */
export const BlogDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold the processed blog posts.
  const [posts, setPosts] = useState<Post[]>([]);
  // State to hold author data.
  const [authors, setAuthors] = useState<Author[]>([]);
  // State to track the initial data loading process.
  const [isLoading, setIsLoading] = useState(true);
  // State to store any errors that occur during data fetching.
  const [error, setError] = useState<Error | null>(null);

  // useEffect hook to fetch and process data when the component mounts.
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // 1. Fetch authors data from the JSON file.
        const authorsRes = await fetch('/authors.json');
        if (!authorsRes.ok) throw new Error('Failed to fetch authors.json');
        const authorsData: Author[] = await authorsRes.json();
        setAuthors(authorsData);

        // 2. Fetch the index of post files.
        const postsIndexRes = await fetch('/posts.json');
        if (!postsIndexRes.ok) throw new Error('Failed to fetch posts.json');
        const postFiles: string[] = await postsIndexRes.json();

        // 3. Fetch each markdown file concurrently using Promise.all.
        const fetchedPosts = await Promise.all(
          postFiles.map(async (file) => {
            const postRes = await fetch(`/posts/${file}`);
            if (!postRes.ok) throw new Error(`Failed to fetch ${file}`);
            const markdown = await postRes.text();
            
            // 4. Parse the markdown file content and frontmatter using gray-matter.
            const { data, content } = matter(markdown);

            // 5. Join the author data into the post object for easy access.
            const author = authorsData.find(a => a.name === data.author);
            if (!author) throw new Error(`Author "${data.author}" not found for post "${data.title}"`);
            
            // Return the fully formed post object.
            return { ...data, content, author } as Post;
          })
        );
        
        // 6. Sort posts by publication date in descending order (newest first).
        fetchedPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

        setPosts(fetchedPosts);
      } catch (e: any) {
        setError(e);
        console.error("Error loading blog data:", e);
      } finally {
        // 7. Set loading to false once the process is complete (either success or failure).
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []); // The empty dependency array ensures this effect runs only once on mount.
  
  // --- Utility Functions ---
  // These functions are provided to consumers of the context for easy data retrieval.

  const getPostBySlug = (slug: string) => posts.find(p => p.slug === slug);
  const getAuthorByName = (name: string) => authors.find(a => a.name === name);
  const getPostsByAuthor = (authorName: string) => posts.filter(p => p.author.name === authorName);
  const getPostsByTag = (tag: string) => {
      const normalizedTag = tag.toLowerCase();
      // A post matches if its category or any of its tags match the provided tag.
      return posts.filter(post =>
        post.category.toLowerCase() === normalizedTag ||
        post.tags.some(t => t.toLowerCase() === normalizedTag)
      );
  };

  // The value object that will be exposed through the context provider.
  const value = { posts, authors, isLoading, error, getPostBySlug, getAuthorByName, getPostsByAuthor, getPostsByTag };

  return (
    <BlogDataContext.Provider value={value}>
      {children}
    </BlogDataContext.Provider>
  );
};

/**
 * A custom hook for consuming the BlogDataContext.
 * This simplifies accessing the blog data and provides better error handling.
 */
export const useBlogData = () => {
  const context = useContext(BlogDataContext);
  if (context === undefined) {
    throw new Error('useBlogData must be used within a BlogDataProvider');
  }
  return context;
};
