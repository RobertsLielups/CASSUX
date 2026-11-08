export function Stickman({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <svg className={className} viewBox="0 0 220 260" role="img" aria-label="Balts CASSUX Stickman tēls">
      <defs>
        <linearGradient id="avatarGlow" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#b7f566" stopOpacity="0.22" />
          <stop offset="1" stopColor="#78c7ff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <circle cx="110" cy="130" r="104" fill="url(#avatarGlow)" stroke="#2a3743" strokeWidth="2" />
      <circle cx="110" cy="68" r="28" fill="none" stroke="#f7fafc" strokeWidth="11" />
      <path d="M110 98v72M110 116L61 151M110 116l49 35M110 169l-39 57M110 169l39 57" fill="none" stroke="#f7fafc" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="61" cy="151" r="5" fill="#b7f566" />
      <circle cx="159" cy="151" r="5" fill="#b7f566" />
    </svg>
  );
}
