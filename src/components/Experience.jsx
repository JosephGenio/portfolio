import { motion } from "framer-motion";
import experience from "../data/experience.json";
import { fadeUpVariant, staggerContainer } from "../animations/variants";

const typeBadgeColor = {
  "Full Time": "bg-primary/10 text-primary border-primary/20",
  "Part Time": "bg-accent/10 text-accent border-accent/20",
  Intern: "bg-secondary/10 text-secondary border-secondary/20",
};

function Experience() {
  return (
    <section id="experience" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="relative border-l-2 border-primary/30 pl-8 ml-4 flex flex-col gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experience.map((entry, index) => (
            <motion.div key={index} variants={fadeUpVariant} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[2.55rem] top-1 w-4 h-4 rounded-full bg-primary border-4 border-bg" />

              <div className="card-gradient card-glow rounded-xl p-6 border border-primary/10 transition-all">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold">{entry.title}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full border ${
                      typeBadgeColor[entry.type] || "bg-bg-light text-text-muted border-text-muted/20"
                    }`}
                  >
                    {entry.type}
                  </span>
                </div>

                {entry.company && (
                  <p className="text-text-muted text-sm mb-3">{entry.company}</p>
                )}

                <ul className="space-y-2">
                  {entry.description.map((item, i) => (
                    <li key={i} className="text-text-muted text-sm flex gap-2">
                      <span className="text-primary mt-1 shrink-0">&#8226;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
