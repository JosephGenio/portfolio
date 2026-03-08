import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaVial, FaDocker } from "react-icons/fa";
import skills from "../data/skills.json";
import { fadeUpVariant, staggerContainer, cardHover } from "../animations/variants";

const categoryConfig = {
  frontend: { label: "Frontend", icon: FaCode },
  backend: { label: "Backend", icon: FaServer },
  database: { label: "Database", icon: FaDatabase },
  testing: { label: "Testing", icon: FaVial },
  devops: { label: "DevOps", icon: FaDocker },
};

function Skills() {
  return (
    <section id="skills" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {Object.entries(skills).map(([category, items]) => {
            const config = categoryConfig[category];
            const Icon = config.icon;

            return (
              <motion.div
                key={category}
                variants={fadeUpVariant}
                initial="rest"
                whileHover="hover"
                className="bg-bg-light rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <motion.div variants={cardHover}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="text-primary text-2xl" />
                    <h3 className="text-lg font-semibold">{config.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
