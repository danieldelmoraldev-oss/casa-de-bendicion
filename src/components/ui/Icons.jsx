/* Iconografía de línea, trazo 1.5 y esquinas redondeadas. */

const base = { fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true" };
const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function PinIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" {...stroke} />
      <circle cx="12" cy="10" r="2.6" {...stroke} />
    </svg>
  );
}

export function ScreenIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg {...base} className={className}>
      <rect x="2.75" y="4.75" width="18.5" height="12.5" rx="2" {...stroke} />
      <path d="M8.5 20.5h7M12 17.5v3" {...stroke} />
    </svg>
  );
}

export function ClockIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <path d="M12 7.5V12l3 1.8" {...stroke} />
    </svg>
  );
}

export function PlusIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" {...stroke} />
    </svg>
  );
}

export function HeartIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path
        d="M12 20s-7.5-4.7-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.3 12 20 12 20Z"
        {...stroke}
      />
    </svg>
  );
}

export function UsersIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8.5" r="3.2" {...stroke} />
      <path d="M3.5 19.5c.6-3 2.9-4.6 5.5-4.6s4.9 1.6 5.5 4.6M16 6.2a3.2 3.2 0 0 1 0 6M17.5 15.4c2 .5 3.3 2 3.7 4.1" {...stroke} />
    </svg>
  );
}

/* Redes sociales — glifos simplificados */
const socialPaths = {
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" {...stroke} />
      <circle cx="12" cy="12" r="3.8" {...stroke} />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </>
  ),
  Facebook: <path d="M14.5 8.5h2.2V5.6h-2.4c-2.3 0-3.6 1.4-3.6 3.7v1.6H8.5v3h2.2v7.5h3.3v-7.5h2.4l.4-3h-2.8V9.6c0-.8.3-1.1 1-1.1Z" {...stroke} />,
  YouTube: (
    <>
      <rect x="2.75" y="6" width="18.5" height="12" rx="4" {...stroke} />
      <path d="m10.5 9.75 4.5 2.25-4.5 2.25z" {...stroke} />
    </>
  ),
  TikTok: <path d="M14 4v9.8a3.2 3.2 0 1 1-2.6-3.1M14 4c.4 2 1.8 3.4 4 3.6" {...stroke} />,
  Email: (
    <>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2.5" {...stroke} />
      <path d="m3.5 7.5 8.5 6 8.5-6" {...stroke} />
    </>
  ),
  Teléfono: (
    <path
      d="M6.2 3.8h2.6l1.3 3.3-1.7 1.2a10.5 10.5 0 0 0 5.3 5.3l1.2-1.7 3.3 1.3v2.6c0 1-.8 1.9-1.9 1.8A15.4 15.4 0 0 1 4.4 5.7c-.1-1 .8-1.9 1.8-1.9Z"
      {...stroke}
    />
  ),
};

export function SocialIcon({ name, className = "h-4 w-4" }) {
  return <svg {...base} className={className}>{socialPaths[name] ?? socialPaths.Email}</svg>;
}
