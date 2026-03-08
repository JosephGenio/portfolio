import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import projects from "../data/projects.json";
import { fadeUpVariant, staggerContainer } from "../animations/variants";
import ProjectImage from "./ProjectImage";

const featured = projects.filter((p) => p.featured);

function FeaturedProjects() {
  if (featured.length === 0) return null;

  return (
    <section id="featured" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-center justify-center gap-3 mb-12"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <FaStar className="text-accent text-xl" />
          <h2 className="text-3xl font-bold text-center">Featured Projects</h2>
        </motion.div>

        <motion.div
          className="flex flex-col gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featured.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.title}
                variants={fadeUpVariant}
                className={`group grid grid-cols-1 lg:grid-cols-2 gap-0 card-gradient rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all hover:shadow-[0_0_30px_rgba(79,110,247,0.1)]`}
              >
                {/* Image side */}
                <div
                  className={`relative h-56 lg:h-auto bg-primary/5 flex items-center justify-center overflow-hidden ${
                    !isEven ? "lg:order-2" : ""
                  }`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-text-muted text-sm">{project.title}</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content side */}
                <div className={`p-8 flex flex-col justify-center gap-4 ${!isEven ? "lg:order-1" : ""}`}>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
