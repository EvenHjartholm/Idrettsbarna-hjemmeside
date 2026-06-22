import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, Phone, Mail, Globe, Camera, Youtube, CalendarDays, Clock, User, MapPin } from 'lucide-react';

// ─── URL Query Params for personalization ─────────────────────
export interface WelcomeParams {
  childName?: string;
  parentName?: string;
  courseTitle?: string;
  courseDay?: string;
  courseTime?: string;
  courseStart?: string;
  courseEnd?: string;
  sessionCount?: string;
  instructor?: string;
}

export function useWelcomeParams(): WelcomeParams {
  const [searchParams] = useSearchParams();
  return {
    childName: searchParams.get('barn') || undefined,
    parentName: searchParams.get('foresatt') || undefined,
    courseTitle: searchParams.get('kurs') || undefined,
    courseDay: searchParams.get('dag') || undefined,
    courseTime: searchParams.get('tid') || undefined,
    courseStart: searchParams.get('start') || undefined,
    courseEnd: searchParams.get('slutt') || undefined,
    sessionCount: searchParams.get('antall') || undefined,
    instructor: searchParams.get('instruktor') || undefined,
  };
}

// ─── Types ────────────────────────────────────────────────────
export interface WelcomeSection {
  id: string;
  type: string;
  title: string;
  image_url?: string;
  body?: string;
  footer_text?: string;
  items?: Array<{ icon?: string; title: string; body: string; image_url?: string; link?: string }>;
  steps?: Array<{ title: string; body: string }>;
}

export interface WelcomePageData {
  theme: 'dark_navy' | 'dark_purple';
  hero_image_url?: string;
  hero_title: string;
  hero_subtitle: string;
  hero_subtitle_personal?: string; // Brukes med barnets navn
  sections: WelcomeSection[];
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_website?: string;
  contact_photo_website?: string;
  social_links?: { youtube?: string; facebook?: string; instagram?: string };
  /** Om foresatt er med i vannet (for kursinfo-kortet) */
  parentInWater?: boolean;
  /** Kurssted – f.eks. 'Varmtvannsbassenget, Risenga svømmehall' */
  course_location?: string;
}

// ─── Themes ───────────────────────────────────────────────────
const THEMES = {
  dark_navy: {
    bg: '#110a22', accent1: '#ff8fab', accent2: '#c89aff', accent3: '#f0c040',
    heading: '#ff8fab', text: 'rgba(255,255,255,0.88)', muted: 'rgba(255,255,255,0.55)',
    cardBg: 'rgba(255,255,255,0.04)', cardBorder: 'rgba(255,255,255,0.10)',
    glow1: 'rgba(255,143,171,0.08)', glow2: 'rgba(200,154,255,0.06)',
  },
  dark_purple: {
    bg: '#0d0a1f', accent1: '#c89aff', accent2: '#ff8fab', accent3: '#c89aff',
    heading: '#ff8fab', text: 'rgba(255,255,255,0.88)', muted: 'rgba(255,255,255,0.55)',
    cardBg: 'rgba(255,255,255,0.04)', cardBorder: 'rgba(255,255,255,0.10)',
    glow1: 'rgba(200,154,255,0.08)', glow2: 'rgba(255,143,171,0.06)',
  },
};
type T = typeof THEMES.dark_navy;

