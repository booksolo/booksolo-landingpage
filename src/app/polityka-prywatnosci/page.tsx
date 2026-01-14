import React from "react";
import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka Prywatności - BookSolo",
  description: "Polityka prywatności aplikacji BookSolo",
};

const PolitykaPrywatnosci: React.FC = () => {
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
            <p>
              <strong>Aplikacja NIE przetwarza:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Danych osobowych osób trzecich</li>
              <li>Danych kontaktowych odbiorców</li>
              <li>Danych analitycznych dotyczących odbiorców treści</li>
              <li>Żadnych innych danych poza niezbędnymi do funkcjonowania usługi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Integracja z Meta (Facebook/Instagram)</h2>
            <p>
              Aplikacja korzysta z API Meta (Facebook/Instagram) wyłącznie w celu publikacji treści 
              użytkownika. Administrator nie ponosi odpowiedzialności za:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Politykę prywatności i zasady przetwarzania danych przez Meta</li>
              <li>Działanie platform Facebook i Instagram</li>
              <li>Treści publikowane przez użytkownika</li>
              <li>Konsekwencje prawne publikacji treści przez użytkownika</li>
            </ul>
            <p>
              Użytkownik wyraża zgodę na przekazanie niezbędnych danych dostępowych do Meta 
              wyłącznie w zakresie wymaganym do publikacji treści. Administrator nie ma dostępu 
              do pełnych danych konta użytkownika w Meta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Bezpieczeństwo danych</h2>
            <p>
              <strong>Jako projekt edukacyjny, BookSolo stosuje podstawowe środki bezpieczeństwa:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Szyfrowanie danych podczas przesyłania (HTTPS/TLS)</li>
              <li>Dane przechowywane w infrastrukturze AWS (region może się zmieniać)</li>
              <li>Brak gwarancji poziomu bezpieczeństwa komercyjnego</li>
            </ul>
            <p>
              <strong>WAŻNE:</strong> Nie używaj tej aplikacji do przetwarzania wrażliwych danych osobowych
              ani biznesowych. Jest to projekt testowy, nie system produkcyjny. Nie gwarantuję ochrony
              na poziomie profesjonalnych usług komercyjnych.
            </p>
            <p>
              Nie ponoszę odpowiedzialności za bezpieczeństwo danych przechowywanych przez Meta (Facebook/Instagram)
              ani za naruszenia bezpieczeństwa spowodowane ograniczeniami projektu edukacyjnego.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Okres przechowywania danych</h2>
            <p>
              Dane przechowywane są przez czas korzystania z aplikacji. Po rozłączeniu konta
              lub na żądanie, dane będą usunięte w rozsądnym terminie (zazwyczaj do 30 dni,
              ale może to zająć dłużej w przypadku problemów technicznych).
            </p>
            <p>
              <strong>Uwaga:</strong> Jako projekt edukacyjny, mogę nie mieć automatycznych procesów
              usuwania danych. Skontaktuj się ze mną bezpośrednio w sprawie usunięcia danych.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Prawa użytkownika (RODO/GDPR)</h2>
            <p>
              Zgodnie z RODO, masz prawo do:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dostępu do danych</strong> - mogę pokazać jakie dane przechowuję</li>
              <li><strong>Usunięcia danych</strong> - mogę usunąć Twoje dane na żądanie</li>
              <li><strong>Sprostowania danych</strong> - mogę poprawić nieprawidłowe dane</li>
              <li><strong>Przenoszenia danych</strong> - mogę wyeksportować Twoje dane</li>
            </ul>
            <p>
              <strong>Kontakt:</strong> <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
            </p>
            <p className="text-sm text-gray-600">
              Postaram się odpowiedzieć w ciągu kilku dni, ale jako projekt hobbystyczny nie gwarantuję
              odpowiedzi w ciągu 30 dni jak wymagają przepisy komercyjne. Jeśli potrzebujesz szybkiej
              reakcji, po prostu rozłącz konto z aplikacji.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Odpowiedzialność użytkownika</h2>
            <p>
              Użytkownik ponosi pełną odpowiedzialność za:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Treści publikowane za pośrednictwem Aplikacji</li>
              <li>Zgodność publikowanych treści z prawem obowiązującym w Polsce i innych krajach</li>
              <li>Posiadanie odpowiednich praw do publikowanych treści (prawa autorskie, prawa wizerunku)</li>
              <li>Zgodność publikowanych treści z regulaminami Facebook i Instagram</li>
              <li>Konsekwencje prawne wynikające z publikacji treści</li>
            </ul>
            <p>
              Administrator nie ponosi odpowiedzialności za naruszenia prawa przez użytkownika 
              ani za szkody wynikające z publikacji treści przez użytkownika.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Pliki cookies i technologie śledzące</h2>
            <p>
              Aplikacja może wykorzystywać pliki cookies i podobne technologie wyłącznie w celu 
              zapewnienia prawidłowego funkcjonowania usługi. Aplikacja nie wykorzystuje cookies 
              do celów marketingowych ani śledzenia użytkowników.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Zmiany w Polityce Prywatności</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności.
              O wszelkich zmianach użytkownicy będą informowani poprzez aktualizację daty &ldquo;ostatniej aktualizacji&rdquo;
              na początku dokumentu. Kontynuowanie korzystania z Aplikacji po wprowadzeniu zmian
              oznacza akceptację nowych warunków.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Prawo właściwe</h2>
            <p>
              Zastosowanie mają przepisy prawa polskiego, w tym RODO. W przypadku sporów,
              najpierw spróbujmy rozwiązać je polubownie.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Kontakt</h2>
            <p>
              W sprawach dotyczących przetwarzania danych osobowych oraz realizacji praw użytkownika 
              można kontaktować się z Administratorem:
            </p>
            <p>
              Email: <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
            </p>
          </section>

        </div>
      </div>
    </Container>
  );
};

export default PolitykaPrywatnosci;
