"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Atom,
  Bolt,
  Bot,
  Check,
  ChevronRight,
  Code2,
  FlaskConical,
  HeartPulse,
  Leaf,
  Menu,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const tracks = [
  {
    id: "engineering",
    label: "Build Lab",
    eyebrow: "Engineering",
    description: "Turn sketches into machines, structures and working prototypes.",
    icon: Bot,
    color: "var(--rush-yellow)",
    text: "#17280f",
    starter: "Design a paper bridge",
  },
  {
    id: "technology",
    label: "Code Lab",
    eyebrow: "Technology",
    description: "Create apps, games and digital tools that solve real problems.",
    icon: Code2,
    color: "var(--rush-blue)",
    text: "#071a2d",
    starter: "Build a one-page app",
  },
  {
    id: "science",
    label: "Discovery Lab",
    eyebrow: "Science",
    description: "Ask sharper questions, test ideas and make sense of the world.",
    icon: FlaskConical,
    color: "var(--rush-coral)",
    text: "#32100a",
    starter: "Run a kitchen chemistry test",
  },
  {
    id: "environment",
    label: "Planet Lab",
    eyebrow: "Climate + Earth",
    description: "Explore energy, food, water and the systems shaping our island.",
    icon: Leaf,
    color: "var(--rush-green)",
    text: "#082718",
    starter: "Map your home energy use",
  },
];

const questions = [
  {
    prompt: "Which kind of challenge pulls you in?",
    options: [
      { label: "Build something real", track: "engineering", icon: Bot },
      { label: "Create something digital", track: "technology", icon: Code2 },
      { label: "Figure out why", track: "science", icon: FlaskConical },
      { label: "Protect what matters", track: "environment", icon: Leaf },
    ],
  },
  {
    prompt: "Pick your ideal Saturday project.",
    options: [
      { label: "A moving robot", track: "engineering", icon: Bot },
      { label: "A useful mobile tool", track: "technology", icon: Code2 },
      { label: "A surprising experiment", track: "science", icon: Atom },
      { label: "A solar-powered solution", track: "environment", icon: Bolt },
    ],
  },
  {
    prompt: "What sounds most satisfying?",
    options: [
      { label: "Watching a prototype work", track: "engineering", icon: Rocket },
      { label: "Shipping something people use", track: "technology", icon: Users },
      { label: "Proving a theory", track: "science", icon: Sparkles },
      { label: "Improving your community", track: "environment", icon: HeartPulse },
    ],
  },
];

