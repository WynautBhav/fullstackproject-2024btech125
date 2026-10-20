// Single source of truth for the downloadable CV.
// Edit this file, then run `npm run generate-cv` to rebuild files/*.pdf and files/*.docx
export default {
  name: 'Vaibhav Sharma',
  title: 'Full-Stack Developer | Automation Engineer',
  contact: {
    email: 'latestarget37@gmail.com',
    phone: '+91 70144 47368',
    location: 'Jaipur, Rajasthan, India',
    github: 'github.com/WynautBhav',
  },
  summary:
    'Computer Science undergraduate at JK Lakshmipat University with practical experience in web development, backend ' +
    'integration, e-commerce platforms and business automation. Has worked across product-focused startup environments, ' +
    'contributing to website development and digital workflows. Interested in building reliable, useful software that ' +
    'solves real-world problems.',
  experience: [
    {
      role: 'Tech Developer',
      org: 'Findtern',
      period: 'Oct 2026 – Present',
      location: 'Bhamashah Techno Hub, Jaipur',
      points: [
        'Develop and improve the company website.',
        'Build automations to streamline repetitive workflows.',
        'Contribute to website integrations and technical improvements.',
      ],
    },
    {
      role: 'Developer',
      org: "Cuz It's Memorable",
      period: 'Ongoing',
      location: 'cuzitsmemorable.com',
      points: [
        'Contribute to website development and technical implementation.',
        'Support digital experiences for a gifting brand focused on memorable, personalised experiences.',
        "Work on the technical side of the brand's digital presence.",
      ],
    },
    {
      role: 'Tech Intern',
      org: 'Silvoraa',
      period: 'Dec 2025 – Sep 2026',
      points: [
        'Contributed to e-commerce website and catalogue workflows.',
        'Worked with Shopify product management and AI-assisted content workflows.',
        'Explored automation for product operations.',
        'Built in early personal repositories; development later moved to the company GitHub.',
      ],
    },
    {
      role: 'Tech Intern',
      org: 'LovedBy',
      period: 'Dec 2025 – Sep 2026',
      points: [
        'Contributed to creator-commerce website development.',
        'Worked on frontend improvements and technical workflows.',
        'Supported digital tools for creator and brand operations.',
      ],
    },
    {
      role: 'Development Intern',
      org: 'FinxGuru',
      period: 'Sep 2025 – Nov 2025',
      points: [
        'Worked with React for frontend development.',
        'Worked with Django for backend development.',
        'Used PostgreSQL for database-related tasks.',
      ],
    },
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'JK Lakshmipat University, Jaipur',
      period: '2024 – 2028',
    },
    {
      degree: 'Senior Secondary (Class XII)',
      institution: 'JPHS',
      period: '2024',
    },
  ],
  projects: [
    { name: 'Findtern', stack: 'Next.js, TypeScript, PostgreSQL, Drizzle ORM, AWS S3, Playwright', desc: 'Recruitment platform behind findtern.in: public site, candidate app, hiring app and admin console in one codebase (86 screens, 105 API routes, 142 tests). nextjs-findtern.vercel.app' },
    { name: 'Silvoraa', stack: 'React, TypeScript, Appwrite, Supabase, Gemini AI, Razorpay', desc: 'Gemstone jewellery e-commerce: 90+ products, filtered search, AI Stylist recommendations, Razorpay checkout, SEO schema. silvoraa.com (early repositories; later moved to the company GitHub).' },
    { name: 'LovedBy', stack: 'React, TypeScript, Vite, Appwrite, GSAP, Next.js', desc: 'Creator-commerce platform: creator storefronts, brand inventory, admin approvals, escrow payouts and audit logs; plus a Next.js marketing site. loved-by.vercel.app' },
    { name: 'LovedBy Outreach OS', stack: 'React, FastAPI, SQLite, Gemini AI, Playwright, WebSockets', desc: 'AI partnerships engine: lead discovery, 0–100 scoring, personalised drafts, human-in-the-loop review, follow-ups and Google Sheets sync.' },
    { name: "Cuz It's Memorable", stack: 'React, Vite', desc: 'Website for a Jaipur gifting brand (Polaroid rentals, film prints, keepsake albums). cuzitsmemorable.com' },
    { name: 'Medusa', stack: 'Flutter, Dart, Supabase', desc: "Women's safety app: multi-trigger SOS, scream detection, guardian location sharing, journey tracking, evidence locker, safety heatmaps." },
    { name: 'Argus Eye', stack: 'Python, FastAPI, scikit-learn, React, Flutter, Gemini AI', desc: 'UPI fraud intelligence: Flutter app, React dashboard and an ML API comparing four classifiers with batch prediction and feature importance.' },
    { name: 'Bad Ads Co · PropertyAdda · MyFinds', stack: 'Next.js, TypeScript, Three.js, GSAP, Supabase', desc: 'Agency website, real-estate lead intelligence and an AI lost-and-found — all live on Vercel.' },
    { name: 'Windamere CRM · Daymark · Omi Sabji Bot', stack: 'Next.js, Prisma, Flutter, Appwrite, Node.js, PHP, Firebase', desc: 'Mobile-first sales CRM, a deep-work journal app, and a WhatsApp ordering bot for a vegetable vendor.' },
    { name: 'SaaS Accounting Platform', stack: 'Python, FastAPI, OpenAI, PostgreSQL', desc: 'Role-based accounting with ITR/GST document extraction, double-entry ledgers, invoices and payroll.' },
  ],
  skills: {
    Frontend: 'React, Next.js, JavaScript, TypeScript, HTML, CSS, Tailwind CSS, Framer Motion, GSAP, Three.js',
    Backend: 'Node.js, Express, Django, Python, FastAPI',
    Databases: 'PostgreSQL, MySQL, SQL, MongoDB, SQLite',
    Platforms: 'Supabase, Appwrite, Firebase, Prisma, Drizzle ORM, Vercel, AWS S3',
    'AI & ML': 'Gemini API, OpenAI API, scikit-learn, AI-assisted development',
    Other: 'Git, GitHub, automation workflows, Playwright, Flutter, Dart',
  },
  achievements: ['Winner — Pre Hack 2025, JK Lakshmipat University, Jaipur'],
  certifications: [],
};
