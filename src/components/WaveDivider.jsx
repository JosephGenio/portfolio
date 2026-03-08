function WaveDivider({ flip = false, fillClass = "fill-bg", bgClass = "bg-bg" }) {
  return (
    <div
      className={`w-full leading-[0] overflow-hidden pointer-events-none -my-px relative z-[1] ${bgClass}`}
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] block"
      >
        <path
          d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z"
          className={fillClass}
        />
      </svg>
    </div>
  );
}

export default WaveDivider;
