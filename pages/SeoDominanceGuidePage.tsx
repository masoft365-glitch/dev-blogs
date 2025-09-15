// src/pages/SeoDominanceGuidePage.tsx
// Note: This component is currently not routed but is kept for potential future use.

import React, { useState } from 'react';
import {
  RocketLaunchIcon, MagnifyingGlassIcon, PencilSquareIcon, WrenchScrewdriverIcon, GlobeAltIcon,
  CpuChipIcon, PresentationChartLineIcon, ClipboardDocumentCheckIcon, LightBulbIcon, CopyIcon, CheckIcon
} from '../components/Icons';

// The master prompt that forms the core of the SEO strategy. This can be used with an AI model.
const PROMPT_TEXT = `You are a world-class SEO strategist and technical content architect with 15+ years of experience scaling developer-focused blogs to #1 rankings on Google for competitive keywords like “Node.js tutorials,” “AI for developers,” “fintech APIs,” and “best dev tools 2025.”

I run **DEV Blogs** — a modern, high-quality blog for developers, by developers. Content includes code tutorials, fintech deep dives, AI workflows, dev tool reviews, and career guides. The writing is clean, practical, and beginner-friendly. We already have strong content — but we’re not ranking.

**Goal:** Make DEV Blogs the #1 result on Google for at least 15 high-intent, low-competition developer keywords within 6 months — and dominate the first page for 50+ core terms.

Provide a complete, executable, no-fluff SEO dominance plan broken into these sections:

### 1. 🔍 Keyword Strategy (The Foundation)
- Identify 15 “low-hanging fruit” long-tail keywords with:
  - Search volume > 500/mo
  - KD (Keyword Difficulty) < 40
  - High commercial or informational intent
  - Low competition from big sites (e.g., freeCodeCamp, Medium, Dev.to)
- Include 5 “money keywords” we must own (e.g., “how to build a payment API with Node.js,” “best AI tools for developers 2025”)
- Suggest semantic clusters and topic silos for internal linking

### 2. 📝 Content Optimization (Turn Good Into Unbeatable)
- For each target keyword, rewrite our existing posts (or create new ones) using this structure:
  - Hook: Start with a pain point only devs feel
  - Structure: H2/H3s that mirror Google’s “People Also Ask”
  - Code blocks: Use real, copy-paste-ready snippets with syntax highlighting
  - Visuals: Embed animated Loom videos or interactive CodeSandbox links
  - FAQ schema: Add 3–5 structured Q&A blocks for rich snippets
  - Depth: Minimum 2,500 words — but every paragraph adds value
  - Authority signals: Link to GitHub repos, official docs, Stack Overflow threads
- Add “Updated: [Month Year]” badges on all posts

### 3. ⚡ Technical SEO (Fix What’s Broken)
- Audit our site (assume it’s built on Next.js/React):
  - Fix Core Web Vitals (LCP, FID, CLS) — optimize images, lazy-load, preload critical fonts
  - Ensure perfect mobile responsiveness + dark mode compatibility
  - Generate & submit XML sitemap + robots.txt
  - Implement canonical tags + fix duplicate content
  - Enable Brotli compression + HTTP/3
  - Add JSON-LD Schema.org markup for Article, SoftwareApplication, HowTo

### 4. 🌐 Link Building (Earn Authority, Not Buy It)
- Outreach strategy to get backlinks from:
  - Developer communities (GitHub repos, Hacker News threads, Reddit r/programming)
  - Indie Hackers, Product Hunt, Hashnode, Dev.to (comment + share + cross-link)
  - University CS departments (offer free tutorial PDFs for students)
  - Podcasts and YouTube channels focused on dev education
- Create 3 “link-worthy assets”:
  - Free open-source CLI tool (e.g., “dev-blogs-cli” — generates blog templates)
  - Interactive “Dev Tool Comparison Matrix” (HTML table, embeddable)
  - “State of Developer Tools 2025” report (PDF download gated by email)

### 5. 🤖 AI + Automation (Scale Without Burnout)
- Use AI to:
  - Auto-generate meta descriptions from article content
  - Summarize top 10 ranking pages per keyword → improve depth
  - Monitor rankings daily via SERP API (e.g., SerpAPI, Ahrefs)
  - Auto-schedule social shares (Twitter/X, LinkedIn, Mastodon)
- Build an RSS-to-Twitter bot that auto-posts new articles with custom hooks

### 6. 📈 Tracking & Scaling
- Set up:
  - Google Search Console + Analytics 4 (with custom events for code block clicks, downloads, video plays)
  - UTM-tagged newsletters to track referral traffic
  - Weekly ranking dashboard (Google Data Studio or Metabase)
- KPI targets:
  - Month 1–2: 5 posts in top 10
  - Month 3–4: 3 posts in top 3
  - Month 5–6: 1 post #1 overall + 15+ total top 3 rankings

### ✅ Final Deliverable:
A 12-week execution roadmap with:
- Weekly tasks (what to do, when, who)
- Priority ranking (High/Medium/Low)
- Estimated time investment per task
- Tools needed (free or paid)
- Expected traffic lift per milestone

Do NOT give generic advice like “post regularly” or “use keywords.”
Give me a battle-tested, developer-specific, Google-proof plan — as if you’re consulting a founder who wants to beat freeCodeCamp and Dev.to.

Assume I have full control of the site, hosting, and content.
I’m technical. I can implement anything you suggest.

**Now — make DEV Blogs the #1 developer blog on Google.**`;

