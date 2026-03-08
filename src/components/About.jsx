import { motion } from "framer-motion";
import { fadeLeftVariant, fadeRightVariant } from "../animations/variants";

function About() {
  return (
    <section id="about" className="py-20 px-6 scroll-mt-20 bg-bg-light/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — image placeholder */}
        <motion.div
          variants={fadeLeftVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-72 h-72 rounded-2xl bg-bg-light border border-primary/20 flex items-center justify-center">
            <span className="text-text-muted text-sm">Profile Photo</span>
          </div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          variants={fadeRightVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold">About Me</h2>

          <p className="text-text-muted leading-relaxed">
            I&apos;m a Full Stack Software Developer with hands-on experience
            building enterprise-grade web applications. I specialize in React
            and Node.js on the frontend and backend, with additional expertise
            in ASP.NET Core for robust server-side solutions.
          </p>

          <p className="text-text-muted leading-relaxed">
            My work spans inventory management systems, banking applications,
            trading platforms, and e-commerce solutions. I&apos;m passionate
            about writing clean, maintainable code and implementing automated
            testing with Cypress and Jest to ensure quality at every stage.
          </p>

          <p className="text-text-muted leading-relaxed">
            Beyond development, I handle deployments, CI/CD pipelines with
            Jenkins and GitHub Actions, and containerization with Docker —
            ensuring smooth delivery from development to production.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
