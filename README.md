# Kingdom Come: Deliverance 2 – Alchemy Guide Website

This project is a clean, structured, and mobile-friendly web application designed to showcase all potion recipes from **Kingdom Come: Deliverance 2**. It serves as a centralized alchemy reference tool for players who want to easily explore, search, and understand potion mechanics in the game.

---

## 🧪 Overview

The goal is to improve upon existing online guides by offering:

- 🧴 **Detailed potion breakdowns** (ingredients, effects, brewing steps, etc.)
- 🧭 **User-friendly navigation and filtering**
- 📱 **Responsive design for mobile and desktop users**
- 🧰 **Structured backend using Sanity.io for scalable content management**

---

## 🔍 Key Features

### Potion Library
Each potion entry includes:
- **Name**
- **Base Liquid** (e.g. Water, Spirits)
- **Ingredients with quantities**
- **Brewing Instructions**
- **Effects**
- **Difficulty**
- **Estimated In-Game Value**

### Search & Filter
Users will be able to:
- Filter by **base liquid**, **effect type**, or **difficulty**
- Quickly search for any potion by name or effect

### Responsive Frontend (Planned)
The site will be built with React or Next.js and styled using Tailwind CSS for a modern, game-themed UI.

---

## 🛠️ Tech Stack

- **Sanity.io** – Content Management System (CMS)
- **React / Next.js** – Planned frontend
- **Tailwind CSS** – Utility-first styling
- **Vercel** – Hosting & deployment

---

## 📁 Directory Structure

- `/schemaTypes/` – Sanity schema definitions (`Potion`, `Ingredient`, `BaseLiquid`, `EffectType`)
- `/static/` – Static assets like icons or placeholder images
- `sanity.config.ts` – Main Sanity studio configuration
- `sanity.cli.ts` – CLI configuration for Sanity project

---

## 🚀 Getting Started

```bash
git clone https://github.com/WOOPS21212/Kingdomcomedeliverance-potions.git
cd Kingdomcomedeliverance-potions
npm install
npm run dev
```

Then open your browser to `http://localhost:3333` to access the Sanity Studio.

---

## 📌 Planned Features

- Full integration with live Sanity dataset
- Sorting & filter controls for better usability
- Community voting or notes (optional future)
- PDF/CSV export of potion data

---

## 🤝 Contributing

Pull requests and feedback are welcome. Fork the project and submit a PR or open an issue.

---

## 🏹 Credits

Created by fans of **Kingdom Come: Deliverance** for the community.
