import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const A = '/assets/';

function Icon({ name, size = 20, stroke = 1.8 }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    cap: <><path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c3.5 3 8.5 3 12 0v-5M22 10v6"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
    folder: <><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <><path d="M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 3a14 14 0 0 1-7-7l3-2-3-5Z"/></>,
    grad: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h8M8 11h8"/></>,
    sparkle: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7A5.2 5.2 0 0 0 18.8 5a4.8 4.8 0 0 0-.1-3S17.5 1.7 15 3.4a13 13 0 0 0-7 0C5.5 1.7 4.3 2 4.3 2a4.8 4.8 0 0 0-.1 3 5.2 5.2 0 0 0-1.4 3.7c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 8 18v4"/></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></>
  };
  return <svg {...shared}>{paths[name] || paths.sparkle}</svg>;
}

const education = [
  { degree: 'Bachelor of Engineering', subject: 'Computer Science', school: "BLDEA's V.P. Dr. P.G. Halakatti College of Engineering and Technology", place: 'Vijayapura', score: '8.0 CGPA' },
  { degree: 'Pre-University Course', subject: 'Science', school: 'Excellent Science PU College', place: 'Vijayapura', score: '91%' },
  { degree: 'CBSE Class X', subject: 'Secondary education', school: 'Anandathirtha Vidyalaya', place: 'Kurkar Village, Udupi', score: '78%' }
];

const skills = [
  { title: 'Programming Languages', items: [['Java','java'],['JavaScript','javascript'],['Python','python']] },
  { title: 'Frontend Development', items: [['HTML5','html5'],['CSS3','css3'],['JavaScript','javascript']] },
  { title: 'Backend Development', items: [['Java','java'],['Backend development',null]] },
  { title: 'Database', items: [['SQL',null]] },
  { title: 'Application Development', items: [['Android Development','androidstudio']] },
  { title: 'Tools', items: [['Android Studio','androidstudio'],['Git','git'],['GitHub','github']] },
  { title: 'Machine Learning', items: [['TensorFlow','tensorflow'],['Hugging Face Transformers','huggingface']] },
  { title: 'Core Concepts', items: [['Object-Oriented Programming',null],['Problem-Solving',null],['Debugging',null],['Data Cleaning and Preprocessing',null]] }
];

