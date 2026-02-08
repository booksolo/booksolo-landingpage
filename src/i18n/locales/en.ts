export const en = {
  // Site metadata
  metadata: {
    title: 'BookSolo - Social Media Content for Solo Service Businesses',
    description: 'BookSolo helps solo hairdressers, beauty, physio, trainers and similar businesses create ready-to-post Facebook and Instagram content in minutes, stay consistent, and attract more local clients.',
  },

  // Header/Navigation
  nav: {
    features: 'Features',
    gallery: 'Gallery',
    aiChat: 'AI chat',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
  },

  // Hero section
  hero: {
    heading: 'Social media content for solo service businesses',
    subheading: 'BookSolo helps solo hairdressers, beauty, physio, trainers and similar businesses create ready-to-post content for Facebook and Instagram in minutes, not hours.',
  },

  // Benefits section
  benefits: {
    section1: {
      title: 'Automatic content creation',
      description: 'BookSolo creates most of your social media content automatically, even when you\'re busy with clients. Whether it\'s captions, post ideas, or simple content plans for Facebook and Instagram, it works in the background to keep your profiles active and professional.',
      bullets: [
        {
          title: 'Instant content',
          description: 'Get ready-to-post captions and ideas in seconds, not hours. No more staring at a blank screen or wondering what to write.',
        },
        {
          title: 'Always consistent',
          description: 'Stay visible every week, even when your schedule is full. BookSolo helps you keep a steady flow of posts over time.',
        },
        {
          title: 'Natural voice',
          description: 'Content matches your tone and niche, so it sounds like you, not a generic robot. It fits your services, city and way of speaking.',
        },
      ],
    },
    section2: {
      title: 'Content for the channels that matter',
      description: 'BookSolo focuses on the platforms your clients actually use, like Facebook and Instagram, so you can show up where they scroll every day.',
      bullets: [
        {
          title: 'Different formats, one tool',
          description: 'Generate captions, post ideas and simple content plans from a single place, ready for feed posts, stories or reels descriptions.',
        },
        {
          title: 'Automatic posting rhythm',
          description: 'Get suggestions for what to publish this week and in what order, so your profiles stay active without daily planning.',
        },
        {
          title: 'Plan once, reuse often',
          description: 'Turn one idea into multiple posts: tips, before/after, education or promotions, reusing your best content in smart ways.',
        },
      ],
    },
    section3: {
      title: 'Save Time, Grow Revenue',
      description: 'Replace long hours of thinking about content with a few focused minutes per week. Prepare posts quickly and spend the rest of your time with clients.',
      bullets: [
        {
          title: 'Less manual work',
          description: 'Stop writing every post from scratch. Use generated drafts as a base, then just review and adjust.',
        },
        {
          title: 'More visibility',
          description: 'Consistent, better content means more people see your business and remember you when they need your service.',
        },
        {
          title: 'More time for revenue',
          description: 'Spend less time stuck in content creation and more time doing paid work or talking to real clients.',
        },
      ],
    },
  },

  // Gallery section
  gallery: {
    title: 'Inspiration gallery',
    description: 'Sample posts that show what Booksolo creates – tailored to the client\'s business, product, or solo journey and aligned with their brand and logo colours when needed.',
    loading: 'Gallery is loading…',
  },

  // Pricing section
  pricing: {
    title: 'Simple, conversational subscription',
    description: 'Activate your Booksolo subscription in seconds through our intelligent chat. No forms, no complexity—just a natural conversation.',
    tiers: {
      starter: 'Starter',
      growth: 'Growth',
      scale: 'Scale',
    },
  },

  // Newsletter section
  newsletter: {
    title: 'Subscribe to our newsletter',
    description: 'Get the latest updates, tips, and insights delivered straight to your inbox. Stay connected with Booksolo and never miss important news.',
    emailPlaceholder: 'Email address',
    subscribeButton: 'Subscribe',
  },

  // Footer
  footer: {
    description: 'Social media content tool for solo service businesses. Create ready-to-post Facebook and Instagram content in minutes, stay consistent, and attract more local clients.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    email: 'Email',
    copyright: 'Copyright © 2026 BookSolo. All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },

  // Cookie consent
  cookies: {
    message: 'We use analytics cookies to understand traffic and improve BookSolo. You can accept or reject analytics. Read more in our Privacy Policy.',
    accept: 'Accept',
    reject: 'Reject',
  },
};

// Type structure that allows any string values but maintains the structure
export type Translation = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    features: string;
    gallery: string;
    aiChat: string;
    pricing: string;
    testimonials: string;
  };
  hero: {
    heading: string;
    subheading: string;
  };
  benefits: {
    section1: {
      title: string;
      description: string;
      bullets: Array<{ title: string; description: string }>;
    };
    section2: {
      title: string;
      description: string;
      bullets: Array<{ title: string; description: string }>;
    };
    section3: {
      title: string;
      description: string;
      bullets: Array<{ title: string; description: string }>;
    };
  };
  gallery: {
    title: string;
    description: string;
    loading: string;
  };
  pricing: {
    title: string;
    description: string;
    tiers: {
      starter: string;
      growth: string;
      scale: string;
    };
  };
  newsletter: {
    title: string;
    description: string;
    emailPlaceholder: string;
    subscribeButton: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    contactUs: string;
    email: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  cookies: {
    message: string;
    accept: string;
    reject: string;
  };
};
