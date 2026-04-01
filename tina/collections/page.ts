import type { Collection } from "tinacms";

export const PageCollection: Collection = {
	name: "page",
	label: "Pages",
	path: "src/content/page",
	format: "mdx",
	ui: {
		router: ({ document }) => {
			// Home page routes to root
			if (document._sys.filename === "home") {
				return "/";
			}
			// Other pages route by filename
			return `/${document._sys.filename}`;
		},
	},
	fields: [
		{
			name: "seoTitle",
			type: "string",
			label: "SEO Title",
			required: true,
		},
		// Hero Section
		{
			name: "hero",
			type: "object",
			label: "Hero Section",
			fields: [
				{
					name: "brandTag",
					type: "string",
					label: "Brand Tag",
					description: "Location tag shown above title (e.g., 台北大安區)",
				},
				{
					name: "title",
					type: "string",
					label: "Title",
					description: "Main hero title (logo image path or text)",
				},
				{
					name: "subtitle",
					type: "string",
					label: "Subtitle",
					description: "Subtitle shown below the title",
				},
				{
					name: "tagline",
					type: "string",
					label: "Tagline",
					description: "Main tagline text",
				},
				{
					name: "description",
					type: "string",
					label: "Description",
					ui: { component: "textarea" },
				},
				{
					name: "primaryCta",
					type: "string",
					label: "Primary CTA Text",
					description: "Primary call-to-action button text",
				},
				{
					name: "secondaryCta",
					type: "string",
					label: "Secondary CTA Text",
					description: "Secondary call-to-action button text",
				},
				{
					name: "tags",
					type: "string",
					label: "Hero Tags",
					list: true,
					description: "Tags displayed below the CTA buttons",
				},
				{
					name: "backgroundImage",
					type: "image",
					label: "Background Image",
				},
			],
		},
		// About Section
		{
			name: "about",
			type: "object",
			label: "About Section",
			fields: [
				{
					name: "label",
					type: "string",
					label: "Section Label",
					description: "Label shown above title (e.g., About Us)",
				},
				{
					name: "title",
					type: "string",
					label: "Title",
				},
				{
					name: "description1",
					type: "string",
					label: "Description Paragraph 1",
					ui: { component: "textarea" },
				},
				{
					name: "description2",
					type: "string",
					label: "Description Paragraph 2",
					ui: { component: "textarea" },
				},
				{
					name: "image",
					type: "image",
					label: "Section Image",
				},
				{
					name: "ratingBadge",
					type: "object",
					label: "Rating Badge",
					fields: [
						{ name: "rating", type: "string", label: "Rating" },
						{ name: "text", type: "string", label: "Badge Text" },
					],
				},
				{
					name: "features",
					type: "object",
					label: "Features",
					list: true,
					fields: [
						{ name: "title", type: "string", label: "Feature Title" },
						{ name: "description", type: "string", label: "Feature Description" },
					],
				},
			],
		},
		// Services Section
		{
			name: "services",
			type: "object",
			label: "Services Section",
			fields: [
				{
					name: "label",
					type: "string",
					label: "Section Label",
				},
				{
					name: "title",
					type: "string",
					label: "Section Title",
				},
				{
					name: "description",
					type: "string",
					label: "Section Description",
				},
				{
					name: "items",
					type: "object",
					label: "Service Items",
					list: true,
					fields: [
						{ name: "id", type: "string", label: "Service ID" },
						{ name: "title", type: "string", label: "Service Title" },
						{ name: "subtitle", type: "string", label: "Service Subtitle" },
						{
							name: "description",
							type: "string",
							label: "Service Description",
							ui: { component: "textarea" },
						},
						{ name: "image", type: "image", label: "Service Image" },
						{ name: "icon", type: "string", label: "Icon Name" },
						{ name: "tags", type: "string", label: "Service Tags", list: true },
					],
				},
			],
		},
		// Portfolio Section
		{
			name: "portfolio",
			type: "object",
			label: "Portfolio Section",
			fields: [
				{
					name: "label",
					type: "string",
					label: "Section Label",
				},
				{
					name: "title",
					type: "string",
					label: "Section Title",
				},
				{
					name: "description",
					type: "string",
					label: "Section Description",
				},
				{
					name: "categories",
					type: "object",
					label: "Categories",
					list: true,
					fields: [
						{ name: "id", type: "string", label: "Category ID" },
						{ name: "label", type: "string", label: "Category Label" },
					],
				},
				{
					name: "items",
					type: "object",
					label: "Portfolio Items",
					list: true,
					fields: [
						{ name: "id", type: "string", label: "Item ID" },
						{ name: "image", type: "image", label: "Portfolio Image" },
						{ name: "title", type: "string", label: "Item Title" },
						{ name: "stylist", type: "string", label: "Stylist Name" },
						{ name: "color", type: "string", label: "Hair Color" },
						{ name: "category", type: "string", label: "Category" },
					],
				},
			],
		},
		// Designers Section
		{
			name: "designers",
			type: "object",
			label: "Designers Section",
			fields: [
				{
					name: "label",
					type: "string",
					label: "Section Label",
				},
				{
					name: "title",
					type: "string",
					label: "Section Title",
				},
				{
					name: "description",
					type: "string",
					label: "Section Description",
				},
				{
					name: "items",
					type: "object",
					label: "Designers",
					list: true,
					fields: [
						{ name: "id", type: "string", label: "Designer ID" },
						{ name: "name", type: "string", label: "Name" },
						{ name: "englishName", type: "string", label: "English Name" },
						{ name: "image", type: "image", label: "Designer Photo" },
						{ name: "title", type: "string", label: "Job Title" },
						{ name: "specialties", type: "string", label: "Specialties", list: true },
						{ name: "experience", type: "string", label: "Experience" },
						{ name: "description", type: "string", label: "Description" },
					],
				},
			],
		},
		// Testimonials Section
		{
			name: "testimonials",
			type: "object",
			label: "Testimonials Section",
			fields: [
				{
					name: "label",
					type: "string",
					label: "Section Label",
				},
				{
					name: "title",
					type: "string",
					label: "Section Title",
				},
				{
					name: "ratingText",
					type: "string",
					label: "Rating Text",
					description: "Text shown with rating stars",
				},
				{
					name: "description",
					type: "string",
					label: "Section Description",
				},
				{
					name: "items",
					type: "object",
					label: "Testimonials",
					list: true,
					fields: [
						{ name: "id", type: "string", label: "Testimonial ID" },
						{ name: "name", type: "string", label: "Customer Name" },
						{ name: "avatar", type: "image", label: "Customer Avatar" },
						{ name: "rating", type: "number", label: "Rating (1-5)" },
						{
							name: "content",
							type: "string",
							label: "Testimonial Content",
							ui: { component: "textarea" },
						},
						{ name: "service", type: "string", label: "Service Type" },
						{ name: "designer", type: "string", label: "Designer Name" },
					],
				},
			],
		},
		// Booking Section
		{
			name: "booking",
			type: "object",
			label: "Booking Section",
			fields: [
				{
					name: "label",
					type: "string",
					label: "Section Label",
				},
				{
					name: "title",
					type: "string",
					label: "Section Title",
				},
				{
					name: "description",
					type: "string",
					label: "Section Description",
				},
				{
					name: "lineUrl",
					type: "string",
					label: "LINE Booking URL",
				},
				{
					name: "lineTitle",
					type: "string",
					label: "LINE Booking Title",
				},
				{
					name: "lineDescription",
					type: "string",
					label: "LINE Booking Description",
				},
				{
					name: "lineButtonText",
					type: "string",
					label: "LINE Button Text",
				},
				{
					name: "phoneTitle",
					type: "string",
					label: "Phone Booking Title",
				},
				{
					name: "phoneSubtitle",
					type: "string",
					label: "Phone Booking Subtitle",
				},
				{
					name: "phoneDescription",
					type: "string",
					label: "Phone Booking Description",
				},
				{
					name: "phoneNumber",
					type: "string",
					label: "Phone Number",
				},
				{
					name: "address",
					type: "string",
					label: "Address",
				},
				{
					name: "addressNote",
					type: "string",
					label: "Address Note",
				},
				{
					name: "mapUrl",
					type: "string",
					label: "Google Maps URL",
				},
				{
					name: "hours",
					type: "object",
					label: "Business Hours",
					list: true,
					fields: [
						{ name: "days", type: "string", label: "Days" },
						{ name: "hours", type: "string", label: "Hours" },
					],
				},
				{
					name: "closedDays",
					type: "string",
					label: "Closed Days",
				},
				{
					name: "paymentMethod",
					type: "string",
					label: "Payment Method",
				},
				{
					name: "note",
					type: "string",
					label: "Booking Note",
				},
			],
		},
	],
};
