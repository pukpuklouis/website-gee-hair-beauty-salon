import { useEffect, useRef, useState } from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../../tina/__generated__/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";

interface Props {
  data: PageQuery;
  query: string;
  variables: PageQueryVariables;
}

// Icon Components
const ScissorsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);

const iconSvgs: Record<string, string> = {
  scissors: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" x2="8.12" y1="4" y2="15.88"/><line x1="14.47" x2="20" y1="14.48" y2="20"/><line x1="8.12" x2="12" y1="8.12" y2="12"/></svg>',
  droplets: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.39-2.27-1.04-3.14C8.56 6.63 6.75 5 4.5 5 2.25 5 0 7.25 0 9.5c0 2.3 1.7 4.3 4.05 4.9.63.16 1.24.3 1.95.4-.45.8-.75 1.7-.75 2.5 0 1.1.9 2 2 2h6.5c1.1 0 2-.9 2-2 0-.8-.3-1.7-.75-2.5.71-.1 1.32-.24 1.95-.4 2.35-.6 4.05-2.6 4.05-4.9C24 7.25 21.75 5 19.5 5c-2.25 0-4.06 1.63-5.46 4.11-.65.87-1.04 1.98-1.04 3.14 0 2.22 1.8 4.05 4 4.05z"/></svg>',
  flame: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  'user-circle': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><path d="M12 14c-1.1 0-2 .9-2 2"/></svg>',
  sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
};

