// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the website — no component changes needed.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Vaibhav Sharma',
  firstName: 'Vaibhav',
  lastName: 'Sharma',
  rollNo: '2024btech125',
  roles: ['Full-Stack Developer', 'Automation Engineer', 'Product Builder'],
  tagline:
    'I build web applications, integrate backend systems, and create automations that solve real business problems — from the first pixel to the last workflow.',
  photo: '', // e.g. '/profile.jpg' (put the image in client/public). Empty = monogram card
  location: 'Jaipur, Rajasthan, India',
  timezone: 'Asia/Kolkata',
  status: 'B.Tech CSE student & working developer',
  current: { role: 'Tech Developer', org: 'Findtern' },
  openTo: 'Freelance builds & collaborations',
  email: 'latestarget37@gmail.com',
  phone: '+91 70144 47368',
  bio: [
    "I'm Vaibhav, a full-stack developer and automation engineer studying Computer Science at JK Lakshmipat University, Jaipur. I build web applications, integrate backend systems, and create automations that solve real business problems.",
    "I've worked across product-focused startups — recruitment, jewellery e-commerce, creator commerce, fintech and gifting — contributing to websites, integrations and digital workflows. I enjoy turning ideas into working products, from frontend interfaces to backend workflows, and I lean on AI-assisted development to ship faster without cutting corners.",
  ],
  socials: {
    github: 'https://github.com/WynautBhav',
  },
};

