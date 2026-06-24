export type Region = 'ua' | 'intl';

export interface PaymentMethod {
  id: string;
  label: string;
  group: 'local' | 'intl' | 'crypto';
  /** inline svg key for the icon component */
  icon: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  // Ukraine
  { id: 'monobank', label: 'Monobank', group: 'local', icon: 'card' },
  { id: 'privat24', label: 'Privat24', group: 'local', icon: 'card' },
  { id: 'wayforpay', label: 'WayForPay / Fondy', group: 'local', icon: 'card' },
  { id: 'applepay-ua', label: 'Apple Pay', group: 'local', icon: 'apple' },
  { id: 'googlepay-ua', label: 'Google Pay', group: 'local', icon: 'google' },
  { id: 'visa-ua', label: 'Visa / Mastercard', group: 'local', icon: 'visa' },
  // International
  { id: 'stripe', label: 'Stripe', group: 'intl', icon: 'card' },
  { id: 'paypal', label: 'PayPal', group: 'intl', icon: 'paypal' },
  { id: 'applepay', label: 'Apple Pay', group: 'intl', icon: 'apple' },
  { id: 'googlepay', label: 'Google Pay', group: 'intl', icon: 'google' },
  { id: 'visa', label: 'Visa / Mastercard', group: 'intl', icon: 'visa' },
  // Crypto
  { id: 'usdt-trc20', label: 'USDT TRC20', group: 'crypto', icon: 'crypto' },
  { id: 'usdt-erc20', label: 'USDT ERC20', group: 'crypto', icon: 'crypto' },
  { id: 'btc', label: 'Bitcoin (BTC)', group: 'crypto', icon: 'crypto' },
  { id: 'eth', label: 'Ethereum (ETH)', group: 'crypto', icon: 'crypto' },
];

/**
 * Detect whether the visitor is likely in Ukraine.
 * Front-end heuristic: timezone + browser language. In production this
 * would be backed by an IP geolocation / edge geo header.
 */
export function detectRegion(): Region {
  if (typeof window === 'undefined') return 'intl';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (/Kyiv|Kiev|Zaporozhye|Uzhgorod|Simferopol/i.test(tz)) return 'ua';
  } catch {
    /* ignore */
  }
  const lang = (navigator.language || '').toLowerCase();
  if (lang.startsWith('uk')) return 'ua';
  return 'intl';
}

/**
 * Order method groups so the visitor's region appears first.
 * Crypto is always shown last but available to everyone.
 */
export function orderedGroups(region: Region): ('local' | 'intl' | 'crypto')[] {
  return region === 'ua'
    ? ['local', 'intl', 'crypto']
    : ['intl', 'local', 'crypto'];
}
