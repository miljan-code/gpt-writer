# GPT Writer - Modern Fullstack SaaS application

GPT Writer is a Software as a Service (SaaS) project leveraging OpenAI's GPT-3.5 API to provide users with a suite of valuable services, including grammar checking, text summarization, article writing, and paraphrasing.

Built with NextJS 13, PlanetScale, Drizzle ORM, OpenAI, Clerk, ShadCN/ui and Stripe.

![GPT Writer](/assets/image/hero.webp)

## Features

- Clerk auth sync with DB using webhooks
- AI text generation using OpenAI's GPT-3.5
- Image upload using UploadThing
- Beautiful dashboard built with ShadCN/ui components
- Modern looking landing page built with TailwindCSS
- Stripe integration for payments
- Form validations with Zod and React-Hook-Form
- CRUD operations using Drizzle ORM
- State management using Jotai
- Markdown rendering
- and much more...

## Usage

Clone this repo

```bash
git clone https://github.com/miljan-code/gpt-writer-v2.git
```

Install necessary dependencies

```bash
npm install
# or
yarn
```

Fill up the .env file

```env
# DB - PlanetScale

DATABASE_URL='mysql://user:pw@planetscale'

# AUTH - Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Stripe

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PLAN_100=
STRIPE_PLAN_200=
STRIPE_PLAN_350=
STRIPE_PLAN_500=

# OpenAI

OPENAI_API_KEY=

# UploadThing

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# App URL

APP_URL="http://localhost:3000"
```

Setup clerk and stripe webhook endpoints

Run the development server

```bash
npm run dev
# or
yarn dev
```

## Demo

Try it out here

[https://gpt-writer.miljan.xyz/](https://gpt-writer.miljan.xyz/)
