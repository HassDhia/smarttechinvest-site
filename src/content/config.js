import { defineCollection, z } from 'astro:content';

const venturesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string(),
    year: z.string(),
    website: z.string().url(),
  })
});

export const collections = {
  'ventures': venturesCollection
};
