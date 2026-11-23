# Abidul Qohar — Personal Page

My personal website: a social-media-style feed of my life, plus my story, projects, work and plans.
Built with [Astro](https://astro.build).

## Run it

```bash
npm install        # first time only
npm run dev        # open http://localhost:4321
npm run build      # makes the final site in dist/
```

## Add a new moment

```bash
npm run new -- "Night hike to Merbabu" 2026-11-20
```

This creates `src/content/moments/2026-11-20-night-hike-to-merbabu/index.md`.
Put your photos in **that same folder**, fill in the header, write the story, and it appears on:

- the **"Latest moments" row** on the home page and `/moments/` (grouped by year)
- the **hero** at the top of the home page, if it has a photo (the 5 newest with photos)
- a **photo row** on the home page for its `album` (every photo of every moment in that album)
- a **tag page** for each tag, e.g. `/tags/hiking/`
- the **"How I got here"** timeline, if you set `milestone: true`

### Header fields

| Field       | Required | Example / meaning |
|-------------|----------|-------------------|
| `title`     | yes | `"Night hike to sunrise"` |
| `date`      | yes | `2026-09-13` |
| `approx`    | no  | `year` or `month` — when you don't remember the exact day |
| `place`     | no  | `"Yogyakarta"` |
| `summary`   | no  | one line shown on cards and the timeline |
| `tags`      | no  | `[hiking, travel]` |
| `album`     | no  | `campus`, `coast`, `mountains`, or a new one — becomes a photo row on the home page |
| `milestone` | no  | `true` = also in the "How I got here" timeline |
| `cover`     | no  | `./photo.jpg` (otherwise the first photo is used) |
| `photos`    | no  | list of `{ src, alt, caption }` |
| `draft`     | no  | `true` = kept here but **not published** — good for private memories |

### Tips for staying organized

- Folder name = `YYYY-MM-DD-short-title`, so everything sorts by date.
- Keep a small set of tags: `life`, `work`, `study`, `project`, `travel`, `hiking`, ...
- Photos straight from the phone are fine — Astro resizes and compresses them when building.
- Write the moment the same day, even if it's only 3 sentences.

## Edit the other sections

| What | File |
|------|------|
| Name, bio, present, stats, skills, rival, future, links, project row titles | `src/data/profile.json` |
| Projects (each has a `group` = which row it appears in) | `src/data/projects.json` |
| Work experience | `src/data/experience.json` |
| Hero photo | `src/assets/hero.jpg` |
| Colors & styles | `src/styles/global.css` |

## Publish (free)

1. Push this repo to GitHub (it can be private).
2. On [Cloudflare Pages](https://pages.cloudflare.com) or [Netlify](https://netlify.com): import the repo,
   build command `npm run build`, output folder `dist`.
3. Every `git push` updates the site. Set your domain in `astro.config.mjs` (`site:`).
