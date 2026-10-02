import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.2, 0.75, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

function Reveal({ children, className = '', delay = 0, as: Component = motion.div, ...props }) {
  const reduceMotion = useReducedMotion();
  return (
    <Component
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={delay ? { delay } : undefined}
      {...(reduceMotion ? { initial: false, whileInView: undefined } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function Icon({ type }) {
  const common = { width: 25, height: 25, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></>,
    product: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    partner: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  };
  return <svg {...common}>{paths[type]}</svg>;
}

const services = [
  { no: '01', icon: 'code', title: 'Web applications', text: 'Custom full-stack experiences shaped around your workflow, your customers, and what success looks like.' },
  { no: '02', icon: 'product', title: 'Product design & build', text: 'From early idea to launch, with thoughtful UX, responsive interfaces, and a reliable foundation.' },
  { no: '03', icon: 'partner', title: 'Ongoing partnership', text: 'Improvements, new features, and practical technical support as your product and team evolve.' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="wrap top-line"><span><b>INDEPENDENT DEVELOPER</b><i> · </i> AVAILABLE FOR SELECT PROJECTS</span><span>BASED IN NANJING <i>·</i> WORKING WORLDWIDE</span></div>
      <nav className="wrap nav" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Salma Mohamed home" onClick={close}>S<span>M</span></a>
        <button className="menu-toggle" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          <a href="#services" onClick={close}>What I do</a><a href="#work" onClick={close}>Selected work</a><a href="#about" onClick={close}>About</a><a href="#experience" onClick={close}>Experience</a>
        </div>
        <a className="button nav-cta" href="#contact">Let’s talk <Arrow diagonal /></a>
      </nav>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="wrap hero" id="home">
      <motion.div className="hero-copy" initial={reduceMotion ? false : 'hidden'} animate="visible" variants={stagger}>
        <motion.div className="eyebrow mono" variants={rise}><span>FULL-STACK WEB DEVELOPER</span><i /><span>01 / 03</span></motion.div>
        <motion.h1 variants={rise}>Ideas into<br /><span className="accent">digital</span> things.</motion.h1>
        <motion.p className="hero-intro" variants={rise}>I build thoughtful web experiences for businesses ready to grow.</motion.p>
        <motion.p className="hero-note" variants={rise}>From the first sketch to launch day, I bring design, engineering, and a little curiosity to every project.</motion.p>
        <motion.div className="actions" variants={rise}><a className="button magnetic" href="#contact">Start a project <Arrow diagonal /></a><a className="button secondary" href="#work">Explore my work <span aria-hidden="true">↓</span></a></motion.div>
        <motion.div className="hero-meta mono" variants={rise}><i className="pulse" /> OPEN TO FREELANCE PROJECTS <span>·</span> 2026</motion.div>
      </motion.div>
      <motion.div className="hero-art" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.35, ease: [0.2, 0.75, 0.2, 1] }}>
        <motion.div className="orbit orbit-one" animate={reduceMotion ? {} : { rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="orbit orbit-two" animate={reduceMotion ? {} : { rotate: -360 }} transition={{ duration: 58, repeat: Infinity, ease: 'linear' }} />
        <div className="monogram">SM</div><div className="art-label">DESIGN · DEVELOP · DELIVER</div>
      </motion.div>
      <div className="scroll-cue mono">SCROLL TO EXPLORE<motion.span animate={reduceMotion ? {} : { scaleY: [1, 0.55, 1] }} transition={{ duration: 1.4, repeat: Infinity }} /></div>
    </section>
  );
}

function Ticker() {
  const items = ['Thoughtful interfaces', 'End-to-end development', 'Fast, accessible web', 'Built around your goals'];
  return <div className="ticker" aria-label="Services"><motion.div className="ticker-track" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }} aria-hidden="true">{[...items, ...items, ...items, ...items].map((item, i) => <span className="ticker-item" key={`${item}-${i}`}>{item}<b>✳</b></span>)}</motion.div></div>;
}

function SectionHeading({ label, title, text }) {
  return <div className="section-head"><div><div className="mono">{label}</div><h2>{title}</h2></div><p>{text}</p></div>;
}

function Services() {
  return <section className="wrap section" id="services"><Reveal><SectionHeading label="01 — HOW I CAN HELP" title="Good work, end to end." text="One partner for the details that make a digital product feel complete: clear thinking, considered design, and solid code." /></Reveal><motion.div className="services" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>{services.map((service) => <motion.article className="service" variants={rise} key={service.no} whileHover={{ y: -8, transition: { duration: 0.25 } }}><span className="service-index">{service.no}</span><div className="service-icon"><Icon type={service.icon} /></div><h3>{service.title}</h3><p>{service.text}</p></motion.article>)}</motion.div></section>;
}

function ProjectMockup() {
  return <div className="project-visual" aria-label="Stylized preview of the Tough Haulers request center"><motion.div className="orbit orbit-project" animate={{ rotate: 360 }} transition={{ duration: 54, repeat: Infinity, ease: 'linear' }} /><motion.div className="dashboard" whileHover={{ rotate: 0, scale: 1.035 }} initial={{ rotate: -4 }}><div className="dash-top"><i /><i /><i /></div><div className="dash-content"><div className="dash-kicker">TOUGH HAULERS / REQUEST CENTER</div><div className="dash-title">Service that moves with you.</div><div className="dash-grid"><div className="dash-box" /><div className="dash-box" /><div className="dash-box wide" /></div></div></motion.div></div>;
}

function Work() {
  return <section className="featured section" id="work"><div className="wrap"><Reveal><SectionHeading label="02 — SELECTED PROJECT" title="Made to work in the real world." text="A closer look at a complete digital product, from the customer journey to the systems behind it." /></Reveal><Reveal className="project-card"><div className="project-info"><div className="mono">01 / WEB APPLICATION</div><h3>Tough<br />Haulers</h3><p>A complete web platform for a hauling and junk removal business. Designed to make finding a service and requesting a quote feel clear and effortless.</p><div className="project-tags"><span className="tag">UX & UI</span><span className="tag">FULL STACK</span><span className="tag">RESPONSIVE</span><span className="tag">OPERATIONS</span></div><a className="arrow-link" href="https://toughhaulers.cn.com" target="_blank" rel="noreferrer">Explore the live project <Arrow diagonal /></a></div><ProjectMockup /></Reveal></div></section>;
}

function About() {
  return <section className="wrap section" id="about"><div className="about-grid"><Reveal className="about-aside"><div className="mono">A LITTLE ABOUT ME</div><h2>Curious by nature.<br />Builder by choice.</h2><div className="big-num">SM</div></Reveal><Reveal className="about-copy"><p className="lead">I’m Salma, a full-stack developer who enjoys turning complex ideas into calm, useful digital experiences.</p><p>I work across the whole process: asking the right questions, shaping the experience, building the product, and refining the details. I’m always learning new tools and approaches so I can find the right solution for each project.</p><p>Alongside client work, I’m pursuing a Master’s in Computer Science and exploring human-centered AI research. It keeps me asking better questions about how technology can serve people.</p><div className="stats"><div className="stat"><strong>01</strong><span>PROJECT, START TO FINISH</span></div><div className="stat"><strong>360°</strong><span>PRODUCT THINKING</span></div><div className="stat"><strong>∞</strong><span>ALWAYS LEARNING</span></div></div></Reveal></div></section>;
}

const history = [
  { date: '2024 — NOW', title: 'Full-Stack Developer', detail: 'Designing and building complete web applications for real businesses and teams.', place: 'INDEPENDENT · FREELANCE' },
  { date: '2024 — NOW', title: 'MSc, Computer Science', detail: 'Researching modern web technologies, AI, and human-centered design.', place: 'NANJING UNIVERSITY' },
  { date: 'ALWAYS', title: 'Learning in public', detail: 'Exploring new technologies and bringing useful ideas into the work.', place: 'NEXT CHAPTER, ALWAYS' },
];

function Experience() {
  return <section className="experience section" id="experience"><div className="wrap"><Reveal><SectionHeading label="03 — THE JOURNEY" title="Always in progress." text="Experience is more than a list of tools. It’s the practice of making each next thing better." /></Reveal><div className="timeline">{history.map((item, i) => <Reveal className="timeline-row" key={item.title} delay={i * 0.08}><time>{item.date}</time><div><h3>{item.title}</h3><p>{item.detail}</p></div><div className="timeline-place">{item.place}</div></Reveal>)}</div></div></section>;
}

function Contact() {
  return <section className="wrap contact" id="contact"><Reveal className="contact-panel"><div><div className="mono light-mono">HAVE SOMETHING IN MIND?</div><h2>Let’s make it<br />mean something.</h2><p>Tell me what you’re building. I’d love to hear about it.</p></div><a className="button contact-button magnetic" href="mailto:hello@salma.dev">Tell me about it <Arrow diagonal /></a></Reveal><footer className="contact-foot"><span>© 2026 SALMA MOHAMED</span><div className="socials"><a href="mailto:hello@salma.dev">EMAIL</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LINKEDIN</a><a href="https://github.com" target="_blank" rel="noreferrer">GITHUB</a></div><span>MADE WITH INTENTION · SM</span></footer></section>;
}

export default function App() {
  return <><Header /><main><Hero /><Ticker /><Services /><Work /><About /><Experience /><Contact /></main></>;
}
