import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { BlogQuery, BlogQueryVariables } from "../../tina/__generated__/types";
import FormattedDate from "./react/FormattedDate";

interface BlogPostRendererProps {
	data: BlogQuery;
	query: string;
	variables: BlogQueryVariables;
	relatedPosts?: Array<{
		id: string;
		data: {
			title?: string | null;
			heroImage?: string | null;
			category?: string | null;
			pubDate: string;
		};
	}>;
}

export default function BlogPostRenderer({
	data,
	query,
	variables,
	relatedPosts = [],
}: BlogPostRendererProps) {
	const { data: liveData } = useTina({
		query,
		variables,
		data,
	});

	const blog = liveData.blog;
	const blogTitle = blog.title || "Blog Post";

	return (
		<div className="min-h-screen bg-[hsl(var(--warm-beige))] pt-16 lg:pt-20">
			<section className="relative">
				<div
					data-tina-field={tinaField(blog, "heroImage")}
					className="aspect-[21/9] lg:aspect-[3/1] overflow-hidden"
				>
					{blog.heroImage && (
						<img src={blog.heroImage} alt={blogTitle} className="w-full h-full object-cover" />
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--warm-beige))] via-transparent to-transparent"></div>
				</div>
			</section>

			<article className="relative -mt-20 lg:-mt-48 z-10">
				<div className="px-6 sm:px-8 lg:px-16 xl:px-24">
					<div className="max-w-3xl mx-auto">
						<a
							href="/blog"
							className="inline-flex items-center gap-2 mb-6 text-sm text-[hsl(var(--deep-espresso))]/60 hover:text-[hsl(var(--muted-bronze))] transition-colors"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								></path>
							</svg>
							返回日誌
						</a>
						<div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-8">
							<div className="flex flex-wrap items-center gap-4 mb-6">
								{blog.category && (
									<span
										data-tina-field={tinaField(blog, "category")}
										className="px-4 py-1.5 bg-[hsl(var(--blush-mist))]/10 rounded-full text-sm text-[hsl(var(--blush-mist))]"
									>
										{blog.category}
									</span>
								)}
								<div className="flex items-center gap-4 text-sm text-[hsl(var(--deep-espresso))]/60">
									{blog.pubDate && (
										<span
											className="flex items-center gap-1.5"
											data-tina-field={tinaField(blog, "pubDate")}
										>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M8 7V3m8 4V3m-6 8h8m-8 4h8m-4-4v4m0 0v4m0-4h4m-4 0H8m8 0h4m-4 0v4m0-4V8m0 8v4m0-4h4m-4 0H8"
												></path>
											</svg>
											<FormattedDate date={blog.pubDate} />
										</span>
									)}
									{blog.readTime && (
										<span
											data-tina-field={tinaField(blog, "readTime")}
											className="flex items-center gap-1.5"
										>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
												></path>
											</svg>
											{blog.readTime}
										</span>
									)}
								</div>
							</div>

							<h1
								data-tina-field={tinaField(blog, "title")}
								className="text-3xl lg:text-4xl font-medium text-[hsl(var(--deep-espresso))] mb-4 leading-tight"
							>
								{blogTitle}
							</h1>

							{blog.subtitle && (
								<p
									data-tina-field={tinaField(blog, "subtitle")}
									className="text-lg text-[hsl(var(--muted-bronze))] mb-6"
								>
									{blog.subtitle}
								</p>
							)}

							<div className="flex items-center gap-4 pt-6 border-t border-[hsl(var(--muted-bronze))]/10">
								<div data-tina-field={tinaField(blog, "authorImage")}>
									{blog.authorImage ? (
										<img
											src={blog.authorImage}
											alt={blog.author || "Gee Hair"}
											className="w-12 h-12 rounded-full object-cover bg-[hsl(var(--warm-beige))]"
										/>
									) : (
										<div className="w-12 h-12 rounded-full bg-[hsl(var(--warm-beige))] flex items-center justify-center text-[hsl(var(--muted-bronze))] font-medium">
											G
										</div>
									)}
								</div>
								<div>
									<p
										data-tina-field={tinaField(blog, "author")}
										className="font-medium text-[hsl(var(--deep-espresso)]"
									>
										{blog.author || "Gee Hair"}
									</p>
									<p className="text-sm text-[hsl(var(--deep-espresso))]/60">專業設計師</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12 mb-12">
							<div
								data-tina-field={tinaField(blog, "body")}
								className="prose prose-lg max-w-none prose-headings:text-[hsl(var(--deep-espresso))] prose-p:text-[hsl(var(--deep-espresso))]/80 prose-strong:text-[hsl(var(--deep-espresso))] prose-li:text-[hsl(var(--deep-espresso))]/80 prose-a:text-[hsl(var(--muted-bronze))] prose-a:no-underline hover:prose-a:underline"
							>
								<TinaMarkdown content={blog.body} />
							</div>

							{blog.tags && blog.tags.length > 0 && (
								<div className="mt-12 pt-8 border-t border-[hsl(var(--muted-bronze))]/10">
									<div data-tina-field={tinaField(blog, "tags")} className="flex flex-wrap gap-2">
										{blog.tags.filter(Boolean).map((tag) => (
											<span
												key={tag}
												className="px-4 py-2 bg-[hsl(var(--warm-beige))] rounded-full text-sm text-[hsl(var(--muted-bronze))]"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							)}
						</div>

						<div className="bg-gradient-to-br from-[hsl(var(--muted-bronze))] to-[hsl(var(--deep-espresso))] rounded-2xl p-8 lg:p-12 text-white text-center mb-16">
							<h3 className="text-2xl font-medium mb-4">喜歡這篇文章嗎？</h3>
							<p className="text-white/80 mb-6 max-w-lg mx-auto">
								歡迎預約我們的服務，讓專業設計師為你打造專屬造型
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<a
									href="/?scrollTo=booking"
									className="px-8 py-3 bg-white text-[hsl(var(--deep-espresso))] rounded-full font-medium hover:bg-white/90 transition-colors"
								>
									立即預約
								</a>
								<a
									href="/blog"
									className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
								>
									查看更多文章
								</a>
							</div>
						</div>
					</div>
				</div>
			</article>

			{relatedPosts.length > 0 && (
				<section className="py-16 lg:py-24 bg-[hsl(var(--soft-cream))]">
					<div className="px-6 sm:px-8 lg:px-16 xl:px-24">
						<div className="max-w-6xl mx-auto">
							<h2 className="text-2xl lg:text-3xl font-medium text-[hsl(var(--deep-espresso))] mb-8">
								更多相關文章
							</h2>
							<div className="grid md:grid-cols-3 gap-6">
								{relatedPosts.map((relatedPost) => (
									<a
										key={relatedPost.id}
										href={`/blog/${relatedPost.id}/`}
										className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
									>
										<div className="relative aspect-[16/10] overflow-hidden">
											{relatedPost.data.heroImage && (
												<img
													src={relatedPost.data.heroImage}
													alt={relatedPost.data.title || "Blog post"}
													className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
													loading="lazy"
												/>
											)}
										</div>
										<div className="p-6">
											{relatedPost.data.category && (
												<span className="text-xs text-[hsl(var(--muted-bronze))] mb-2 block">
													{relatedPost.data.category}
												</span>
											)}
											<h3 className="font-medium text-[hsl(var(--deep-espresso))] group-hover:text-[hsl(var(--muted-bronze))] transition-colors line-clamp-2">
												{relatedPost.data.title || "Untitled"}
											</h3>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
