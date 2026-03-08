import { motion } from "framer-motion";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaVial,
  FaDocker,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaJenkins,
} from "react-icons/fa";
import {
  SiTypescript,
  SiDotnet,
  SiMysql,
  SiPostgresql,
  SiCypress,
  SiJest,
  SiKibana,
  SiWordpress,
  SiElementor,
  SiVercel,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import skills from "../data/skills.json";
import { fadeUpVariant, staggerContainer, cardHover } from "../animations/variants";

const categoryConfig = {
  frontend: { label: "Frontend", icon: FaCode },
  backend: { label: "Backend", icon: FaServer },
  database: { label: "Database", icon: FaDatabase },
  testing: { label: "Testing", icon: FaVial },
  devops: { label: "DevOps", icon: FaDocker },
};

const skillIcons = {
  React: { icon: FaReact, color: "#61DAFB" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  HTML: { icon: FaHtml5, color: "#E34F26" },
  CSS: { icon: FaCss3Alt, color: "#1572B6" },
  "Node.js": { icon: FaNodeJs, color: "#539E43" },
  "ASP.NET Core": { icon: SiDotnet, color: "#512BD4" },
  "REST API": { icon: TbApi, color: "#FF6C37" },
  DAML: { icon: FaCode, color: "#4F6EF7" },
  "MS SQL": { icon: FaDatabase, color: "#CC2927" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Cypress: { icon: SiCypress, color: "#69D3A7" },
  Jest: { icon: SiJest, color: "#C21325" },
  Vercel: { icon: SiVercel, color: "#ffffff" },
  Jenkins: { icon: FaJenkins, color: "#D24939" },
  Git: { icon: FaGitAlt, color: "#F05032" },
  "GitHub Actions": { icon: FaGithub, color: "#FFFFFF" },
  Kibana: { icon: SiKibana, color: "#005571" },
  Wordpress: { icon: SiWordpress, color: "#0080ff" },
  Elementor: { icon: SiElementor, color: "#c00b0b" }
};

function Skills() {
  return (
    <section id="skills" className="py-20 px-6 scroll-mt-20 section-glow">
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
                className="card-gradient card-glow rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all"
              >
                <motion.div variants={cardHover}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="text-primary text-2xl" />
                    <h3 className="text-lg font-semibold">{config.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => {
                      const skillConfig = skillIcons[skill];
                      const SkillIcon = skillConfig?.icon;
                      const color = skillConfig?.color || "#4f6ef7";

                      return (
                        <motion.span
                          key={skill}
                          whileHover={{
                            scale: 1.08,
                            boxShadow: `0 0 12px ${color}40`,
                          }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full bg-primary/10 text-text border border-primary/20 cursor-default"
                        >
                          {SkillIcon && (
                            <SkillIcon
                              className="text-sm shrink-0"
                              style={{ color }}
                            />
                          )}
                          {skill}
                        </motion.span>
                      );
                    })}
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
