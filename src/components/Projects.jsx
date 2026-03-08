import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projects from "../data/projects.json";
import { fadeUpVariant, staggerContainer, cardHover } from "../animations/variants";

function Projects() {
  return (
    <section id="projects" className="py-20 px-6 scroll-mt-20 bg-bg-alt section-glow">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUpVariant}
              initial="rest"
              whileHover="hover"
              className="card-gradient card-glow rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all"
            >
              <motion.div variants={cardHover}>
                {/* Image placeholder */}
                <div className="h-48 bg-primary/5 flex items-center justify-center border-b border-primary/10">
                  <span className="text-text-muted text-sm">{project.title}</span>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-primary transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-primary transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
