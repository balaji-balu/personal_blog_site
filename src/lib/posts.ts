import { getCollection, type CollectionEntry } from 'astro:content';
import type { Section } from '../consts';

export type Post = CollectionEntry<'posts'>;

export const sectionOf = (post: Post) => post.id.split('/')[0] as Section;
export const topicOf = (post: Post) => post.id.split('/')[1];
export const urlOf = (post: Post) => `/${post.id}`;

/** Published posts only (drafts excluded everywhere), newest first. */
export async function getPosts(section?: Section): Promise<Post[]> {
  const posts = await getCollection(
    'posts',
    (p) => !p.data.draft && (!section || sectionOf(p) === section),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
