import React from "react";
import Container from "@/components/Container";
import { Metadata } from "next";
import type { Locale } from '@/i18n/config';

interface PageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = params.locale === 'pl' 
    ? "Polityka Prywatności - BookSolo"
    : "Privacy Policy - BookSolo";
  
  const description = params.locale === 'pl'
    ? "Polityka prywatności aplikacji BookSolo"
    : "BookSolo application privacy policy";

  return {
    title,
    description,
  };
}

const PrivacyPolicyPage: React.FC<PageProps> = ({ params }) => {
  const isPolish = params.locale === 'pl';

  if (isPolish) {
    return (
      <Container>
        <div className="max-w-4xl mx-auto py-12 px-6">
          <h1 className="text-4xl font-bold mb-8">Polityka Prywatności</h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-2">⚠️ Projekt Edukacyjny</h3>
              <p className="text-sm">
                <strong>UWAGA:</strong> BookSolo jest projektem edukacyjnym służącym do nauki automatyzacji publikacji w social media.
                Aplikacja jest udostępniana &ldquo;TAK JAK JEST&rdquo; bez gwarancji stabilności, dostępności ani bezpieczeństwa na poziomie komercyjnym.
                Używasz jej na własną odpowiedzialność. Nie jest to profesjonalna usługa komercyjna.
              </p>
            </div>

            <p className="text-sm text-gray-600 mb-8">
              <strong>Data ostatniej aktualizacji:</strong> {new Date().toLocaleDateString('pl-PL')}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Wprowadzenie</h2>
              <p>
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych
                w aplikacji BookSolo (projekt edukacyjny).
              </p>
              <p>
                Kontakt: <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Zakres i cel przetwarzania danych</h2>
              <p>
                Aplikacja BookSolo jest narzędziem służącym do automatycznego publikowania treści 
                użytkownika na platformach społecznościowych Facebook i Instagram. 
                Aplikacja działa wyłącznie w imieniu i na rzecz użytkownika, który jest właścicielem 
                publikowanych treści.
              </p>
              <p>
                <strong>Dane przetwarzane przez Aplikację:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dane dostępowe do konta Facebook/Instagram użytkownika (tokeny dostępu) - wyłącznie w celu publikacji treści</li>
                <li>Treści do publikacji przygotowane przez użytkownika</li>
                <li>Dane techniczne dotyczące publikacji (czas, status, identyfikatory postów)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Kontakt</h2>
              <p>
                Email: <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
              </p>
            </section>
          </div>
        </div>
      </Container>
    );
  }

  // English version
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-2">⚠️ Educational Project</h3>
            <p className="text-sm">
              <strong>NOTE:</strong> BookSolo is an educational project for learning social media automation.
              The application is provided &ldquo;AS IS&rdquo; without guarantees of stability, availability, or commercial-grade security.
              You use it at your own risk. This is not a professional commercial service.
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US')}
          </p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy outlines the principles of processing and protecting personal data
              in the BookSolo application (educational project).
            </p>
            <p>
              Contact: <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Scope and Purpose of Data Processing</h2>
            <p>
              BookSolo is a tool for automatically publishing user content on Facebook and Instagram social media platforms.
              The application acts solely on behalf of the user, who owns the published content.
            </p>
            <p>
              <strong>Data processed by the Application:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facebook/Instagram account access data (access tokens) - solely for content publishing</li>
              <li>Content prepared by the user for publication</li>
              <li>Technical data regarding publications (time, status, post identifiers)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Contact</h2>
            <p>
              Email: <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
