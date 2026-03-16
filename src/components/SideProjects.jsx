import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import sideProjects from "../data/sideProjects.json";
import {
  fadeUpVariant,
  staggerContainer,
  cardHover,
} from "../animations/variants";

function SideProjects() {
  return (
    <section id="side-projects" className="py-20 px-6 scroll-mt-20 bg-bg">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group card-gradient card-glow rounded-xl border border-primary/10 hover:border-primary/30 transition-all p-6 flex flex-col gap-4 cursor-pointer"
            >
              <motion.div variants={cardHover} className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <FaExternalLinkAlt className="text-text-muted group-hover:text-primary transition-colors text-sm shrink-0" />
                </div>

                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SideProjects;
