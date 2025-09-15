// src/pages/BannerGeneratorPage.tsx
// Note: This component is currently not routed but is kept for potential future use.

import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { PhotoIcon } from '../components/Icons';

// A default, highly detailed prompt to showcase the generator's capabilities.
const DEFAULT_PROMPT = `A futuristic, minimalist developer blog banner titled “DEV Blogs — A Blog for Developers, by Developers” in sleek, glowing neon typography using Inter Variable Font with subtle motion tracking. The background is a deep cosmic navy (#1a1a2e) with soft particle dust and floating geometric holographic grids. Floating above are six ultra-detailed 3D icons (each with ambient occlusion, subtle rotation, and volumetric glow): 💻 Code Alchemy (cyan-to-purple gradient), 🏦 Fintech Frontiers (pink-to-red gradient), 🤖 AI Synapses (blue-to-cyan gradient), 🛠️ Dev Nexus (emerald-to-teal gradient), 📈 Trend Radar (orange-to-yellow gradient), 🎓 Career Constellation (lavender-to-pink gradient). Each icon hovers in 3D space with depth, casting faint reflections on a glass-morphism surface below. Below the title, translucent glass cards float with micro-animations showing live code snippets and data streams. In the bottom right, a subtle pulsing “Subscribe →” button glows with a quantum cyan outline. Style: cyberpunk elegance, dark mode masterpiece, Apple meets Blade Runner 2049, hyper-realistic digital art, 8K, cinematic lighting, Unreal Engine 5 render, ultra-detailed, no text clutter, professional dev aesthetic. Aspect ratio: 16:9.`;

/**
 * An AI-powered tool to generate blog banners from a text prompt.
 */
const BannerGeneratorPage: React.FC = () => {
  // State to hold the user's text prompt.
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  // State to store the URL of the generated image.
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  // State to manage the loading status of the API call.
  const [isLoading, setIsLoading] = useState(false);
  // State for any potential error messages.
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the asynchronous call to the Gemini image generation API.
   */
  const handleGenerateBanner = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate a banner.");
      return;
    }
    // Reset state for the new request.
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Call the image generation model with specific configuration.
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '16:9', // Ensure the banner has the correct aspect ratio.
        },
      });
      
      // The API returns the image as a base64 encoded string.
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      // Create a data URL from the base64 string to display the image.
      const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
      setGeneratedImageUrl(imageUrl);
    } catch (e) {
      console.error(e);
      setError("Failed to generate banner. The model might be busy or the prompt could be unsafe. Please try again with a different prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <section className="text-center mb-10">
        <div className="inline-block p-4 bg-sky-100 dark:bg-sky-900/50 rounded-full mb-4">
            <PhotoIcon className="w-10 h-10 text-sky-500 dark:text-sky-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white mb-4">
          AI Banner Generator
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Create stunning, professional banners for your blog posts. Describe your vision and let our AI bring it to life.
        </p>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto">
        {/* Prompt Input Section */}
        <div className="bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-lg shadow-lg">
          <label htmlFor="prompt" className="block text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Your Banner Vision
          </label>
          <textarea
            id="prompt"
            rows={10}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 text-base bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
            placeholder="e.g., A minimalist banner showing a neural network with glowing nodes..."
            disabled={isLoading}
          />
          <button
            onClick={handleGenerateBanner}
            disabled={isLoading}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Generating Banner...' : 'Generate Banner'}
            <PhotoIcon className="w-5 h-5" />
          </button>
          {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        </div>

        {/* Generated Image Display Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-center">Generated Banner</h2>
          <div className="aspect-video bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden">
            {isLoading && (
              <div className="w-full h-full animate-pulse bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                 <p className="text-slate-500 dark:text-slate-400">Generating your vision...</p>
              </div>
            )}
            {!isLoading && !generatedImageUrl && (
              <p className="text-slate-500 dark:text-slate-400">Your generated banner will appear here.</p>
            )}
            {generatedImageUrl && (
                <div className="relative group w-full h-full">
                    <img src={generatedImageUrl} alt="Generated banner" className="w-full h-full object-cover" />
                    {/* Download button appears on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a 
                            href={generatedImageUrl} 
                            download="dev-blogs-banner.png" 
                            className="px-6 py-3 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm"
                        >
                            Download Banner
                        </a>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerGeneratorPage;
