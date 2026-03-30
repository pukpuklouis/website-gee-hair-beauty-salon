import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const ScissorsIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <title>Scissors</title>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <title>Phone</title>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[hsl(var(--warm-beige))]"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) scale(1.1)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <img
          src="/salon-intro.jpg"
          alt="Gee Hair Salon Interior"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--warm-beige))]/90 via-[hsl(var(--warm-beige))]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--warm-beige))]/80 via-transparent to-[hsl(var(--warm-beige))]/30" />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-3xl">
          {/* Brand Tag */}
          <div
            className={`flex items-center gap-2 mb-6 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-8 h-[1px] bg-[hsl(var(--muted-bronze))]" />
            <span className="text-sm tracking-[0.3em] uppercase text-[hsl(var(--muted-bronze))]">
              台北大安區
            </span>
          </div>

          {/* Main Title */}
          <h1
            className={`transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/gee-hair-beauty-salon-logo.svg"
              alt="Gee Hair & Beauty Salon"
              className="h-24 sm:h-32 lg:h-40 w-auto"
            />
          </h1>

          {/* Subtitle */}
          <h2
            className={`font-accent text-3xl sm:text-4xl lg:text-5xl italic text-[hsl(var(--muted-bronze))] mb-6 transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            meet a better self
          </h2>

          {/* Tagline */}
          <p
            className={`text-lg sm:text-xl text-[hsl(var(--deep-espresso))]/80 mb-4 max-w-xl leading-relaxed transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            聚沙龍 — 每個走進來的客人，都帶著期待離開時遇見更好的自己
          </p>

          {/* Description */}
          <p
            className={`text-base text-[hsl(var(--deep-espresso))]/60 mb-10 max-w-lg leading-relaxed transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            結合韓系美學與台式服務的質感髮廊，專業技術與溫暖服務的完美平衡
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <Button
              onClick={scrollToBooking}
              size="lg"
              className="bg-[hsl(var(--muted-bronze))] hover:bg-[hsl(var(--deep-espresso))] text-white px-8 py-6 text-base rounded-full transition-all duration-300 ease-custom-expo group"
            >
              <ScissorsIcon className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />立即預約
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[hsl(var(--muted-bronze))] text-[hsl(var(--muted-bronze))] hover:bg-[hsl(var(--muted-bronze))] hover:text-white px-8 py-6 text-base rounded-full transition-all duration-300 ease-custom-expo"
              onClick={() => window.open('tel:+886-2-2345-6789', '_self')}
            >
              <PhoneIcon className="w-5 h-5 mr-2" />電話諮詢
            </Button>
          </div>

          {/* Tags */}
          <div
            className={`flex flex-wrap gap-3 mt-12 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {['#微醺蜜粉', '#光線染', '#韓系層次', '#京喚羽護髮'].map((tag, index) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm text-[hsl(var(--muted-bronze))] border border-[hsl(var(--muted-bronze))]/10 hover:bg-white/80 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute bottom-12 right-12 w-32 h-32 rounded-full border border-[hsl(var(--muted-bronze))]/20 hidden lg:block"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-[hsl(var(--blush-mist))]/30 hidden lg:block"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      />
    </section>
  );
}
