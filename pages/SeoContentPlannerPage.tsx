// src/pages/SeoContentPlannerPage.tsx
// Note: This component is currently not routed but is kept for potential future use.

import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { SeoPlan } from '../types';
import { ChartBarIcon, KeyIcon, ClipboardDocumentListIcon, CodeBracketIcon, LinkIcon, CopyIcon, CheckIcon, ChevronDownIcon } from '../components/Icons';

// A skeleton loader component for a single SEO plan.
const SeoPlanSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
    </div>
  </div>
);

/**
 * An AI-powered tool that generates complete SEO content plans.
 */
const SeoContentPlannerPage: React.FC = () => {
  // State to hold the array of generated SEO plans.
  const [plans, setPlans] = useState<SeoPlan[]>([]);
  // State to manage the loading status of the API call.
  const [isLoading, setIsLoading] = useState(false);
  // State for any potential error messages.
  const [error, setError] = useState<string | null>(null);
  // State to manage which accordion item is currently open.
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  // State to provide feedback for the copy-to-clipboard action.
  const [copiedText, setCopiedText] = useState<string | null>(null);

  /**
   * Copies text to the clipboard and shows feedback.
   */
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000); // Reset after 2 seconds
    });
  };

  /**
   * Makes an asynchronous call to the Gemini API to generate SEO plans.
   */
  const generatePlan = async () => {
    setIsLoading(true);
    setError(null);
    setPlans([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        I run a technical DEV blog targeting developers, startups, and tech professionals.
        Your task is to act as an expert SEO strategist and create 5 SEO-optimized blog content plans that will rank high on Google for competitive and long-tail keywords.
        The topics should be in the areas of: Software development (Node.js, React, Python, etc.), Fintech, Tech news, AI for developers, Dev tools (VS Code, GitHub, etc.), and YouTube & Google search trends.
        Ensure the content is suitable for ranking in the current year, targets developers, and has both evergreen and trending value. The tone should be technical but beginner-friendly.
      `;
      
      // The API call is configured to return a response that strictly adheres to the defined JSON schema.
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              plans: {
                type: Type.ARRAY,
                description: 'An array of 5 SEO content plans.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: 'A compelling, SEO-optimized, and click-worthy blog title.' },
                    primaryKeyword: { type: Type.STRING, description: 'The main target keyword for the article.' },
                    relatedKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: '2-3 related or LSI keywords.' },
                    outline: {
                      type: Type.OBJECT,
                      description: 'A detailed blog outline optimized for search intent.',
                      properties: {
                        h1: { type: Type.STRING, description: 'The H1 tag, which should be the same as the blog title.' },
                        h2s: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              title: { type: Type.STRING, description: 'The text for an H2 tag.' },
                              h3s: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of H3 tags under this H2.' }
                            }
                          }
                        }
                      }
                    },
                    metaDescription: { type: Type.STRING, description: 'A compelling meta description under 155 characters.' },
                    internalLinkingIdeas: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Ideas for linking to other existing or future blog posts.' },
                    schemaType: { type: Type.STRING, description: 'Recommended schema.org markup type (e.g., Article, HowTo, FAQPage).' }
                  }
                }
              }
            }
          }
        }
      });

      // Parse the JSON string from the response and update state.
      const parsed = JSON.parse(response.text);
      setPlans(parsed.plans || []);
      setActiveIndex(0); // Open the first plan by default.

    } catch (e) {
      console.error(e);
      setError("Failed to generate SEO plan. The model may be busy. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <section className="text-center mb-10">
        <div className="inline-block p-4 bg-sky-100 dark:bg-sky-900/50 rounded-full mb-4">
            <ChartBarIcon className="w-10 h-10 text-sky-500 dark:text-sky-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white mb-4">
          SEO Content Planner
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Generate a complete, high-performance SEO content strategy with a single click.
        </p>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <button
              onClick={generatePlan}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isLoading ? 'Generating Your SEO Plan...' : 'Generate 5 Content Plans'}
              <ChartBarIcon className="w-6 h-6" />
            </button>
            {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        </div>

        {/* Results area displaying either skeleton, empty state, or the generated plans */}
        <div className="space-y-4">
          {isLoading && [...Array(5)].map((_, i) => <SeoPlanSkeleton key={i} />)}

          {!isLoading && plans.length === 0 && !error && (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                <p className="text-slate-500 dark:text-slate-400">Your generated SEO plans will appear here.</p>
            </div>
          )}

          {/* Render the generated plans as an accordion */}
          {plans.map((plan, index) => (
            <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">{plan.title}</h2>
                <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {/* Accordion content with smooth transition */}
              <div className={`transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 sm:p-6 space-y-6 bg-white dark:bg-slate-800/50">
                  
                  {/* Meta Description */}
                  <div className="flex items-start gap-3">
                    <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow"><strong className="text-slate-800 dark:text-slate-100">Meta Description:</strong> {plan.metaDescription}</p>
                    <button onClick={() => handleCopy(plan.metaDescription)} className="p-1.5 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Copy meta description">
                        {copiedText === plan.metaDescription ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Keywords */}
                  <div>
                    <h3 className="flex items-center gap-2 text-md font-semibold text-slate-900 dark:text-white mb-2"><KeyIcon className="w-5 h-5 text-sky-500"/>Keywords</h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="font-bold bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 px-2.5 py-1 rounded-full">
                        {plan.primaryKeyword}
                      </span>
                      {plan.relatedKeywords.map(kw => <span key={kw} className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">{kw}</span>)}
                    </div>
                  </div>

                  {/* Outline */}
                  <div>
                    <h3 className="flex items-center gap-2 text-md font-semibold text-slate-900 dark:text-white mb-2"><ClipboardDocumentListIcon className="w-5 h-5 text-sky-500"/>Content Outline</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                        <h1>{plan.outline.h1}</h1>
                        {plan.outline.h2s.map((h2, h2Index) => (
                            <div key={h2Index}>
                                <h2>{h2.title}</h2>
                                {h2.h3s && h2.h3s.length > 0 && (
                                    <ul>
                                        {h2.h3s.map((h3, h3Index) => <li key={h3Index}>{h3}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                  </div>

                  {/* Internal Links & Schema */}
                  <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div>
                        <h3 className="flex items-center gap-2 text-md font-semibold text-slate-900 dark:text-white mb-2"><LinkIcon className="w-5 h-5 text-sky-500"/>Internal Linking Ideas</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          {plan.internalLinkingIdeas.map(idea => <li key={idea}>{idea}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h3 className="flex items-center gap-2 text-md font-semibold text-slate-900 dark:text-white mb-2"><CodeBracketIcon className="w-5 h-5 text-sky-500"/>Schema Type</h3>
                         <p className="text-sm text-slate-600 dark:text-slate-400">Recommended: <code className="text-xs bg-slate-100 dark:bg-slate-700 p-1 rounded-md">{plan.schemaType}</code></p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeoContentPlannerPage;
