import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, Check, Github, Linkedin, Mail, Menu, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { owner, projects, skillGroups, skills } from './data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const navItems = ['About', 'Skills', 'Projects', 'Contact'];

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
          '.hero-reveal',
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
            Portfolio / Full-Stack Developer
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
          <span className="brand-mark">NS</span>
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
            <span className="brand-mark">NS</span>
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
        <p className="hero-status">
          <span />
          Available for internships
        </p>
        <h1 className="hero-title">
          <span>Code</span>
          <span>Master</span>
        </h1>
        <p className="hero-role">Full-stack developer</p>
        <div className="hero-portrait">
          <img src="/assets/nobg.png" alt="Nitesh Salian" />
        </div>
        <div className="hero-copy">
          <p>
            I build practical MERN applications with clean React interfaces, Node APIs, and database-backed product flows.
          </p>
          <div className="hero-socials" aria-label="Social links">
            <a href={owner.github} aria-label="GitHub" data-cursor="OPEN"><Github size={16} /></a>
            <a href={owner.linkedin} aria-label="LinkedIn" data-cursor="OPEN"><Linkedin size={16} /></a>
            <a href={`mailto:${owner.email}`} aria-label="Email" data-cursor="OPEN"><Mail size={16} /></a>
          </div>
        </div>
        <div className="hero-note">
          <p>B.Sc. IT Student / React / Node.js / MongoDB</p>
          <button onClick={() => scrollToHash('#projects')} aria-label="View projects" data-cursor="VIEW">
            <ArrowDown size={18} />
          </button>
        </div>
        <div className="hero-actions">
          <button className="hero-action-primary" onClick={() => scrollToHash('#projects')} data-cursor="VIEW">
            View Work <ArrowRight size={17} />
          </button>
          <a className="hero-action-secondary" href="/cv.pdf" download data-cursor="OPEN">Download CV</a>
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

function Projects() {
  return (
    <section id="projects" className="section-pad mx-auto max-w-7xl px-5 md:px-8">
      <SectionTitle eyebrow="03 / Projects" title="Selected Work" />
      <div className="mt-14 space-y-8 lg:space-y-20">
        {projects.map((project) => (
          <article key={project.name} className="project-card grid min-h-[78vh] gap-8 border border-line bg-surface p-5 md:p-8 lg:grid-cols-[1.05fr_0.95fr]" data-cursor="VIEW">
            <div className="flex flex-col justify-between gap-12">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <span className="font-mono text-sm text-lime">[{project.number}]</span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-8">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.26em] text-muted">{project.tagline}</p>
                    <h3 className="mt-3 font-display text-[clamp(2.6rem,7vw,7rem)] font-bold uppercase leading-none text-white">{project.name}</h3>
                  </div>
                  <span className="font-mono text-sm text-muted">{project.year}</span>
                </div>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{project.description}</p>
                <ul className="mt-8 grid gap-3 text-white/90">
                  {project.highlights.map((highlight) => <li key={highlight} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-lime" />{highlight}</li>)}
                </ul>
              </div>
              <div className="flex gap-3">
                <a className="btn-primary" href="#" data-cursor="OPEN">Live Demo <ArrowRight size={18} /></a>
                <a className="btn-secondary" href="#" data-cursor="OPEN">GitHub</a>
              </div>
            </div>
            <div className="mockup relative overflow-hidden border border-line bg-ink p-4">
              <div className="mb-4 flex gap-2">{['', '', ''].map((_, i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/20" />)}</div>
              <div className="grid h-[calc(100%-2rem)] grid-rows-[0.8fr_1fr] gap-4">
                <div className="bg-lime p-5 text-ink">
                  <p className="font-mono text-xs uppercase">Project / {project.number}</p>
                  <p className="mt-8 font-display text-5xl font-bold uppercase">{project.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-line bg-surface p-4">
                    <div className="h-2 w-3/4 bg-white/30" />
                    <div className="mt-4 h-24 bg-white/10" />
                  </div>
                  <div className="space-y-3 border border-line bg-surface p-4">
                    <div className="h-2 bg-lime/70" />
                    <div className="h-2 w-2/3 bg-white/20" />
                    <div className="h-2 w-5/6 bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </article>
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
        {/* <p className="mt-8 max-w-xl text-xl text-muted">Open to internships, freelance work, and collaborations.</p> */}
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
    <footer className="border-t border-line px-5 py-8 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 text-sm text-muted md:grid-cols-3">
        <p><span className="text-white">{owner.name}</span> · Built with React + GSAP</p>
        <div className="flex flex-wrap gap-5 md:justify-center">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-lime">{item}</a>)}
        </div>
        <div className="flex gap-5 md:justify-end">
          <a href={owner.github}>GitHub</a>
          <a href={owner.linkedin}>LinkedIn</a>
          <a href={`mailto:${owner.email}`}>Email</a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-line pt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">© 2025 - Designed & Developed by {owner.name}</p>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.from('.char', { yPercent: 100, opacity: 0, stagger: 0.018, duration: 0.8, ease: 'power3.out', delay: 2 });
    gsap.utils.toArray('.section-heading').forEach((heading) => {
      gsap.fromTo(heading, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power4.out', scrollTrigger: { trigger: heading, start: 'top 78%' } });
    });
    gsap.utils.toArray('.reveal-lines p, .skill-panel, .project-card, .about-card').forEach((item) => {
      gsap.fromTo(item, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 82%' } });
    });
    gsap.utils.toArray('.skill-tag').forEach((tag, index) => {
      gsap.fromTo(tag, { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: (index % 4) * 0.04, scrollTrigger: { trigger: tag, start: 'top 92%' } });
    });

    return () => {
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
