// ──────────────────────────────────────
// Single source of truth for all profile data
// ──────────────────────────────────────

export const PROFILE = {
  name: 'Raunak Singh',
  shortName: 'Raunak',
  alias: 'Raunak',
  title: 'Full Stack Developer',
  email: 'singhraunak1107@gmail.com',
  phone: '+919372499047',
  website: 'raunakcodes.me',
  blogHost: '',
} as const;

export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Newer1107',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/raunak-singh-1107',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:singhraunak1107@gmail.com',
  },
] as const;

export type SocialLinkId = (typeof SOCIAL_LINKS)[number]['id'];

/** Helper to get a social link by id */
export const getSocialLink = (id: SocialLinkId) =>
  SOCIAL_LINKS.find((link) => link.id === id)!;