const projects = [
  { number: '01', name: 'Kannada Abstractive Text Summarization with Sentiment Analysis', type: 'NLP · MACHINE LEARNING', image: 'kannada-summarization.png', imageAlt: 'Illustration for the Kannada text summarization and sentiment analysis project', summary: 'An NLP-based application that generates abstractive summaries and performs sentiment analysis on large text documents, applying language processing and data techniques to extract meaningful information.', tags: ['Python','Hugging Face Transformers','TensorFlow'], repo: 'https://github.com/search?q=user%3AAkashproo+Kannada+Abstractive+Text+Summarization&type=repositories', repoLabel: 'Search Kannada Project', repoMatch: /kannada|summari[sz]/i, tone: 'kannada' },
  { number: '02', name: 'Expense Tracker App', type: 'ANDROID APPLICATION', image: 'expense-tracker-illustration.svg', imageAlt: 'Illustration for the Android expense tracking project', summary: 'An Android application for tracking daily expenses and maintaining spending records, with interfaces for recording and managing expense information.', tags: ['Java','XML','Android Studio'], repo: 'https://github.com/search?q=user%3AAkashproo+Expense+Tracker&type=repositories', repoLabel: 'Search Expense Tracker', repoMatch: /expense.?tracker/i, tone: 'expense' },
  { number: '03', name: 'Surya-Shakti Solar Monitor', type: 'ANDROID · CLEAN ENERGY', image: 'solar-monitor-illustration.svg', imageAlt: 'Illustration for the Surya-Shakti solar monitoring project', summary: 'An Android application for monitoring solar power generation and energy use, including recording and tracking generation and consumption.', tags: ['Java','XML','Firebase','Android Studio'], repo: 'https://github.com/Akashproo/suryashakti-solar-monitor', repoMatch: /surya.?shakti|solar.?monitor/i, tone: 'solar' }
];

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Home','#home'],['About','#about'],['Skills','#skills'],['Projects','#projects'],['Education','#education'],['Contact','#contact']];
  return <header className="header"><div className="header-inner wrap">
    <a className="brand" href="#home" aria-label="Akash Rathod home"><span className="brand-mark">AR<span>.</span></span><span className="brand-text"><b>Akash Rathod</b><small>Computer Science Engineer</small></span></a>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
    <nav className={open ? 'nav nav-open' : 'nav'} aria-label="Main navigation">{links.map(([label,href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Get In Touch <Icon name="arrow" size={15}/></a></nav>
  </div></header>;
}

function Socials() {
  return <div className="socials" aria-label="Social profiles">
    <a href="https://linkedin.com/in/akash-rathod-73749727" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin"/></a>
    <a href="https://github.com/Akashproo" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github"/></a>
    <a href="mailto:rtakash2003@gmail.com" aria-label="Email"><Icon name="mail"/></a>
    <a href="tel:+918105361870" aria-label="Phone"><Icon name="phone"/></a>
  </div>;
}

function Hero() {
  return <section className="hero wrap" id="home">
    <div className="hero-copy reveal"><div className="eyebrow"><span className="eyebrow-dot"/> WELCOME TO MY PORTFOLIO</div>
      <h1>Hello, I’m<br/><span>Akash Rathod</span><i>.</i></h1>
      <p className="hero-role">Computer Science Engineer</p>
      <p className="hero-intro">Computer Science Engineering graduate with hands-on experience in software development, Java, web technologies, databases, and Android application development. Passionate about building useful applications, solving problems, and continuously learning new technologies.</p>
      <div className="hero-actions"><a className="btn btn-dark" href="#projects">View My Projects <Icon name="arrow" size={17}/></a><a className="btn btn-outline" href="/assets/Akash-Rathod-CV.pdf" download>Download Resume <span className="download-mark">↓</span></a></div>
      <div className="hero-bottom"><Socials/><span className="hero-bottom-note">Seeking Frontend Developer or Backend Developer opportunities</span></div>
    </div>
    <div className="hero-visual reveal"><div className="portrait-stage"><div className="portrait-green"/><div className="sun-shape"/><div className="dot-field"/><div className="portrait-frame"><img src={`${A}akash-profile.png`} alt="Akash Rathod" fetchPriority="high"/><span className="photo-caption">AKASH RATHOD <b>·</b> COMPUTER SCIENCE ENGINEER</span></div><div className="curve-shape"/><div className="portrait-sticker"><span>AR</span><small>BUILDING<br/>WHAT'S NEXT</small></div></div>
      <aside className="quick-card"><p className="quick-title"><span className="status-dot"/> A LITTLE ABOUT ME</p><div className="quick-row"><Icon name="grad"/><span><small>EDUCATION</small><b>B.E. Computer Science</b></span></div><div className="quick-row"><Icon name="pin"/><span><small>LOCATION</small><b>Vijayapura, Karnataka</b></span></div><div className="quick-row"><Icon name="mail"/><span><small>EMAIL</small><a href="mailto:rtakash2003@gmail.com">rtakash2003@gmail.com</a></span></div><div className="quick-row"><Icon name="phone"/><span><small>PHONE</small><a href="tel:8105361870">8105361870</a></span></div><div className="availability"><span/> Seeking frontend or backend roles</div></aside>
    </div>
  </section>;
}

function About() {
  return <section className="about-section" id="about"><div className="wrap about reveal"><div className="section-label">A NOTE ABOUT ME <span>01 — 04</span></div><div className="about-row"><h2>Building useful<br/><em>software with purpose.</em></h2><div><p>Computer Science Engineering graduate with hands-on experience in software development, Java, JavaScript, HTML, CSS, SQL, Python, and application development.</p><p>Skilled in developing software applications, building user interfaces, working with databases, debugging issues, and implementing efficient solutions. Strong foundation in object-oriented programming, problem-solving, software development, and data processing.</p></div></div></div></section>;
}

function InfoSection() {
  return (
    <section className="info-section" id="education">
      <div className="wrap info-grid">
        <div className="info-column education-column">
          <div className="column-heading"><span className="heading-icon"><Icon name="cap" size={22}/></span><div><p>THE JOURNEY SO FAR</p><h2>Education</h2></div></div>
          <div className="timeline">{education.map((item, i) => (
            <article className="edu-item" key={item.degree}>
              <span className="timeline-node">0{i + 1}</span>
              <div><h3>{item.degree}</h3><p className="edu-subject">{item.subject}</p><p className="edu-school">{item.school}</p><small>{item.place}</small></div>
              <b className="edu-score">{item.score}</b>
            </article>
          ))}</div>
        </div>
        <div className="info-column skills-column" id="skills">
          <div className="column-heading"><span className="heading-icon"><Icon name="sparkle" size={22}/></span><div><p>FROM THE SUPPLIED CV</p><h2>Technical Skills</h2></div></div>
          <div className="skill-groups">{skills.map(group => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-items">{group.items.map(([label, icon]) => (
                <div className="skill-chip" key={label}>
                  {icon ? <img src={`${A}skills/${icon}.svg`} alt="" loading="lazy"/> : <span className="skill-letter" aria-hidden="true">{label.slice(0, 2).toUpperCase()}</span>}
                  <span>{label}</span>
                </div>
              ))}</div>
            </div>
          ))}</div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [repoUpdates, setRepoUpdates] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/Akashproo/repos?sort=updated&per_page=100', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    })
      .then(response => {
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
        return response.json();
      })
      .then(repositories => {
        const updates = {};
        projects.forEach(project => {
          const match = repositories.find(repo => project.repoMatch.test(`${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`));
          if (match) updates[project.number] = { url: match.html_url, pushedAt: match.pushed_at };
        });
        setRepoUpdates(updates);
      })
      .catch(error => {
        if (error.name !== 'AbortError') console.info('Using saved project links; GitHub could not be refreshed.', error);
      });
    return () => controller.abort();
  }, []);

  return <section className="projects-section" id="projects"><div className="projects wrap"><div className="projects-heading reveal"><div><div className="section-label"><Icon name="folder" size={16}/> SELECTED WORK <span>03 — 04</span></div><h2>Featured <em>Projects</em></h2></div><a className="text-link" href="https://github.com/Akashproo?tab=repositories" target="_blank" rel="noreferrer">View GitHub Profile <Icon name="arrow" size={16}/></a></div>
    <div className="project-grid">{projects.map(project => {
      const latest = repoUpdates[project.number];
      const href = latest?.url || project.repo;
      const label = latest ? 'View Repository' : (project.repoLabel || 'View Project');
      return <article className={`project-card ${project.tone} reveal`} key={project.number}>
        <a className="project-art" href={href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`}><img src={`${A}${project.image}`} alt={project.imageAlt} loading="lazy"/><span className="project-count">{project.number} / {project.type}</span><span className="art-arrow"><Icon name="arrow" size={17}/></span></a>
        <div className="project-content"><div className="project-title-row"><h3>{project.name}</h3><span className="project-number">{project.number}</span></div><p>{project.summary}</p><div className="tag-list">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
          <div className="project-links"><a href={href} target="_blank" rel="noreferrer"><Icon name="arrow" size={15}/> {label}</a><a href={href} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub`}><Icon name="github" size={17}/> GitHub</a></div>
          {latest?.pushedAt && <time className="repo-updated" dateTime={latest.pushedAt}>GitHub updated {new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(latest.pushedAt))}</time>}
        </div>
      </article>;
    })}</div>
  </div></section>;
}

