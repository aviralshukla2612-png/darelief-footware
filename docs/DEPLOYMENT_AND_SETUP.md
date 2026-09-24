# DARELIEF WALKWEAR — Deployment & Setup Guide

## 1. Local Environment Prerequisites
- **Node.js**: Version 18.18.0 or newer (Node.js 20+ recommended).
- **npm / yarn / pnpm**: Package manager.

---

## 2. Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aviralshukla2612-png/darelief-footware.git
   cd darelief-footware
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 3. Production Build & Validation

To test and validate the production bundle locally:

```bash
# Generate optimized production build
npm run build

# Start the production server
npm start
```

---

## 4. Vercel Deployment (One-Click)

This project is fully pre-configured for deployment on **Vercel**:

1. Push your latest code to GitHub:
   ```bash
   git add .
   git commit -m "Add documentation"
   git push origin main
   ```

2. Visit [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `darelief-footware` GitHub repository.
4. Select Framework Preset: **Next.js**.
5. Leave build settings as default (`npm run build`).
6. Click **Deploy**. Vercel will build and publish the live production site automatically with global CDN edge caching.
