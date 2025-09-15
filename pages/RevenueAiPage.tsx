// src/pages/RevenueAiPage.tsx
// Note: This component is currently not routed but is kept for potential future use.

import React, { useState } from 'react';
import {
  CurrencyDollarIcon, BuildingStorefrontIcon, FunnelIcon, FireIcon, ChartPieIcon, CodeBracketSquareIcon,
  CheckBadgeIcon, CopyIcon, CheckIcon, LightBulbIcon
} from '../components/Icons';

// The master prompt for generating a full business model from an AI.
const PROMPT_TEXT = `You are a top-tier digital product strategist who has helped 50+ developer-focused content platforms generate over $1M/year in recurring revenue — including sites like Frontend Masters, CSS-Tricks, and The Pragmatic Engineer.

I own **DEV Blogs** — a modern, high-quality blog for developers, by developers. We publish deep tutorials on Node.js, AI tools, fintech APIs, dev workflows, and career growth. Our audience is technical, engaged, and hungry for practical value. We have no revenue yet — but we have strong organic traffic potential and a loyal following.

**Goal:** Design a **multi-layered, scalable, high-margin revenue strategy** that generates **$50,000+ per month in passive or semi-passive income within 12 months**, using only our existing content, audience, and minimal team.

Do NOT suggest low-value options like AdSense, affiliate links to cheap hosting, or generic eBooks.
Focus exclusively on **premium, high-LTV, developer-trusted monetization models** that align with our brand: *practical, elegant, future-forward*.

Deliver a complete plan broken into these sections:

### 1. 🎯 Core Revenue Pillars (The 4 High-Earning Engines)
For each pillar, specify:
- **Model**: What exactly is being sold?
- **Price Point**: Per user or per transaction
- **Margin**: Gross profit %
- **Scalability**: Can it grow to 10K+ users without extra work?
- **Why It Works for Devs**: Why will technically skilled users pay?

**Pillar 1: Premium Code Templates & Starter Kits (SaaS-Adjacent)**
- Sell downloadable, production-ready boilerplates:
  - “Fintech API Starter Kit” (Node.js + Stripe + PostgreSQL + Auth0)
  - “AI Agent Template” (LangChain + GPT-4 + Auto-Workflow + Monitoring)
  - “Dev Tool Stack” (VS Code configs, GitHub Actions, Dockerfiles, CLI aliases)
- Price: $29–$99 per kit
- Bundle into a “Developer Vault” subscription ($19/month) with monthly new kits
- Use Gumroad or Paddle for instant delivery + license keys

**Pillar 2: “Build With Me” Live Workshops (High-Ticket Coaching)**
- Host live 90-minute Zoom workshops every 2 weeks:
  - “Build a Payment Gateway from Scratch in 90 Minutes”
  - “Deploy an AI Agent That Reads Your Email and Acts”
- Limit to 50 spots/session → $149/person → $7,450/session
- Record and sell as “On-Demand Masterclasses” ($99 each)
- Upsell private 1:1 code reviews ($299/hr)

**Pillar 3: Developer-Centric SaaS Microtool (The Hidden Goldmine)**
- Build a tiny, beautiful, niche tool that solves one painful dev problem:
  - Example: **“PromptLab.dev”** — a clean UI to test, save, version, and share LLM prompts with team members (like Notion for prompts)
  - Example: **“API Mockgen”** — auto-generate realistic mock APIs from OpenAPI specs with fake data
- Monetize via:
  - Free tier (limited)
  - Pro tier: $12/month (unlimited projects, team access, export)
  - Enterprise: $49/month (SSO, audit logs, custom domains)
- Launch it as a “bonus” for subscribers → use DEV Blogs as the #1 acquisition channel
- Hosting cost: <$50/month on Vercel/Render
- Margin: 95%+

**Pillar 4: Curated “Dev Intelligence” Newsletter (B2B Upsell Engine)**
- Create a premium weekly newsletter: **“The Dev Edge”**
- Content:
  - Exclusive GitHub repo discoveries (not public)
  - Behind-the-scenes of trending AI tools (with usage metrics)
  - Salary benchmarks for remote dev roles (by region + stack)
  - Early access to new templates/tools
- Price: $19/month or $149/year
- Target: Senior devs, tech leads, startup CTOs
- Use ConvertKit or Beehiiv + Stripe
- Add sponsored slots for vetted B2B dev tools (e.g., Supabase, Neon, Vercel) at $2K–$5K/sponsor

### 2. 🔄 Funnel Architecture (How Traffic Becomes Revenue)
Map the entire journey:

**Free Blog Post** → *(Lead Magnet)* → **Email Opt-in** → **Nurture Sequence** → **Product Offer**

- Lead magnet: “Download our free ‘Top 10 Dev Tools 2025’ PDF (with hidden pro tips)”
- Email sequence:
  - Day 1: “Here’s your PDF + bonus CLI script”
  - Day 3: “How 87 devs used this template to ship faster”
  - Day 5: “We just built a tool to automate this… want early access?”
- Every post ends with:
  > “Want the full template + automated setup? Join 3,200+ devs in the Developer Vault → [Link]”

### 3. 🔥 Growth Hacks (Zero Ads, Pure Organic)
- **GitHub Integration**:
  - Put all starter kits in public repos with “Star to unlock premium version”
  - Embed “Used this project?” button → collects emails
- **Twitter/X Thread Bombing**:
  - Turn each tutorial into a viral 10-tweet thread ending with: “I turned this into a $99 toolkit. Link in bio.”
- **Reddit AMA / r/ProgrammerHumor**:
  - “I made $12K last month selling code templates. Here’s how.”
- **Dev.to & Hashnode Cross-Promotion**:
  - Publish condensed versions with “Full version + templates on DEV Blogs”

### 4. 💰 Financial Projection (12-Month Forecast)
| Revenue Stream | Users/Month | Avg. Price | Monthly Revenue |
|----------------|-------------|------------|------------------|
| Developer Vault (Subscription) | 800 | $19 | **$15,200** |
| On-Demand Workshops | 200 sales/month | $99 | **$19,800** |
| Micro-SaaS (PromptLab.dev) | 600 Pro users | $12 | **$7,200** |
| The Dev Edge Newsletter | 1,200 subs | $19 | **$22,800** |
| Sponsorships (2/month) | 2 | $3,000 | **$6,000** |
| **TOTAL** | | | **$71,000/mo** |

*Conservative estimate. Realistic target: $50K–$80K/month by Month 12.*

Costs: <$1,500/month (hosting, tools, email, payment fees) → **Net Profit: ~$69,500/month**

### 5. 🛠️ Tech Stack (Minimal, No-Code Friendly)
- Website: Next.js + Tailwind (already built)
- Payments: **Stripe** (for subscriptions, one-time)
- Delivery: **Gumroad** (for templates) or **SendOwl**
- Email: **Beehiiv** (best for dev audiences)
- SaaS Tool: **Vercel + Supabase** (free tier)
- Analytics: **Plausible.io** (privacy-first, cheap)
- Automation: **Zapier** or **Make.com** (connect forms → emails → Slack)

### 6. ✅ First 30-Day Execution Plan
Week 1:
- Pick 1 starter kit (e.g., “Fintech API Template”) → package into Gumroad
- Write lead magnet PDF (“5 Secrets Most Dev Tutorials Don’t Tell You”)

Week 2:
- Launch “Developer Vault” waitlist (email capture)
- Record first workshop (“Build an AI Agent in 90 Min”)

Week 3:
- Build micro-SaaS MVP (use ChatGPT + Cursor to generate PromptLab.dev in 4 hours)
- Post 3 Twitter threads promoting the template + vault

Week 4:
- Send first “Dev Edge” newsletter to 500 subs
- Pitch 2 dev tools for sponsorship (e.g., Neon, Fauna)

**Target: $5K in revenue by Day 30.**
`;

