export const SEED_CATEGORIES = [
  {
    name: 'Getting Started',
    description: 'Everything you need to launch your first quiz and start generating leads.',
    icon: 'Rocket',
    color: '#6366f1',
    order: 1,
  },
  {
    name: 'Building Quizzes',
    description: 'Create, customize, and optimize powerful quiz flows.',
    icon: 'PenTool',
    color: '#8b5cf6',
    order: 2,
  },
  {
    name: 'Product Recommendations',
    description: 'Configure smart recommendation logic to match shoppers with the right products.',
    icon: 'ShoppingBag',
    color: '#ec4899',
    order: 3,
  },
  {
    name: 'Lead Generation',
    description: 'Capture, manage, and segment leads from your quizzes.',
    icon: 'Users',
    color: '#f59e0b',
    order: 4,
  },
  {
    name: 'Integrations',
    description: 'Connect your quiz to Shopify, Klaviyo, Mailchimp, and more.',
    icon: 'Plug',
    color: '#10b981',
    order: 5,
  },
  {
    name: 'Analytics & Reporting',
    description: 'Track quiz performance, conversions, and revenue attribution.',
    icon: 'BarChart2',
    color: '#3b82f6',
    order: 6,
  },
  {
    name: 'Embedding & Publishing',
    description: 'Add your quiz to any website, landing page, or email campaign.',
    icon: 'Globe',
    color: '#06b6d4',
    order: 7,
  },
  {
    name: 'Account & Billing',
    description: 'Manage your plan, team members, and billing details.',
    icon: 'CreditCard',
    color: '#64748b',
    order: 8,
  },
];

