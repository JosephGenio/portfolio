import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaArrowDown, FaFileDownload, FaEnvelope } from "react-icons/fa";
import siteData from "../data/site.json";
import { fadeUpVariant, staggerContainer, fadeRightVariant } from "../animations/variants";

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center scroll-mt-20 px-6"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            <a
              href={siteData.resume}
              download
              className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-text rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <FaFileDownload /> Download Resume
            </a>
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
    </section>
  );
}

export default Hero;
