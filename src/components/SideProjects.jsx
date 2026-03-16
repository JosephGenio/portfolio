import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import sideProjects from "../data/sideProjects.json";
import ProjectImage from "./ProjectImage";
import {
  fadeUpVariant,
  staggerContainer,
} from "../animations/variants";

function SideProjects() {
  return (
    <section id="side-projects" className="py-20 px-6 scroll-mt-20 bg-bg-alt section-glow">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-4"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Side Projects
        </motion.h2>

        <motion.p
          className="text-text-muted text-center mb-12 max-w-xl mx-auto"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Personal projects I build and tinker with outside of work.
        </motion.p>

        <motion.div
          className="flex flex-col gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {sideProjects.map((project) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUpVariant}
              className="group card-gradient card-glow rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all cursor-pointer block"
            >
              {/* Screenshot */}
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  className="h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <FaExternalLinkAlt className="text-text-muted group-hover:text-primary transition-colors text-sm shrink-0" />
                </div>

                <p className="text-text-muted leading-relaxed max-w-2xl">
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
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SideProjects;
