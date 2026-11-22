# Wytyczne redakcyjne OnlyWines.pl

Lista kontrolna, którą redaktor **musi** przejść przed publikacją każdego artykułu, ciekawostki, hasła w słowniczku i pytania w quizie. Po jej przejściu ustaw we frontmatterze `complianceChecked: true`. Bez tego pola strona się nie zbuduje.

> **Dlaczego to ważne?** Ustawa z dnia 26 października 1982 r. o wychowaniu w trzeźwości i przeciwdziałaniu alkoholizmowi (art. 13¹) zakazuje reklamy i promocji napojów alkoholowych (z wyjątkiem piwa, na ściśle określonych warunkach). Za naruszenie grozi grzywna od 10 000 do 500 000 zł. Jesteśmy magazynem **edukacyjnym i kulturalnym**, a nie reklamowym. Te wytyczne nie zastępują porady prawnej. W razie wątpliwości skonsultuj tekst z prawnikiem.

Automatyczny skrypt (`npm run check:content`) wychwytuje część błędów, ale **nie zastępuje** tej listy. Komunikaty „UWAGA” trzeba ocenić samodzielnie.

---

## 1. Treści handlowe: bezwzględnie zakazane

- [ ] Brak cen, przedziałów cenowych, walut i informacji o promocjach, rabatach czy dostępności.
- [ ] Brak wezwań do zakupu: „kup”, „zamów”, „sprawdź ofertę”, „dostępne w sklepie”.
- [ ] Brak linków do sklepów, hurtowni, marketplace’ów i porównywarek sprzedających alkohol (np. sklepy z winem, Vivino, Ceneo, Allegro).
- [ ] Brak rekomendacji, ocen, punktacji i rankingów **konkretnych win, butelek, roczników danego producenta i marek**.
- [ ] Brak nazw handlowych win i etykiet. Nazwy regionów, apelacji, odmian i miejscowości są w porządku.
- [ ] Nazwy winnic i producentów pojawiają się tylko w kontekście **historycznym, krajoznawczym lub naukowym** (np. „opactwo Johannisberg w 1775 roku”), nigdy jako polecenie.

## 2. Język i przekaz

- [ ] Tekst **nie zachęca do picia** alkoholu: unikaj trybu rozkazującego („spróbuj”, „skosztuj”, „napij się”, „sięgnij po”).
- [ ] Wino **nie jest łączone** z:
  - [ ] sukcesem zawodowym, towarzyskim lub seksualnym, atrakcyjnością,
  - [ ] zdrowiem, leczeniem, „dobroczynnym działaniem”, odpornością, resweratrolem itp.,
  - [ ] sportem i sprawnością fizyczną,
  - [ ] relaksem, odprężeniem, „odstresowaniem się”,
  - [ ] prowadzeniem pojazdów (wyjątek: komunikat ostrzegawczy, np. „osoba prowadząca auto rezygnuje z degustacji”).
- [ ] Opis smaku i aromatu jest **rzeczowy i edukacyjny** (np. „wysoka kwasowość, aromaty czerwonych owoców”), a nie zachwalający („obłędne”, „must-have”).
- [ ] Polszczyzna jest naturalna, bez kalk z angielskiego. Tekst przeczytano na głos przynajmniej raz.

## 3. Osoby niepełnoletnie

- [ ] Treść nie jest kierowana do osób poniżej 18 lat (brak odniesień do szkoły, gier dla dzieci, postaci z bajek, maskotek, stylistyki kreskówkowej).
- [ ] Na ilustracjach nie ma dzieci ani młodzieży w kontekście alkoholu.

## 4. Ilustracje i zdjęcia

- [ ] Dozwolone: krajobrazy, winnice, piwnice, beczki, grona, liście, prace w winnicy, architektura, mapy.
- [ ] Zakazane: zbliżenia butelek i etykiet z widocznymi markami, osoby pijące lub trzymające kieliszek przy ustach, sceny imprez.
- [ ] Każdy obraz ma **opisowy tekst alternatywny** po polsku (min. 10 znaków), opisujący to, co widać.
- [ ] Mamy prawo do publikacji (własne zdjęcie, licencja, domena publiczna). Autor/licencja są podane w `cover.credit` lub podpisie.
- [ ] Plik jest zoptymalizowany (JPG/WebP, szerokość ok. 1600–2000 px, < 400 KB).

## 5. Linki partnerskie i reklama

- [ ] Linki partnerskie wyłącznie przez komponent `<PartnerBox>` lub listę `partners` we frontmatterze, nigdy „ręcznie” w tekście.
- [ ] Partner należy do dozwolonej kategorii: wycieczki i zwiedzanie, noclegi, podróże, kursy i edukacja, książki, akcesoria **bezalkoholowe**.
- [ ] Opis w boksie dotyczy zwiedzania, krajobrazu, noclegu lub nauki, a **nie degustacji czy picia**.
- [ ] Treść sponsorowana jest wyraźnie oznaczona („Współpraca”, „Materiał partnera”) zgodnie z wytycznymi UOKiK.

## 6. Rzetelność

- [ ] Każda liczba, data i nazwa została sprawdzona w co najmniej jednym wiarygodnym źródle (publikacja naukowa, instytucja branżowa, np. OIV, organizacje regionalne, UNESCO, encyklopedie).
- [ ] Legendy są przedstawione jako legendy („według tradycji…”).
- [ ] Przy aktualizacji tekstu uzupełniono pole `updated` we frontmatterze.

## 7. SEO i forma

- [ ] Tytuł 40–70 znaków, z głównym słowem kluczowym, bez clickbaitu.
- [ ] `excerpt` 120–250 znaków, `seoDescription` 120–160 znaków.
- [ ] Slug: małe litery, bez polskich znaków, słowa oddzielone myślnikami (np. `szlak-winny-toskanii`). Nazwa pliku = `slug.mdx`.
- [ ] Struktura: wstęp, śródtytuły `##` (i ewentualnie `###`), 800–1200 słów.
- [ ] 2–3 linki wewnętrzne do innych artykułów lub słowniczka.
- [ ] Sekcja FAQ (2–4 pytania) tam, gdzie ma sens.
- [ ] Odpowiednia kategoria i 3–7 tagów (małe litery).

---

## Przykłady: jak pisać, a jak nie

| ❌ Nie | ✅ Tak |
| --- | --- |
| „Koniecznie spróbuj tokajskiego aszú!” | „Aszú to tradycyjne tokajskie wino z gron porażonych szlachetną pleśnią.” |
| „Kieliszek czerwonego wina dziennie wspiera serce.” | Nie piszemy o wpływie wina na zdrowie. |
| „Najlepsze Chianti do 50 zł” | Nie podajemy cen ani rankingów. |
| „Idealne wino na relaks po pracy” | „Wina z tej odmiany mają zwykle wysoką kwasowość i niską zawartość garbników.” |
| „Kup bilet na degustację w winnicy X” | „W regionie wiele winnic można zwiedzać po wcześniejszym umówieniu się.” |

## Ścieżka publikacji

1. Autor pisze tekst w pliku `content/artykuly/<slug>.mdx` (zacznij od `content/artykuly/_szablon.mdx`).
2. `npm run check:content` musi zakończyć się wynikiem **0 błędów**. Uwagi trzeba ocenić.
3. Drugi redaktor przechodzi tę listę kontrolną.
4. Ustaw `complianceChecked: true`, a dla wersji roboczej `draft: true`.
5. Opublikuj (commit i push do gałęzi `main`, Vercel zbuduje stronę automatycznie).
