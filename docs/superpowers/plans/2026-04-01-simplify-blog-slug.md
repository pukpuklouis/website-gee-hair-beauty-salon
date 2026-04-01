# Blog Slug Page Simplification Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `src/pages/blog/[...slug].astro` to use pure TinaCMS visual editing, removing all Astro content collection fallback logic.

**Architecture:** `[...slug].astro` fetches data from TinaCMS client in the frontmatter, then delegates 100% of rendering to `BlogPostRenderer.tsx` via `client:tina`. No hybrid logic, no fallbacks, no debug logs. `BlogPostRenderer.tsx` is already correct and requires no changes.

**Tech Stack:** Astro 6.x, TinaCMS 3.x, `client:tina` directive, `useTina` hook, `tinaField` helper

---

## Files

| Action | File | Role |
|--------|------|------|
| **Rewrite** | `src/pages/blog/[...slug].astro` | Pure TinaCMS data-fetching + render delegation |
| **No change** | `src/components/BlogPostRenderer.tsx` | Already correct — `useTina` + `tinaField` |
| **No change** | `tina/collections/blog.ts` | `ui.router` already configured |

---

## Task 1: Rewrite `[...slug].astro`

**Files:**
- Modify: `src/pages/blog/[...slug].astro`

### What to remove
- All Astro `getCollection` / content collection imports and logic
- The `useTina`/`actuallyUseTina` hybrid branching
- All debug `console.log` statements
- The entire inline fallback HTML (lines ~225–458)
- Unused variables: `fallbackPost`, `fallbackContent`, `fallbackRelatedPosts`, `postData`, `postQuery`, `postVariables`

### What to keep
- `BaseLayout`, `SEO`, `Schema` imports and usage (SEO/meta layer stays in Astro)
- TinaCMS `client` import and queries
- `BlogPostRenderer` with `client:tina`

---

- [ ] **Step 1: Rewrite the file**

Replace the entire file with this clean implementation:

```astro
---
import { client } from "../../../tina/__generated__/client";
import type { BlogQuery, BlogQueryVariables } from "../../../tina/__generated__/types";
import BaseLayout from "../../layouts/BaseLayout.astro";
import SEO from "../../components/SEO.astro";
import Schema from "../../components/Schema.astro";
import BlogPostRenderer from "../../components/BlogPostRenderer";

export async function getStaticPaths() {
  const response = await client.queries.blogConnection();
  return (
    response.data?.blogConnection?.edges
      ?.filter((edge): edge is NonNullable<typeof edge> => edge != null)
      .map((edge) => ({
        params: { slug: edge.node!._sys.filename },
      })) ?? []
  );
}

const { slug } = Astro.params;

const response = await client.queries.blog({
  relativePath: `${slug}.mdx`,
});

const { data, query, variables } = response;
const blog = data.blog;

// Fetch related posts (exclude current)
const relatedResponse = await client.queries.blogConnection();
const relatedPosts = (
  relatedResponse.data?.blogConnection?.edges
    ?.filter((edge): edge is NonNullable<typeof edge> => edge != null)
    .filter((edge) => edge.node!._sys.filename !== slug)
    .sort((a, b) => {
      const dateA = a.node!.pubDate ? new Date(a.node!.pubDate).getTime() : 0;
      const dateB = b.node!.pubDate ? new Date(b.node!.pubDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3)
    .map((edge) => ({
      id: edge.node!._sys.filename,
      data: {
        title: edge.node!.title,
        heroImage: edge.node!.heroImage,
        category: edge.node!.category,
        pubDate: edge.node!.pubDate ?? "",
      },
    })) ?? []
);

const seoTitle = blog.title ?? "Blog Post";
const seoDescription = blog.description ?? "";
const seoHeroImage = blog.heroImage ?? undefined;
const seoPubDate = blog.pubDate ?? "";
const seoAuthor = blog.author ?? undefined;
---

<BaseLayout title={`${seoTitle} | Gee Hair Salon`} description={seoDescription}>
  <SEO
    title={`${seoTitle} | Gee Hair Salon`}
    description={seoDescription}
    image={seoHeroImage}
    type="article"
  />

  <Schema
    type="Article"
    title={seoTitle}
    description={seoDescription}
    image={seoHeroImage}
    publishedDate={seoPubDate}
    author={seoAuthor}
  />

  <BlogPostRenderer
    client:tina
    data={data}
    query={query}
    variables={variables}
    relatedPosts={relatedPosts}
  />
</BaseLayout>
```

- [ ] **Step 2: Verify the build compiles**

```bash
cd /Users/pukpuk/Dev/website-gee-hair-beauty-salon
rtk pnpm build
```

Expected: Build completes without TypeScript or Astro errors.

If build errors occur related to unused deleted imports, confirm the removed imports (`getCollection`, `render`, `FormattedDate`) are fully gone from the file.

- [ ] **Step 3: Verify dev server + visual editing**

```bash
pnpm dev
```

Open `http://localhost:4321/admin/index.html` → navigate to Blogs collection → click a blog post → confirm it opens in visual editing mode with click-to-edit outlines.

Open a blog post directly (e.g. `http://localhost:4321/blog/some-slug`) → confirm it renders correctly.

- [ ] **Step 4: Commit**

```bash
rtk git add src/pages/blog/[...slug].astro
rtk git commit -m "refactor(blog): replace hybrid content collection with pure TinaCMS visual editing"
```

---

## Deleted files (from git status)

The following deleted files in git status are safe to leave deleted — they were old admin page components that have been superseded:

- `tina/pages/AdminBlogPost.tsx`
- `tina/pages/HomePage.tsx`
- `tina/pages/Page.tsx`

These are already deleted. No action needed.

---

## Verification Checklist

- [ ] `[...slug].astro` has zero references to `getCollection`, `render`, `astro:content`
- [ ] No `console.log` / debug statements remain
- [ ] No inline fallback HTML (the `<!-- Fallback: ... -->` block is gone)
- [ ] Build passes
- [ ] Blog posts render in browser
- [ ] Visual editing works in `/admin/index.html`