export default function HomeSections({ data, query, variables }: Props) {
  const { data: liveData } = useTina({ query, variables, data });
  const page = liveData.page;

  // Hero refs and state
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // About section ref for IntersectionObserver
  const aboutRef = useRef<HTMLDivElement>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  // Portfolio state
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [portfolioVisible, setPortfolioVisible] = useState(false);

  // Testimonials state
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Designers carousel ref
  const designersCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === aboutRef.current) setAboutVisible(true);
            if (entry.target === portfolioRef.current) setPortfolioVisible(true);
            if (entry.target === testimonialsRef.current) setTestimonialsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (portfolioRef.current) observer.observe(portfolioRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth' });
  };

  const hero = (page.hero || {}) as any;
  const about = (page.about || {}) as any;
  const services = (page.services || {}) as any;
  const portfolio = (page.portfolio || {}) as any;
  const designers = (page.designers || {}) as any;
  const testimonials = (page.testimonials || {}) as any;
  const booking = (page.booking || {}) as any;

  // Portfolio filtering
  const portfolioItems = portfolio.items || [];
  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter((item: any) => item.category === activeCategory);

  const columns: any[][] = [[], [], []];
  filteredItems.forEach((item: any, index: number) => {
    columns[index % 3].push(item);
  });

  const categories = portfolio.categories || [{ id: 'all', label: '全部' }];
  const designersList = designers.items || [];
  const testimonialsList = testimonials.items || [];
  const servicesList = services.items || [];

  return (
    <>
      {/* HERO SECTION */}
      <section ref={heroRef} id="hero" className="relative min-h-screen w-full overflow-hidden bg-[hsl(var(--warm-beige))]">
        <div className="absolute inset-0 w-full h-full" style={{ transform: `translate(\${mousePosition.x * -15}px, \${mousePosition.y * -15}px) scale(1.1)`, transition: 'transform 0.3s ease-out' }}>
          {hero.backgroundImage && (
            <img data-tina-field={tinaField(hero, "backgroundImage")} src={hero.backgroundImage} alt="Gee Hair Salon" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--warm-beige))]/90 via-[hsl(var(--warm-beige))]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--warm-beige))]/80 via-transparent to-[hsl(var(--warm-beige))]/30" />
        </div>
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl">
            <div className={`flex items-center gap-2 mb-6 transition-all duration-1000 \${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-8 h-[1px] bg-[hsl(var(--muted-bronze))]" />
              {hero.brandTag && (
                <span data-tina-field={tinaField(hero, "brandTag")} className="text-sm tracking-[0.3em] uppercase text-[hsl(var(--muted-bronze))]">{hero.brandTag}</span>
              )}
            </div>
            <h1 className={`transition-all duration-1000 delay-200 \${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <img src="/gee-hair-beauty-salon-logo.svg" alt="Gee Hair & Beauty Salon" className="h-24 sm:h-32 lg:h-40 w-auto" />
            </h1>
            {hero.subtitle && (
              <h2 data-tina-field={tinaField(hero, "subtitle")} className={`font-accent text-3xl sm:text-4xl lg:text-5xl italic text-[hsl(var(--muted-bronze))] mb-6 transition-all duration-1000 delay-300 \${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                {hero.subtitle}
              </h2>
            )}
            {hero.tagline && (
              <p data-tina-field={tinaField(hero, "tagline")} className={`text-lg sm:text-xl text-[hsl(var(--deep-espresso))]/80 mb-4 max-w-xl leading-relaxed transition-all duration-1000 delay-400 \${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                {hero.tagline}
              </p>
            )}
            {hero.description && (
              <p data-tina-field={tinaField(hero, "description")} className={`text-base text-[hsl(var(--deep-espresso))]/60 mb-10 max-w-lg leading-relaxed transition-all duration-1000 delay-500 \${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                {hero.description}
              </p>
            )}
            <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-600 \${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <Button onClick={scrollToBooking} size="lg" className="bg-[hsl(var(--muted-bronze))] hover:bg-[hsl(var(--deep-espresso))] text-white px-8 py-6 text-base rounded-full transition-all duration-300 ease-custom-expo group">
                <ScissorsIcon className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                {hero.primaryCta || '立即預約'}
              </Button>
              <Button variant="outline" size="lg" className="border-[hsl(var(--muted-bronze))] text-[hsl(var(--muted-bronze))] hover:bg-[hsl(var(--muted-bronze))] hover:text-white px-8 py-6 text-base rounded-full transition-all duration-300 ease-custom-expo" onClick={() => window.open('tel:+886-2-6605-8387', '_self')}>
                <PhoneIcon className="w-5 h-5 mr-2" />
                {hero.secondaryCta || '電話諮詢'}
              </Button>
            </div>
            {hero.tags && hero.tags.length > 0 && (
              <div data-tina-field={tinaField(hero, "tags")} className={`flex flex-wrap gap-3 mt-12 transition-all duration-1000 delay-700 \${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                {hero.tags.map((tag: string, index: number) => (
                  <span key={tag} className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm text-[hsl(var(--muted-bronze))] border border-[hsl(var(--muted-bronze))]/10 hover:bg-white/80 transition-all duration-300 cursor-default" style={{ animationDelay: `\${0.8 + index * 0.1}s` }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full border border-[hsl(var(--muted-bronze))]/20 hidden lg:block" style={{ transform: `translate(\${mousePosition.x * 20}px, \${mousePosition.y * 20}px)`, transition: 'transform 0.5s ease-out' }} />
        <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-[hsl(var(--blush-mist))]/30 hidden lg:block" style={{ transform: `translate(\${mousePosition.x * 30}px, \${mousePosition.y * 30}px)`, transition: 'transform 0.4s ease-out' }} />
      </section>

      {/* ABOUT SECTION */}
      <section ref={aboutRef} id="about" className="relative py-24 lg:py-32 bg-[hsl(var(--warm-beige))] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[hsl(var(--warm-beige))] to-transparent" />
        <div className={`absolute top-1/2 left-0 -translate-y-1/2 font-display text-[20vw] font-bold text-[hsl(var(--muted-bronze))]/5 whitespace-nowrap pointer-events-none select-none transition-all duration-1000 \${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>ABOUT</div>
        <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className={`relative transition-all duration-1000 \${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                {about.image && <img data-tina-field={tinaField(about, "image")} src={about.image} alt="Gee Hair Salon" className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--deep-espresso))]/30 to-transparent" />
              </div>
              {about.ratingBadge && (
                <div className={`absolute -bottom-8 -right-8 bg-white rounded-xl p-6 shadow-xl max-w-[240px] transition-all duration-1000 delay-300 \${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--blush-mist))]/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[hsl(var(--blush-mist))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    <span data-tina-field={tinaField(about.ratingBadge, "rating")} className="font-medium text-[hsl(var(--deep-espresso))]">{about.ratingBadge.rating} 評分</span>
                  </div>
                  <p data-tina-field={tinaField(about.ratingBadge, "text")} className="text-sm text-[hsl(var(--deep-espresso))]/70">{about.ratingBadge.text}</p>
                </div>
              )}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[hsl(var(--muted-bronze))]/20 rounded-2xl -z-10" />
            </div>
            <div className="lg:pl-8">
              <div className={`flex items-center gap-3 mb-6 transition-all duration-1000 delay-200 \${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
                {about.label && <span data-tina-field={tinaField(about, "label")} className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-bronze))]">{about.label}</span>}
              </div>
              {about.title && (
                <h2 data-tina-field={tinaField(about, "title")} className={`text-4xl lg:text-5xl font-medium text-[hsl(var(--deep-espresso))] mb-6 leading-tight transition-all duration-1000 delay-300 \${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} dangerouslySetInnerHTML={{ __html: about.title.replace('質感小店', '<span class="font-accent italic text-[hsl(var(--muted-bronze))]">質感小店</span>') }} />
              )}
              <div className={`space-y-4 mb-10 transition-all duration-1000 delay-400 \${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {about.description1 && <p data-tina-field={tinaField(about, "description1")} className="text-[hsl(var(--deep-espresso))]/80 leading-relaxed">{about.description1}</p>}
                {about.description2 && <p data-tina-field={tinaField(about, "description2")} className="text-[hsl(var(--deep-espresso))]/70 leading-relaxed">{about.description2}</p>}
              </div>
              {about.features && about.features.length > 0 && (
                <div className={`grid gap-6 transition-all duration-1000 delay-500 \${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {about.features.map((feature: any, index: number) => (
                    <div key={feature.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300 group" style={{ animationDelay: `\${0.6 + index * 0.1}s` }}>
                      <div className="w-12 h-12 rounded-xl bg-[hsl(var(--muted-bronze))]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(var(--muted-bronze))]/20 transition-colors">
                        {index === 0 && <svg className="w-6 h-6 text-[hsl(var(--muted-bronze))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
                        {index === 1 && <svg className="w-6 h-6 text-[hsl(var(--muted-bronze))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                        {index === 2 && <svg className="w-6 h-6 text-[hsl(var(--muted-bronze))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                      </div>
                      <div>
                        <h3 data-tina-field={tinaField(feature, "title")} className="font-medium text-[hsl(var(--deep-espresso))] mb-1">{feature.title}</h3>
                        <p data-tina-field={tinaField(feature, "description")} className="text-sm text-[hsl(var(--deep-espresso))]/70">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative py-24 lg:py-32 bg-[hsl(var(--soft-cream))] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[hsl(var(--blush-mist))]/5 to-transparent pointer-events-none" />
        <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
              {services.label && <span data-tina-field={tinaField(services, "label")} className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-bronze))]">{services.label}</span>}
              <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
            </div>
            {services.title && <h2 data-tina-field={tinaField(services, "title")} className="text-4xl lg:text-5xl font-medium text-[hsl(var(--deep-espresso))] mb-4">{services.title}</h2>}
            {services.description && <p data-tina-field={tinaField(services, "description")} className="text-[hsl(var(--deep-espresso))]/70 max-w-2xl mx-auto">{services.description}</p>}
          </div>
          {servicesList.length > 0 && (
            <div data-tina-field={tinaField(services, "items")} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {servicesList.map((service: any, index: number) => (
                <div key={service.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-custom-expo" style={{ animationDelay: `\${300 + index * 100}ms` }}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {service.image && <img data-tina-field={tinaField(service, "image")} src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 ease-custom-expo group-hover:scale-110" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {service.icon && (
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[hsl(var(--muted-bronze))]">
                        <span dangerouslySetInnerHTML={{ __html: iconSvgs[service.icon] || '' }} />
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      {service.title && <h3 data-tina-field={tinaField(service, "title")} className="text-xl font-medium text-white mb-1">{service.title}</h3>}
                      {service.subtitle && <p data-tina-field={tinaField(service, "subtitle")} className="text-sm text-white/80 font-accent italic">{service.subtitle}</p>}
                    </div>
                  </div>
                  <div className="p-6">
                    {service.description && <p data-tina-field={tinaField(service, "description")} className="text-[hsl(var(--deep-espresso))]/70 text-sm leading-relaxed mb-4">{service.description}</p>}
                    {service.tags && service.tags.length > 0 && (
                      <div data-tina-field={tinaField(service, "tags")} className="flex flex-wrap gap-2">
                        {service.tags.map((tag: string) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs bg-[hsl(var(--warm-beige))] text-[hsl(var(--muted-bronze))] transition-all duration-300 group-hover:bg-[hsl(var(--blush-mist))]/20 group-hover:text-[hsl(var(--blush-mist))]">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 border-2 rounded-2xl border-transparent group-hover:border-[hsl(var(--blush-mist))]/50 transition-all duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section ref={portfolioRef} id="portfolio" className="relative py-24 lg:py-32 bg-[hsl(var(--warm-beige))] overflow-hidden">
        <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-1000 \${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
              {portfolio.label && <span data-tina-field={tinaField(portfolio, "label")} className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-bronze))]">{portfolio.label}</span>}
              <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
            </div>
            {portfolio.title && (
              <h2 data-tina-field={tinaField(portfolio, "title")} className={`text-4xl lg:text-5xl font-medium text-[hsl(var(--deep-espresso))] mb-4 transition-all duration-1000 delay-100 \${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {portfolio.title}
              </h2>
            )}
            {portfolio.description && (
              <p data-tina-field={tinaField(portfolio, "description")} className={`text-[hsl(var(--deep-espresso))]/70 max-w-2xl mx-auto transition-all duration-1000 delay-200 \${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {portfolio.description}
              </p>
            )}
          </div>
          {categories.length > 0 && (
            <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-300 \${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {categories.map((category: any) => (
                <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-6 py-2 rounded-full text-sm transition-all duration-300 \${activeCategory === category.id ? 'bg-[hsl(var(--muted-bronze))] text-white' : 'bg-white/60 text-[hsl(var(--muted-bronze))] hover:bg-white hover:shadow-md'}`}>
                  {category.label}
                </button>
              ))}
            </div>
          )}
          {portfolioItems.length > 0 && (
            <div data-tina-field={tinaField(portfolio, "items")} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-4 lg:gap-6" style={{ marginTop: columnIndex === 1 ? '2rem' : columnIndex === 2 ? '1rem' : '0' }}>
                  {column.map((item: any, itemIndex: number) => (
                    <div key={item.id} className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-custom-expo \${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `\${400 + (columnIndex * 3 + itemIndex) * 100}ms` }} onClick={() => setSelectedItem(item)}>
                      <div className="relative aspect-[3/4]">
                        {item.image && <img data-tina-field={tinaField(item, "image")} src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-custom-expo group-hover:scale-110" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-custom-expo">
                          {item.title && <h3 data-tina-field={tinaField(item, "title")} className="text-lg font-medium text-white mb-1">{item.title}</h3>}
                          <div className="flex items-center gap-3">
                            {item.stylist && <span data-tina-field={tinaField(item, "stylist")} className="text-sm text-white/80">設計師: {item.stylist}</span>}
                            {item.color && <div data-tina-field={tinaField(item, "color")} className="w-4 h-4 rounded-full border-2 border-white/50" style={{ backgroundColor: item.color }} />}
                          </div>
                        </div>
                        {item.color && <div data-tina-field={tinaField(item, "color")} className="absolute top-4 right-4 w-6 h-6 rounded-full border-2 border-white/70 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: item.color }} />}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white">
            {selectedItem && (
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto">
                  {selectedItem.image && <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  {selectedItem.title && <h3 data-tina-field={tinaField(selectedItem, "title")} className="text-2xl font-medium text-[hsl(var(--deep-espresso))] mb-2">{selectedItem.title}</h3>}
                  <div className="flex items-center gap-3 mb-6">
                    {selectedItem.stylist && <span data-tina-field={tinaField(selectedItem, "stylist")} className="text-[hsl(var(--muted-bronze))]">設計師: {selectedItem.stylist}</span>}
                    {selectedItem.color && <div data-tina-field={tinaField(selectedItem, "color")} className="w-5 h-5 rounded-full border-2 border-[hsl(var(--muted-bronze))]/30" style={{ backgroundColor: selectedItem.color }} />}
                  </div>
                  <p className="text-[hsl(var(--deep-espresso))]/70 mb-6">這款髮色/造型完美呈現了韓系美學的精髓，適合追求時尚與質感的您。</p>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 px-6 bg-[hsl(var(--muted-bronze))] text-white rounded-full hover:bg-[hsl(var(--deep-espresso))] transition-colors" onClick={() => { setSelectedItem(null); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      預約同款
                    </button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* DESIGNERS SECTION */}
      <section id="designers" className="relative py-24 lg:py-32 bg-[hsl(var(--soft-cream))] overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--blush-mist))]/5 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
                  {designers.label && <span data-tina-field={tinaField(designers, "label")} className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-bronze))]">{designers.label}</span>}
                </div>
                {designers.title && (
                  <h2 data-tina-field={tinaField(designers, "title")} className="text-4xl lg:text-5xl font-medium text-[hsl(var(--deep-espresso))] mb-4">
                    {designers.title.split('藝術家')[0]}<span className="font-accent italic text-[hsl(var(--muted-bronze))]"> 藝術家</span>
                  </h2>
                )}
                {designers.description && <p data-tina-field={tinaField(designers, "description")} className="text-[hsl(var(--deep-espresso))]/70 max-w-xl">{designers.description}</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => designersCarouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-[hsl(var(--muted-bronze))] text-[hsl(var(--muted-bronze))] hover:bg-[hsl(var(--muted-bronze))] hover:text-white transition-all duration-300 disabled:opacity-30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button onClick={() => designersCarouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-[hsl(var(--muted-bronze))] text-[hsl(var(--muted-bronze))] hover:bg-[hsl(var(--muted-bronze))] hover:text-white transition-all duration-300 disabled:opacity-30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          </div>
          {designersList.length > 0 && (
            <div ref={designersCarouselRef} data-tina-field={tinaField(designers, "items")} className="flex gap-6 overflow-x-auto hide-scrollbar px-6 sm:px-8 lg:px-16 xl:px-24 pb-4 snap-x snap-mandatory">
              {designersList.map((designer: any, index: number) => (
                <div key={designer.id} className="group flex-shrink-0 w-[300px] lg:w-[350px] snap-start">
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="relative aspect-[3/4] bg-gradient-to-b from-[hsl(var(--warm-beige))] to-[hsl(var(--soft-cream))]">
                      {designer.image && <img data-tina-field={tinaField(designer, "image")} src={designer.image} alt={designer.name} className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[hsl(var(--muted-bronze))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {designer.description && <p data-tina-field={tinaField(designer, "description")} className="text-white/90 text-sm mb-3">{designer.description}</p>}
                        <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[hsl(var(--deep-espresso))] hover:bg-white transition-colors">預約設計師</button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          {designer.name && <h3 data-tina-field={tinaField(designer, "name")} className="text-xl font-medium text-[hsl(var(--deep-espresso))]">{designer.name}</h3>}
                          {designer.englishName && <p data-tina-field={tinaField(designer, "englishName")} className="text-sm font-accent italic text-[hsl(var(--muted-bronze))]">{designer.englishName}</p>}
                        </div>
                        {designer.experience && <span data-tina-field={tinaField(designer, "experience")} className="px-3 py-1 bg-[hsl(var(--warm-beige))] rounded-full text-xs text-[hsl(var(--muted-bronze))]">{designer.experience}</span>}
                      </div>
                      {designer.title && <p data-tina-field={tinaField(designer, "title")} className="text-sm text-[hsl(var(--deep-espresso))]/60 mb-4">{designer.title}</p>}
                      {designer.specialties && designer.specialties.length > 0 && (
                        <div data-tina-field={tinaField(designer, "specialties")} className="flex flex-wrap gap-2">
                          {designer.specialties.map((specialty: string) => (
                            <span key={specialty} className="px-3 py-1 bg-[hsl(var(--blush-mist))]/10 rounded-full text-xs text-[hsl(var(--blush-mist))]">{specialty}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section ref={testimonialsRef} id="testimonials" className="relative py-24 lg:py-32 bg-[hsl(var(--warm-beige))] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[hsl(var(--soft-gold))]/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="text-center mb-16 px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-1000 \${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
              {testimonials.label && <span data-tina-field={tinaField(testimonials, "label")} className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-bronze))]">{testimonials.label}</span>}
              <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
            </div>
            {testimonials.title && (
              <h2 data-tina-field={tinaField(testimonials, "title")} className={`text-4xl lg:text-5xl font-medium text-[hsl(var(--deep-espresso))] mb-4 transition-all duration-1000 delay-100 \${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {testimonials.title}
              </h2>
            )}
            <div className={`flex items-center justify-center gap-2 mb-4 transition-all duration-1000 delay-200 \${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[hsl(var(--soft-gold))] text-[hsl(var(--soft-gold))]" />)}
              </div>
              {testimonials.ratingText && <span data-tina-field={tinaField(testimonials, "ratingText")} className="text-[hsl(var(--deep-espresso))]/70">{testimonials.ratingText}</span>}
            </div>
            {testimonials.description && (
              <p data-tina-field={tinaField(testimonials, "description")} className={`text-[hsl(var(--deep-espresso))]/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 \${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {testimonials.description}
              </p>
            )}
          </div>
          {testimonialsList.length > 0 && (
            <>
              <div className={`hidden lg:block px-12 xl:px-24 transition-all duration-1000 delay-400 \${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Carousel opts={{ align: 'start', loop: true }} className="w-full">
                  <CarouselContent className="-ml-4">
                    {testimonialsList.map((testimonial: any) => (
                      <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                          <Quote className="w-8 h-8 text-[hsl(var(--blush-mist))]/30 mb-4" />
                          {testimonial.content && <p data-tina-field={tinaField(testimonial, "content")} className="text-[hsl(var(--deep-espresso))]/80 leading-relaxed mb-6">"{testimonial.content}"</p>}
                          <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[hsl(var(--soft-gold))] text-[hsl(var(--soft-gold))]" />)}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {testimonial.avatar && <img data-tina-field={tinaField(testimonial, "avatar")} src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full bg-[hsl(var(--warm-beige))]" />}
                              <div>
                                {testimonial.name && <p data-tina-field={tinaField(testimonial, "name")} className="font-medium text-[hsl(var(--deep-espresso))]">{testimonial.name}</p>}
                                <p className="text-xs text-[hsl(var(--deep-espresso))]/60">{testimonial.service} · {testimonial.designer}</p>
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
              <div className="lg:hidden px-6 sm:px-8 mt-8 grid gap-4">
                {testimonialsList.slice(0, 3).map((testimonial: any, index: number) => (
                  <div key={testimonial.id} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm transition-all duration-1000 \${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `\${400 + index * 100}ms` }}>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[hsl(var(--soft-gold))] text-[hsl(var(--soft-gold))]" />)}
                    </div>
                    {testimonial.content && <p className="text-[hsl(var(--deep-espresso))]/80 text-sm leading-relaxed mb-4">"{testimonial.content}"</p>}
                    <div className="flex items-center gap-3">
                      {testimonial.avatar && <img src={testimonial.avatar} alt={testimonial.name} className="w-8 h-8 rounded-full bg-[hsl(var(--warm-beige))]" />}
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--deep-espresso))]">{testimonial.name}</p>
                        <p className="text-xs text-[hsl(var(--deep-espresso))]/60">{testimonial.service}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="booking" className="relative py-24 lg:py-32 bg-[hsl(var(--soft-cream))] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--blush-mist))]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2 rounded-full bg-[hsl(var(--muted-bronze))]/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
                {booking.label && <span data-tina-field={tinaField(booking, "label")} className="text-sm tracking-[0.2em] uppercase text-[hsl(var(--muted-bronze))]">{booking.label}</span>}
                <div className="w-12 h-[1px] bg-[hsl(var(--muted-bronze))]" />
              </div>
              {booking.title && <h2 data-tina-field={tinaField(booking, "title")} className="text-4xl lg:text-5xl font-medium text-[hsl(var(--deep-espresso))] mb-4">{booking.title}</h2>}
              {booking.description && <p data-tina-field={tinaField(booking, "description")} className="text-[hsl(var(--deep-espresso))]/70 max-w-2xl mx-auto">{booking.description}</p>}
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                {/* LINE Booking */}
                <div className="group relative bg-gradient-to-br from-[#06C755] to-[#05a347] rounded-2xl p-8 text-white overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      </div>
                      <div>
                        {booking.lineTitle && <h3 data-tina-field={tinaField(booking, "lineTitle")} className="text-xl font-medium">{booking.lineTitle}</h3>}
                        <p className="text-white/80 text-sm">最快速的預約方式</p>
                      </div>
                    </div>
                    {booking.lineDescription && <p data-tina-field={tinaField(booking, "lineDescription")} className="text-white/90 mb-6">{booking.lineDescription}</p>}
                    <a href={booking.lineUrl || "https://lin.ee/WoerF3s"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-[#06C755] hover:bg-white/90 px-6 py-5 rounded-full font-medium transition-all duration-300 group-hover:shadow-lg">
                      {booking.lineButtonText || '加入 LINE 預約'}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
                    </a>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10" />
                </div>
                {/* Phone Booking */}
                <div className="group relative bg-white rounded-2xl p-8 border border-[hsl(var(--muted-bronze))]/10 overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[hsl(var(--muted-bronze))]/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--muted-bronze))]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      </div>
                      <div>
                        {booking.phoneTitle && <h3 data-tina-field={tinaField(booking, "phoneTitle")} className="text-xl font-medium text-[hsl(var(--deep-espresso))]">{booking.phoneTitle}</h3>}
                        {booking.phoneSubtitle && <p data-tina-field={tinaField(booking, "phoneSubtitle")} className="text-[hsl(var(--deep-espresso))]/60 text-sm">{booking.phoneSubtitle}</p>}
                      </div>
                    </div>
                    {booking.phoneDescription && <p data-tina-field={tinaField(booking, "phoneDescription")} className="text-[hsl(var(--deep-espresso))]/70 mb-6">{booking.phoneDescription}</p>}
                    <a href={`tel:\${booking.phoneNumber?.replace(/-/g, '') || '+886-2-6605-8387'}`} className="inline-flex items-center justify-center border border-[hsl(var(--muted-bronze))] text-[hsl(var(--muted-bronze))] hover:bg-[hsl(var(--muted-bronze))] hover:text-white px-6 py-5 rounded-full transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      {booking.phoneNumber || '02-66058387'}
                    </a>
                  </div>
                </div>
              </div>
              {/* Store Info */}
              <div className="bg-white rounded-2xl p-8 border border-[hsl(var(--muted-bronze))]/10">
                <h3 className="text-xl font-medium text-[hsl(var(--deep-espresso))] mb-6">店家資訊</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(var(--warm-beige))] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--muted-bronze))]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <p className="font-medium text-[hsl(var(--deep-espresso))] mb-1">地址</p>
                      {booking.address && <p data-tina-field={tinaField(booking, "address")} className="text-[hsl(var(--deep-espresso))]/70 text-sm">{booking.address}</p>}
                      {booking.addressNote && <p data-tina-field={tinaField(booking, "addressNote")} className="text-[hsl(var(--blush-mist))] text-sm mt-1">{booking.addressNote}</p>}
                      <a href={booking.mapUrl || "https://maps.app.goo.gl/YULd3Q2zgcCwyfY6A?g_st=ic"} target="_blank" rel="noopener noreferrer" className="text-sm text-[hsl(var(--muted-bronze))] hover:underline mt-2 inline-flex items-center gap-1">
                        查看地圖
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(var(--warm-beige))] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--muted-bronze))]"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                      <p className="font-medium text-[hsl(var(--deep-espresso))] mb-1">營業時間</p>
                      <div data-tina-field={tinaField(booking, "hours")} className="text-[hsl(var(--deep-espresso))]/70 text-sm space-y-1">
                        {booking.hours && booking.hours.map((h: any, i: number) => (
                          <p key={i}>{h.days}: {h.hours}</p>
                        ))}
                      </div>
                      {booking.closedDays && <p data-tina-field={tinaField(booking, "closedDays")} className="text-[hsl(var(--blush-mist))]">{booking.closedDays}</p>}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(var(--warm-beige))] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[hsl(var(--muted-bronze))]"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" x2="23" y1="10" y2="10"></line></svg>
                    </div>
                    <div>
                      <p className="font-medium text-[hsl(var(--deep-espresso))] mb-1">付款方式</p>
                      {booking.paymentMethod && <p data-tina-field={tinaField(booking, "paymentMethod")} className="text-[hsl(var(--deep-espresso))]/70 text-sm">{booking.paymentMethod}</p>}
                    </div>
                  </div>
                  {booking.note && (
                    <div data-tina-field={tinaField(booking, "note")} className="mt-6 p-4 bg-[hsl(var(--blush-mist))]/10 rounded-xl">
                      <p className="text-sm text-[hsl(var(--blush-mist))]">{booking.note}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