export const SEED_ARTICLES = [
  // ─── Getting Started ────────────────────────────────────────────
  {
    categoryKey: 'getting-started',
    title: 'Welcome to QuizCommerce — A Quick Overview',
    excerpt: 'Get a high-level tour of the platform and understand how quizzes drive product discovery and lead capture.',
    readTime: 3,
    tags: ['overview', 'intro', 'onboarding'],
    content: `# Welcome to QuizCommerce

QuizCommerce is a quiz-based lead generation and product recommendation platform built for eCommerce brands. With it you can:

- **Capture qualified leads** through interactive quizzes
- **Recommend the right products** based on shopper answers
- **Sync contacts** to your ESP or CRM automatically
- **Measure revenue** attributed to quiz interactions

## How it works

1. You build a quiz using our drag-and-drop editor
2. Embed it on your Shopify store, landing page, or pop-up
3. Shoppers answer questions — your logic engine maps answers to products
4. The shopper sees personalized recommendations and you capture their email
5. Analytics show you conversion rates, AOV lift, and revenue per quiz

## Next steps

- [Create your first quiz](/help/building-quizzes/create-your-first-quiz)
- [Connect Shopify](/help/integrations/shopify-integration)
- [Set up Klaviyo sync](/help/integrations/klaviyo-integration)
`,
  },
  {
    categoryKey: 'getting-started',
    title: 'Create Your Account and Set Up Your Brand',
    excerpt: 'Sign up, set your brand colors, upload a logo, and configure your default quiz theme.',
    readTime: 4,
    tags: ['account', 'setup', 'branding', 'onboarding'],
    content: `# Create Your Account and Set Up Your Brand

## Signing up

1. Go to **app.quizcommerce.io/signup**
2. Enter your email and choose a password
3. Verify your email address

## Connecting your store

After sign-up you will be prompted to connect your eCommerce store:

- **Shopify** — Click "Connect Shopify", enter your myshopify.com domain, and authorize the app
- **WooCommerce** — Copy the API key and paste it in Settings > Integrations
- **Other platforms** — Use the REST API or manual product import (CSV)

## Brand settings

Navigate to **Settings > Brand**:

| Setting | Description |
|---|---|
| Logo | Uploaded as SVG or PNG (max 2MB) |
| Primary color | Used for buttons and progress bars |
| Font | Choose from 12 Google Fonts |
| Quiz background | Solid color, gradient, or image |

> **Tip:** Your brand settings apply globally. You can override them per quiz under Quiz Settings > Appearance.
`,
  },
  {
    categoryKey: 'getting-started',
    title: 'Quick-Start Checklist',
    excerpt: 'A 5-step checklist to get your first quiz live and capturing leads within 30 minutes.',
    readTime: 2,
    tags: ['checklist', 'onboarding', 'quick-start'],
    content: `# Quick-Start Checklist

Follow these 5 steps to go from sign-up to live quiz in under 30 minutes.

## Step 1 — Connect your store

Link Shopify or WooCommerce so products automatically sync.

## Step 2 — Import your products

Go to **Products > Sync Now**. Products pull in with titles, images, prices, and tags.

## Step 3 — Build your first quiz

Use a template (Skin Type Finder, Hair Quiz, Coffee Recommender) or start from scratch.

## Step 4 — Configure recommendations

In the **Results** section map each answer combination to specific products or collections.

## Step 5 — Publish and embed

Copy the embed snippet and paste it into your theme, or use the Shopify App Block.

---

Once live, check the **Analytics** dashboard after 24 hours to see your first data points.
`,
  },

  // ─── Building Quizzes ────────────────────────────────────────────
  {
    categoryKey: 'building-quizzes',
    title: 'Create Your First Quiz',
    excerpt: 'Step-by-step guide to building a quiz from scratch using the visual editor.',
    readTime: 6,
    tags: ['quiz', 'editor', 'create', 'getting-started'],
    content: `# Create Your First Quiz

## Starting a new quiz

1. Click **New Quiz** in the top navigation
2. Choose a template or **Blank Quiz**
3. Name your quiz (internal use only)

## Adding questions

Each question has a **type**:

| Type | Best for |
|---|---|
| Single Choice | One answer per question (most common) |
| Multiple Choice | Allow shoppers to pick several answers |
| Image Choice | Visual answer tiles |
| Slider | Range questions (e.g., budget) |
| Email Capture | Collect email mid-quiz or at the end |
| Text Input | Free-text answers |

### Adding a question

1. Click **+ Add Question**
2. Select question type
3. Type your question text
4. Add answer options (drag to reorder)
5. Optionally add images to each answer

## Question logic (branching)

You can send shoppers to different questions based on their answers:

1. Select an answer option
2. Click **Logic** in the answer settings panel
3. Set **Go to question** and choose a target question or Results page

## Saving and previewing

Click **Save** at any time. Use **Preview** to test the full quiz experience in a modal.

> The preview uses your live product catalog, so recommendations will be real.
`,
  },
  {
    categoryKey: 'building-quizzes',
    title: 'Question Types Explained',
    excerpt: 'Deep dive into every question type available and when to use each one.',
    readTime: 5,
    tags: ['question-types', 'editor', 'quiz-design'],
    content: `# Question Types Explained

## Single Choice

The most common question type. Shoppers pick exactly one answer. Use for mutually exclusive attributes like skin type, hair texture, or product category.

## Multiple Choice

Shoppers can select multiple answers. Useful for concerns ("What are your skin concerns?") or goals ("What are you looking for?").

**Scoring tip:** When using multiple-choice, your recommendation logic uses the union of all selected answers.

## Image Choice

Same as single or multiple choice, but each answer tile shows an image. Ideal for visual categories (aesthetics, color palettes, lifestyles).

Upload images up to **1MB each** in JPG or PNG. We auto-optimize them for mobile.

## Slider

A range input. Example: "What is your monthly skincare budget?" from $10 to $200. Map slider ranges to product tiers in your recommendation logic.

## Email Capture

Renders a form field for the shopper's email (and optionally name, phone). Place it:

- **Before results** — higher conversion, but some drop-off
- **After results** — lower conversion, but higher intent

The email is automatically synced to your connected ESP.

## Text Input

Free-form text. Useful for personalization ("What is your name?") or open feedback. Text inputs are stored but cannot be used in recommendation logic directly.

## Rating Scale

Star or numeric rating (1-5 or 1-10). Use for preference intensity questions.
`,
  },
  {
    categoryKey: 'building-quizzes',
    title: 'Using Conditional Logic and Branching',
    excerpt: 'Create personalized quiz paths that adapt based on what shoppers answer.',
    readTime: 7,
    tags: ['logic', 'branching', 'conditional', 'quiz-flow'],
    content: `# Using Conditional Logic and Branching

Branching lets you show different questions to different shoppers, creating a personalized experience.

## Basic branching

1. Open the quiz editor and select a question
2. Click on an answer option
3. In the right panel, find **Answer Logic**
4. Set **Jump to** and select a specific question

By default all answers proceed to the next sequential question.

## Skip logic

To skip one or more questions:

1. Set the jump target to a question further down the flow
2. All skipped questions will not be shown to that shopper
3. Skipped questions are excluded from recommendation scoring

## Multi-condition rules

For more complex paths go to **Quiz Settings > Advanced Logic** and configure rules like:

    IF [Q1 = "Oily"] AND [Q2 = "Acne-prone"]
      THEN jump to [Q5 - Targeted Treatment]
    ELSE
      THEN jump to [Q4 - General Routine]

## Default path

Always configure a **default** path for every branch. If no condition matches, the quiz falls back to the default path.

## Testing your logic

Use **Preview > Test Mode** to walk through every path and verify the correct questions appear.
`,
  },
  {
    categoryKey: 'building-quizzes',
    title: 'Customizing Quiz Appearance',
    excerpt: 'Adjust fonts, colors, button styles, layouts, and animations to match your brand.',
    readTime: 4,
    tags: ['design', 'branding', 'appearance', 'customization'],
    content: `# Customizing Quiz Appearance

## Accessing appearance settings

Open your quiz and click **Design** in the top navigation bar.

## Layout options

| Layout | Description |
|---|---|
| Classic | Question above answers in a vertical stack |
| Cards | Full-screen one-question-at-a-time cards |
| Sidebar | Progress bar on the left, question on the right |
| Minimal | Clean, text-only layout |

## Colors and typography

- **Primary color** — buttons, progress bars, selected states
- **Background** — solid color, gradient, or background image
- **Text color** — question text and answer labels
- **Font** — select from Google Fonts or upload a custom font (Pro plan)

## Button styles

Choose from: Rounded, Pill, Square. You can also set hover color and border radius manually in **Advanced CSS**.

## Progress bar

Toggle on/off. Formats: percentage, step counter ("Question 2 of 6"), or hidden.

## Custom CSS

Under **Design > Advanced > Custom CSS** you can inject CSS that overrides any style. Example:

    .qc-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 999px;
    }
`,
  },

  // ─── Product Recommendations ──────────────────────────────────────
  {
    categoryKey: 'product-recommendations',
    title: 'How the Recommendation Engine Works',
    excerpt: 'Understand the scoring and matching logic that maps quiz answers to products.',
    readTime: 5,
    tags: ['recommendations', 'logic', 'scoring', 'products'],
    content: `# How the Recommendation Engine Works

## Overview

When a shopper completes your quiz, the recommendation engine:

1. Collects all selected answers
2. Looks up the tag/attribute weights you configured
3. Scores every product in your catalog against those weights
4. Returns the top N products sorted by score

## Scoring model

Each answer option can be linked to one or more **product tags** with a weight (1-10):

    Answer: "Oily skin"  →  tag:oily-skin (weight 8), tag:mattifying (weight 6)
    Answer: "Sensitive"  →  tag:sensitive (weight 9), tag:fragrance-free (weight 7)

A product's score = sum of weights for all matching tags.

## Recommendation modes

| Mode | Behavior |
|---|---|
| **Weighted Score** | Default. Products ranked by total weighted score |
| **Exact Match** | Only products matching ALL required tags appear |
| **Collection Map** | Each answer combination maps to a specific Shopify collection |
| **Manual Override** | You pin specific products for specific answer combinations |

## Minimum score threshold

Set a **minimum score** in Results Settings so that low-relevance products never appear. Recommended: 50% of maximum possible score.

## Number of results

Configure how many products to show on the results page (1-12). Most brands show 3-4.
`,
  },
  {
    categoryKey: 'product-recommendations',
    title: 'Mapping Answers to Products and Collections',
    excerpt: 'Learn how to tag products and connect answer options to your Shopify catalog.',
    readTime: 6,
    tags: ['mapping', 'shopify', 'products', 'tags', 'collections'],
    content: `# Mapping Answers to Products and Collections

## Method 1: Tag-based mapping (recommended)

1. In Shopify, tag your products with relevant attributes (e.g., **skin-type:oily**, **concern:acne**)
2. In QuizCommerce, go to **Quiz > Answers > [Answer] > Add Product Tags**
3. Select the tags that match this answer
4. Set the relevance weight (1-10)

Products are then dynamically matched — no manual re-linking needed when you add new products.

## Method 2: Collection mapping

Ideal when your Shopify store already uses collections for segmentation:

1. Go to **Results > Collection Map**
2. For each combination of answers, select the Shopify collection to display
3. Use the matrix view for complex combinations

## Method 3: Manual product pinning

Force specific products to always appear for a certain answer path:

1. Go to a question's answer option
2. Click **Pin Products**
3. Search and select up to 12 products

Pinned products always appear regardless of score.

## Fallback products

Configure fallback products that show when the scoring engine cannot find enough matching products. Go to **Results > Fallback Products**.
`,
  },
  {
    categoryKey: 'product-recommendations',
    title: 'Designing the Results Page',
    excerpt: 'Customize how recommended products are displayed, including CTAs, upsells, and social proof.',
    readTime: 5,
    tags: ['results', 'design', 'CTA', 'upsell'],
    content: `# Designing the Results Page

## Results page layout

Choose from:

- **Grid** (2 or 3 columns)
- **List** (one product per row with details)
- **Hero + Grid** (featured product + supporting products)
- **Single Product Focus** (one hero recommendation)

## Product card elements

Toggle each element on/off:

- Product image
- Product title
- Price (and compare-at price)
- Star ratings (pulled from Shopify)
- Short description
- Add to Cart button
- "Why this was recommended" explanation text

## Personalization message

Add a headline like "We found your perfect match, {{first_name}}!" using merge tags:

| Tag | Value |
|---|---|
| **{{first_name}}** | Name captured in quiz |
| **{{top_concern}}** | Most-weighted answer |
| **{{product_count}}** | Number of results shown |

## Upsell section

Enable **Results > Upsell** to show a secondary row of complementary products (e.g., "Complete the routine").

## Social sharing

Enable share buttons (copy link, Instagram, Pinterest) so shoppers can share their recommendations.
`,
  },

  // ─── Lead Generation ─────────────────────────────────────────────
  {
    categoryKey: 'lead-generation',
    title: 'Setting Up Email Capture',
    excerpt: 'Add an email capture step to your quiz and configure opt-in language, GDPR consent, and double opt-in.',
    readTime: 5,
    tags: ['email', 'lead-capture', 'opt-in', 'GDPR'],
    content: `# Setting Up Email Capture

## Adding an email capture question

1. In the quiz editor, click **+ Add Question**
2. Select **Email Capture**
3. Add your headline (e.g., "Where should we send your results?")
4. Optionally add a subtext line and an incentive (e.g., "Get 10% off your first order")

## Field options

- **Email** (always required)
- **First name** (optional)
- **Last name** (optional)
- **Phone** (optional, for SMS)

## Placement

| Placement | Conversion rate | Lead quality |
|---|---|---|
| Before results (gate) | Higher | Lower intent |
| After results | Lower | Higher intent |
| Skip option available | Moderate | Mixed |

We recommend **after results with a skip option** for new quizzes. Test both with A/B testing.

## Consent and GDPR

Under **Email Capture > Consent Settings**:

- Add a checkbox with your privacy policy link
- Enable **Double Opt-in** to send a confirmation email (required in some jurisdictions)
- Set the consent label text

> All consent records are stored and exportable for compliance audits.
`,
  },
  {
    categoryKey: 'lead-generation',
    title: 'Viewing and Exporting Leads',
    excerpt: 'Access your lead list, filter by quiz or date, and export to CSV.',
    readTime: 3,
    tags: ['leads', 'export', 'CSV', 'contacts'],
    content: `# Viewing and Exporting Leads

## Leads dashboard

Navigate to **Leads** in the left sidebar. You will see:

- Email address
- Name (if captured)
- Quiz name
- Date captured
- Products recommended
- Opt-in status

## Filtering

Filter by:

- Date range
- Quiz name
- Opt-in status (opted in / skipped / double-opt-in pending)
- Tag (custom tags you apply)

## Exporting

1. Apply any filters you want
2. Click **Export > CSV**
3. Choose fields to include
4. The CSV will download or email to you (for large exports over 10,000 rows)

## CSV format example

    email, first_name, quiz_name, captured_at, opted_in, recommended_products
    jane@example.com, Jane, Skin Quiz, 2024-01-15, true, "Vitamin C Serum, SPF 50"

## Bulk actions

Select multiple leads to: tag, delete, or push to an integration.
`,
  },
  {
    categoryKey: 'lead-generation',
    title: 'Lead Segmentation and Tags',
    excerpt: 'Automatically tag leads based on their quiz answers for smarter email segmentation.',
    readTime: 4,
    tags: ['segmentation', 'tags', 'leads', 'personalization'],
    content: `# Lead Segmentation and Tags

## Why segment leads?

Sending the same email to all leads wastes potential. Segmenting by quiz answers lets you send:

- "Oily skin" leads → oil-control product emails
- "Anti-aging" leads → retinol and peptide campaigns
- "Budget-conscious" leads → sale and value-focused emails

## Automatic tagging

1. Go to **Quiz > Answer Options > [Answer] > Lead Tags**
2. Add one or more tags (e.g., **skin:oily**, **concern:acne**, **budget:low**)
3. These tags are applied to every lead who selects that answer

Tags sync to Klaviyo, Mailchimp, and other integrations as **custom properties** or **list tags**.

## Manual tagging

From the Leads list, select one or more contacts and click **Tag > Add Tag**.

## Using tags in integrations

In Klaviyo: tags appear as profile properties you can use in **Segments** and **Flows**.

In Mailchimp: tags sync as audience tags, usable in campaigns and automations.

## Removing tags

Tags can be removed manually from a lead's profile or in bulk via the Leads export/import workflow.
`,
  },

  // ─── Integrations ────────────────────────────────────────────────
  {
    categoryKey: 'integrations',
    title: 'Shopify Integration',
    excerpt: 'Connect QuizCommerce to your Shopify store to sync products and enable Add to Cart on results.',
    readTime: 5,
    tags: ['shopify', 'integration', 'products', 'ecommerce'],
    content: `# Shopify Integration

## Installing the app

1. Go to **Settings > Integrations > Shopify**
2. Click **Connect Shopify**
3. Enter your store's **.myshopify.com** URL
4. You will be redirected to Shopify to authorize access
5. Approve the required permissions (read products, write customers, read orders)

## What syncs automatically

| Data | Direction | Frequency |
|---|---|---|
| Products | Shopify to QuizCommerce | Real-time webhooks |
| Collections | Shopify to QuizCommerce | Real-time webhooks |
| Customers | QuizCommerce to Shopify | On lead capture |
| Orders | Shopify to QuizCommerce | For attribution |

## Add to Cart

With Shopify connected, your results page shows a native **Add to Cart** button. When clicked:

- Product is added directly to the shopper's Shopify cart
- Shopper is optionally redirected to checkout

Enable/disable under **Results > Add to Cart Settings**.

## Discount codes

To offer a quiz completion discount:

1. Create a code in Shopify (e.g., QUIZ10)
2. In QuizCommerce > **Results > Discount Code**, paste the code
3. The code auto-applies at checkout or is shown on the results page

## Disconnecting

Go to **Settings > Integrations > Shopify > Disconnect**. This removes all webhooks but does not delete your quiz data.
`,
  },
  {
    categoryKey: 'integrations',
    title: 'Klaviyo Integration',
    excerpt: 'Sync quiz leads and answer data to Klaviyo for powerful post-quiz email automation.',
    readTime: 6,
    tags: ['klaviyo', 'email', 'integration', 'automation', 'segmentation'],
    content: `# Klaviyo Integration

## Connecting Klaviyo

1. In Klaviyo, go to **Account > Settings > API Keys**
2. Create a new Private API Key with **Full Access**
3. In QuizCommerce > **Settings > Integrations > Klaviyo**, paste the API Key
4. Click **Test Connection** to verify

## What gets synced to Klaviyo

When a shopper completes your quiz, a **Klaviyo Profile** is created or updated with their email. Quiz answers are stored as **custom properties**:

    {
      "quiz_name": "Skin Quiz",
      "quiz_completed_at": "2024-01-15T10:30:00Z",
      "skin_type": "Oily",
      "top_concerns": ["Acne", "Large pores"],
      "recommended_products": ["Vitamin C Serum", "Oil-free SPF"],
      "quiz_score": 87
    }

A Klaviyo Event called **Quiz Completed** is also fired, which you can use as a Flow trigger.

## Setting up a post-quiz Flow

1. In Klaviyo, go to **Flows > Create Flow > Build from scratch**
2. Set trigger: **Metric > Quiz Completed**
3. Add a time delay (e.g., 1 hour)
4. Send a personalized email using the custom properties in your template

## List assignment

In **Settings > Integrations > Klaviyo > List Assignment**, choose which Klaviyo list opted-in leads are added to.
`,
  },
  {
    categoryKey: 'integrations',
    title: 'Mailchimp Integration',
    excerpt: 'Add quiz leads to Mailchimp audiences and sync answer data as merge fields.',
    readTime: 4,
    tags: ['mailchimp', 'email', 'integration', 'audience'],
    content: `# Mailchimp Integration

## Connecting Mailchimp

1. Go to **Settings > Integrations > Mailchimp**
2. Click **Connect with Mailchimp** and log in with your Mailchimp account
3. Authorize QuizCommerce to access your audiences

## Audience mapping

After connecting, select which Mailchimp audience (list) quiz leads should be added to. You can set different audiences per quiz.

## Merge fields

Quiz answers sync as Mailchimp **merge fields**:

| Merge Tag | Example value |
|---|---|
| SKINTYPE | Oily |
| CONCERNS | Acne, Sensitivity |
| QUIZNAME | Skin Quiz |
| RECPROD1 | Vitamin C Serum |

Create the merge fields in Mailchimp first under **Audience > Settings > Audience fields**, then map them in QuizCommerce > **Integrations > Mailchimp > Field Mapping**.

## Tags

Enable **Sync Tags** to push QuizCommerce lead tags as Mailchimp tags on the contact.

## Double opt-in

If your Mailchimp audience requires double opt-in, enable it in Mailchimp audience settings. QuizCommerce will send the confirmation email through Mailchimp automatically.
`,
  },
  {
    categoryKey: 'integrations',
    title: 'Webhooks and Custom Integrations',
    excerpt: 'Use webhooks to push quiz data to any third-party tool, CRM, or custom backend.',
    readTime: 5,
    tags: ['webhooks', 'API', 'custom', 'integration', 'Zapier'],
    content: `# Webhooks and Custom Integrations

## Setting up a webhook

1. Go to **Settings > Integrations > Webhooks**
2. Click **Add Webhook**
3. Enter your endpoint URL (must be HTTPS)
4. Select which events to subscribe to
5. Save and click **Send Test** to verify delivery

## Webhook events

| Event | Trigger |
|---|---|
| quiz.completed | Shopper reaches the results page |
| lead.captured | Email address is submitted |
| lead.opted_in | Double opt-in confirmed |
| product.clicked | Shopper clicks a recommended product |
| cart.added | Shopper adds a product to cart |

## Webhook payload example

    {
      "event": "lead.captured",
      "timestamp": "2024-01-15T10:30:00Z",
      "quiz_id": "q_abc123",
      "quiz_name": "Skin Quiz",
      "lead": {
        "email": "jane@example.com",
        "first_name": "Jane",
        "answers": { "skin_type": "Oily", "concerns": ["Acne"] },
        "recommended_products": ["prod_123", "prod_456"],
        "tags": ["skin:oily", "concern:acne"]
      }
    }

## Zapier integration

We have a native Zapier app. Search for **QuizCommerce** in Zapier and connect your account to trigger Zaps on any quiz event.

## Webhook security

All webhooks include an **X-QuizCommerce-Signature** header (HMAC-SHA256). Verify this in your endpoint to prevent spoofed requests.
`,
  },

  // ─── Analytics ───────────────────────────────────────────────────
  {
    categoryKey: 'analytics-and-reporting',
    title: 'Understanding the Analytics Dashboard',
    excerpt: 'Learn what every metric means and how to use data to optimize your quiz performance.',
    readTime: 6,
    tags: ['analytics', 'dashboard', 'metrics', 'conversion'],
    content: `# Understanding the Analytics Dashboard

## Accessing analytics

Go to **Analytics** in the left sidebar. You can view data for all quizzes or a specific quiz within a date range.

## Key metrics

### Funnel metrics

| Metric | Definition |
|---|---|
| **Views** | Unique visitors who saw the quiz |
| **Starts** | Visitors who answered at least one question |
| **Completions** | Visitors who reached the results page |
| **Start rate** | Starts / Views |
| **Completion rate** | Completions / Starts |
| **Lead capture rate** | Emails captured / Completions |

### Revenue metrics

| Metric | Definition |
|---|---|
| **Revenue attributed** | Orders placed by leads within 30 days |
| **Revenue per completion** | Total attributed revenue / Completions |
| **AOV lift** | Average order value from quiz leads vs. non-quiz visitors |
| **Conversion rate** | Orders / Completions |

## Drop-off analysis

The **Funnel View** shows where shoppers abandon the quiz. High drop-off on a specific question signals:

- The question is confusing
- There are too many answer options
- The question feels too personal or intrusive

## Answer distribution

See how often each answer option is selected. Use this to understand your audience and prioritize product inventory.
`,
  },
  {
    categoryKey: 'analytics-and-reporting',
    title: 'Product Performance Reports',
    excerpt: 'See which products are recommended most, clicked most, and converting best from quiz results.',
    readTime: 4,
    tags: ['products', 'analytics', 'conversion', 'reporting'],
    content: `# Product Performance Reports

## Accessing product reports

**Analytics > Products** shows how products perform within your quiz results.

## Metrics per product

| Metric | Definition |
|---|---|
| **Shown** | Times this product appeared on a results page |
| **Clicks** | Times shoppers clicked the product |
| **CTR** | Clicks / Shown |
| **Add to cart** | Times added to cart from results |
| **Purchases** | Orders containing this product from quiz leads |
| **Revenue** | Total revenue from quiz-attributed purchases |

## Recommendation rate

See what percentage of quiz completions result in this product being recommended. High recommendation rate + low CTR means the product photo or title needs improvement.

## Filtering

Filter by date range, quiz name, or product collection.

## Exporting

Click **Export** to download product performance data as CSV for use in spreadsheets.
`,
  },

  // ─── Embedding & Publishing ───────────────────────────────────────
  {
    categoryKey: 'embedding-and-publishing',
    title: 'Embed Your Quiz on Any Website',
    excerpt: 'Copy the embed code and add your quiz as an inline block or full-page experience.',
    readTime: 4,
    tags: ['embed', 'publish', 'HTML', 'website'],
    content: `# Embed Your Quiz on Any Website

## Getting the embed code

1. Open your quiz and click **Publish**
2. Select **Embed** from the publish options
3. Choose embed type (see below)
4. Copy the code snippet

## Embed types

### Inline embed

Renders the quiz inside a div on your page. Best for dedicated quiz landing pages.

    <div id="qc-quiz" data-quiz-id="q_abc123"></div>
    <script src="https://cdn.quizcommerce.io/embed.js" async></script>

### Full-page embed

Takes up the entire viewport. Ideal for a standalone quiz page.

    <div id="qc-quiz" data-quiz-id="q_abc123" data-mode="fullpage"></div>
    <script src="https://cdn.quizcommerce.io/embed.js" async></script>

### Popup / modal

Triggered by a button click or time delay.

    <button data-qc-trigger="q_abc123">Take the Quiz</button>
    <script src="https://cdn.quizcommerce.io/embed.js" async></script>

## Shopify App Block

If you are on Shopify, the easiest method is the **App Block**:

1. Go to your Shopify theme editor
2. Add a section > **QuizCommerce Quiz Block**
3. Select your quiz from the dropdown

## WordPress

Install the **QuizCommerce WordPress Plugin**, then use the shortcode:

    [quizcommerce id="q_abc123"]
`,
  },
  {
    categoryKey: 'embedding-and-publishing',
    title: 'Launching a Quiz as a Pop-up',
    excerpt: 'Configure trigger rules, display frequency, and targeting for quiz pop-ups.',
    readTime: 4,
    tags: ['popup', 'trigger', 'display-rules', 'embed'],
    content: `# Launching a Quiz as a Pop-up

## Setting up a pop-up

1. Open your quiz > **Publish > Pop-up**
2. Configure trigger rules (see below)
3. Copy the embed snippet and add to your site or via Google Tag Manager

## Trigger rules

| Trigger | Description |
|---|---|
| **Time on page** | Show after X seconds |
| **Scroll depth** | Show when user scrolls X% down |
| **Exit intent** | Show when mouse moves toward browser chrome |
| **Button click** | Manual trigger via data-qc-trigger attribute |
| **Page URL** | Only show on specific pages (regex supported) |

## Display frequency

Set how often the same visitor sees the pop-up:

- Once per session
- Once per day
- Once per week
- Always (not recommended)

Frequency caps use a first-party cookie.

## Suppression rules

Suppress the pop-up for visitors who have:

- Already completed the quiz
- Already submitted their email
- Come from a specific UTM source

## A/B testing pop-up triggers

Use two embed snippets with different trigger rules (one per quiz variant) to test which trigger drives higher completion rates.
`,
  },

  // ─── Account & Billing ───────────────────────────────────────────
  {
    categoryKey: 'account-and-billing',
    title: 'Plans, Limits, and Pricing',
    excerpt: 'Understand what each plan includes, quiz limits, lead limits, and how to upgrade.',
    readTime: 4,
    tags: ['pricing', 'plans', 'billing', 'limits'],
    content: `# Plans, Limits, and Pricing

## Available plans

| Feature | Starter | Growth | Pro |
|---|---|---|---|
| Quizzes | 1 | 5 | Unlimited |
| Responses/mo | 500 | 5,000 | Unlimited |
| Integrations | 1 | 5 | All |
| Custom domain | No | No | Yes |
| Remove branding | No | Yes | Yes |
| A/B testing | No | No | Yes |
| Priority support | No | No | Yes |

## Billing cycle

Plans are billed monthly or annually. Annual billing saves approximately 20%.

## Upgrading

1. Go to **Settings > Billing**
2. Click **Upgrade Plan**
3. Select new plan
4. Enter payment details (Stripe)

Upgrades are immediate. You are charged the prorated difference for the remaining period.

## Downgrading

Downgrades take effect at the next billing cycle. Data is retained for 90 days after downgrade.

## Response overages

If you exceed your monthly response limit, additional responses are charged at:

- Starter: $0.05 per response
- Growth: $0.02 per response

You will receive an email alert at 80% and 100% of your limit.
`,
  },
  {
    categoryKey: 'account-and-billing',
    title: 'Managing Team Members',
    excerpt: 'Invite colleagues, set roles (Admin, Editor, Viewer), and remove team members.',
    readTime: 3,
    tags: ['team', 'users', 'roles', 'permissions'],
    content: `# Managing Team Members

## Inviting a team member

1. Go to **Settings > Team**
2. Click **Invite Member**
3. Enter their email address
4. Select a role
5. Click **Send Invite**

They will receive an email invitation valid for 7 days.

## Roles and permissions

| Permission | Viewer | Editor | Admin |
|---|---|---|---|
| View quizzes | Yes | Yes | Yes |
| Edit quizzes | No | Yes | Yes |
| Publish quizzes | No | Yes | Yes |
| View leads | Yes | Yes | Yes |
| Export leads | No | Yes | Yes |
| Manage integrations | No | No | Yes |
| Manage billing | No | No | Yes |
| Invite/remove members | No | No | Yes |

## Removing a team member

1. Go to **Settings > Team**
2. Click the three-dot menu next to the member
3. Select **Remove**

Removing a member immediately revokes their access. Their quiz edits remain.

## Transferring ownership

Only the account owner can transfer ownership. Go to **Settings > Team > Transfer Ownership** and enter the new owner's email.
`,
  },
];
