import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import contact from "../data/contact.json";
import { fadeLeftVariant, fadeRightVariant } from "../animations/variants";
import { isValidEmail } from "../utilities/helpers";
import ErrorMessage from "./ErrorMessage";
import { EMAIL_SEND_RATE_LIMIT } from "../utilities/constants";


  const {
    VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID, 
    VITE_EMAILJS_PUBLIC_KEY} = import.meta.env;

const EMAILJS_SERVICE_ID = VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = VITE_EMAILJS_PUBLIC_KEY;


function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | rate_limited
  const [lastSentAt, setLastSentAt] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    const name = formRef.current.elements.from_name?.value.trim();
    const email = formRef.current.elements.from_email?.value.trim();
    const message = formRef.current.elements.message?.value.trim();

    if (!name) errors.name = "Please enter your name.";
    if (!email) errors.email = "Please enter your email.";
    else if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
    if (!message) errors.message = "Please enter a message.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Honeypot check — if the hidden field has a value, it's a bot
    const honeypot = formRef.current.elements._gotcha?.value;
    if (honeypot) {
      // Silently pretend success so the bot doesn't retry
      setStatus("success");
      return;
    }

    // Rate limiter — prevent rapid-fire submissions
    const now = Date.now();
    if (now - lastSentAt < EMAIL_SEND_RATE_LIMIT) {
      const secondsLeft = Math.ceil((EMAIL_SEND_RATE_LIMIT - (now - lastSentAt)) / 1000);
      setStatus("rate_limited");
      setTimeout(() => {
        if (status === "rate_limited") setStatus("idle");
      }, secondsLeft * 1000);
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn("EmailJS environment variables not configured.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => {
        setStatus("success");
        setLastSentAt(Date.now());
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
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
            {status === "success" ? (
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8 text-center">
                <p className="text-secondary text-lg font-medium">
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-bg-light border border-primary/10 rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <ErrorMessage message={formErrors.name} />
                <input
                  type="text"
                  name="from_email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-bg-light border border-primary/10 rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <ErrorMessage message={formErrors.email} />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 bg-bg-light border border-primary/10 rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <ErrorMessage message={formErrors.message} />

                {/* Honeypot — hidden from real users, bots will fill it */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                />

                <ErrorMessage
                  message={status === "error" ? "Something went wrong. Please try again or email me directly." : null}
                />
                <ErrorMessage
                  message={status === "rate_limited" ? "Please wait a moment before sending another message." : null}
                  variant="warning"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
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
