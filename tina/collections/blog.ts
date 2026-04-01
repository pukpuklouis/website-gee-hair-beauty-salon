import type { Collection } from "tinacms";

export const BlogCollection: Collection = {
	name: "blog",
	label: "Blogs",
	path: "src/content/blog",
	format: "mdx",
	ui: {
		router({ document }) {
			return `/blog/${document._sys.filename}`;
		},
	},
	fields: [
		{
			type: "string",
			name: "title",
			label: "Title",
			isTitle: true,
			required: true,
		},
		{
			name: "description",
			label: "Description",
			type: "string",
		},
		{
			name: "subtitle",
			label: "Subtitle",
			type: "string",
		},
		{
			name: "excerpt",
			label: "Excerpt",
			type: "string",
		},
		{
			name: "category",
			label: "Category",
			type: "string",
			options: ["染髮趨勢", "護髮知識", "髮型趨勢", "美甲趨勢", "造型教學"],
		},
		{
			name: "tags",
			label: "Tags",
			type: "string",
			list: true,
		},
		{
			name: "author",
			label: "Author",
			type: "string",
		},
		{
			name: "authorImage",
			label: "Author Image",
			type: "image",
		},
		{
			name: "readTime",
			label: "Read Time",
			type: "string",
		},
		{
			name: "pubDate",
			label: "Publication Date",
			type: "datetime",
		},
		{
			name: "updatedDate",
			label: "Updated Date",
			type: "datetime",
		},
		{
			name: "heroImage",
			label: "Hero Image",
			type: "image",
		},
		{
			type: "rich-text",
			name: "body",
			label: "Body",
			isBody: true,
		},
	],
};
