import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: '/#',
    },
    {
      text: 'About',
      href: '/#about',
    },
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'Github',
      href: 'https://github.com/Astol',
    },
  ],
  actions: [{ text: 'Contact me', href: 'https://github.com/Astol', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Explore',
      links: [
        { text: 'Home', href: '#' },
        { text: 'About', href: '/#about' },
        { text: 'Blog', href: '/#blog' },
      ],
    },
  ],
  secondaryLinks: [{ text: 'Privacy Policy', href: getPermalink('/privacy') }],
  socialLinks: [
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/in/alexander-stolpe-65136a13a',
    },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/Astol' },
  ],
  footNote: `
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://github.com/Astol"> Astol</a> · All rights reserved.
  `,
};
