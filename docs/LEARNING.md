# Learn web development with your own site

This guide teaches you web development from zero, using **your own website** as the textbook.
Every lesson is about 30–60 minutes: read a short idea, open a real file, change something, and see it.

You already know embedded systems. That helps a lot, because a website build works like firmware:

| Firmware world | Website world (this project) |
|---|---|
| C source files | `.astro`, `.md`, `.css` files in `src/` |
| Compiler (gcc / arm-none-eabi) | **Astro** (`npm run build`) |
| `.hex` / `.bin` output | the `dist/` folder (plain HTML + CSS + images) |
| Flashing the MCU | **deploying** (uploading `dist/` to a host) |
| The MCU running it | the **browser** showing it |
| Header file / struct definition | `src/content.config.ts` (the shape of each moment) |
| A function you call many times | a **component** (`PostCard.astro`) |
| Serial monitor while debugging | `npm run dev` + the browser's DevTools (F12) |

Do the lessons in order. Tick them off as you go.

---

## Setup (do once)

1. Open the project in VS Code:
   ```bash
   code ~/Github/personal-page
   ```
2. In VS Code, open **Extensions** (Ctrl+Shift+X) and install **Astro** (by astro-build). It adds colors and autocomplete for `.astro` files.
3. Open the VS Code terminal: **Terminal → New Terminal** (Ctrl+`).
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:4321 in your browser. Leave both open side by side.

The dev server watches your files. **Save a file → the browser updates by itself.** Stop it with Ctrl+C.

---

## Lesson 1 — What a web page is: HTML

**Idea.** A web page is a text file of **HTML**: content wrapped in tags.

```html
<h1>Big title</h1>
<p>A paragraph with a <a href="https://t.me/vsvsjsk">link</a>.</p>
<img src="photo.jpg" alt="What the photo shows">
```

- `<h1>`–`<h3>` are headings, `<p>` is a paragraph, `<a>` is a link, `<img>` is an image.
- `class="card"` gives an element a name that CSS can style.
- Tags nest inside each other like a tree.

**Try it.**
1. Make a scratch file `~/Desktop/hello.html` with the 3 lines above, inside `<body>...</body>`.
2. Double-click it to open it in the browser. You just made a website.
3. In your browser on http://localhost:4321, right-click anything → **Inspect**. This is DevTools: you can see the real HTML of your site. Click around the tree.

**Read more:** [MDN — Getting started with HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content)

---

## Lesson 2 — How it looks: CSS

**Idea.** **CSS** decides colors, sizes, spacing and layout. A rule = *which elements* + *what style*:

```css
.card { background: white; border-radius: 20px; padding: 22px; }
```

Your site keeps all its colors as **variables** at the top of `src/styles/global.css`:

```css
--accent:#4C9BFF;   /* the light blue used for small titles, dates and links */
--btn:#2563EB;      /* the solid blue of buttons */
```

**Try it.**
1. Open `src/styles/global.css`. Near the top, change `--accent:#4C9BFF` to `--accent:#F59E0B` (amber). Save. Watch the small titles, links and progress lines change.
2. Change it back (or keep amber if you like it!).
3. In DevTools (F12), click an element and edit its styles live in the **Styles** panel. Nothing is saved; it's a playground.
4. Change `--btn:#2563EB` to `--btn:#16A34A` (green). Every solid button changes at once, because they all use the same variable. Change it back.

The whole site is one dark theme. All its colors live in that `:root{...}` block, so you can re-theme everything from there.

**Read more:** [MDN — CSS basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content), [web.dev Learn CSS](https://web.dev/learn/css)

---

## Lesson 3 — Writing content: Markdown and frontmatter

**Idea.** You don't write HTML for every memory. You write **Markdown**, a simple text format, and Astro turns it into HTML.

```markdown
# Heading
Normal text, **bold**, *italic*, [a link](https://example.com)

- a list item
- another one
```

The block between the two `---` lines at the top is **frontmatter**: data about the moment (title, date, photos). Think of it as filling in a struct.

**Try it.**
1. Open `src/content/moments/2026-south-coast-sunset/index.md`.
2. Fix the `# TODO`: set the real `date:` and remove the `approx: year` line if you know the exact day.
3. Add a few sentences to the story below the second `---`. Save and open the moment on the site.
4. Make a new moment:
   ```bash
   npm run new -- "Learning to build my website" 2026-11-23
   ```
   Fill it in, copy a photo into its folder, and add it under `photos:`. Watch it appear on the home page feed and in the gallery.
5. Make a mistake on purpose: delete the `title:` line and save. Read the red error in the terminal/browser. It tells you exactly what's wrong. Undo it.

**Read more:** [Markdown guide — basic syntax](https://www.markdownguide.org/basic-syntax/)

---

## Lesson 4 — Tour of the project

You now know enough to read the map.

```
personal-page/
├── src/
│   ├── content/moments/   ← your memories (Markdown + photos)  ← you edit this most
│   ├── data/              ← profile, projects, experience (JSON)
│   ├── pages/             ← every file here = one URL on the site
│   ├── components/        ← reusable pieces
│   │   ├── HeroCarousel.astro  ← the rotating hero at the top of the home page
│   │   ├── CardRow.astro       ← a title + sideways-scrolling strip of cards
│   │   ├── RowCard.astro       ← one card inside a row
│   │   ├── PostCard.astro      ← a moment card (used on /moments/ and tag pages)
│   │   ├── Gallery.astro       ← photo grid + full-size viewer (used on moment pages)
│   │   └── SiteFooter.astro    ← the footer
│   ├── layouts/Base.astro ← the frame around every page (nav bar + footer)
│   ├── styles/global.css  ← all the styling
│   ├── content.config.ts  ← the rules for what a moment must contain
│   └── lib.ts             ← small helper functions (sorting, date formatting)
├── scripts/new-moment.mjs ← the `npm run new` command
├── package.json           ← project name, commands, dependencies
├── node_modules/          ← downloaded libraries (never edit; not in git)
└── dist/                  ← the built website (created by `npm run build`; not in git)
```

**Try it.**
1. Open `src/data/projects.json`. Add a new project at the top (copy an existing `{ ... }` block, keep the commas right). Save, check `/#projects`.
2. Open `package.json` and find the `scripts` section. These are the commands you run with `npm run ...`.

**JSON rules:** text in `"double quotes"`, a comma between items, **no comma after the last item**. Most beginner errors in JSON are a missing or extra comma.

---

## Lesson 5 — Astro components

**Idea.** An `.astro` file has two parts:

```astro
---
// 1. The "code fence": JavaScript that runs at BUILD time (like a preprocessor)
const name = "Abidul";
const skills = ["FPGA", "RISC-V", "PCB"];
---
<!-- 2. The template: HTML, with {curly braces} for values -->
<h1>Hello, {name}</h1>
<ul>
  {skills.map((s) => <li>{s}</li>)}
</ul>
```

- `{name}` inserts a value.
- `{list.map((x) => <li>{x}</li>)}` is a **loop**: it makes one `<li>` per item.
- `{condition && <p>...</p>}` shows something only **if** the condition is true.
- A component receives inputs called **props**, like function arguments: `<PostCard moment={m} />`.

**Try it.**
1. Open `src/components/PostCard.astro`. This draws one moment card. Read it top to bottom; you'll recognize every piece now.
2. On line 18 there is a "📷 N photos" line. Below it, add the tags:
   ```astro
   <span class="post-count">{d.tags.map((t) => `#${t}`).join(' ')}</span>
   ```
   Save. Every card on the site now shows its hashtags, because every page uses this one component.
3. Open `src/pages/index.astro` and find `latest = moments.slice(0, 12)`. Change `12` to `3`. The "Latest moments" row now shows only 3 cards (and its arrows disappear, because nothing needs scrolling). Change it back.
4. Open `src/components/HeroCarousel.astro` and change `const SECONDS = 7;` to `3`. The hero rotates faster.
5. In `src/pages/index.astro`, find the `<CardRow title="Latest moments" ...>`. This is one scrolling row. Copy it, change the title, and you have a new row.

**Read more:** [Astro docs — Components](https://docs.astro.build/en/basics/astro-components/)

---

## Lesson 6 — Pages and URLs

**Idea.** In Astro, **a file in `src/pages/` becomes a URL**:

| File | URL |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/moments/index.astro` | `/moments/` |
| `src/pages/moments/[id].astro` | `/moments/2026-09-13-night-hike-to-sunrise/` and one page per moment |
| `src/pages/tags/[tag].astro` | `/tags/hiking/` and one page per tag |

Square brackets `[id]` mean "make many pages from one template". The `getStaticPaths()` function inside lists which ones.

**Try it.** Create `src/pages/about.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="About me">
  <main class="wrap">
    <section>
      <div class="section-head">
        <span class="kicker">About</span>
        <h2>Hi, I'm Abidul</h2>
        <p>Write anything here.</p>
      </div>
    </section>
  </main>
</Base>
```

Open http://localhost:4321/about. Then add `<a href="/about">About</a>` to the nav in `src/layouts/Base.astro`.

**Read more:** [Astro docs — Pages & routing](https://docs.astro.build/en/guides/routing/)

---

## Lesson 7 — Content collections: giving your memories a shape

**Idea.** `src/content.config.ts` says what fields a moment can have and what type each one is, like a struct definition. If a moment breaks the rules (missing title, wrong date), the build stops with a clear error instead of making a broken page.

**Try it.** Add a `mood` to your moments:
1. In `src/content.config.ts`, under `place: z.string().optional(),` add:
   ```ts
   mood: z.string().optional(),
   ```
2. In one moment's frontmatter, add `mood: "😄"`.
3. In `src/pages/moments/[id].astro`, next to the place chip, add:
   ```astro
   {d.mood && <span class="chip">{d.mood}</span>}
   ```
You just extended your own data model. This is how the site grows with you.

**Read more:** [Astro docs — Content collections](https://docs.astro.build/en/guides/content-collections/)

---

## Lesson 8 — A little JavaScript in the browser

**Idea.** Most of your site is built ahead of time. A tiny bit runs **in the visitor's browser**: the rotating hero (`HeroCarousel.astro`), the arrow buttons on the card rows (`CardRow.astro`) and the full-size photo viewer on moment pages (`Gallery.astro`). Each has a `<script>` at the bottom of its file.

It follows the pattern used by most web JavaScript:
1. **find** elements: `document.querySelectorAll('.g-item')`
2. **listen** for an event: `.addEventListener('click', ...)`
3. **change** something: show the dialog, hide items.

It's the same idea as an interrupt handler: an event happens → your function runs.

**Try it.**
1. Read the script in `CardRow.astro` and match each line to what you see when you click an arrow.
2. Add `console.log('scrolled', track.scrollLeft);` inside the `update` function. Open DevTools → **Console**, scroll a row, see your message. This is your serial-monitor debugging.
3. Read the script in `HeroCarousel.astro`. The progress bar is a CSS animation; when it finishes (`animationend`), the script shows the next slide. Pausing just pauses that animation.

**Read more:** [MDN — JavaScript first steps](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting)

---

## Lesson 9 — Git: saving your history

**Idea.** Git saves snapshots ("commits") of the project, so you can see every change and undo mistakes. It's also your backup.

```bash
git status                 # what changed?
git diff                   # show the exact changes
git add .                  # choose everything for the next snapshot
git commit -m "Add sunset moment"
git log --oneline          # list of snapshots
```

**Habit:** one commit each time you add a moment or finish a lesson.

**Try it.** Make your first commit after Lesson 3, then look at `git log --oneline`.

**Read more:** [Git — the simple guide](https://rogerdudler.github.io/git-guide/)

---

## Lesson 10 — Putting it on the internet

1. Create a GitHub account if you don't have one, and a **new private repository** called `personal-page`.
2. Connect and push (GitHub shows these exact commands after you create the repo):
   ```bash
   git remote add origin https://github.com/<your-username>/personal-page.git
   git push -u origin main
   ```
3. Go to [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project** → connect GitHub → choose the repo.
   - Build command: `npm run build`
   - Output folder: `dist`
4. You get a free address like `personal-page.pages.dev`. From now on, **every `git push` updates the live site.**
5. Optional: buy a domain (about $10/year) and set it in `astro.config.mjs` → `site:`.

---

## After the lessons: ideas to practice

Each one is a small real feature. Try them yourself first.

- [ ] An **About** page with a longer story (Lesson 6)
- [ ] Show the **tags on each card** (Lesson 5)
- [ ] A **"On this day"** box on the home page: moments from the same date in earlier years
- [ ] A **map** of places you've been
- [ ] A **search** box on `/moments/`
- [ ] Turn each **project** into its own page with photos, like moments (a second collection)
- [ ] Add your **Telegram diary** posts as moments

## When you're stuck

1. **Read the error message.** Astro errors name the file and line.
2. Undo your last change (Ctrl+Z, or `git diff` to see what changed).
3. Use DevTools (F12): **Elements** for HTML/CSS, **Console** for JavaScript errors.
4. Search the [Astro docs](https://docs.astro.build) or [MDN](https://developer.mozilla.org).
5. Ask me. Paste the error and tell me which lesson you're on.

## Bigger courses, when you want more

- **Astro's official tutorial** (builds a blog step by step): https://docs.astro.build/en/tutorial/0-introduction/
- **MDN Learn web development** (HTML, CSS, JS from scratch): https://developer.mozilla.org/en-US/docs/Learn_web_development
- **web.dev Learn CSS / Learn HTML**: https://web.dev/learn
