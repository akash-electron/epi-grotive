/* Everything the admin can edit. Layout metrics (positions, sizes, colours)
   stay in the components; only text, links and images live here. An image
   field that is "" means "use the built-in artwork". */

export type Link = { label: string; href: string };

export type Content = {
  header: { brand: string; brandSub: string; logo: string; nav: Link[]; ctaHref: string };
  socials: { name: string; href: string }[];
  hero: {
    eyebrow: string[];
    line1: string;
    line2: string;
    sub1: string;
    sub2: string;
    cta: string;
    ctaHref: string;
    cardLine1: string;
    cardLine2: string;
    cardCta: string;
  };
  engines: {
    heading1: string;
    heading2: string;
    mobileSubtitle: string;
    cards: {
      label: string;
      title1: string;
      title2: string;
      copy: string[];
      mobileCopy: string;
      tags: string[];
      mobileTags: string[];
      cta: string;
      href: string;
      photo: string;
    }[];
  };
  stats: {
    eyebrow: string;
    line1: string;
    line2: string;
    sub1: string;
    sub2: string;
    image: string;
    items: { value: string; label: string }[];
  };
  deliver: {
    heading1: string;
    heading2: string;
    subtitle: string;
    services: {
      number: string;
      title: string;
      copy: string[];
      mobileCopy: string;
      image: string;
      href: string;
    }[];
  };
  ips: {
    heading1: string;
    heading2: string;
    sub1: string;
    sub2: string;
    items: { name: string; copy: string; logo: string }[];
  };
  brands: {
    heading1: string;
    heading2: string;
    logos: { src: string; alt: string }[];
  };
  portfolio: {
    heading1: string;
    heading2: string;
    exploreLabel: string;
    exploreHref: string;
    marquee: string[];
    grid: { src: string; label: string }[];
  };
  contact: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    sub1: string;
    sub2: string;
    phone: string;
    email: string;
    formTitle: string;
    formBlurb: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendLabel: string;
    privacy: string;
    successMessage: string;
  };
  footer: {
    brand: string;
    brandSub: string;
    logo: string;
    copyright: string;
    privacyLabel: string;
    nav: Link[];
  };
};

export type SectionKey = keyof Content;
export const SECTION_KEYS: SectionKey[] = [
  "header",
  "socials",
  "hero",
  "engines",
  "stats",
  "deliver",
  "ips",
  "brands",
  "portfolio",
  "contact",
  "footer",
];
