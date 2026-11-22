/** Decorative line-art of rolling vineyard hills (pure SVG, no request). */
export function VineyardIllustration({ className = "" }: { className?: string }) {
  const rows = Array.from({ length: 14 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 210 C 240 120 420 150 640 190 S 1080 110 1440 170 L1440 320 L0 320Z"
        fill="#2e0c14"
      />
      <path
        d="M0 250 C 300 190 560 230 820 250 S 1220 200 1440 230 L1440 320 L0 320Z"
        fill="#4a1420"
      />
      {rows.map((i) => (
        <path
          key={i}
          d={`M${-40 + i * 110} 320 C ${60 + i * 105} 270 ${140 + i * 100} 240 ${230 + i * 95} 225`}
          stroke="#d8bc88"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      ))}
      <circle cx="1180" cy="80" r="34" fill="none" stroke="#d8bc88" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