const missions = [
  {
    number: "01",
    title: "Bridge the gap",
    track: "Build Lab",
    time: "35 min",
    description: "Use one sheet of paper and tape to hold the most coins across a 20 cm gap.",
    accent: "yellow",
    icon: Bot,
  },
  {
    number: "02",
    title: "Remix your routine",
    track: "Code Lab",
    time: "45 min",
    description: "Plan a tiny digital tool that removes one annoying step from your school day.",
    accent: "blue",
    icon: Code2,
  },
  {
    number: "03",
    title: "Cool the room",
    track: "Planet Lab",
    time: "30 min",
    description: "Measure the warmest areas in a room and prototype a low-energy cooling idea.",
    accent: "green",
    icon: Leaf,
  },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [question, setQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [activeMission, setActiveMission] = useState(0);
  const [missionStarted, setMissionStarted] = useState(false);

  const recommendedTrack = useMemo(
    () => tracks.find((track) => track.id === result),
    [result],
  );

  function answerQuiz(trackId: string) {
    const nextScores = { ...scores, [trackId]: (scores[trackId] ?? 0) + 1 };
    setScores(nextScores);

    if (question < questions.length - 1) {
      setQuestion((current) => current + 1);
      return;
    }

    const winner = Object.entries(nextScores).sort((a, b) => b[1] - a[1])[0][0];
    setResult(winner);
  }

  function resetQuiz() {
    setQuestion(0);
    setScores({});
    setResult(null);
  }

  const selectedMission = missions[activeMission];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="STEM Rush home">
          <span className="brand-mark"><Atom size={24} strokeWidth={2.6} /></span>
          <span>STEM <b>RUSH</b></span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#missions">Missions</a>
          <a href="#roadmap">Roadmap</a>
        </nav>

        <a className="nav-cta" href="#compass">Find my lane <ArrowRight size={17} /></a>
        <button
          className="menu-button"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#discover" onClick={() => setMobileOpen(false)}>Discover</a>
            <a href="#missions" onClick={() => setMobileOpen(false)}>Missions</a>
            <a href="#roadmap" onClick={() => setMobileOpen(false)}>Roadmap</a>
            <a href="#compass" onClick={() => setMobileOpen(false)}>Find my lane</a>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />

        <div className="hero-copy">
          <p className="kicker"><span /> Made in Jamaica for curious minds</p>
          <h1>Don’t just study the future. <em>Build it.</em></h1>
          <p className="hero-lede">
            Find your STEM lane, try hands-on missions and turn the things you wonder about into things you can make.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#compass">Take the 60-second compass <ArrowRight /></a>
            <a className="secondary-action" href="#missions">Try a mission</a>
          </div>
          <div className="hero-proof" aria-label="Platform highlights">
            <div><strong>4</strong><span>STEM lanes</span></div>
            <div><strong>3</strong><span>starter missions</span></div>
            <div><strong>0</strong><span>experience needed</span></div>
          </div>
        </div>

        <div className="compass-shell" id="compass">
          <div className="compass-topline">
            <span>STEM COMPASS</span>
            <span>{result ? "MATCH FOUND" : `${String(question + 1).padStart(2, "0")} / 03`}</span>
          </div>

          {!result ? (
            <>
              <Progress value={((question + 1) / questions.length) * 100} className="quiz-progress" />
              <h2>{questions[question].prompt}</h2>
              <div className="answer-grid">
                {questions[question].options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button key={option.label} type="button" onClick={() => answerQuiz(option.track)}>
                      <Icon size={21} />
                      <span>{option.label}</span>
                      <ChevronRight size={17} />
                    </button>
                  );
                })}
              </div>
              <p className="compass-note">No grades. No wrong answers. Just follow your curiosity.</p>
            </>
          ) : recommendedTrack ? (
            <div className="result-card">
              <div className="result-icon" style={{ background: recommendedTrack.color, color: recommendedTrack.text }}>
                <recommendedTrack.icon size={33} />
              </div>
              <p>Your strongest signal</p>
              <h2>{recommendedTrack.label}</h2>
              <span>{recommendedTrack.description}</span>
              <a href="#discover">Explore this lane <ArrowRight size={18} /></a>
              <button type="button" onClick={resetQuiz}>Retake compass</button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="ticker" aria-label="STEM themes">
        <div>
          <span>ASK BETTER QUESTIONS</span><Sparkles />
          <span>BUILD WITH PURPOSE</span><Sparkles />
          <span>TEST THE WILD IDEA</span><Sparkles />
          <span>START BEFORE YOU’RE READY</span><Sparkles />
        </div>
      </section>

      <section className="section discover-section" id="discover">
        <div className="section-heading">
          <div>
            <p className="section-number">01 — DISCOVER</p>
            <h2>There’s more than one way into STEM.</h2>
          </div>
          <p>Start with what makes you curious. The skills, subjects and career ideas can grow from there.</p>
        </div>

        <div className="track-grid">
          {tracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <article className="track-card" key={track.id} style={{ "--track": track.color, "--track-text": track.text } as React.CSSProperties}>
                <div className="track-index">0{index + 1}</div>
                <div className="track-icon"><Icon size={27} /></div>
                <p>{track.eyebrow}</p>
                <h3>{track.label}</h3>
                <span>{track.description}</span>
                <div className="track-starter"><b>Start small</b>{track.starter}</div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section mission-section" id="missions">
        <div className="section-heading light">
          <div>
            <p className="section-number">02 — MAKE</p>
            <h2>Your first mission starts now.</h2>
          </div>
          <p>Use what you already have. Every mission is designed to get an idea out of your head and into the real world.</p>
        </div>

        <div className="mission-workbench">
          <div className="mission-list" role="tablist" aria-label="Starter missions">
            {missions.map((mission, index) => (
              <button
                key={mission.number}
                type="button"
                role="tab"
                aria-selected={activeMission === index}
                className={activeMission === index ? "active" : ""}
                onClick={() => {
                  setActiveMission(index);
                  setMissionStarted(false);
                }}
              >
                <span>{mission.number}</span>
                <b>{mission.title}</b>
                <ChevronRight />
              </button>
            ))}
          </div>

          <article className={`mission-detail ${selectedMission.accent}`} role="tabpanel">
            <div className="mission-meta">
              <span>{selectedMission.track}</span>
              <span>{selectedMission.time}</span>
            </div>
            <selectedMission.icon className="mission-big-icon" size={70} strokeWidth={1.4} />
            <p>MISSION {selectedMission.number}</p>
            <h3>{selectedMission.title}</h3>
            <span>{selectedMission.description}</span>

            {!missionStarted ? (
              <Button className="mission-button" onClick={() => setMissionStarted(true)}>
                Start this mission <Rocket size={18} />
              </Button>
            ) : (
              <div className="mission-ready" role="status">
                <Check size={22} />
                <div><b>You’re in.</b><span>Gather your materials, set a timer and build your first version.</span></div>
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="section roadmap-section" id="roadmap">
        <div className="roadmap-intro">
          <p className="section-number">03 — KEEP GOING</p>
          <h2>Curiosity is the start. Momentum is the superpower.</h2>
          <p>You do not need to know your entire career. You only need a useful next move.</p>
        </div>

        <div className="roadmap">
          <article>
            <span>THIS WEEK</span>
            <div className="roadmap-icon"><Bolt /></div>
            <h3>Try one mission</h3>
            <p>Choose the challenge you would still want to solve even if nobody graded it.</p>
          </article>
          <div className="roadmap-arrow"><ArrowRight /></div>
          <article>
            <span>THIS TERM</span>
            <div className="roadmap-icon"><Users /></div>
            <h3>Find your people</h3>
            <p>Join a club, form a small team or ask a teacher to help you take the idea further.</p>
          </article>
          <div className="roadmap-arrow"><ArrowRight /></div>
          <article>
            <span>THIS YEAR</span>
            <div className="roadmap-icon"><Trophy /></div>
            <h3>Show what you made</h3>
            <p>Document the process, share the result and use the feedback to build version two.</p>
          </article>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-stamp" aria-hidden="true"><Rocket /><span>READY<br />TO<br />LAUNCH</span></div>
        <div>
          <p>THE FUTURE NEEDS YOUR VERSION.</p>
          <h2>What will you build first?</h2>
        </div>
        <a href="#compass">Find my STEM lane <ArrowRight /></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Atom size={22} /></span><span>STEM <b>RUSH</b></span></a>
        <p>Built in Jamaica. Made for wherever curiosity takes you.</p>
        <a href="https://github.com/Androneil/stem_rush" target="_blank" rel="noreferrer">View on GitHub <ArrowRight size={15} /></a>
      </footer>
    </main>
  );
}
