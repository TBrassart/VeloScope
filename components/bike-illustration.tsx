export default function BikeIllustration() {
  return (
    <svg className="bike-illustration" viewBox="0 0 760 390" fill="none" role="img" aria-label="Illustration d’un vélo de route">
      <defs>
        <linearGradient id="frame" x1="220" y1="105" x2="550" y2="310" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DAFF6A" />
          <stop offset="1" stopColor="#93BD42" />
        </linearGradient>
        <linearGradient id="rim" x1="102" y1="105" x2="650" y2="330" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EFF1DF" stopOpacity=".76" />
          <stop offset="1" stopColor="#BEC4AA" stopOpacity=".4" />
        </linearGradient>
      </defs>
      <g stroke="url(#rim)" strokeWidth="2">
        <circle cx="171" cy="270" r="104" /><circle cx="587" cy="270" r="104" />
        <circle cx="171" cy="270" r="96" /><circle cx="587" cy="270" r="96" />
      </g>
      <g stroke="#E3E6D8" strokeOpacity=".28" strokeWidth="1">
        <path d="M171 166v208m-104-104h208M97 196l148 148m0-148L97 344M587 166v208m-104-104h208m-178-74 148 148m0-148L483 344" />
      </g>
      <g stroke="url(#frame)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="11">
        <path d="m316 144 91 126-157 0 66-126Z" />
        <path d="m316 144 102-18m-168 144-79 0m236 0 180 0m-80-139-103 139m-8-144 37 0" />
      </g>
      <g stroke="#DFE4D2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
        <path d="m316 144 8-34m-25 0h39m108 16-6-31m-18 0h48m-37 15 24 7m-82 153 14 15m-31-15 18 0" />
        <path d="M407 270a15 15 0 1 1 30 0 15 15 0 0 1-30 0Zm-91-126h-13" />
      </g>
      <circle cx="422" cy="270" r="8" fill="#D9FF71" />
      <path d="m422 270 37 17m-37-17-15-35m-69-91-8-18" stroke="#D9FF71" strokeWidth="3" strokeLinecap="round" />
      <g fill="#F1F3E9" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="10" letterSpacing="2">
        <text x="282" y="193" transform="rotate(-58 282 193)">V E L O S C O P E</text>
      </g>
    </svg>
  );
}
