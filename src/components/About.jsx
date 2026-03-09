import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaBriefcase,
  FaProjectDiagram,
  FaCode,
  FaBuilding,
  FaFileDownload,
  FaEnvelope,
  FaSpinner,
} from "react-icons/fa";
import {
  fadeUpVariant,
  fadeRightVariant,
  staggerContainer,
  cardHover,
  scaleUpVariant,
} from "../animations/variants";
import MagneticButton from "./MagneticButton";

const terminalLines = [
  { type: "command", prompt: "~", text: "whoami" },
  { type: "response", text: "Joseph Genio" },
  { type: "response", text: "Full Stack Developer" },
  { type: "spacer" },
  { type: "command", prompt: "~", text: "stack" },
  { type: "response", text: "React · Node.js · ASP.NET Core" },
  { type: "spacer" },
  { type: "command", prompt: "~", text: "status" },
  { type: "response", text: "Open to opportunities" },
];

const stats = [
  { label: "Years Experience", value: 5, suffix: "+", icon: FaBriefcase, color: "text-primary" },
  { label: "Projects Built", value: 5, suffix: "+", icon: FaProjectDiagram, color: "text-secondary" },
  { label: "Technologies", value: 20, suffix: "+", icon: FaCode, color: "text-accent" },
  { label: "Companies", value: 4, suffix: "", icon: FaBuilding, color: "text-primary" },
];

const techBadges = ["React", "Node.js", "ASP.NET Core", "TypeScript", "PostgreSQL"];

const terminalLineVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const terminalStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

function AnimatedCounter({ target, suffix = "+", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function About() {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    try {
      const token = btoa(Date.now().toString());
      const response = await fetch(`/api/resume?token=${token}`);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert("Unable to download resume. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section id="about" className="py-20 px-6 scroll-mt-20 bg-bg-alt section-glow">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {/* Zone A — Section Header */}
        <motion.div
          className="text-center"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-text-muted mt-2">Get to know me and what I do</p>
        </motion.div>

        {/* Zone B — Terminal + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left — Developer Terminal */}
          <motion.div
            className="lg:col-span-2"
            variants={scaleUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="card-gradient rounded-xl border border-primary/20 overflow-hidden"
              style={{ boxShadow: "0 0 40px var(--color-glow)" }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-bg/50 border-b border-border">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-text-muted text-xs ml-2 font-mono">terminal</span>
              </div>

              {/* Terminal body */}
              <motion.div
                className="p-5 font-mono text-sm leading-relaxed"
                variants={terminalStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {terminalLines.map((line, i) => {
                  if (line.type === "spacer") {
                    return <div key={i} className="h-3" />;
                  }
                  if (line.type === "command") {
                    return (
                      <motion.div key={i} variants={terminalLineVariant}>
                        <span className="text-text-muted">{line.prompt} </span>
                        <span className="text-secondary">$ </span>
                        <span className="text-text">{line.text}</span>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div key={i} variants={terminalLineVariant} className="text-primary">
                      {line.text}
                    </motion.div>
                  );
                })}
                <motion.span
                  variants={terminalLineVariant}
                  className="inline-block w-2 h-4 bg-secondary mt-2 animate-pulse"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Bio Content */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-5"
            variants={fadeRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-lg text-text font-medium leading-relaxed">
              I&apos;m a Full Stack Software Developer with hands-on experience
              building enterprise-grade web applications.
            </p>

            <p className="text-text-muted leading-relaxed">
              I specialize in React and Node.js on the frontend and backend,
              with additional expertise in ASP.NET Core for robust server-side
              solutions. My work spans inventory management systems, banking
              applications, trading platforms, and e-commerce solutions.
            </p>

            <p className="text-text-muted leading-relaxed">
              I&apos;m passionate about writing clean, maintainable code and
              implementing automated testing with Cypress and Jest. Beyond
              development, I handle deployments, CI/CD pipelines with Jenkins
              and GitHub Actions, and containerization with Docker.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <MagneticButton>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(79,110,247,0.4)] rounded-lg font-medium transition-all inline-flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {downloading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaFileDownload />
                  )}
                  {downloading ? "Downloading..." : "Download Resume"}
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-text hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] rounded-lg font-medium transition-all inline-flex items-center gap-2 active:scale-95"
                >
                  <FaEnvelope /> Contact Me
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Zone C — Stat Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUpVariant}
                initial="rest"
                whileHover="hover"
                className="card-gradient card-glow rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all text-center"
              >
                <motion.div variants={cardHover}>
                  <Icon className={`text-3xl ${stat.color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-text">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-text-muted text-sm mt-1">{stat.label}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
