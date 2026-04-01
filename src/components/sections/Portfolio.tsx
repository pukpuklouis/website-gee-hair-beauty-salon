import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PortfolioItem {
	id: number;
	image: string;
	title: string;
	stylist: string;
	color: string;
	category: string;
}

const portfolioItems: PortfolioItem[] = [
	{
		id: 1,
		image: "/portfolio1.jpg",
		title: "青木棕波浪捲",
		stylist: "Michael",
		color: "#4A6741",
		category: "long",
	},
	{
		id: 2,
		image: "/portfolio2.jpg",
		title: "冷棕茶短髮",
		stylist: "Sarah",
		color: "#5C4A3A",
		category: "short",
	},
	{
		id: 3,
		image: "/portfolio3.jpg",
		title: "微醺蜜粉層次",
		stylist: "Tina",
		color: "#D4A5A5",
		category: "color",
	},
	{
		id: 4,
		image: "/portfolio4.jpg",
		title: "韓系紋理燙",
		stylist: "Michael",
		color: "#3D3229",
		category: "men",
	},
	{
		id: 5,
		image: "/portfolio5.jpg",
		title: "灰霧感大捲",
		stylist: "Jessica",
		color: "#6B5B5B",
		category: "long",
	},
	{
		id: 6,
		image: "/portfolio6.jpg",
		title: "焦糖棕肩上短",
		stylist: "Sarah",
		color: "#8B5A2B",
		category: "short",
	},
	{
		id: 7,
		image: "/portfolio7.jpg",
		title: "法式金邊美甲",
		stylist: "Tina",
		color: "#E8D4D4",
		category: "nail",
	},
	{
		id: 8,
		image: "/portfolio8.jpg",
		title: "光線染漸層",
		stylist: "Jessica",
		color: "#A67B5B",
		category: "color",
	},
];

const categories = [
	{ id: "all", label: "全部" },
	{ id: "long", label: "長髮" },
	{ id: "short", label: "短髮" },
	{ id: "color", label: "染髮" },
	{ id: "men", label: "男士" },
	{ id: "nail", label: "美甲" },
];

export default function Portfolio() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [activeCategory, setActiveCategory] = useState("all");
	const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const filteredItems =
		activeCategory === "all"
			? portfolioItems
			: portfolioItems.filter((item) => item.category === activeCategory);

	// Split items into columns for masonry effect
	const columns: PortfolioItem[][] = [[], [], []];
	filteredItems.forEach((item, index) => {
		columns[index % 3].push(item);
	});

	return (
		<section
			ref={sectionRef}
			id="portfolio"
			className="relative py-24 lg:py-32 bg-[hsl(var(--warm-beige))] overflow-hidden"
		>
			<div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
				{/* Section Header */}
				<div className="text-center mb-12">
					<div
						className={`flex items-center justify-center gap-3 mb-6 transition-all duration-1000 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						<div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
						<span className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-bronze))]">
							Portfolio
						</span>
						<div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
					</div>

					<h2
						className={`text-4xl lg:text-5xl font-medium text-[hsl(var(--deep-espresso))] mb-4 transition-all duration-1000 delay-100 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						我們的作品
					</h2>

					<p
						className={`text-[hsl(var(--deep-espresso))]/70 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						每一個作品都是設計師與客人共同創作的藝術品
					</p>
				</div>

				{/* Category Filter */}
				<div
					className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-300 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
				>
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => setActiveCategory(category.id)}
							className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
								activeCategory === category.id
									? "bg-[hsl(var(--muted-bronze))] text-white"
									: "bg-white/60 text-[hsl(var(--muted-bronze))] hover:bg-white hover:shadow-md"
							}`}
						>
							{category.label}
						</button>
					))}
				</div>

				{/* Masonry Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
					{columns.map((column, columnIndex) => (
						<div
							key={columnIndex}
							className="flex flex-col gap-4 lg:gap-6"
							style={{
								marginTop: columnIndex === 1 ? "2rem" : columnIndex === 2 ? "1rem" : "0",
							}}
						>
							{column.map((item, itemIndex) => (
								<div
									key={item.id}
									className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-custom-expo ${
										isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
									}`}
									style={{
										transitionDelay: `${400 + (columnIndex * 3 + itemIndex) * 100}ms`,
									}}
									onClick={() => setSelectedItem(item)}
								>
									<div className="relative aspect-[3/4]">
										<img
											src={item.image}
											alt={item.title}
											className="w-full h-full object-cover transition-transform duration-700 ease-custom-expo group-hover:scale-110"
										/>

										{/* Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

										{/* Content */}
										<div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-custom-expo">
											<h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
											<div className="flex items-center gap-3">
												<span className="text-sm text-white/80">設計師: {item.stylist}</span>
												<div
													className="w-4 h-4 rounded-full border-2 border-white/50"
													style={{ backgroundColor: item.color }}
												/>
											</div>
										</div>

										{/* Color Tag */}
										<div
											className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white/70 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
											style={{ backgroundColor: item.color }}
										/>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			{/* Detail Dialog */}
			<Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
				<DialogContent className="max-w-3xl p-0 overflow-hidden bg-white">
					{selectedItem && (
						<div className="grid md:grid-cols-2">
							<div className="aspect-square md:aspect-auto">
								<img
									src={selectedItem.image}
									alt={selectedItem.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-8 flex flex-col justify-center">
								<h3 className="text-2xl font-medium text-[hsl(var(--deep-espresso))] mb-2">
									{selectedItem.title}
								</h3>
								<div className="flex items-center gap-3 mb-6">
									<span className="text-[hsl(var(--muted-bronze))]">
										設計師: {selectedItem.stylist}
									</span>
									<div
										className="w-5 h-5 rounded-full border-2 border-[hsl(var(--muted-bronze))]/30"
										style={{ backgroundColor: selectedItem.color }}
									/>
								</div>
								<p className="text-[hsl(var(--deep-espresso))]/70 mb-6">
									這款髮色/造型完美呈現了韓系美學的精髓，適合追求時尚與質感的您。
								</p>
								<div className="flex gap-3">
									<button
										className="flex-1 py-3 px-6 bg-[hsl(var(--muted-bronze))] text-white rounded-full hover:bg-[hsl(var(--deep-espresso))] transition-colors"
										onClick={() => {
											setSelectedItem(null);
											document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
										}}
									>
										預約同款
									</button>
								</div>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</section>
	);
}