/**
 * A reusable component for displaying a section of the guide.
 */
const Section: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
  <div className="mb-8">
    <h2 className="flex items-center gap-3 text-2xl font-bold font-display text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-3">
      <Icon className="w-6 h-6 text-sky-500" />
      {title}
    </h2>
    <div className="prose prose-slate dark:prose-invert max-w-none prose-a:text-sky-500 hover:prose-a:text-sky-600">
      {children}
    </div>
  </div>
);

/**
 * A static page presenting a comprehensive monetization strategy for the blog.
 */
const RevenueAiPage: React.FC = () => {
    // State to manage feedback for the copy-to-clipboard button.
    const [isCopied, setIsCopied] = useState(false);

    /**
     * Copies the master prompt text to the user's clipboard.
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
          <CurrencyDollarIcon className="w-10 h-10 text-sky-500 dark:text-sky-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white mb-4">
          Revenue AI Engine
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Your AI-powered playbook to turn DEV Blogs into a $50K/month revenue machine.
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        
        {/* Master Prompt Section with a copy button */}
        <div className="mb-12 bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">The Master Prompt</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Use this prompt with an advanced AI model to generate a fully-engineered business strategy for your developer blog.
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
                        “Turn DEV Blogs Into a $50K/Month Revenue Machine — High-Earning, Low-Overhead Strategy”
                    </code>
                </pre>
            </div>
        </div>
        
        {/* The page then breaks down the prompt into well-structured, readable sections */}
        <Section icon={BuildingStorefrontIcon} title="1. Core Revenue Pillars">
          <p>Focus exclusively on premium, high-LTV models that developers trust and value.</p>
          <h4>Pillar 1: Premium Code Templates & Starter Kits</h4>
          <ul>
            <li>Sell production-ready boilerplates for common dev tasks (e.g., "Fintech API Starter Kit").</li>
            <li><strong>Price:</strong> $29–$99 per kit, or a $19/month "Developer Vault" subscription.</li>
          </ul>
           <h4>Pillar 2: "Build With Me" Live Workshops</h4>
          <ul>
            <li>Host high-value, limited-seat workshops on specific, in-demand topics.</li>
            <li><strong>Price:</strong> $149/person per session. Record and sell as on-demand masterclasses for $99.</li>
          </ul>
           <h4>Pillar 3: Developer-Centric SaaS Microtool</h4>
          <ul>
            <li>Build a niche tool that solves one painful dev problem (e.g., a prompt versioning tool).</li>
            <li><strong>Price:</strong> Freemium model with a $12/month Pro tier.</li>
          </ul>
           <h4>Pillar 4: Curated “Dev Intelligence” Newsletter</h4>
          <ul>
            <li>Offer a premium weekly newsletter with exclusive insights and data.</li>
            <li><strong>Price:</strong> $19/month subscription + B2B sponsorship slots for $2K–$5K.</li>
          </ul>
        </Section>
        
        <Section icon={FunnelIcon} title="2. Funnel Architecture">
          <p>Map the journey from free content consumer to paying customer.</p>
          <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md"><code>Free Blog Post → Lead Magnet → Email Opt-in → Nurture Sequence → Product Offer</code></pre>
          <ul>
            <li><strong>Lead Magnet:</strong> Offer a high-value PDF or script in exchange for an email.</li>
            <li><strong>Nurture Sequence:</strong> A 3-5 day automated email sequence that builds trust and introduces a premium product.</li>
            <li><strong>Call to Action:</strong> End every post with a compelling CTA to a relevant product.</li>
          </ul>
        </Section>

        <Section icon={FireIcon} title="3. Growth Hacks (Zero Ad Spend)">
            <ul>
                <li><strong>GitHub Integration:</strong> Use public repos as a lead generation tool.</li>
                <li><strong>Twitter/X Thread Bombing:</strong> Repurpose tutorials into viral threads that drive traffic and sales.</li>
                <li><strong>Community Engagement:</strong> Share your journey and results on Reddit, Indie Hackers, etc., to build authority.</li>
                <li><strong>Cross-Promotion:</strong> Publish condensed versions on Dev.to and Hashnode with canonical links back to your main site.</li>
            </ul>
        </Section>

        <Section icon={ChartPieIcon} title="4. Financial Projection (12-Month Forecast)">
            <p>A conservative estimate targeting <strong>$50K–$80K/month</strong> by Month 12.</p>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Revenue Stream</th>
                            <th className="p-2">Users/Month</th>
                            <th className="p-2">Avg. Price</th>
                            <th className="p-2">Monthly Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="p-2 border-t border-slate-200 dark:border-slate-700">Developer Vault</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">800</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">$19</td><td className="p-2 border-t border-slate-200 dark:border-slate-700 font-bold">$15,200</td></tr>
                        <tr><td className="p-2 border-t border-slate-200 dark:border-slate-700">On-Demand Workshops</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">200</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">$99</td><td className="p-2 border-t border-slate-200 dark:border-slate-700 font-bold">$19,800</td></tr>
                        <tr><td className="p-2 border-t border-slate-200 dark:border-slate-700">Micro-SaaS</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">600</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">$12</td><td className="p-2 border-t border-slate-200 dark:border-slate-700 font-bold">$7,200</td></tr>
                        <tr><td className="p-2 border-t border-slate-200 dark:border-slate-700">Newsletter Subs</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">1,200</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">$19</td><td className="p-2 border-t border-slate-200 dark:border-slate-700 font-bold">$22,800</td></tr>
                         <tr><td className="p-2 border-t border-slate-200 dark:border-slate-700">Sponsorships</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">2</td><td className="p-2 border-t border-slate-200 dark:border-slate-700">$3,000</td><td className="p-2 border-t border-slate-200 dark:border-slate-700 font-bold">$6,000</td></tr>
                        <tr className="bg-slate-50 dark:bg-slate-800/30"><td className="p-2 border-t border-slate-300 dark:border-slate-600 font-bold">TOTAL</td><td className="p-2 border-t border-slate-300 dark:border-slate-600"></td><td className="p-2 border-t border-slate-300 dark:border-slate-600"></td><td className="p-2 border-t border-slate-300 dark:border-slate-600 font-bold text-lg text-sky-600 dark:text-sky-400">$71,000/mo</td></tr>
                    </tbody>
                </table>
            </div>
             <p className="text-sm mt-2">Costs: &lt;$1,500/month → <strong>Net Profit: ~$69,500/month</strong></p>
        </Section>

        <Section icon={CodeBracketSquareIcon} title="5. Tech Stack">
            <ul>
                <li><strong>Payments:</strong> Stripe</li>
                <li><strong>Digital Product Delivery:</strong> Gumroad or SendOwl</li>
                <li><strong>Email Marketing:</strong> Beehiiv</li>
                <li><strong>SaaS Hosting:</strong> Vercel + Supabase (starts free)</li>
                <li><strong>Analytics:</strong> Plausible.io (privacy-first)</li>
            </ul>
        </Section>
        
        <Section icon={CheckBadgeIcon} title="6. First 30-Day Execution Plan">
            <p>Goal: <strong>$5,000 in revenue by Day 30.</strong></p>
            <ul>
                <li><strong>Week 1:</strong> Package your first starter kit on Gumroad and create a lead magnet.</li>
                <li><strong>Week 2:</strong> Launch a waitlist for the "Developer Vault" and record your first workshop.</li>
                <li><strong>Week 3:</strong> Build the MVP for your micro-SaaS and promote heavily on Twitter/X.</li>
                <li><strong>Week 4:</strong> Send your first premium newsletter and pitch your first sponsors.</li>
            </ul>
        </Section>

        {/* Pro Tip Callout */}
        <div className="mt-12 bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-400 p-6 rounded-r-lg">
            <h3 className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-200 mb-2">
                <LightBulbIcon className="w-6 h-6" />
                Next Step
            </h3>
            <p className="text-sky-700 dark:text-sky-300">
                Paste the master prompt into **Claude 3 Opus** or **GPT-4o** to receive a fully written sales page, email sequences, a micro-SaaS feature spec, and a 30-day launch calendar. You’ll have a complete launch kit ready to deploy.
            </p>
        </div>

      </div>
    </div>
  );
};

export default RevenueAiPage;
