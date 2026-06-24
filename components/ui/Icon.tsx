import type { SVGProps } from 'react';

type IconName =
  | 'spark'
  | 'camera'
  | 'briefcase'
  | 'rocket'
  | 'palette'
  | 'chart'
  | 'photo'
  | 'video'
  | 'web'
  | 'ad'
  | 'brand'
  | 'money'
  | 'check'
  | 'arrow'
  | 'play'
  | 'lock'
  | 'card'
  | 'apple'
  | 'google'
  | 'visa'
  | 'paypal'
  | 'crypto'
  | 'menu'
  | 'close'
  | 'search'
  | 'star'
  | 'plus';

const paths: Record<IconName, JSX.Element> = {
  spark: (
    <path d="M12 2l2.2 6.3L20.5 10l-5.6 3.4L16 20l-4-3.8L8 20l1.1-6.6L3.5 10l6.3-1.7L12 2z" />
  ),
  camera: (
    <>
      <path d="M3 8a2 2 0 012-2h2l1.2-2h7.6L17 6h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      <circle cx="12" cy="12.5" r="3.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" />
    </>
  ),
  rocket: (
    <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5M9 11a4 4 0 015.5-5.5C18 7 18 12 14 16l-3 1-2-2 1-3-1-1zm6-2.5h.01" />
  ),
  palette: (
    <path d="M12 3a9 9 0 100 18c1.6 0 2-1.3 1.2-2.2-.8-.9-.3-2.3 1-2.3H17a4 4 0 004-4c0-5-4-9.5-9-9.5zM7.5 12.5h.01M9.5 8.5h.01M14.5 8.5h.01" />
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  photo: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.8" />
      <path d="M21 16l-5-5L5 20" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M16 10l6-3v10l-6-3" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  ad: (
    <path d="M3 11l16-7v16L3 13v5H1v-7h2zm0 0l16 2M9 13v6" />
  ),
  brand: (
    <path d="M12 2l3 6 6 .8-4.5 4.3 1.2 6L12 16.5 6.3 19.1l1.2-6L3 8.8 9 8l3-6z" />
  ),
  money: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.5-2.5 1.7-2.5.8-2.5 1.8 1 1.7 2.5 1.7 2.5-.7 2.5-1.7" />
    </>
  ),
  check: <path d="M4 12.5l5 5 11-11" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  play: <path d="M7 5l12 7-12 7V5z" />,
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  apple: (
    <path d="M16 13c0 3 2.5 4 2.5 4s-1 2.7-2.5 2.7c-1 0-1.5-.7-2.7-.7s-1.8.7-2.8.7C8.5 19.7 6 15.5 6 12.5 6 9.5 8 8 9.8 8c1 0 1.9.7 2.5.7S13.8 8 15 8c.8 0 2.4.3 3.3 1.8-1.7 1-2.3 2-2.3 3.2zM12.5 7c-.2-1.5 1-3 2.5-3 .2 1.4-1.2 3-2.5 3z" />
  ),
  google: (
    <path d="M21 12.2c0-.7-.06-1.2-.2-1.8H12v3.4h5.1c-.1.9-.7 2.2-1.9 3.1l-.02.12 2.8 2.1.2.02C19.8 17.5 21 15.1 21 12.2zM12 21c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8l-.1.01-3 2.3-.04.1C5.3 19 8.4 21 12 21zM6.9 13.7c-.2-.6-.3-1.1-.3-1.7s.1-1.2.3-1.7l-.01-.12-3-2.3-.1.05C3.3 9.2 3 10.6 3 12s.3 2.8.8 4l3.1-2.3zM12 6.4c1.7 0 2.9.7 3.5 1.3l2.6-2.5C16.5 3.7 14.4 3 12 3 8.4 3 5.3 5 3.8 8l3.1 2.3C7.6 8 9.6 6.4 12 6.4z" />
  ),
  visa: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M8 15l1.5-6M13 9l-2 6M17 9l1 6M5 9h2l1 4" />
    </>
  ),
  paypal: (
    <path d="M7 5h6.5c2.5 0 4 1.4 3.6 3.9-.4 2.6-2.3 3.6-4.8 3.6H10l-.8 5H6L7 5zm2 2l-.6 4h2c1.3 0 2.2-.5 2.4-1.8C13 8 12.3 7 11 7H9z" />
  ),
  crypto: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 8h3.2c1.5 0 2.3.8 2.3 2s-.8 2-2.3 2H9.5m0 0h3.5c1.5 0 2.3.8 2.3 2s-.8 2-2.3 2H9.5m0-8v12M11 6v2M11 16v2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  star: (
    <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.9L12 16.6 6.8 19.2l1-5.9L3.5 9.2l5.9-.9L12 3z" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
};

export function Icon({
  name,
  size = 24,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
