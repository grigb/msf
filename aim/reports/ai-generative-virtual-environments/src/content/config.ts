/**
 * Astro Content Collections Configuration
 * Defines the schema for MDX pages in the site
 */
import { defineCollection, z } from 'astro:content';

/**
 * Pages collection - all MDX content pages
 * Located in src/content/pages/
 */
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Page title (required)
    title: z.string(),

    // Page description for SEO
    description: z.string().optional(),

    // Section identifier for navigation
    section: z.string().optional(),

    // Order within section for navigation
    order: z.number().optional(),

    // Draft status - exclude from production build
    draft: z.boolean().optional().default(false),

    // Last updated date
    lastUpdated: z.date().optional(),

    // Related pages (by slug)
    related: z.array(z.string()).optional(),

    // Tags for categorization
    tags: z.array(z.string()).optional(),

    // Hero image for the page
    image: z.string().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
};
