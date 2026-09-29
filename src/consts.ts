// TODO: fill in site identity.
export const SITE_TITLE = 'TODO: site title';
export const SITE_DESCRIPTION = 'TODO: one-line site description';
export const AUTHOR = 'TODO: your name';

export const SECTIONS = {
  tech: {
    title: 'Tech',
    blurb: 'TODO: one-line description of the Tech section',
  },
  spiritual: {
    title: 'Spiritual',
    blurb: 'TODO: one-line description of the Spiritual section',
  },
} as const;

export type Section = keyof typeof SECTIONS;
export const SECTION_KEYS = Object.keys(SECTIONS) as Section[];
