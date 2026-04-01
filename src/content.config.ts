import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().nullish(),
		subtitle: z.string().optional(),
		excerpt: z.string().optional(),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		author: z.string().optional(),
		authorImage: z.string().optional(),
		readTime: z.string().optional(),
	}),
});

const page = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/page" }),
	schema: z.object({
		seoTitle: z.string(),
		body: z.any(),
	}),
});

export const collections = { blog, page };
