type PartType = "cassette" | "crankset" | "chain";

export default function PartIllustration({ type, large = false }: { type: PartType; large?: boolean }) {
  if (type === "cassette") {
    return (
      <svg className={large ? "part-art part-art-large" : "part-art"} viewBox="0 0 320 230" fill="none" role="img" aria-label="Illustration technique d’une cassette de vélo">
        <ellipse cx="162" cy="119" rx="94" ry="94" fill="#1f261d" fillOpacity=".18" />
        <g stroke="#e0e5d3" strokeOpacity=".75">
          <circle cx="154" cy="112" r="79" strokeWidth="2" /><circle cx="154" cy="112" r="67" strokeWidth="3" />
          <circle cx="154" cy="112" r="55" strokeWidth="3" /><circle cx="154" cy="112" r="43" strokeWidth="4" />
          <circle cx="154" cy="112" r="31" strokeWidth="5" /><circle cx="154" cy="112" r="19" strokeWidth="6" />
        </g>
        <g stroke="#d9ff72" strokeOpacity=".86" strokeWidth="1.5">
          <path d="M154 22v18m0 144v18M64 112h18m144 0h18M90 48l13 13m102 102 13 13m0-128-13 13M103 163l-13 13" />
          <path d="m120 42 6 14m56 112 6 14M84 78l14 6m112 56 14 6M84 146l14-6m112-56 14-6m-112 70-6 14m56-112-6 14" />
        </g>
        <circle cx="154" cy="112" r="8" fill="#d9ff72" />
        <path d="M209 174h65m-65 0v-13m65 13v-13" stroke="#f0f2e8" strokeOpacity=".6" strokeWidth="2" />
        <text x="210" y="193" fill="#f0f2e8" fillOpacity=".65" fontFamily="Arial,sans-serif" fontSize="8" letterSpacing="1.3">12 VITESSES</text>
      </svg>
    );
  }

  if (type === "crankset") {
    return (
      <svg className="part-art" viewBox="0 0 320 230" fill="none" role="img" aria-label="Illustration technique d’un pédalier vélo">
        <g stroke="#606c4c" strokeWidth="3">
          <circle cx="135" cy="115" r="67" /><circle cx="135" cy="115" r="55" />
          <circle cx="135" cy="115" r="24" /><circle cx="135" cy="115" r="12" />
          <path d="M135 47v14m0 108v14m-68-68h14m108 0h14M87 67l10 10m76 76 10 10m0-96-10 10m-76 76-10 10" />
          <path d="m145 122 60 47m-73-54-4-25m66 83 20-8" stroke="#8da55c" strokeWidth="9" strokeLinecap="round" />
        </g>
        <circle cx="135" cy="115" r="6" fill="#8da55c" />
        <path d="M230 50h50M230 50v14m50-14v14" stroke="#8a8f7d" strokeWidth="2" />
        <text x="230" y="72" fill="#737969" fontFamily="Arial,sans-serif" fontSize="8" letterSpacing="1.2">50 / 34 D</text>
      </svg>
    );
  }

  return (
    <svg className="part-art" viewBox="0 0 320 230" fill="none" role="img" aria-label="Illustration technique d’une chaîne de vélo">
      <g stroke="#59664a" strokeWidth="4">
        <path d="M61 91c0-18 14-32 32-32h32v19H93a13 13 0 0 0 0 26h26v19H93c-18 0-32-14-32-32Zm198 48c0 18-14 32-32 32h-31v-19h31a13 13 0 0 0 0-26h-26v-19h26c18 0 32 14 32 32Z" />
        <path d="m116 86 88 58m-96-39 88 58m-36-95 16-21m-51 85 16-21m-51 86 16-21m67-69 16-21m-51 85 16-21m-51 86 16-21" stroke="#8da55c" strokeWidth="3" />
      </g>
      <text x="116" y="48" fill="#737969" fontFamily="Arial,sans-serif" fontSize="8" letterSpacing="1.2">12 VITESSES</text>
    </svg>
  );
}
