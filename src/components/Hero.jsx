import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaArrowDown, FaFileDownload, FaEnvelope, FaSpinner } from "react-icons/fa";
import siteData from "../data/site.json";
import { fadeUpVariant, staggerContainer, fadeRightVariant } from "../animations/variants";

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 2 + (i % 5) * 1.2,
  left: `${5 + ((i * 37) % 90)}%`,
  top: `${10 + ((i * 53) % 80)}%`,
  duration: 12 + (i % 5) * 3,
  delay: (i % 4) * 1.5,
  color: i % 3 === 0 ? "var(--color-secondary)" : "var(--color-primary)",
}));

function Hero() {
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

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.p variants={fadeUpVariant} className="text-secondary text-lg font-medium">
            Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-6xl font-bold text-text">
            {siteData.name}
          </motion.h1>

          <motion.div variants={fadeUpVariant} className="text-2xl md:text-3xl font-semibold text-primary h-10">
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

          <motion.p variants={fadeUpVariant} className="text-text-muted text-lg max-w-lg">
            {siteData.tagline}
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4 mt-2">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-primary hover:bg-primary-hover rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <FaArrowDown /> View Projects
            </a>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-text rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2 min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? <FaSpinner className="animate-spin" /> : <FaFileDownload />}
              {downloading ? "Downloading..." : "Download Resume"}
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <FaEnvelope /> Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — illustration placeholder */}
        <motion.div
          variants={fadeRightVariant}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-80 h-80 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
          >
            <span className="text-6xl text-primary/60">{"</>"}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade — extends below hero to cover the seam with About */}
      <div className="absolute -bottom-24 left-0 right-0 z-[2] h-48 bg-gradient-to-b from-transparent to-bg-alt pointer-events-none" />
    </section>
  );
}

export default Hero;