// ─── Scroll hooks ─────────────────────────────────────────────
function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  const tick = useCallback(() => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom > 0 && r.top < vh) {
      const p = (vh - r.top) / (vh + r.height);
      setY((p - 0.5) * speed * r.height);
    }
  }, [speed]);
  useEffect(() => {
    let raf: number;
    const loop = () => { tick(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [tick]);
  return { ref, y };
}

// ─── Reveal wrapper ───────────────────────────────────────────
function R({ children, d = 0, dir = 'up', className = '' }: {
  children: React.ReactNode; d?: number; dir?: 'up' | 'left' | 'right' | 'scale'; className?: string;
}) {
  const { ref, vis } = useReveal();
  const t: Record<string, string> = { up: 'translateY(70px)', left: 'translateX(-70px)', right: 'translateX(70px)', scale: 'scale(0.92)' };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translate(0,0) scale(1)' : t[dir],
      transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${d}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${d}s`,
      willChange: 'opacity, transform',
    }}>
      {children}
    </div>
  );
}

// ─── Parallax image ───────────────────────────────────────────
function PImg({ src, speed = 0.12, rounded = true, shadow = true, className = '' }: {
  src: string; speed?: number; rounded?: boolean; shadow?: boolean; className?: string;
}) {
  const { ref, y } = useParallax(speed);
  return (
    <div ref={ref} className={className}>
      <img src={src} alt=""
        className={`w-full h-auto block ${rounded ? 'rounded-2xl' : ''} ${shadow ? 'shadow-2xl' : ''}`}
        style={{ transform: `translateY(${y}px)`, willChange: 'transform', transition: 'transform 0.05s linear' }}
      />
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────
const I: Record<string, React.FC<{c:string;s?:number}>> = {
  shopping_bag: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  shower: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M4 4v5a9 9 0 0016 0V4"/><circle cx="12" cy="15" r="1"/><path d="M12 19v2"/></svg>,
  towel: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18"/><path d="M12 3v18"/></svg>,
  bench: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="10" width="18" height="4" rx="1"/><path d="M5 14v4"/><path d="M19 14v4"/><path d="M5 10V8"/><path d="M19 10V8"/></svg>,
  swimmer: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="6" r="3"/><path d="M4 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 9v5l-2 3"/></svg>,
  goggles: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><path d="M11 12h2"/></svg>,
  food: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  heart: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  sparkles: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>,
  clipboard: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  shield: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ruler: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M21.21 15.89A1 1 0 0020 15H4a1 1 0 00-1 1v4h18v-4.11z"/><line x1="6" y1="15" x2="6" y2="19"/><line x1="10" y1="15" x2="10" y2="19"/><line x1="14" y1="15" x2="14" y2="19"/><line x1="18" y1="15" x2="18" y2="19"/></svg>,
  baby: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 00-16 0"/></svg>,
  stroller: ({c,s=26}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="8" cy="20" r="2"/><circle cx="18" cy="20" r="2"/><path d="M12 2v8h8"/><path d="M4 12h16l-2 6H6z"/></svg>,
};
const di = ['shopping_bag','shower','towel','clipboard','heart','sparkles'];
function gi(n?:string,i=0){ return I[n||di[i%di.length]]||I.shopping_bag; }

// ═══════════════════════════════════════════════════════════════
//  HERO — Fullscreen with parallax + gradient
// ═══════════════════════════════════════════════════════════════
function Hero({ data, t, params }: { data: WelcomePageData; t: T; params: WelcomeParams }) {
  const { ref, y } = useParallax(0.25);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  // Personalisert hilsen basert på query-parametere
  const hasPersonal = !!(params.childName || params.parentName);
  const personalGreeting = params.parentName ? `Hei ${params.parentName}!` : '';
  const personalSubtitle = params.childName
    ? (data.hero_subtitle_personal || `Velkommen til kurs med ${params.childName}! Vi gleder oss til å se dere på kurs og her kommer litt praktisk informasjon før oppstart 😊`)
        .replace('{childName}', params.childName)
    : data.hero_subtitle;

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden" style={{ backgroundColor: t.bg }}>
      {data.hero_image_url && (
        <img src={data.hero_image_url} alt="" className="absolute inset-0 w-full h-full object-cover hero-img"
          style={{ transform: `translateY(${y}px) scale(1.05)`, willChange: 'transform', transition: 'transform 0.1s linear' }} />
      )}
      <div className="absolute inset-0 hero-overlay" style={{
        background: `linear-gradient(135deg, ${t.bg}e0 0%, ${t.bg}a0 30%, ${t.bg}40 50%, ${t.bg}15 65%, transparent 80%), linear-gradient(to left, rgba(180,80,120,0.25) 0%, rgba(180,80,120,0.10) 30%, transparent 60%)`,
      }} />
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 w-full">
          <div className="max-w-[640px]" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s',
          }}>
            {hasPersonal && personalGreeting && (
              <p className="text-[28px] md:text-[36px] font-bold mb-4" style={{ color: '#fff', fontFamily: "'Georgia', serif" }}>
                {personalGreeting}
              </p>
            )}
            <h1 className="text-[3.5rem] md:text-[5rem] font-bold leading-[1.06] mb-10" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>
              {data.hero_title}
            </h1>
            {personalSubtitle.split('\n\n').map((p, i) => (
              <p key={i} className="text-[22px] leading-[1.8] mb-5 max-w-[580px]" style={{ color: t.text }}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10" style={{
        opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 2s',
        animation: loaded ? 'wbounce 2s infinite' : 'none',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  FULL-WIDTH IMAGE BREAK
// ═══════════════════════════════════════════════════════════════
function ImageBreak({ src, t }: { src: string; t: T }) {
  const { ref, y } = useParallax(0.2);
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ backgroundColor: t.bg }}>
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 py-4">
        <img src={src} alt="" className="w-full h-auto rounded-2xl shadow-2xl"
          style={{ transform: `translateY(${y}px)`, willChange: 'transform', transition: 'transform 0.05s linear' }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PRACTICAL INFO
// ═══════════════════════════════════════════════════════════════
function PracticalInfo({ section, t }: { section: WelcomeSection; t: T }) {
  const cols = [t.accent1, t.accent2, t.accent3, t.accent1];
  const hasImg = !!section.image_url;
  return (
    <section style={{ backgroundColor: t.bg }} className="py-24">
      <div className={`max-w-[1300px] mx-auto px-8 md:px-16 ${hasImg ? 'grid grid-cols-1 md:grid-cols-2 gap-16 items-start' : ''}`}>
        {hasImg && (
          <R dir="left" className="sticky top-24">
            <PImg src={section.image_url!} speed={0.08} />
          </R>
        )}
        <div className={hasImg ? '' : 'max-w-[800px]'}>
          <R><h2 className="text-[3.2rem] font-bold mb-12 leading-tight" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>{section.title}</h2></R>
          <div className="space-y-10">
            {(section.items || []).map((item, i) => (
              <R key={i} d={0.08 * i}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-6 h-6 rounded-full transition-transform duration-300 group-hover:scale-125" style={{ border: `2.5px solid ${cols[i%4]}` }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[20px] mb-2" style={{ color: '#fff' }}>{item.title}</h4>
                    {item.body.split('\n\n').map((p, j) => (
                      <p key={j} className="text-[17px] leading-[1.8] mb-2" style={{ color: t.text }}>{p}</p>
                    ))}
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  TICKETS
// ═══════════════════════════════════════════════════════════════
function Tickets({ section, t }: { section: WelcomeSection; t: T }) {
  const bcs = [t.accent1, t.accent2, t.accent3, t.accent1];
  const hasImg = !!section.image_url;
  return (
    <section style={{ backgroundColor: t.bg }} className="py-24">
      <div className={`max-w-[1300px] mx-auto px-8 md:px-16 ${hasImg ? 'grid grid-cols-1 md:grid-cols-2 gap-16 items-start' : ''}`}>
        {hasImg && (
          <R dir="left" className="sticky top-24">
            <PImg src={section.image_url!} speed={0.08} />
          </R>
        )}
        <div className={hasImg ? '' : 'max-w-[900px]'}>
          <R><h2 className="text-[3.2rem] font-bold mb-8 leading-tight" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>{section.title}</h2></R>
          <div className="grid grid-cols-2 gap-5 mt-8">
            {(section.items || []).map((item, i) => (
              <R key={i} d={0.1 * i} dir="scale">
                <div className="rounded-xl p-6 h-full transition-all duration-300 hover:scale-[1.04] hover:shadow-lg hover:shadow-white/5 cursor-default"
                  style={{ backgroundColor: t.cardBg, border: `2px solid ${bcs[i%4]}` }}>
                  <h4 className="font-bold text-[19px] mb-2" style={{ color: '#fff' }}>{item.title}</h4>
                  <p className="text-[16px] leading-[1.7]" style={{ color: t.muted }}>{item.body}</p>
                </div>
              </R>
            ))}
          </div>
          {section.footer_text && (
            <R d={0.4}><div className="mt-5 rounded-xl p-6" style={{ backgroundColor: t.cardBg, border: `2px solid ${t.accent3}` }}>
              <p className="text-[16px] leading-[1.7]" style={{ color: t.muted }}>{section.footer_text}</p>
            </div></R>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  TIPS — Full-width image then icon grid
// ═══════════════════════════════════════════════════════════════
function Tips({ section, t }: { section: WelcomeSection; t: T }) {
  return (
    <section style={{ backgroundColor: t.bg }}>
      {section.image_url && <ImageBreak src={section.image_url} t={t} />}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 pb-24 pt-16">
        <R><h2 className="text-[3.2rem] font-bold mb-16" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>{section.title}</h2></R>
        <div className="grid md:grid-cols-3 gap-14">
          {(section.items || []).map((item, i) => {
            const IC = gi(item.icon, i);
            return (
              <R key={i} d={0.12 * i}>
                <div className="group cursor-default">
                  <div className="mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"><IC c={t.accent1} s={38} /></div>
                  <h4 className="font-bold text-[21px] mb-3 transition-colors duration-300 group-hover:text-white" style={{ color: 'rgba(255,255,255,0.95)' }}>{item.title}</h4>
                  <p className="text-[17px] leading-[1.8]" style={{ color: t.text }}>{item.body}</p>
                </div>
              </R>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  BEFORE/DURING — Timeline + full image
// ═══════════════════════════════════════════════════════════════
function BeforeDuring({ section, t }: { section: WelcomeSection; t: T }) {
  const cols = [t.accent1, t.accent2, t.accent3, t.accent1];
  const hasImg = !!section.image_url;
  return (
    <section style={{ backgroundColor: t.bg }} className="py-24">
      <div className={`max-w-[1300px] mx-auto px-8 md:px-16 ${hasImg ? 'grid grid-cols-1 md:grid-cols-2 gap-16 items-start' : ''}`}>
        <div className={hasImg ? '' : 'max-w-[800px]'}>
          <R><h2 className="text-[3.2rem] font-bold mb-16 leading-tight" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>{section.title}</h2></R>
          <div className="space-y-12">
            {(section.steps || []).map((step, i) => (
              <R key={i} d={0.12 * i} dir="left">
                <div className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{ border: `2.5px solid ${cols[i%4]}`, color: cols[i%4] }}>
                      {i + 1}
                    </div>
                    {i < (section.steps || []).length - 1 && (
                      <div className="w-px flex-1 min-h-[24px] mt-3 transition-all duration-500" style={{ backgroundColor: cols[i%4] + '40' }} />
                    )}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-bold text-[21px] mb-3" style={{ color: '#fff' }}>{step.title}</h4>
                    <p className="text-[17px] leading-[1.8]" style={{ color: t.text }}>{step.body}</p>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
        {hasImg && (
          <R dir="right" className="sticky top-24">
            <PImg src={section.image_url!} speed={0.1} />
          </R>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  INVOICE/PARKING — Clean 2-col with animated blobs
// ═══════════════════════════════════════════════════════════════
function InvoiceParking({ section, t }: { section: WelcomeSection; t: T }) {
  return (
    <section style={{ backgroundColor: t.bg }} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full" style={{ background: `radial-gradient(circle, ${t.glow1}, transparent)`, animation: 'wfloat 6s ease-in-out infinite' }} />
        <div className="absolute bottom-[20%] right-[25%] w-[400px] h-[400px] rounded-full" style={{ background: `radial-gradient(circle, ${t.glow2}, transparent)`, animation: 'wfloat 8s ease-in-out infinite 2s' }} />
      </div>
      <div className="max-w-[1000px] mx-auto px-8 md:px-16 relative z-10">
        <R><h2 className="text-[3.2rem] font-bold mb-16" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>{section.title}</h2></R>
        <div className="grid md:grid-cols-2 gap-16">
          {(section.items || []).map((item, i) => (
            <R key={i} d={0.14 * i} dir={i === 0 ? 'left' : 'right'}>
              <h4 className="font-bold text-[22px] mb-4" style={{ color: '#fff' }}>{item.title}</h4>
              <p className="text-[17px] leading-[1.8]" style={{ color: t.text }}>{item.body}</p>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  TERMS — Chevron badges + full image
// ═══════════════════════════════════════════════════════════════
function Terms({ section, t }: { section: WelcomeSection; t: T }) {
  const cols = [t.accent1, t.accent2, t.accent3];
  const hasImg = !!section.image_url;
  return (
    <section style={{ backgroundColor: t.bg }} className="py-24">
      <div className={`max-w-[1300px] mx-auto px-8 md:px-16 ${hasImg ? 'grid grid-cols-1 md:grid-cols-2 gap-16 items-start' : ''}`}>
        <div className={hasImg ? '' : 'max-w-[800px]'}>
          <R><h2 className="text-[3.2rem] font-bold mb-16 italic" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>{section.title}</h2></R>
          <div className="space-y-12">
            {(section.items || []).map((item, i) => (
              <R key={i} d={0.12 * i} dir="left">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <svg width="50" height="62" viewBox="0 0 50 62">
                      <path d="M2 2 L48 2 L48 48 L25 60 L2 48 Z" fill="none" stroke={cols[i%3]} strokeWidth="2" />
                      <text x="25" y="32" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="20" fontWeight="300" fontFamily="Georgia, serif">{i+1}</text>
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-[20px] mb-3" style={{ color: '#fff' }}>{item.title}</h4>
                    <p className="text-[17px] leading-[1.8]" style={{ color: t.text }}>{item.body}</p>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
        {hasImg && (
          <R dir="right" className="sticky top-24">
            <PImg src={section.image_url!} speed={0.1} />
          </R>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PHOTOGRAPHY — Full image + cards
// ═══════════════════════════════════════════════════════════════
function Photography({ section, t }: { section: WelcomeSection; t: T }) {
  const cols = [t.accent1, t.accent2, t.accent3];
  const hasImg = !!section.image_url;
  return (
    <section style={{ backgroundColor: t.bg }} className="py-24">
      <div className={`max-w-[1300px] mx-auto px-8 md:px-16 ${hasImg ? 'grid grid-cols-1 md:grid-cols-2 gap-16 items-start' : ''}`}>
        {hasImg && (
          <R dir="left" className="sticky top-24">
            <PImg src={section.image_url!} speed={0.1} />
          </R>
        )}
        <div className={hasImg ? '' : 'max-w-[800px]'}>
          <R><h2 className="text-[3rem] font-bold mb-5 italic leading-tight" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>{section.title}</h2></R>
          {section.body && <R d={0.08}><p className="text-[17px] leading-[1.8] mb-10" style={{ color: t.text }}>{section.body}</p></R>}
          <div className="space-y-5">
            {(section.items || []).map((item, i) => (
              <R key={i} d={0.12 * i} dir="scale">
                <div className="rounded-xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-white/5 cursor-default"
                  style={{ backgroundColor: t.cardBg, border: `2px solid ${cols[i%3]}` }}>
                  <h5 className="font-bold text-[19px] mb-2" style={{ color: '#fff' }}>{item.title}</h5>
                  <p className="text-[16px] leading-[1.7]" style={{ color: t.muted }}>{item.body}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PREPARATION — Icon grid with animated lines
// ═══════════════════════════════════════════════════════════════
function Preparation({ section, t }: { section: WelcomeSection; t: T }) {
  const cols = [t.accent1, t.accent2, t.accent3];
  return (
    <section style={{ backgroundColor: t.bg }} className="py-24">
      <div className="max-w-[1300px] mx-auto px-8 md:px-16">
        <R><h2 className="text-[3.2rem] font-bold mb-18 italic" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>{section.title}</h2></R>
        <div className="grid md:grid-cols-3 gap-16">
          {(section.items || []).map((item, i) => {
            const IC = gi(item.icon, i);
            const c = cols[i%3];
            return (
              <R key={i} d={0.14 * i}>
                <div className="group cursor-default">
                  <div className="flex items-center gap-0 mb-7">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{ border: `2px solid ${c}` }}>
                      <IC c={c} s={26} />
                    </div>
                    <div className="flex-1 h-[2px] transition-all duration-700 origin-left group-hover:scale-x-100 scale-x-75 opacity-50 group-hover:opacity-100" style={{ backgroundColor: c }} />
                  </div>
                  <h4 className="font-bold text-[21px] mb-3" style={{ color: '#fff' }}>{item.title}</h4>
                  <p className="text-[17px] leading-[1.8]" style={{ color: t.text }}>{item.body}</p>
                </div>
              </R>
            );
          })}
        </div>
        {section.footer_text && <R d={0.5}><p className="mt-16 text-[16px]" style={{ color: t.muted }}>{section.footer_text}</p></R>}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONTACT (basic) — 3 cols with ring decorations
// ═══════════════════════════════════════════════════════════════
function ContactBasic({ data, t }: { data: WelcomePageData; t: T }) {
  return (
    <section style={{ backgroundColor: t.bg }} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -top-16 left-[25%] w-[340px] h-[340px] opacity-[0.06]" viewBox="0 0 340 340"><circle cx="170" cy="170" r="160" fill="none" stroke={t.accent3} strokeWidth="2.5"/></svg>
        <svg className="absolute -top-8 left-[45%] w-[300px] h-[300px] opacity-[0.05]" viewBox="0 0 300 300"><circle cx="150" cy="150" r="140" fill="none" stroke={t.accent1} strokeWidth="2.5"/></svg>
        <svg className="absolute top-10 right-[8%] w-[320px] h-[320px] opacity-[0.06]" viewBox="0 0 320 320"><circle cx="160" cy="160" r="150" fill="none" stroke={t.accent2} strokeWidth="2.5"/></svg>
      </div>
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-16">
        <R><h2 className="text-[3.2rem] font-bold mb-16" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>Ekstra informasjon og kontakt</h2></R>
        <div className="grid md:grid-cols-3 gap-14">
          {data.social_links?.youtube && (
            <R d={0}><div className="group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ border: `2px solid ${t.accent1}` }}><Youtube size={24} color={t.accent1} /></div>
                <h4 className="font-bold text-[20px]" style={{ color: '#fff' }}>YouTube-kanal</h4>
              </div>
              <a href={data.social_links.youtube} target="_blank" rel="noopener noreferrer" className="text-[17px] underline hover:opacity-80 transition-opacity" style={{ color: t.accent1 }}>Idrettsbarna - YouTube</a>
            </div></R>
          )}
          {data.social_links?.facebook && (
            <R d={0.1}><div className="group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ border: `2px solid ${t.accent2}` }}><Globe size={24} color={t.accent2} /></div>
                <h4 className="font-bold text-[20px]" style={{ color: '#fff' }}>Sosiale medier</h4>
              </div>
              <p className="text-[17px] leading-[1.7]" style={{ color: t.text }}>Følg oss på Facebook og Instagram.</p>
            </div></R>
          )}
          {data.contact_phone && (
            <R d={0.2}><div className="group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ border: `2px solid ${t.accent3}` }}><Phone size={24} color={t.accent3} /></div>
                <h4 className="font-bold text-[20px]" style={{ color: '#fff' }}>Kontakt</h4>
              </div>
              <div className="text-[17px] space-y-2" style={{ color: t.text }}>
                {data.contact_name && <p>{data.contact_name}</p>}
                <p>{data.contact_phone}</p>
                {data.contact_website && <p className="font-medium">{data.contact_website}</p>}
              </div>
            </div></R>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONTACT V2 — Detailed
// ═══════════════════════════════════════════════════════════════
function ContactDetailed({ section, data, t }: { section: WelcomeSection; data: WelcomePageData; t: T }) {
  return (
    <section style={{ backgroundColor: t.bg }} className="py-24">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start px-8 md:px-16">
        {section.image_url && (
          <R dir="left" className="sticky top-24"><PImg src={section.image_url} speed={0.1} /></R>
        )}
        <div>
          <R><h2 className="text-[2rem] font-bold mb-1 italic" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>Kontakt oss</h2></R>
          <R d={0.05}><h3 className="text-[2.4rem] font-bold mb-5" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>Vi gleder oss til å se deg!</h3></R>
          <R d={0.1}><p className="text-[14.5px] leading-[1.75] mb-8" style={{ color: t.text }}>Om dere har spørsmål eller trenger mer informasjon, ikke nøl med å kontakte oss.</p></R>
          <div className="space-y-6">
            {[
              data.contact_phone && { icon: Phone, label: 'Telefon', text: `Ring oss gjerne på: ${data.contact_phone}` },
              data.contact_email && { icon: Mail, label: 'E-post', text: data.contact_email, href: `mailto:${data.contact_email}` },
              data.contact_website && { icon: Globe, label: 'Nettside', text: data.contact_website, href: `https://${data.contact_website}` },
              data.contact_photo_website && { icon: Camera, label: 'Fotografi', text: data.contact_photo_website, href: `https://${data.contact_photo_website}` },
            ].filter(Boolean).map((item: any, i) => (
              <R key={i} d={0.15 + 0.06 * i}>
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: t.accent2+'20' }}>
                    <item.icon size={18} color={t.accent2} />
                  </div>
                  <div>
                    <h5 className="font-bold text-[15px] mb-0.5" style={{ color: '#fff' }}>{item.label}</h5>
                    {item.href ? (
                      <p className="text-[14px]" style={{ color: t.text }}><a href={item.href} className="underline hover:opacity-80 transition-opacity" style={{ color: t.accent2 }}>{item.text}</a></p>
                    ) : (
                      <p className="text-[14px]" style={{ color: t.text }}>{item.text}</p>
                    )}
                  </div>
                </div>
              </R>
            ))}
          </div>
          <R d={0.5}><p className="mt-8 text-[14px]" style={{ color: t.muted }}>Med vennlig hilsen,<br/>{data.contact_name}</p></R>
        </div>
      </div>
    </section>
  );
}

