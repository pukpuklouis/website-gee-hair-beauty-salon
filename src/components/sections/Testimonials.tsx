import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
	id: number;
	name: string;
	avatar: string;
	rating: number;
	content: string;
	service: string;
	designer: string;
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "林雨萱",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1&backgroundColor=ffdfbf",
		rating: 5,
		content:
			"Michael 設計師真的超級細心！這次做的光線染效果超滿意，朋友們都說很好看。環境也很舒服，會再回訪！",
		service: "光線染",
		designer: "Michael",
	},
	{
		id: 2,
		name: "陳嘉明",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2&backgroundColor=c0aede",
		rating: 5,
		content:
			"第一次來就愛上這裡的氛圍，Sarah 幫我設計的韓系短髮超適合我，打理也很方便。推薦給所有男生！",
		service: "韓系短髮",
		designer: "Sarah",
	},
	{
		id: 3,
		name: "王美玲",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3&backgroundColor=ffd5dc",
		rating: 5,
		content:
			"京喚羽護髮超厲害！原本毛躁的頭髮變得超柔順，Tina 還教了我很多居家保養的小技巧，超貼心！",
		service: "京喚羽護髮",
		designer: "Tina",
	},
	{
		id: 4,
		name: "李思婷",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4&backgroundColor=b6e3f4",
		rating: 5,
		content: "Jessica 幫我染的微醺蜜粉色超美！顏色很持久，洗了幾次還是很漂亮。店裡的氛圍也很放鬆～",
		service: "微醺蜜粉染",
		designer: "Jessica",
	},
	{
		id: 5,
		name: "張志偉",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5&backgroundColor=d1d4f9",
		rating: 5,
		content:
			"來 Gee 做頭髮已經三年了，每次都很滿意。設計師們都很專業，會給最適合的建議，不會亂推銷。",
		service: "紋理燙",
		designer: "Michael",
	},
	{
		id: 6,
		name: "劉雅琪",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6&backgroundColor=ffdfbf",
		rating: 5,
		content: "美甲服務也超棒！Tina 做的法式美甲精緻又持久，價格也很合理。已經推薦給好幾個朋友了！",
		service: "法式美甲",
		designer: "Tina",
	},
];

export default function Testimonials() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

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

	return (
		<section
			ref={sectionRef}
			id="testimonials"
			className="relative py-24 lg:py-32 bg-[hsl(var(--warm-beige))] overflow-hidden"
		>
			{/* Background Decoration */}
			<div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[hsl(var(--soft-gold))]/5 to-transparent pointer-events-none" />

			<div className="relative z-10">
				{/* Section Header */}
				<div className="text-center mb-16 px-6 sm:px-8 lg:px-16 xl:px-24">
					<div
						className={`flex items-center justify-center gap-3 mb-6 transition-all duration-1000 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						<div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
						<span className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-bronze))]">
							Testimonials
						</span>
						<div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
					</div>

					<h2
						className={`text-4xl lg:text-5xl font-medium text-[hsl(var(--deep-espresso))] mb-4 transition-all duration-1000 delay-100 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						客戶心聲
					</h2>

					<div
						className={`flex items-center justify-center gap-2 mb-4 transition-all duration-1000 delay-200 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={`star-header-${i}`}
									className="w-5 h-5 fill-[hsl(var(--soft-gold))] text-[hsl(var(--soft-gold))]"
								/>
							))}
						</div>
						<span className="text-[hsl(var(--deep-espresso))]/70">Google Maps 5.0 評價</span>
					</div>

					<p
						className={`text-[hsl(var(--deep-espresso))]/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
							isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}
					>
						超過 500+ 位顧客的真實回饋，是我們前進的動力
					</p>
				</div>

				{/* Desktop Carousel */}
				<div
					className={`hidden lg:block px-12 xl:px-24 transition-all duration-1000 delay-400 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
				>
					<Carousel
						opts={{
							align: "start",
							loop: true,
						}}
						className="w-full"
					>
						<CarouselContent className="-ml-4">
							{testimonials.map((testimonial) => (
								<CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
									<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
										{/* Quote Icon */}
										<Quote className="w-8 h-8 text-[hsl(var(--blush-mist))]/30 mb-4" />

										{/* Content */}
										<p className="text-[hsl(var(--deep-espresso))]/80 leading-relaxed mb-6">
											"{testimonial.content}"
										</p>

										{/* Rating */}
										<div className="flex gap-1 mb-4">
											{[...Array(testimonial.rating)].map((_, i) => (
												<Star
													key={`star-${testimonial.id}-${i}`}
													className="w-4 h-4 fill-[hsl(var(--soft-gold))] text-[hsl(var(--soft-gold))]"
												/>
											))}
										</div>

										{/* Author */}
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<img
													src={testimonial.avatar}
													alt={testimonial.name}
													className="w-10 h-10 rounded-full bg-[hsl(var(--warm-beige))]"
												/>
												<div>
													<p className="font-medium text-[hsl(var(--deep-espresso))]">
														{testimonial.name}
													</p>
													<p className="text-xs text-[hsl(var(--deep-espresso))]/60">
														{testimonial.service} · {testimonial.designer}
													</p>
												</div>
											</div>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="left-0 bg-white/90 border-[hsl(var(--muted-bronze))]/20 hover:bg-[hsl(var(--muted-bronze))] hover:text-white" />
						<CarouselNext className="right-0 bg-white/90 border-[hsl(var(--muted-bronze))]/20 hover:bg-[hsl(var(--muted-bronze))] hover:text-white" />
					</Carousel>
				</div>

				{/* Mobile Static Grid */}
				<div className="lg:hidden px-6 sm:px-8 mt-8 grid gap-4">
					{testimonials.slice(0, 3).map((testimonial, index) => (
						<div
							key={testimonial.id}
							className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm transition-all duration-1000 ${
								isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
							}`}
							style={{ transitionDelay: `${400 + index * 100}ms` }}
						>
							<div className="flex gap-1 mb-3">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={`star-mobile-${testimonial.id}-${i}`}
										className="w-4 h-4 fill-[hsl(var(--soft-gold))] text-[hsl(var(--soft-gold))]"
									/>
								))}
							</div>
							<p className="text-[hsl(var(--deep-espresso))]/80 text-sm leading-relaxed mb-4">
								"{testimonial.content}"
							</p>
							<div className="flex items-center gap-3">
								<img
									src={testimonial.avatar}
									alt={testimonial.name}
									className="w-8 h-8 rounded-full bg-[hsl(var(--warm-beige))]"
								/>
								<div>
									<p className="text-sm font-medium text-[hsl(var(--deep-espresso))]">
										{testimonial.name}
									</p>
									<p className="text-xs text-[hsl(var(--deep-espresso))]/60">
										{testimonial.service}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Navigation Dots (Desktop) */}
				<div
					className={`hidden lg:flex justify-center gap-2 mt-8 transition-all duration-1000 delay-500 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
				>
					{testimonials.map((testimonial, index) => (
						<button
							key={testimonial.id}
							type="button"
							onClick={() => setActiveIndex(index)}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								activeIndex === index
									? "bg-[hsl(var(--muted-bronze))] w-6"
									: "bg-[hsl(var(--muted-bronze))]/30 hover:bg-[hsl(var(--muted-bronze))]/50"
							}`}
							aria-label={`Go to testimonial ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
