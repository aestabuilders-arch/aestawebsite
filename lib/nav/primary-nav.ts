export type NavItem = {
  href: string;
  labelKey: 'services' | 'projects' | 'pricing' | 'locations' | 'about' | 'contact';
};

export const PRIMARY_NAV: readonly NavItem[] = [
  { href: '/services', labelKey: 'services' },
  { href: '/projects', labelKey: 'projects' },
  { href: '/pricing', labelKey: 'pricing' },
  { href: '/locations', labelKey: 'locations' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
] as const;
