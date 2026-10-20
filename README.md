# Vaibhav Sharma — MERN Portfolio

Personal portfolio of **Vaibhav Sharma**, Full-Stack Developer & Automation Engineer (B.Tech CSE, JK Lakshmipat University).
Built with **MongoDB, Express.js, React.js and Node.js**, with a Three.js hero scene and anime.js / Framer Motion animations.

**Roll No:** 2024btech125

🔗 **Live site:** _add Vercel/Netlify URL here_
🔗 **API:** _add Render/Railway URL here_

## Features

- **Hero**: interactive **Three.js** particle sphere (custom GLSL noise shader, reacts to the cursor and theme), **anime.js** split-text name reveal, typewriter role, magnetic CV buttons, live Jaipur clock
- **About**: bio, photo, location and status, with scroll-reveal animations
- **Skills**: animated progress bars grouped into Frontend / Backend / Tools & Technologies, with hover/focus tooltips showing proficiency
- **Projects**: interactive cards with tech badges, GitHub and live links, **filter by technology** and sort
- **CV download**: PDF **and** DOCX, served from an Express route (`/api/cv/:format`)
- **Education & Experience**: vertical timeline with a scroll-linked progress rail and Experience / Education tabs
- **Certifications & Achievements**: Pre Hack 2025 (JK Lakshmipat University) winner pass, plus certificate cards with verify links
- **Contact form**: posts to Express, stored in MongoDB via Mongoose, optional Nodemailer email notification
- Dark / light mode toggle (remembers your choice), fully responsive, React Router SPA (`/`, `/projects`, 404)
- Polish: first-visit **preloader** (anime.js timeline), **custom cursor** with contextual labels, scroll-spy navbar pill, scrambled section eyebrows, LED-segment skill bars, scroll-scattering particle sphere, word-by-word bio reveal, real project screenshots in browser frames, a hackathon "event pass" with an animated WINNER stamp, and a giant "Say hello" CTA with rippling letters
- Respects `prefers-reduced-motion`; the custom cursor only appears on fine pointers
- The WebGL scene is lazy-loaded in its own chunk, pauses when off-screen, and is skipped when reduced motion is requested

## Tech Stack

| Layer    | Tech                                               |
| -------- | -------------------------------------------------- |
| Frontend | React 19, Vite, React Router, Three.js, anime.js, Framer Motion, React Icons |
| Backend  | Node.js, Express, Mongoose, Nodemailer, Helmet, express-rate-limit |
| Database | MongoDB Atlas                                      |
| Deploy   | Vercel (client) · Render (server)                  |

## Folder Structure

```
fullstackproject-2024btech125/
├── client/                 # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── components/     # Hero, About, Skills, Projects, Timeline, ...
│       ├── data/portfolio.js   # ← all website content lives here
│       ├── hooks/          # useTheme, useTypewriter, useScramble, useActiveSection
│       └── pages/          # Home, ProjectsPage, NotFound
└── server/                 # Express backend
    ├── config/             # db + mailer
    ├── data/resume.js      # ← CV content (generates PDF + DOCX)
    ├── files/              # served CV files
    ├── models/Message.js
    ├── routes/             # contact.js, cv.js
    └── scripts/generate-cv.js
```

## API

| Method | Route              | Description                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/api/health`      | Health check                       |
| POST   | `/api/contact`     | Save a message `{ name, email, message }` |
| GET    | `/api/cv/pdf`      | Download CV as PDF                 |
| GET    | `/api/cv/docx`     | Download CV as Word document       |

## Local Setup

**Prerequisites:** Node.js 18+, and a MongoDB Atlas cluster (or a local MongoDB).

```bash
git clone https://github.com/WynautBhav/fullstackproject-2024btech125.git
cd fullstackproject-2024btech125

# 1. Backend
cd server
npm install
cp .env.example .env        # then fill in MONGO_URI (and SMTP_* if you want email alerts)
npm run dev                 # http://localhost:5000

# 2. Frontend (new terminal)
cd client
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:5000
npm run dev                 # http://localhost:5173
```

### Updating content

- Website text, projects, skills, timeline, certificates: edit `client/src/data/portfolio.js`
- Profile photo / certificate images: put them in `client/public/` and reference them as `/filename.jpg`
- CV: edit `server/data/resume.js`, then run `npm run generate-cv` in `server/`

## Deployment

**Backend → Render**: New Web Service, root directory `server`, build `npm install`, start `npm start`.
Set env vars `MONGO_URI`, `CLIENT_URL` (your Vercel URL), and optionally `SMTP_*`.

**Frontend → Vercel**: Import the repo, root directory `client`, framework Vite.
Set env var `VITE_API_URL` to the Render URL. `vercel.json` handles SPA routing.

## Environment Variables

`.env` files are git-ignored. See `server/.env.example` and `client/.env.example`.
