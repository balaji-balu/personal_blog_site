import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { SECTION_KEYS } from './consts';

export const TAGS = [
  'agentic-ai',
  'spec-driven',
  'kubernetes',
  'edge',
  'microservices',
  'event-sourcing',
  'observability',
  'platform',
  'vedanta',
  'pilgrimage',
  'practice',
] as const;

export type Tag = (typeof TAGS)[number];

const posts = defineCollection({
  // src/content/posts/<section>/<topic>/<slug>.md  ->  id "<section>/<topic>/<slug>"
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
    generateId: ({ entry }) => {
      const id = entry.replace(/\\/g, '/').replace(/\.md$/, '');
      const parts = id.split('/');
      if (parts.length !== 3 || !(SECTION_KEYS as string[]).includes(parts[0])) {
        throw new Error(
          `Post "${entry}" must live at <section>/<topic>/<slug>.md with section one of: ${SECTION_KEYS.join(', ')}`,
        );
      }
      return id;
    },
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.coerce.date(),
        tags: z.array(z.enum(TAGS)).default([]),
        draft: z.boolean().default(false),
        image: image().optional(),
      })
      .strict(),
});

export const collections = { posts };
