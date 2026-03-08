import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import contact from "../data/contact.json";
import { fadeLeftVariant, fadeRightVariant } from "../animations/variants";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactLinks = [
    { icon: FaEnvelope, label: "Email", href: `mailto:${contact.email}`, value: contact.email },
    { icon: FaGithub, label: "GitHub", href: contact.github, value: contact.github },
    { icon: FaLinkedin, label: "LinkedIn", href: contact.linkedin, value: contact.linkedin },
  ].filter((link) => link.value);

  return (
    <section id="contact" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <motion.div
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-text-muted leading-relaxed">
              I&apos;m always open to discussing new projects, opportunities, or
              partnerships. Feel free to reach out through any of the channels
              below or use the contact form.
            </p>

            <div className="flex flex-col gap-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors"
                  >
                    <Icon className="text-primary text-xl" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            variants={fadeRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {submitted ? (
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8 text-center">
                <p className="text-secondary text-lg font-medium">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-light border border-primary/10 rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-light border border-primary/10 rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-light border border-primary/10 rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary hover:bg-primary-hover rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
