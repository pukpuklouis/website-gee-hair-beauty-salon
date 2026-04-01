import { defineConfig } from "tinacms";
import { BlogCollection } from "./collections/blog";
import { GlobalConfigCollection } from "./collections/global-config";
import { PageCollection } from "./collections/page";

// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
	branch,

	// Get this from tina.io
	clientId: process.env.PUBLIC_TINA_CLIENT_ID,
	// Get this from tina.io
	token: process.env.TINA_TOKEN,

	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			mediaRoot: "",
			publicFolder: "public",
		},
	},
	// See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
	schema: {
		collections: [BlogCollection, PageCollection, GlobalConfigCollection],
	},
	// TinaCMS Search Configuration
	// Docs: https://tina.io/docs/reference/search/overview
	search: {
		tina: {
			// Required: Get this from app.tina.io → Project → API Tokens → Search Indexer Token
			indexerToken: process.env.TINA_SEARCH_TOKEN,
			// Stopword languages for filtering common words (default: ['eng'])
			// For Chinese content, consider removing or using minimal stopwords
			stopwordLanguages: ["eng"],
			// Fuzzy search enabled by default (tinacms@3.3.0+)
			fuzzyEnabled: true,
			fuzzyOptions: {
				maxDistance: 2, // Max edit distance for typos (0-10)
				minSimilarity: 0.6, // Min similarity score (0-1)
				maxTermExpansions: 10, // Max similar terms per word
				useTranspositions: true, // Allow letter swaps (e.g., "teh" → "the")
			},
		},
		// Number of documents indexed per batch
		indexBatchSize: 100,
		// Max characters indexed per text field
		maxSearchIndexFieldLength: 100,
	},
});
