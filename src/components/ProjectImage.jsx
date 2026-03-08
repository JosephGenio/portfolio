import { useState } from "react";
import { FaCode } from "react-icons/fa";

function ProjectImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/5 via-bg-light to-secondary/5 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <FaCode className="text-2xl text-primary/50" />
        </div>
        <span className="text-text-muted text-xs tracking-wide uppercase">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

export default ProjectImage;
