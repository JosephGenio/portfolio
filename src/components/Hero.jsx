import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaArrowDown, FaEnvelope, FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiDotnet, SiTypescript } from "react-icons/si";
import siteData from "../data/site.json";
import { fadeUpVariant, staggerContainer, scaleUpVariant } from "../animations/variants";
import MagneticButton from "./MagneticButton";

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 3 + (i % 4) * 1.5,
  left: `${5 + ((i * 37) % 90)}%`,
  top: `${10 + ((i * 53) % 80)}%`,
  duration: 12 + (i % 5) * 3,
  delay: (i % 4) * 1.5,
  color: i % 3 === 0 ? "var(--color-secondary)" : "var(--color-primary)",
}));

const orbitIcons = [
  { Icon: FaReact, color: "#61DAFB", duration: 20, startAngle: 0 },
  { Icon: FaNodeJs, color: "#539E43", duration: 25, startAngle: 72 },
  { Icon: SiDotnet, color: "#512BD4", duration: 30, startAngle: 144 },
  { Icon: SiTypescript, color: "#3178C6", duration: 22, startAngle: 216 },
  { Icon: FaDocker, color: "#2496ED", duration: 28, startAngle: 288 },
];

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center scroll-mt-20 px-6"
    >
      {/* Animated gradient glow */}
      <div className="hero-glow" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column — content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Status badge */}
          <motion.div variants={fadeUpVariant} className="flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm text-text-muted tracking-wide uppercase">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name with gradient */}
          <motion.h1
            variants={fadeUpVariant}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-text via-primary to-secondary bg-clip-text text-transparent"
          >
            {siteData.name}
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            variants={fadeUpVariant}
            className="text-2xl md:text-3xl font-semibold text-primary h-10"
          >
            <TypeAnimation
              sequence={[
                "Software Developer",
                2000,
                "Full Stack Developer",
                2000,
                "React Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUpVariant}
            className="text-text-muted text-lg max-w-lg"
          >
            {siteData.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4 mt-2">
            <MagneticButton>
              <a
                href="#side-projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#side-projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-primary hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(79,110,247,0.4)] rounded-lg font-medium transition-all inline-flex items-center gap-2 active:scale-95"
              >
                <FaArrowDown /> View Projects
              </a>
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
                <FaEnvelope /> Get in Touch
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right column — orbiting tech icons */}
        <motion.div
          variants={scaleUpVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-80 h-80">
            {/* Central "JG" element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              {/* Pulsing glow ring */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-primary/20"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.05, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Second glow ring */}
              <motion.div
                className="absolute -inset-8 rounded-full bg-secondary/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.05, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              {/* Initials circle */}
              <div className="w-20 h-20 rounded-full bg-surface border border-primary/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">JG</span>
              </div>
            </div>

            {/* Orbiting icons */}
            {orbitIcons.map(({ Icon, color, duration, startAngle }) => (
              <motion.div
                key={startAngle}
                className="absolute top-1/2 left-1/2 w-0 h-0"
                animate={{ rotate: [startAngle, startAngle + 360] }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div style={{ transform: "translateX(130px) translateY(-50%)" }}>
                  <motion.div
                    animate={{ rotate: [-startAngle, -startAngle - 360] }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-surface/80 border border-border"
                    style={{
                      boxShadow: `0 0 12px ${color}40, 0 0 4px ${color}20`,
                    }}
                  >
                    <Icon
                      className="text-lg"
                      style={{
                        color,
                        filter: `drop-shadow(0 0 6px ${color}80)`,
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Orbit ring path (visual guide) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-primary/10"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-bg-alt pointer-events-none" />
    </section>
  );
}

export default Hero;
