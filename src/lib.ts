import { getCollection, type CollectionEntry } from 'astro:content';

export type Moment = CollectionEntry<'moments'>;

/** All published moments, newest first. */
export async function getMoments(): Promise<Moment[]> {
  const all = await getCollection('moments', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date, approx?: 'year' | 'month'): string {
  if (approx === 'year') return String(date.getUTCFullYear());
  const opts: Intl.DateTimeFormatOptions =
    approx === 'month'
      ? { month: 'long', year: 'numeric', timeZone: 'UTC' }
      : { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' };
  return date.toLocaleDateString('en-GB', opts);
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function groupByYear(moments: Moment[]): [number, Moment[]][] {
  const map = new Map<number, Moment[]>();
  for (const m of moments) {
    const y = m.data.date.getUTCFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(m);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

/** Labels for the gallery filter buttons. A new album name works too — it just gets capitalized. */
const ALBUM_LABELS: Record<string, string> = {
  campus: 'Campus & culture',
  coast: 'The coast',
  mountains: 'Mountains',
};
export function albumLabel(album: string): string {
  return ALBUM_LABELS[album] ?? album.charAt(0).toUpperCase() + album.slice(1);
}

const ALBUM_TEXT: Record<string, string> = {
  campus: 'Campus days and culture around Yogyakarta.',
  coast: 'Golden hours and sunsets on the south coast.',
  mountains: 'Night hikes, camps on the ridge and sunrises above the clouds.',
};
export function albumText(album: string): string {
  return ALBUM_TEXT[album] ?? `Photos from my ${album} moments.`;
}