/**
 * A reusable component for displaying a section of the guide with an icon and title.
 */
const Section: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <div className="mb-8">
    <h2 className="flex items-center gap-3 text-2xl font-bold font-display text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-3">
      <Icon className="w-6 h-6 text-sky-500" />
      {title}
    </h2>
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {children}
    </div>
  </div>
);

/**
 * A static page that presents a comprehensive SEO strategy for the blog.
 */
const SeoDominanceGuidePage: React.FC = () => {
    // State to manage the feedback for the copy button.
    const [isCopied, setIsCopied] = useState(false);

    /**
     * Copies the master prompt to the clipboard and shows feedback.
     */
    const handleCopy = () => {
        navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2500); // Reset feedback after 2.5 seconds
        });
    };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <section className="text-center mb-10">
        <div className="inline-block p-4 bg-sky-100 dark:bg-sky-900/50 rounded-full mb-4">
          <RocketLaunchIcon className="w-10 h-10 text-sky-500 dark:text-sky-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white mb-4">
          SEO Dominance Guide
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Your complete, executable playbook to make DEV Blogs the #1 developer resource on Google.
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        
        {/* Master Prompt Section with Copy Functionality */}
        <div className="mb-12 bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">The Master Prompt</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Use this high-performance prompt with your favorite AI model (GPT-4o, Claude 3, etc.) to generate a customized, data-backed SEO playbook.
            </p>
            <div className="relative bg-slate-900 p-4 rounded-md">
                <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-colors"
                    aria-label="Copy prompt"
                >
                   {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                   {isCopied ? 'Copied!' : 'Copy'}
                </button>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    <code>
                        “Make My Developer Blog #1 on Google — Full SEO Dominance Guide”
                    </code>
                </pre>
            </div>
        </div>
        
        {/* The rest of the page breaks down the prompt into readable sections. */}
        <Section icon={MagnifyingGlassIcon} title="1. Keyword Strategy (The Foundation)">
          <ul>
            <li>Identify 15 “low-hanging fruit” long-tail keywords (Volume > 500/mo, KD &lt; 40).</li>
            <li>Focus on high commercial or informational intent, avoiding topics dominated by major publications.</li>
            <li>Define 5 core “money keywords” to own (e.g., "how to build a payment API with Node.js").</li>
            <li>Structure content into semantic clusters and topic silos to build authority and simplify internal linking.</li>
          </ul>
        </Section>
        
        <Section icon={PencilSquareIcon} title="2. Content Optimization (Turn Good Into Unbeatable)">
            <ul>
                <li>Hook readers with a developer-specific pain point in the introduction.</li>
                <li>Structure articles with H2/H3s that mirror Google’s “People Also Ask” section.</li>
                <li>Provide real, copy-paste-ready code snippets with syntax highlighting.</li>
                <li>Enhance engagement with visuals like animated Loom videos or interactive CodeSandbox embeds.</li>
                <li>Implement FAQ schema with 3-5 structured Q&As to capture rich snippets.</li>
                <li>Aim for a minimum of 2,500 words of high-value content, ensuring every paragraph is purposeful.</li>
                <li>Boost authority by linking to external resources like GitHub repos and official documentation.</li>
                <li>Add an “Updated: [Month Year]” badge to all posts to signal freshness.</li>
            </ul>
        </Section>

        <Section icon={WrenchScrewdriverIcon} title="3. Technical SEO (Fix What’s Broken)">
            <ul>
                <li>Audit and optimize Core Web Vitals (LCP, FID, CLS).</li>
                <li>Ensure a flawless, responsive experience on mobile, including dark mode compatibility.</li>
                <li>Generate and submit a clean XML sitemap and `robots.txt` to Google Search Console.</li>
                <li>Use canonical tags to prevent duplicate content issues.</li>
                <li>Improve performance by enabling Brotli compression and HTTP/3.</li>
                <li>Implement comprehensive JSON-LD Schema.org markup (Article, SoftwareApplication, HowTo).</li>
            </ul>
        </Section>

        <Section icon={GlobeAltIcon} title="4. Link Building (Earn Authority, Not Buy It)">
           <ul>
                <li>Engage in developer communities (GitHub, Hacker News, Reddit) to share content naturally.</li>
                <li>Cross-post on platforms like Hashnode and Dev.to with canonical links back to your blog.</li>
                <li>Create and offer valuable resources (e.g., free tutorial PDFs) to university CS departments.</li>
                <li>Collaborate with podcasts and YouTube channels for guest appearances and mentions.</li>
                <li>Develop "link-worthy assets" like a free CLI tool, an interactive comparison matrix, or an annual industry report.</li>
           </ul>
        </Section>
        
        <Section icon={CpuChipIcon} title="5. AI + Automation (Scale Without Burnout)">
            <ul>
                <li>Use AI to auto-generate draft meta descriptions and summarize competitor content.</li>
                <li>Set up automated rank monitoring with a SERP API.</li>
                <li>Automate social media sharing for new and updated posts.</li>
                <li>Build an RSS-to-Twitter bot to instantly promote new articles with custom hooks.</li>
            </ul>
        </Section>
        
        <Section icon={PresentationChartLineIcon} title="6. Tracking & Scaling">
            <ul>
                <li>Configure Google Search Console and Analytics 4 with custom event tracking for key actions.</li>
                <li>Use UTM-tagged links in newsletters to measure referral traffic accurately.</li>
                <li>Create a weekly ranking dashboard to monitor progress against KPI targets.</li>
                <li>Set clear, ambitious KPI targets for ranking improvements over a 6-month period.</li>
            </ul>
        </Section>

        {/* Pro Tip Callout */}
        <div className="mt-12 bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-400 p-6 rounded-r-lg">
            <h3 className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-200 mb-2">
                <LightBulbIcon className="w-6 h-6" />
                Pro Tip
            </h3>
            <p className="text-sky-700 dark:text-sky-300">
                Paste the master prompt into **ChatGPT-4o**, **Claude 3 Opus**, or **Perplexity.ai (with web search)** to generate a highly customized, week-by-week SEO playbook. You’ll get exact keywords, competitor breakdowns, schema examples, outreach templates, and more. This is Google domination engineered for builders.
            </p>
        </div>

      </div>
    </div>
  );
};

export default SeoDominanceGuidePage;
