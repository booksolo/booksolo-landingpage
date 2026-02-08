import { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { locales } from '@/i18n/config';

import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits/Benefits';
import Container from '@/components/Container';
import Gallery from '@/components/Gallery';
import Newsletter from '@/components/Newsletter';
import Section from '@/components/Section';
import Pricing from '@/components/Pricing/Pricing';

interface PageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = getDictionary(params.locale);

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      url: `https://booksolo.eu/${params.locale}`,
      type: 'website',
      locale: params.locale === 'pl' ? 'pl_PL' : 'en_US',
      alternateLocale: params.locale === 'pl' ? ['en_US'] : ['pl_PL'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.title,
      description: t.metadata.description,
    },
    alternates: {
      canonical: `https://booksolo.eu/${params.locale}`,
      languages: {
        'en': '/en',
        'pl': '/pl',
      },
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocalePage({ params }: PageProps) {
  const t = getDictionary(params.locale);

  return (
    <>
      <Hero locale={params.locale} />
      <Container>
        <Benefits locale={params.locale} />
        <Gallery locale={params.locale} />

        <Section
          id="pricing"
          title={t.pricing.title}
          description={t.pricing.description}
        >
          <Pricing locale={params.locale} />
        </Section>
      </Container>
      <Newsletter locale={params.locale} />
    </>
  );
}
