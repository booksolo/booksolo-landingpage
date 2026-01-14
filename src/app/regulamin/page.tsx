import React from "react";
import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin - BookSolo",
  description: "Regulamin korzystania z aplikacji BookSolo",
};

const Regulamin: React.FC = () => {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Regulamin</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-2">⚠️ Projekt Edukacyjny</h3>
            <p className="text-sm">
              <strong>UWAGA:</strong> BookSolo jest projektem edukacyjnym służącym do nauki automatyzacji publikacji w social media.
              Aplikacja jest udostępniana &ldquo;TAK JAK JEST&rdquo; bez gwarancji. Może zawierać błędy, może przestać działać,
              może stracić Twoje dane. Używasz jej na własną odpowiedzialność. Nie jest to profesjonalna usługa komercyjna.
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            <strong>Data ostatniej aktualizacji:</strong> {new Date().toLocaleDateString('pl-PL')}
          </p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Postanowienia ogólne</h2>
            <p>
              Ten regulamin określa zasady korzystania z BookSolo - projektu edukacyjnego do testowania
              automatycznej publikacji w social media.
            </p>
            <p>
              Kontakt: <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
            </p>
            <p>
              Korzystając z aplikacji, akceptujesz ten regulamin i rozumiesz, że jest to projekt hobbystyczny,
              nie usługa komercyjna.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Definicje</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Aplikacja</strong> - aplikacja BookSolo służąca do publikacji treści na platformach Facebook i Instagram</li>
              <li><strong>Użytkownik</strong> - osoba korzystająca z Aplikacji</li>
              <li><strong>Administrator</strong> - właściciel i operator Aplikacji</li>
              <li><strong>Treści</strong> - materiały tekstowe, graficzne, wideo lub inne przygotowane przez użytkownika do publikacji</li>
              <li><strong>Platformy</strong> - Facebook i Instagram, będące własnością Meta Platforms Inc.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Zakres usług</h2>
            <p>
              Aplikacja BookSolo umożliwia użytkownikowi automatyczne publikowanie przygotowanych przez niego 
              treści na platformach społecznościowych Facebook i Instagram.
            </p>
            <p>
              <strong>Funkcjonalność Aplikacji:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Publikacja treści użytkownika na Facebook i Instagram</li>
              <li>Planowanie publikacji w czasie</li>
              <li>Zarządzanie treściami do publikacji</li>
            </ul>
            <p>
              <strong>Aplikacja NIE oferuje:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tworzenia treści za użytkownika</li>
              <li>Zarządzania kontami społecznościowymi</li>
              <li>Analizy statystyk publikacji</li>
              <li>Interakcji z odbiorcami treści</li>
              <li>Usług marketingowych lub reklamowych</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Warunki korzystania</h2>
            <p>
              <strong>Użytkownik zobowiązuje się do:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Korzystania z Aplikacji wyłącznie w sposób zgodny z prawem i niniejszym Regulaminem</li>
              <li>Publikowania wyłącznie treści, do których posiada odpowiednie prawa (prawa autorskie, prawa wizerunku)</li>
              <li>Publikowania treści zgodnych z prawem obowiązującym w Polsce i innych krajach</li>
              <li>Przestrzegania regulaminów platform Facebook i Instagram</li>
              <li>Niepublikowania treści niezgodnych z prawem, obraźliwych, dyskryminujących, naruszających prawa osób trzecich</li>
              <li>Zachowania poufności danych dostępowych do konta</li>
              <li>Nieudostępniania danych dostępowych osobom trzecim</li>
            </ul>
            <p>
              <strong>Zabronione jest:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wykorzystywanie Aplikacji do celów niezgodnych z prawem</li>
              <li>Publikowanie treści naruszających prawa osób trzecich</li>
              <li>Publikowanie treści spamowych, reklamowych bez zgody odbiorców</li>
              <li>Próby naruszenia bezpieczeństwa Aplikacji</li>
              <li>Wykorzystywanie Aplikacji w sposób mogący zakłócić jej działanie</li>
              <li>Kopiowanie, modyfikowanie lub rozpowszechnianie Aplikacji bez zgody Administratora</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Odpowiedzialność</h2>
            <p>
              <strong>Ty jesteś odpowiedzialny za:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Wszystkie treści publikowane przez aplikację</li>
              <li>Zgodność treści z prawem i regulaminami Facebook/Instagram</li>
              <li>Konsekwencje prawne publikacji</li>
              <li>Bezpieczeństwo swoich danych dostępowych</li>
            </ul>
            <p>
              <strong>Ja (autor aplikacji) NIE ponoszę odpowiedzialności za:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Twoje treści i ich konsekwencje</li>
              <li>Utratę danych (to projekt testowy, może zawierać błędy)</li>
              <li>Działanie lub zmiany w API Meta/Facebook/Instagram</li>
              <li>Blokady konta przez Meta</li>
              <li>Jakiekolwiek szkody wynikające z użycia aplikacji</li>
              <li>Przerwy w działaniu aplikacji</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Pamiętaj:</strong> To projekt edukacyjny. Może przestać działać w każdej chwili.
              Używaj go tylko do testów, nie do ważnych publikacji biznesowych.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Prawa autorskie i własność intelektualna</h2>
            <p>
              Wszelkie prawa autorskie i prawa własności intelektualnej do Aplikacji należą do Administratora. 
              Użytkownik otrzymuje wyłącznie ograniczone, niewyłączne, niepodlegające przeniesieniu prawo 
              do korzystania z Aplikacji zgodnie z niniejszym Regulaminem.
            </p>
            <p>
              Użytkownik zachowuje pełne prawa autorskie do treści przez niego przygotowanych i publikowanych. 
              Publikując treści za pośrednictwem Aplikacji, użytkownik potwierdza, że posiada wszystkie 
              niezbędne prawa do ich publikacji.
            </p>
            <p>
              Użytkownik zobowiązuje się do niepublikowania treści naruszających prawa autorskie, 
              prawa wizerunku lub inne prawa osób trzecich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Integracja z Meta (Facebook/Instagram)</h2>
            <p>
              Aplikacja korzysta z API Meta (Facebook/Instagram) w celu publikacji treści użytkownika. 
              Korzystanie z Aplikacji wymaga połączenia konta Facebook/Instagram użytkownika.
            </p>
            <p>
              <strong>Użytkownik wyraża zgodę na:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Połączenie konta Facebook/Instagram z Aplikacją</li>
              <li>Udostępnienie niezbędnych uprawnień API wymaganych do publikacji treści</li>
              <li>Przetwarzanie danych dostępowych wyłącznie w celu publikacji treści</li>
            </ul>
            <p>
              <strong>Administrator nie ponosi odpowiedzialności za:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Działanie API Meta lub jego zmiany</li>
              <li>Ograniczenia lub blokady nałożone przez Meta</li>
              <li>Politykę prywatności i zasady Meta</li>
              <li>Konsekwencje wynikające z korzystania z platform Meta</li>
            </ul>
            <p>
              Użytkownik zobowiązuje się do przestrzegania regulaminów i zasad Meta dotyczących 
              korzystania z API oraz publikacji treści.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Dostępność</h2>
            <p>
              <strong>Żadnych gwarancji dostępności.</strong> Jako projekt hobbystyczny:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aplikacja może być niedostępna bez ostrzeżenia</li>
              <li>Mogę wprowadzać zmiany lub eksperymentować w dowolnym momencie</li>
              <li>Mogę zakończyć projekt w każdej chwili</li>
              <li>Mogę zablokować dostęp bez podania przyczyny</li>
            </ul>
            <p className="text-sm text-gray-600">
              To nie jest płatna usługa z SLA. To mój projekt do nauki. Traktuj go odpowiednio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Ochrona danych osobowych</h2>
            <p>
              Zasady przetwarzania danych osobowych określa Polityka Prywatności dostępna pod adresem: 
              <a href="/polityka-prywatnosci" className="text-primary hover:underline"> /polityka-prywatnosci</a>
            </p>
            <p>
              Korzystając z Aplikacji, użytkownik akceptuje zasady przetwarzania danych określone 
              w Polityce Prywatności.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Problemy i feedback</h2>
            <p>
              Jeśli masz problem lub feedback, napisz: <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
            </p>
            <p className="text-sm text-gray-600">
              Postaram się pomóc, ale to projekt hobbystyczny - nie gwarantuję czasów odpowiedzi ani rozwiązania.
              Jeśli coś nie działa, po prostu przestań używać aplikacji.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Rozwiązanie umowy</h2>
            <p>
              Użytkownik może w każdej chwili zaprzestać korzystania z Aplikacji poprzez:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Rozłączenie konta Facebook/Instagram z Aplikacją</li>
              <li>Usunięcie konta w Aplikacji</li>
              <li>Zgłoszenie żądania usunięcia danych (zgodnie z Polityką Prywatności)</li>
            </ul>
            <p>
              Administrator może w każdej chwili zawiesić lub zakończyć świadczenie usług użytkownikowi, 
              w szczególności w przypadku:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Naruszenia Regulaminu</li>
              <li>Naruszenia prawa</li>
              <li>Działań mogących zaszkodzić Aplikacji lub innym użytkownikom</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Zmiany Regulaminu</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszym Regulaminie.
              O zmianach użytkownicy będą informowani poprzez aktualizację daty &ldquo;ostatniej aktualizacji&rdquo;
              na początku dokumentu.
            </p>
            <p>
              Kontynuowanie korzystania z Aplikacji po wprowadzeniu zmian oznacza akceptację 
              nowych warunków Regulaminu.
            </p>
            <p>
              W przypadku braku akceptacji zmian, użytkownik zobowiązany jest do zaprzestania 
              korzystania z Aplikacji.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">13. Prawo</h2>
            <p>
              Obowiązuje prawo polskie. W razie sporów, najpierw spróbujmy dogadać się polubownie.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">14. Kontakt</h2>
            <p>
              W sprawach dotyczących Aplikacji można kontaktować się z Administratorem:
            </p>
            <p>
              Email: <a href="mailto:hello@booksolo.eu" className="text-primary hover:underline">hello@booksolo.eu</a>
            </p>
          </section>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Podsumowanie:</strong> To projekt do nauki. Używasz go na własną odpowiedzialność.
              Ty odpowiadasz za swoje treści. Ja nie gwarantuję, że będzie działać. Możesz przestać
              z niego korzystać w dowolnym momencie.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Regulamin;