function Contact() {
  const [state, setState] = useState({ kind: 'idle', message: 'Submit the form to send your message. Delivery status will appear here.' });
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subjectText = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !subjectText || !message) { setState({ kind: 'error', message: 'Please complete every field.' }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState({ kind: 'error', message: 'Please enter a valid email address.' }); return; }
    setState({ kind: 'sending', message: 'Sending your message…' });
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject: subjectText, message, website: String(data.get('website') || '') })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please email Akash directly.');
      form.reset();
      setState({ kind: 'success', message: 'Your message was sent successfully.' });
    } catch (error) {
      setState({ kind: 'error', message: error.message || 'Your message could not be sent. Please email Akash directly.' });
    }
  }
  return <section className="contact-section" id="contact"><div className="contact wrap"><div className="contact-panel reveal"><div className="contact-copy"><div className="section-label">LET'S CONNECT <span>04 — 04</span></div><h2>Have a good idea?<br/><em>Let's talk.</em></h2><p>Reach out about an opportunity, a project, or a good question. Send a message directly through this form.</p><div className="contact-details"><a className="contact-email" href="mailto:rtakash2003@gmail.com"><Icon name="mail" size={17}/> rtakash2003@gmail.com</a><a className="contact-email" href="tel:8105361870"><Icon name="phone" size={17}/> 8105361870</a><a className="contact-email" href="https://linkedin.com/in/akash-rathod-73749727" target="_blank" rel="noreferrer"><Icon name="linkedin" size={17}/> LinkedIn <Icon name="arrow" size={15}/></a><a className="contact-email" href="https://github.com/Akashproo" target="_blank" rel="noreferrer"><Icon name="github" size={17}/> GitHub <Icon name="arrow" size={15}/></a></div></div><form className="contact-form" onSubmit={submit} noValidate><label>Your name<input name="name" autoComplete="name" placeholder="Your name" maxLength={100} required/></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required/></label><label>Subject<input name="subject" placeholder="What would you like to discuss?" maxLength={180} required/></label><label>Your message<textarea name="message" rows="3" placeholder="Write your message..." maxLength={5000} required/></label><label className="form-trap" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label><button className="btn btn-yellow" type="submit" disabled={state.kind === 'sending'} aria-busy={state.kind === 'sending'}>{state.kind === 'sending' ? 'Sending…' : 'Send Email'} <Icon name="send" size={16}/></button><p className={`form-status ${state.kind}`} role="status" aria-live="polite">{state.message}</p></form></div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#home"><span className="brand-mark">AR<span>.</span></span><span className="brand-text"><b>Akash Rathod</b><small>Computer Science Engineer</small></span></a><p>© {new Date().getFullYear()} Akash Rathod. Made with care.</p><a className="back-top" href="#home">Back to top ↑</a></div></footer>;
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <><Header/><main><Hero/><About/><InfoSection/><Projects/><Contact/></main><Footer/></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
