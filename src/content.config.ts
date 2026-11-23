import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every moment of your life is one folder: src/content/moments/<YYYY-MM-DD-short-title>/index.md
// Photos sit next to index.md in the same folder.
const moments = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/moments',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      // If you only remember the year or month, set this and only that part is shown.
      approx: z.enum(['year', 'month']).optional(),
      place: z.string().optional(),
      summary: z.string().optional(),
      tags: z.array(z.string()).default([]),
      // Photo row on the home page: campus, coast, mountains, ...
      album: z.string().optional(),
      // true = also shown in the "How I got here" timeline on the home page
      milestone: z.boolean().default(false),
      cover: image().optional(),
      photos: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      // true = kept in the repo, never published on the site
      draft: z.boolean().default(false),
    }),
});

export const collections = { moments };
