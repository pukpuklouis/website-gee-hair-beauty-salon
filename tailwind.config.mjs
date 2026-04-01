/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
				// Gee Hair Salon Brand Colors
				"warm-beige": "hsl(var(--warm-beige))",
				"soft-cream": "hsl(var(--soft-cream))",
				"blush-mist": "hsl(var(--blush-mist))",
				"muted-bronze": "hsl(var(--muted-bronze))",
				"deep-espresso": "hsl(var(--deep-espresso))",
				"soft-gold": "hsl(var(--soft-gold))",
				"misty-pink": "hsl(var(--misty-pink))",
				"green-bronze": "hsl(var(--green-bronze))",
				"cool-tea": "hsl(var(--cool-tea))",
			},
			borderRadius: {
				xl: "calc(var(--radius) + 4px)",
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				xs: "calc(var(--radius) - 6px)",
			},
			boxShadow: {
				xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
				// Custom animations from src/index.css
				fadeInUp: {
					from: { opacity: "0", transform: "translateY(30px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				fadeIn: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				slideInLeft: {
					from: { opacity: "0", transform: "translateX(-50px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				slideInRight: {
					from: { opacity: "0", transform: "translateX(50px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				scaleIn: {
					from: { opacity: "0", transform: "scale(0.9)" },
					to: { opacity: "1", transform: "scale(1)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				marquee: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
				// Custom animations
				fadeInUp: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				fadeIn: "fadeIn 0.6s ease forwards",
				slideInLeft: "slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				slideInRight: "slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				scaleIn: "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				float: "float 3s ease-in-out infinite",
				marquee: "marquee 30s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
