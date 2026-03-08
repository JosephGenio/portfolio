import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import contact from "../data/contact.json";
import siteData from "../data/site.json";

function Footer() {
  const socialLinks = [
    { icon: FaGithub, href: contact.github, label: "GitHub" },
    { icon: FaLinkedin, href: contact.linkedin, label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${contact.email}`, label: "Email" },
  ].filter((link) => link.href);

  return (
    <footer className="py-8 px-6 bg-bg-light/50 border-t border-primary/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        {/* Social icons */}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-text-muted hover:text-primary transition-colors text-xl"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        )}

        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} {siteData.motherDomain} | All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
