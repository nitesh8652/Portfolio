import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowDown, ArrowRight, Check, Github, Linkedin, Mail, Menu, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { owner, projects, skillGroups, skills } from './data/portfolio';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navItems = ['About', 'Skills', 'Projects'];

const scrollToHash = (id) => {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Preloader() {
  const root = useRef(null);
  const name = 'Nitesh Salian';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const shell = document.querySelector('.site-shell');
      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

      tl.fromTo(
        '.loader-kicker',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' }
      )
        .fromTo(
          '.loader-char',
          { yPercent: 110, opacity: 0, rotateX: -45 },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.72, stagger: 0.035, ease: 'power4.out' },
          '-=0.08'
        )
        .fromTo(
          '.loader-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.52, ease: 'power3.out' },
          '-=0.28'
        )
        .to('.loader-name-wrap', { y: -54, opacity: 0, duration: 0.52, ease: 'power3.inOut' }, '+=0.28')
        .fromTo(
          shell,
          { y: 120, scale: 0.985, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.95, ease: 'power4.out' },
          '-=0.08'
        )
        .to('.curtain-top', { yPercent: -100, duration: 0.62 }, '-=0.05')
        .to('.curtain-bottom', { yPercent: 100, duration: 0.62 }, '<')
        .set(root.current, { pointerEvents: 'none' })
        .to(root.current, { autoAlpha: 0, duration: 0.1 })
        .fromTo(
          gsap.utils.toArray('.hero-reveal'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
          '-=0.28'
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="preloader fixed inset-0 z-[100] bg-ink">
      <div className="curtain-top absolute left-0 top-0 h-1/2 w-full bg-ink" />
      <div className="curtain-bottom absolute bottom-0 left-0 h-1/2 w-full bg-ink" />
      <div className="loader-name-wrap absolute inset-0 z-10 grid place-items-center px-5 text-center">
        <div>
          <p className="loader-kicker mb-5 font-mono text-[0.68rem] uppercase tracking-[0.42em] text-lime md:text-xs">
            Portfolio
          </p>
          <h1 className="loader-name overflow-hidden font-display text-[clamp(3.2rem,12vw,12rem)] font-bold uppercase leading-[0.82] text-white">
            {name.split('').map((char, index) => (
              <span className="loader-char inline-block" key={`${char}-${index}`}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <div className="loader-line mx-auto mt-7 h-px w-[min(22rem,72vw)] bg-lime" />
        </div>
      </div>
    </div>
  );
}

function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const quickDotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3.out' });
    const quickDotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3.out' });
    const quickRingX = gsap.quickTo(ring.current, 'x', { duration: 0.28, ease: 'power3.out' });
    const quickRingY = gsap.quickTo(ring.current, 'y', { duration: 0.28, ease: 'power3.out' });

    const move = (event) => {
      quickDotX(event.clientX);
      quickDotY(event.clientY);
      quickRingX(event.clientX);
      quickRingY(event.clientY);
    };

    const enter = (event) => {
      dot.current.style.opacity = '0';
      label.current.textContent = event.target.closest('[data-cursor]')?.dataset.cursor || 'OPEN';
      gsap.to(ring.current, { scale: 1.66, backgroundColor: 'rgba(200,255,0,0.22)', borderColor: '#C8FF00', duration: 0.25 });
      gsap.to(label.current, { opacity: 1, duration: 0.2 });
    };
    const leave = () => {
      dot.current.style.opacity = '1';
      gsap.to(ring.current, { scale: 1, backgroundColor: 'rgba(200,255,0,0)', borderColor: 'rgba(255,255,255,0.35)', duration: 0.25 });
      gsap.to(label.current, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', move);
    const targets = document.querySelectorAll('a, button, .project-card');
    targets.forEach((item) => {
      item.addEventListener('mouseenter', enter);
      item.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      targets.forEach((item) => {
        item.removeEventListener('mouseenter', enter);
        item.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring">
        <span ref={label} />
      </div>
    </>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-6">
      <nav className="nav-shell desktop-nav mx-auto hidden max-w-7xl items-center justify-between gap-4 lg:flex">
        <a href="#home" className="brand-link" data-cursor="OPEN" aria-label={`${owner.name} home`}>
          <img src="/assets/clibli.png" alt="logo" className="brand-mark " />
          <span className="brand-copy">
            <span>{owner.name}</span>
            <small>Full-Stack Developer</small>
          </span>
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} data-cursor="OPEN">
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav-cta" data-cursor="OPEN">
          <Mail size={16} />
          <span>Contact</span>
        </a>
      </nav>
      <nav className="mobile-nav mx-auto max-w-7xl lg:hidden">
        <div className="mobile-nav-bar">
          <a href="#home" className="brand-link" onClick={closeMenu} data-cursor="OPEN" aria-label={`${owner.name} home`}>
            <img src="/assets/clibli.png" alt="logo" className="brand-mark brand-fan" />
            <span className="brand-copy">
              <span>{owner.name}</span>
              <small>Portfolio</small>
            </span>
          </a>
          <button
            className="mobile-menu-toggle"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            data-cursor="OPEN"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`mobile-nav-panel ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map((item, index) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu} data-cursor="OPEN">
              <span>0{index + 1}</span>
              {item}
            </a>
          ))}
          <a href="#contact" className="mobile-panel-cta" onClick={closeMenu} data-cursor="OPEN">
            <Mail size={16} />
            Contact Me
          </a>
        </div>
      </nav>
    </header>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="section-heading max-w-4xl">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-lime">{eyebrow}</p>
      <h2 className="clip-title font-display text-[clamp(2.4rem,7vw,6.7rem)] font-bold uppercase leading-[0.88] text-white">{title}</h2>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section relative min-h-screen overflow-hidden px-4 pb-8 pt-28 md:px-6 lg:pt-32">
      <div className="hero-poster hero-reveal mx-auto max-w-7xl">
        <div className="hero-grid" aria-hidden="true" />

        {/* Giant editorial title — spans full width, sits behind the portrait */}
        <h1 className="hero-title" aria-label="Code Master">
          {/* <span>Web</span> */}
          <span>Devloper</span>
        </h1>

        {/* Portrait — centred, overlaps the title at z-index 2 */}
        <div className="hero-portrait">
          <img src="/assets/nobg.png" alt="Nitesh Salian" />
        </div>

        {/* Bottom-left: availability pill + short description + social icons */}
        <div className="hero-copy">
          <p className="hero-status-inline">
            <span className="hero-status-dot" />
            Available for Work
          </p>
          <p>
            What makes my development unique is the combination of technical
            precision and a user-first touch.
          </p>
          <div className="hero-socials" aria-label="Social links">
            <a href={owner.github} aria-label="GitHub" data-cursor="OPEN"><Github size={16} /></a>
            <a href={owner.linkedin} aria-label="LinkedIn" data-cursor="OPEN"><Linkedin size={16} /></a>
            <a href={`mailto:${owner.email}`} aria-label="Email" data-cursor="OPEN"><Mail size={16} /></a>
          </div>
        </div>

        {/* Bottom-right: tagline + scroll-down arrow */}
        <div className="hero-note">
          <p>
            Immerse yourself in full-stack solutions where every commit tells a story — from polished React UIs to powerful Node.js APIs.
          </p>
          <button onClick={() => scrollToHash('#projects')} aria-label="View projects" data-cursor="VIEW">
            <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <SectionTitle eyebrow="01 / About" title="Who I Am" />
        <div className="reveal-lines mt-10 space-y-6 text-xl leading-relaxed text-muted">
          <p>I'm a B.Sc. IT student and aspiring full-stack developer focused on building scalable web applications using the MERN stack. I work with React on the frontend and Node.js + Express on the backend.</p>
          <p>I'm drawn to practical, user-focused products: productivity tools, job platforms, and real-time systems. Outside of building, I sharpen my problem-solving through Data Structures & Algorithms in Java.</p>
        </div>
      </div>
      <div className="about-card border border-line bg-surface p-6 md:p-8">
        <div className="space-y-6">
          <Info label="Education" value="B.Sc. IT - Currently Pursuing" />
          <Info label="Focus" value="Web Development · DSA · Database Systems" />
        </div>
        <div className="mt-10 grid grid-cols-3 gap-3">
          {[
            ['4', 'Projects'],
            ['1+', 'Year'],
            ['MERN', 'Stack']
          ].map(([value, label]) => (
            <div key={label} className="stat border border-line bg-ink p-4">
              <strong className="stat-value block font-display text-3xl text-lime">{value}</strong>
              <span className="font-mono text-[0.65rem] uppercase text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.26em] text-lime">{label}</p>
      <p className="mt-2 text-xl text-white">{value}</p>
    </div>
  );
}

function Skills() {
  const row = [...skills, ...skills];
  return (
    <section id="skills" className="section-pad overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle eyebrow="02 / Skills" title="Stack & Tools" />
      </div>
      <div className="my-14 border-y border-lime/40 py-5">
        <div className="marquee marquee-left font-display text-4xl font-bold uppercase text-white/95">
          {row.map((skill, index) => <span key={`${skill}-${index}`}>{skill}</span>)}
        </div>
        <div className="mt-4 h-px bg-lime/70" />
        <div className="marquee marquee-right mt-4 font-display text-4xl font-bold uppercase text-white/35">
          {row.map((skill, index) => <span key={`${skill}-${index}`}>{skill}</span>)}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="skill-panel border border-line bg-surface p-6">
            <h3 className="mb-5 font-display text-2xl uppercase text-white">{group.title}</h3>
            <div className="flex flex-wrap gap-3">
              {group.items.map((item) => <span className="skill-tag" key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const PROJECT_PALETTES = [
  {
    bg: 'linear-gradient(160deg,#0d1b2a 0%,#0a3d2e 55%,#1a6b4a 100%)',
    accent: '#34d399',
    pattern: 'radial',
  },
  {
    bg: 'linear-gradient(140deg,#10002b 0%,#240046 50%,#3c096c 100%)',
    accent: '#c77dff',
    pattern: 'grid',
  },
  {
    bg: 'linear-gradient(155deg,#03071e 0%,#370617 50%,#6a040f 100%)',
    accent: '#f48c06',
    pattern: 'dots',
  },
  {
    bg: 'linear-gradient(145deg,#001219 0%,#005f73 55%,#0a9396 100%)',
    accent: '#94d2bd',
    pattern: 'lines',
  },
];

function ProjectCard({ project, index }) {
  const palette = PROJECT_PALETTES[index % PROJECT_PALETTES.length];

  return (
    <article
      className="project-h-card"
      data-cursor="VIEW"
      style={{
        '--card-bg': palette.bg,
        '--card-accent': palette.accent,
      }}
    >
      {/* ── Visual background ── */}
      <div className="project-h-visual">
        <div className="project-h-visual-bg" />

        {/* Decorative pattern overlay */}
        {palette.pattern === 'radial' && (
          <svg className="project-h-pattern" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            {[1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx="200" cy="300" r={i * 70} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            ))}
            <circle cx="200" cy="300" r="40" fill={`${palette.accent}22`} />
          </svg>
        )}
        {palette.pattern === 'grid' && (
          <svg className="project-h-pattern" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="400" height="600" fill={`url(#grid-${index})`} />
            <rect x="120" y="200" width="160" height="160" fill="none" stroke={`${palette.accent}40`} strokeWidth="1" transform="rotate(45 200 280)" />
          </svg>
        )}
        {palette.pattern === 'dots' && (
          <svg className="project-h-pattern" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id={`dots-${index}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)" />
              </pattern>
            </defs>
            <rect width="400" height="600" fill={`url(#dots-${index})`} />
            <polygon points="200,140 310,340 90,340" fill="none" stroke={`${palette.accent}35`} strokeWidth="1" />
          </svg>
        )}
        {palette.pattern === 'lines' && (
          <svg className="project-h-pattern" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1="0" y1={i * 80} x2="400" y2={i * 80 + 100} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            <rect x="80" y="220" width="240" height="120" rx="4" fill={`${palette.accent}18`} stroke={`${palette.accent}40`} strokeWidth="1" />
          </svg>
        )}

        {/* Floating number */}
        <span className="project-h-num">{project.number}</span>
      </div>

      {/* ── Content overlay (slides up on active) ── */}
      <div className="project-h-overlay">
        <div className="project-h-overlay-inner">
          <p className="project-h-tagline">{project.tagline}</p>
          <h3 className="project-h-title">{project.name}</h3>
          <p className="project-h-desc">{project.description.slice(0, 105)}…</p>

          <div className="project-h-footer">
            <div className="project-h-tags">
              {project.stack.slice(0, 2).map((tag) => (
                <span key={tag} className="project-h-tag">{tag}</span>
              ))}
            </div>
            <a href="#" className="project-h-cta" data-cursor="OPEN">
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-pad mx-auto max-w-7xl px-5 md:px-8">
      <SectionTitle eyebrow="03 / Projects" title="My Works" />
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Witness the craft behind every line — full-stack builds from polished UIs to powerful APIs.
      </p>
      <div className="projects-grid mt-14">
        {projects.map((project, index) => (
          <ProjectCard
            key={`${project.name}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [notice, setNotice] = useState('');

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const copyEmail = async (event) => {
    event.preventDefault();
    await navigator.clipboard.writeText(owner.email);
    setNotice('Email copied.');
    setTimeout(() => setNotice(''), 1800);
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setNotice('');
    try {
      await axios.post('/api/contact', form);
      setStatus('sent');
      setNotice('Message sent.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('idle');
      setNotice(error.response?.data?.message || 'Unable to send right now.');
    }
  };

  return (
    <section id="contact" className="section-pad mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1fr]">
      <div>
        <SectionTitle eyebrow="04 / Contact" title="Let's Build Something." />
        <a href={`mailto:${owner.email}`} onClick={copyEmail} className="mt-8 inline-flex text-2xl text-white underline decoration-lime underline-offset-8" data-cursor="OPEN">{owner.email}</a>
        <div className="mt-8 flex gap-3">
          <a className="icon-link" href={owner.github} aria-label="GitHub" data-cursor="OPEN"><Github size={20} /></a>
          <a className="icon-link" href={owner.linkedin} aria-label="LinkedIn" data-cursor="OPEN"><Linkedin size={20} /></a>
          <a className="icon-link" href={`mailto:${owner.email}`} aria-label="Email" data-cursor="OPEN"><Mail size={20} /></a>
        </div>
        {notice && <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-lime">{notice}</p>}
      </div>
      <form className="contact-form border border-line bg-surface p-5 md:p-8" onSubmit={submit}>
        {['name', 'email', 'subject'].map((field) => (
          <label className="field" key={field}>
            <input name={field} value={form[field]} onChange={update} required type={field === 'email' ? 'email' : 'text'} placeholder=" " />
            <span>{field}</span>
          </label>
        ))}
        <label className="field">
          <textarea name="message" value={form.message} onChange={update} required rows="6" placeholder=" " />
          <span>message</span>
        </label>
        <button className="btn-primary w-full justify-center" type="submit" disabled={status === 'loading'} data-cursor="OPEN">
          {status === 'loading' ? <span className="loader" /> : status === 'sent' ? <><Check size={18} /> Sent!</> : <>Send Message <Send size={18} /></>}
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 py-12 md:px-8">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-lime/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">

        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3 md:items-center">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {owner.name}
            </h2>

          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-start gap-4 md:justify-center">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative text-sm text-muted transition-colors duration-300 hover:text-lime"
              >
                {item}

                {/* underline animation */}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-lime transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-4 md:justify-end">
            {[
              { name: "GitHub", link: owner.github },
              { name: "LinkedIn", link: owner.linkedin },
              { name: "Email", link: `mailto:${owner.email}` },
            ].map((social) => (
              <a
                key={social.name}
                href={social.link}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-black"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-muted md:flex-row">
          <p>© 2026 {owner.name}. All rights reserved.</p>

          <p className="font-mono text-[11px] text-white/50">
            Designed, Developed & Engineer  with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    // Named function so we can properly remove it later
    const lenisRaf = (time) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    // GSAP scroll animations
    if (document.querySelectorAll('.char').length) {
      gsap.from('.char', { yPercent: 100, opacity: 0, stagger: 0.018, duration: 0.8, ease: 'power3.out', delay: 2 });
    }
    gsap.utils.toArray('.section-heading').forEach((heading) => {
      gsap.fromTo(heading, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power4.out', scrollTrigger: { trigger: heading, start: 'top 78%' } });
    });
    gsap.utils.toArray('.reveal-lines p, .skill-panel, .project-h-card, .about-card').forEach((item) => {
      gsap.fromTo(item, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 82%' } });
    });
    gsap.utils.toArray('.skill-tag').forEach((tag, index) => {
      gsap.fromTo(tag, { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: (index % 4) * 0.04, scrollTrigger: { trigger: tag, start: 'top 92%' } });
    });

    // Single cleanup at the end
    return () => {
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <div className="site-shell">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}