// Opens a Gmail compose window addressed to Vaibhav
export const gmailCompose = (subject = 'Hello from your portfolio') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}`;


// level: 0–100 (self-assessed)
export const skills = {
  Frontend: [
    { name: 'React', level: 80 },
    { name: 'Next.js', level: 80 },
    { name: 'JavaScript', level: 80 },
    { name: 'HTML / CSS', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Tailwind CSS', level: 75 },
  ],
  Backend: [
    { name: 'SQL', level: 70 },
    { name: 'Node.js / Express', level: 65 },
    { name: 'Python', level: 65 },
    { name: 'PostgreSQL', level: 65 },
    { name: 'Django', level: 60 },
    { name: 'MySQL', level: 60 },
    { name: 'FastAPI', level: 55 },
  ],
  'Tools & Technologies': [
    { name: 'AI-assisted development', level: 85 },
    { name: 'Automation engineering', level: 75 },
    { name: 'Git / GitHub', level: 75 },
    { name: 'Flutter / Dart', level: 55 },
    { name: 'Machine learning (scikit-learn)', level: 50 },
  ],
};

// Scrolling tech strip under the hero
export const marquee = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Django',
  'Python', 'FastAPI', 'Tailwind CSS', 'Supabase', 'Appwrite', 'Firebase', 'Prisma', 'Drizzle', 'Flutter',
  'Three.js', 'GSAP', 'Playwright', 'Gemini AI', 'Automation',
];

// status: 'Live' | 'Private' | 'Concept'
// type:   'Work' (company roles) | 'Independent'
// github: only public repos are linked — client & company repositories stay private.
// note:   optional small print shown on the card
export const projects = [
  {
    title: 'Findtern',
    category: 'Recruitment platform',
    description:
      'The platform behind findtern.in — public site, candidate app, hiring app and admin console in one Next.js codebase. Candidates are screened (coding, aptitude, communication and an AI interview) to earn a Findtern Score that prices their hourly rate; employers search, interview, send offers, approve timesheets and pay GST-correct invoices.',
    highlights: ['86 screens', '105 API routes', '142 tests'],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Tailwind CSS', 'GSAP', 'AWS S3', 'Playwright'],
    github: '',
    live: 'https://nextjs-findtern.vercel.app',
    image: '/projects/findtern.webp',
    status: 'Live',
    type: 'Work',
    featured: true,
  },
  {
    title: 'Silvoraa',
    category: 'Gemstone jewellery e-commerce',
    description:
      'Premium gemstone & 925 sterling silver jewellery store with cart, checkout and accounts, 90+ products, search filtered by stone, type and price, an AI Stylist for personalised recommendations, Razorpay payments and SEO schema markup.',
    highlights: ['90+ products', 'AI Stylist', 'Razorpay checkout'],
    tech: ['React', 'TypeScript', 'Appwrite', 'Supabase', 'Gemini AI', 'Razorpay', 'Tailwind CSS', 'Framer Motion'],
    github: '',
    live: 'https://silvoraa.com',
    image: '/projects/silvoraa.webp',
    note: 'Built in my early repositories; development later moved to Silvoraa’s company GitHub at their request.',
    status: 'Live',
    type: 'Work',
    featured: true,
  },
  {
    title: 'LovedBy',
    category: 'Creator-commerce platform',
    description:
      'Social commerce where creators run personal @handle storefronts, curate products from approved brands and set their own margins. Brands manage inventory and fulfilment; admins review applications, track escrow payouts and audit activity. Plus a Next.js marketing site.',
    highlights: ['Creator storefronts', 'Brand & admin consoles', 'Escrow payouts'],
    tech: ['React', 'TypeScript', 'Vite', 'Appwrite', 'GSAP', 'Lenis', 'Tailwind CSS', 'Next.js'],
    github: '',
    live: 'https://loved-by.vercel.app',
    image: '/projects/lovedby.webp',
    status: 'Live',
    type: 'Work',
    featured: true,
  },
  {
    title: "Cuz It's Memorable",
    category: 'Gifting brand website',
    description:
      'Website for a Jaipur gifting brand built around Polaroid camera rentals, instant film prints and hand-stitched keepsake albums. I work on development and the technical side of the brand’s digital presence.',
    tech: ['React', 'Vite'],
    github: '',
    live: 'https://cuzitsmemorable.com',
    image: '/projects/cuzitsmemorable.webp',
    status: 'Live',
    type: 'Work',
    featured: true,
  },
  {
    title: 'LovedBy Outreach OS',
    category: 'AI partnerships engine',
    description:
      'Internal tool that scales LovedBy’s creator and D2C-brand partnerships: discovers and classifies leads, scores them 0–100 with local heuristics plus Gemini, drafts personalised pitches, and routes everything through a human-in-the-loop review deck with daily send caps, follow-up sequencing, reply monitoring, Google Sheets sync and live WebSocket telemetry.',
    highlights: ['0–100 lead scoring', 'Human-in-the-loop', 'Sheets sync'],
    tech: ['React', 'Vite', 'FastAPI', 'SQLite', 'Gemini AI', 'Playwright', 'WebSockets', 'Tailwind CSS'],
    github: '',
    live: '',
    cover: { hue: 'ember', mark: 'O' },
    status: 'Private',
    type: 'Work',
    featured: true,
  },
  {
    title: 'Medusa',
    category: "Women's safety app",
    description:
      'A Flutter safety app with SOS triggered by shake, volume or power-button patterns and scream detection, live location sharing with guardians, journey tracking and safe-arrival check-ins, a dead-man’s switch, an evidence locker (audio & camera), fake calls, area-safety heatmaps and battery-aware background protection.',
    highlights: ['Multi-trigger SOS', 'Evidence locker', 'Safety heatmaps'],
    tech: ['Flutter', 'Dart', 'Supabase', 'Geolocation', 'Background services'],
    github: '',
    live: '',
    status: 'Private',
    type: 'Independent',
  },
  {
    title: 'Argus Eye',
    category: 'UPI fraud intelligence',
    description:
      'AI-powered fraud detection for Indian UPI payments: a Flutter app with QR scanning and Gemini-assisted analysis, a React analyst dashboard, and a FastAPI ML service that trains and compares logistic regression, decision tree, random forest and gradient boosting models with single and batch prediction, metrics and feature importance.',
    highlights: ['4 models compared', 'Batch prediction', 'Feature importance'],
    tech: ['Python', 'FastAPI', 'scikit-learn', 'React', 'Flutter', 'Gemini AI'],
    github: '',
    live: '',
    status: 'Private',
    type: 'Independent',
  },
  {
    title: 'Bad Ads Co',
    category: 'Creative agency website',
    description:
      'Dark, editorial, scroll-driven single-page site for a creative agency of four specialists — “We’re bad. Together, we’re not.” — with Three.js elements and Framer Motion choreography.',
    tech: ['Next.js', 'React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    github: '',
    live: 'https://bad-ads-co.vercel.app',
    image: '/projects/badadsco.webp',
    status: 'Live',
    type: 'Independent',
    featured: true,
  },
  {
    title: 'PropertyAdda',
    category: 'Real-estate lead intelligence',
    description:
      'Lead intelligence for Indian real-estate teams: score, route and close every property enquiry, built for brokerages that run on WhatsApp.',
    tech: ['Next.js', 'TypeScript', 'GSAP', 'Lenis', 'Tailwind CSS'],
    github: '',
    live: 'https://property-adda-eight.vercel.app',
    image: '/projects/propertyadda.webp',
    status: 'Live',
    type: 'Independent',
    featured: true,
  },
  {
    title: 'MyFinds',
    category: 'AI lost & found',
    description:
      '“Lost it? Someone found it.” An AI that reads what you lost and what someone found, and only connects you when both stories match.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Three.js', 'GSAP'],
    github: '',
    live: 'https://myfinds-xi.vercel.app',
    image: '/projects/myfinds.webp',
    status: 'Live',
    type: 'Independent',
    featured: true,
  },
  {
    title: 'Windamere CRM',
    category: 'Sales CRM',
    description:
      'Mobile-first sales CRM for a window-distribution business — accounts, pipeline and reporting behind authenticated access.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'Auth'],
    github: '',
    live: 'https://windamere.vercel.app',
    status: 'Live',
    type: 'Independent',
  },
  {
    title: 'Daymark',
    category: 'Deep-work journal',
    description:
      'Personal deep-work and task-intelligence journal with offline storage, reminders, charts and PDF export — a Flutter app with an Appwrite backend and a companion React web version.',
    tech: ['Flutter', 'Dart', 'Appwrite', 'React', 'TypeScript'],
    github: '',
    live: '',
    status: 'Private',
    type: 'Independent',
  },
  {
    title: 'Omi Sabji Bot',
    category: 'WhatsApp automation',
    description:
      'WhatsApp ordering bot for a local vegetable vendor: a Node.js bot on the WhatsApp Web protocol with a small NLP layer, a PHP admin panel, Firebase Realtime Database and GitHub Actions.',
    tech: ['Node.js', 'PHP', 'Firebase', 'WhatsApp', 'Automation'],
    github: '',
    live: '',
    status: 'Private',
    type: 'Independent',
  },
  {
    title: 'SaaS Accounting Platform',
    category: 'AI accounting',
    description:
      'AI-powered accounting for CAs and clients: JWT auth with Admin / CA / Client roles, document processing with ITR and GST data extraction, double-entry ledgers with AI suggestions, invoices, expenses, payroll and automated reports.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    github: '',
    live: '',
    status: 'Private',
    type: 'Independent',
  },
  {
    title: 'Sabrang 2026 Deck',
    category: 'Interactive pitch deck',
    description:
      'Interactive sponsorship deck for the Sabrang 2026 youth cultural festival, with Gemini-assisted content and 4K slide export.',
    tech: ['Next.js', 'TypeScript', 'Gemini AI', 'Firebase'],
    github: '',
    live: '',
    status: 'Private',
    type: 'Independent',
  },
  {
    title: 'Burger Farm',
    category: 'Restaurant website',
    description: 'Farm-fresh burger restaurant website — menu, story and ordering calls-to-action.',
    tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    github: '',
    live: 'https://burger-farm-kappa.vercel.app',
    status: 'Live',
    type: 'Independent',
  },
  {
    title: 'JKLX',
    category: 'Student marketplace',
    description:
      'An OLX-style marketplace for JKLU students: listings with product images, wishlists, buyer–seller chat, reviews and an admin panel.',
    tech: ['MySQL'],
    github: '',
    live: '',
    status: 'Concept',
    type: 'Independent',
  },
  {
    title: 'This portfolio',
    category: 'MERN portfolio',
    description:
      'The site you’re on: React + Vite frontend with a Three.js particle scene and anime.js / Framer Motion animation, an Express API serving PDF & DOCX CVs, and a MongoDB-backed contact form.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Three.js', 'anime.js'],
    github: 'https://github.com/WynautBhav/fullstackproject-2024btech125',
    live: '',
    status: 'Live',
    type: 'Independent',
  },
];

// type: 'education' | 'experience'
export const timeline = [
  {
    type: 'experience',
    title: 'Tech Developer',
    org: 'Findtern',
    place: 'Bhamashah Techno Hub, Jaipur',
    period: 'Oct 2026 — Present',
    current: true,
    points: [
      'Develop and improve the company website.',
      'Build automations to streamline repetitive workflows.',
      'Contribute to website integrations and technical improvements.',
    ],
  },
  {
    type: 'experience',
    title: 'Developer',
    org: "Cuz It's Memorable",
    place: 'cuzitsmemorable.com',
    period: 'Ongoing',
    current: true,
    points: [
      'Contribute to website development and technical implementation.',
      'Support digital experiences for a gifting brand focused on memorable, personalised experiences.',
      "Work on the technical side of the brand's digital presence.",
    ],
  },
  {
    type: 'experience',
    title: 'Tech Intern',
    org: 'Silvoraa',
    place: 'Jewellery e-commerce',
    period: 'Dec 2025 — Sep 2026',
    points: [
      'Contributed to e-commerce website and catalogue workflows.',
      'Worked with Shopify product management and AI-assisted content workflows.',
      'Explored automation for product operations.',
    ],
  },
  {
    type: 'experience',
    title: 'Tech Intern',
    org: 'LovedBy',
    place: 'Creator commerce',
    period: 'Dec 2025 — Sep 2026',
    points: [
      'Contributed to creator-commerce website development.',
      'Worked on frontend improvements and technical workflows.',
      'Supported digital tools for creator and brand operations.',
    ],
  },
  {
    type: 'experience',
    title: 'Development Intern',
    org: 'FinxGuru',
    place: 'Fintech',
    period: 'Sep 2025 — Nov 2025',
    points: [
      'Worked with React for frontend development.',
      'Worked with Django for backend development.',
      'Used PostgreSQL for database-related tasks.',
    ],
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science',
    org: 'JK Lakshmipat University',
    place: 'Jaipur, Rajasthan',
    period: '2024 — 2028',
    current: true,
    points: ['Currently pursuing undergraduate studies in Computer Science & Engineering.'],
  },
  {
    type: 'education',
    title: 'Senior Secondary (Class XII)',
    org: 'JPHS',
    place: '',
    period: 'Completed 2024',
    points: ['Higher secondary education.'],
  },
];

// image: optional path in client/public (e.g. '/certs/nptel.jpg')
export const certifications = [];

export const achievements = [
  {
    title: 'Pre Hack',
    edition: '2025',
    result: 'Winner',
    venue: 'JK Lakshmipat University',
    city: 'Jaipur',
    detail: 'First place at Pre Hack 2025, held at JK Lakshmipat University, Jaipur.',
    date: '2025',
  },
];

// Defined after `projects` so the count stays in sync
export const stats = [
  { value: 5, suffix: '', label: 'Startup roles' },
  { value: projects.length, suffix: '', label: 'Projects & products' },
  { value: 1, suffix: '×', label: 'Hackathon winner' },
];