// ─── Section dispatcher ───────────────────────────────────────
function S({ s, data, t }: { s: WelcomeSection; data: WelcomePageData; t: T }) {
  switch (s.type) {
    case 'practical_info': return <PracticalInfo section={s} t={t} />;
    case 'tickets': return <Tickets section={s} t={t} />;
    case 'tips': return <Tips section={s} t={t} />;
    case 'before_during': return <BeforeDuring section={s} t={t} />;
    case 'invoice_parking': return <InvoiceParking section={s} t={t} />;
    case 'fullwidth_image': return s.image_url ? <ImageBreak src={s.image_url} t={t} /> : null;
    case 'terms': return <Terms section={s} t={t} />;
    case 'photography': return <Photography section={s} t={t} />;
    case 'preparation': return <Preparation section={s} t={t} />;
    case 'contact': return <ContactBasic data={data} t={t} />;
    case 'contact_v2': return <ContactDetailed section={s} data={data} t={t} />;
    default: return null;
  }
}

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
//  KURSINFO-KORT — Personalisert kursinformasjon fra URL-parametere
// ═══════════════════════════════════════════════════════════════
function CourseInfoCard({ params, data, t }: { params: WelcomeParams; data: WelcomePageData; t: T }) {
  const hasCourseInfo = params.courseTitle || params.courseDay || params.courseTime;
  if (!hasCourseInfo) return null;

  const items: { icon: React.FC<{size:number;color:string}>; label: string; value: string }[] = [];
  if (params.courseStart && params.courseEnd && params.sessionCount) {
    items.push({ icon: CalendarDays, label: 'Kursperiode', value: `${params.courseDay ? params.courseDay.charAt(0).toUpperCase() + params.courseDay.slice(1) + ' ' : ''}${params.courseStart} – ${params.courseEnd} (${params.sessionCount} kursdager)` });
  } else if (params.courseStart) {
    items.push({ icon: CalendarDays, label: 'Kursstart', value: params.courseStart });
  }
  if (params.courseTime) {
    items.push({ icon: Clock, label: 'Tid', value: params.courseTime });
  }
  if (params.instructor) {
    items.push({ icon: User, label: 'Instruktør', value: params.instructor });
  }
  if (data.course_location) {
    items.push({ icon: MapPin, label: 'Kurssted', value: data.course_location });
  }
  if (data.parentInWater) {
    items.push({ icon: User, label: 'Merk', value: 'Foresatte er med i vannet på dette kurset' });
  }

  return (
    <section style={{ backgroundColor: t.bg }} className="py-12">
      <div className="max-w-[900px] mx-auto px-8 md:px-16">
        <R>
          <div className="rounded-2xl p-8 md:p-10" style={{
            backgroundColor: t.cardBg,
            border: `2px solid ${t.accent1}40`,
            backdropFilter: 'blur(10px)',
          }}>
            <h3 className="text-[24px] font-bold mb-6" style={{ color: t.heading, fontFamily: "'Georgia', serif" }}>
              {params.childName ? `${params.childName} – ${params.courseTitle || 'Svømmekurs'}` : params.courseTitle || 'Kursinformasjon'}
            </h3>
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: t.accent1 + '18' }}>
                    <item.icon size={18} color={t.accent1} />
                  </div>
                  <div>
                    <span className="text-[14px] font-bold" style={{ color: t.muted }}>{item.label}: </span>
                    <span className="text-[16px]" style={{ color: t.text }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

const WelcomePageRenderer: React.FC<{ data: WelcomePageData }> = ({ data }) => {
  const t = THEMES[data.theme] || THEMES.dark_navy;
  const params = useWelcomeParams();
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          @page { margin: 18mm 16mm; size: A4; }
          body { margin: 0 !important; padding: 0 !important; }
          .wr, .wr * { animation: none !important; transition: none !important; }
          .wr [style] { opacity: 1 !important; transform: none !important; }
          .wr, .wr section, .wr footer { background: #fff !important; background-image: none !important; }
          .wr h1 { font-family: Georgia, 'Times New Roman', serif !important; color: #1a1a2e !important; }
          .wr h2 {
            font-family: Georgia, 'Times New Roman', serif !important;
            color: #1a1a2e !important; font-size: 1.25rem !important; font-weight: 700 !important;
            margin-bottom: 0.5rem !important; padding-bottom: 0.3rem !important;
            border-bottom: 1px solid #e0e0e0 !important; break-after: avoid !important;
          }
          .wr h4, .wr h5 {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            color: #222 !important; font-size: 0.82rem !important; font-weight: 600 !important;
            margin-bottom: 1px !important; break-after: avoid !important;
          }
          .wr p { color: #444 !important; font-size: 0.76rem !important; line-height: 1.5 !important; orphans: 3 !important; widows: 3 !important; }
          .wr a { color: #3366aa !important; text-decoration: none !important; font-weight: 500 !important; }
          .wr .rounded-xl { background: transparent !important; border: none !important; border-radius: 0 !important; padding: 0.2rem 0 !important; box-shadow: none !important; break-inside: avoid; }
          .wr .rounded-full { width: 20px !important; height: 20px !important; min-width: 20px !important; min-height: 20px !important; border: 1.5px solid #aaa !important; color: #666 !important; font-size: 0.6rem !important; background: transparent !important; flex-shrink: 0 !important; }
          .wr svg { display: none !important; }
          .wr .flex.gap-5, .wr .flex.gap-6 { gap: 0.4rem !important; }
          .wr > section:first-of-type { min-height: auto !important; height: auto !important; overflow: visible !important; padding: 0 !important; margin-bottom: 8px !important; }
          .wr .hero-img { position: relative !important; display: block !important; width: 100% !important; height: 380px !important; object-fit: cover !important; object-position: center 55% !important; border-radius: 0 !important; margin-bottom: 12px !important; inset: auto !important; transform: none !important; }
          .wr .hero-overlay { display: none !important; }
          .wr > section:first-of-type > div.relative { min-height: auto !important; }
          .wr > section:first-of-type h1 { font-size: 1.6rem !important; margin-bottom: 4px !important; line-height: 1.15 !important; }
          .wr > section:first-of-type p { color: #555 !important; font-size: 0.82rem !important; }
          .wr > section:first-of-type > div:last-child > svg { display: none !important; }
          .wr section { padding: 10px 0 !important; break-inside: avoid !important; }
          .wr section + section { border-top: none !important; padding-top: 6px !important; }
          .wr section + section::before { content: '·  ·  ·' !important; display: block !important; text-align: center !important; color: #d0d0d0 !important; font-size: 0.7rem !important; letter-spacing: 0.5em !important; margin-bottom: 6px !important; }
          .wr .group, .wr .flex.gap-5, .wr .flex.gap-6 { break-inside: avoid !important; page-break-inside: avoid !important; }
          .wr section img:not(.hero-img) { display: none !important; }
          .wr .sticky { display: none !important; }
          .wr .pointer-events-none { display: none !important; }
          .wr .md\\:grid-cols-2 { grid-template-columns: 1fr !important; }
          .wr .md\\:grid-cols-3 { grid-template-columns: 1fr 1fr 1fr !important; }
          .wr .grid-cols-2 { grid-template-columns: 1fr 1fr !important; }
          .wr .grid { gap: 0.4rem !important; }
          .wr .space-y-10 > * + *, .wr .space-y-12 > * + * { margin-top: 0.5rem !important; }
          .wr section > div { max-width: 100% !important; }
          .wr .w-px { background-color: #ddd !important; }
          .wr footer { padding: 8px 0 !important; }
          .wr footer p { color: #888 !important; font-size: 0.7rem !important; }
        }
        html { scroll-behavior: smooth }
        .wr { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; overflow-x: hidden }
        .wr * { box-sizing: border-box }
        @keyframes wbounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        @keyframes wfloat { 0%,100% { transform: translate(0,0) } 50% { transform: translate(0,-20px) } }
      `}</style>
      <div className="wr">
        <div className="fixed bottom-8 right-8 z-50 no-print">
          <button onClick={() => window.print()} className="flex items-center gap-3 px-6 py-3 rounded-full font-medium text-sm shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: '#0a0e27' }}>
            <Download size={16} /> Last ned som PDF
          </button>
        </div>
        <Hero data={data} t={t} params={params} />
        <CourseInfoCard params={params} data={data} t={t} />
        {data.sections.map((s, i) => <S key={s.id||i} s={s} data={data} t={t} />)}
        <footer className="py-14 text-center" style={{ backgroundColor: t.bg }}>
          <R><p className="text-[18px] max-w-xl mx-auto px-6" style={{ color: t.muted }}>Vi ser frem til å møte dere på kurs og ønsker dere mange fine opplevelser sammen med oss!</p></R>
        </footer>
      </div>
    </>
  );
};

export default WelcomePageRenderer;
