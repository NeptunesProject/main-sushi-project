import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'

const ReglamentContent = () => {
    return (
        <Container
            maxW="container.xl"
            my={24}
            display="flex"
            justifyContent="center"
            fontFamily="'Roboto', sans-serif"
        >
            <Box maxW={{ base: 500, lg: 1150 }} minW={{ base: 'auto', lg: '80%' }}>
                <Heading
                    as="h2"
                    fontSize={36}
                    fontWeight={700}
                    color="cyanBlue.800"
                    mb={8}
                    fontFamily="'Roboto', sans-serif"
                >
                    Regulamin Sklepu
                </Heading>

                <Flex
                    borderRadius={16}
                    flexDir="column"
                    gap={3}
                    maxW={900}
                    bg="rgba(255, 255, 255, 0.7)"
                    p={4}
                    color="cyanBlue.800"
                    fontWeight={600}
                >
                    <Text>
                        Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego dostępnego pod adresem neptunessushi.com oraz warunki sprzedaży produktów oferowanych przez firmę NEPTUNES SUSHI DELIVERY SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ.
                    </Text>

                    <Heading as="h3" fontSize={28} mt={6}>
                        §1. Informacje Rejestrowe o Firmie
                    </Heading>
                    <Text whiteSpace="pre-line">
                        {`NEPTUNES SUSHI DELIVERY SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ
NIP: 5242990546
REGON: 527002488
KRS: 0001070660
Adres rejestracyjny: Michała Kleofasa Ogińskiego 11/9, 03-318 Warszawa
Adres fizyczny: Dolna 41, 00-773 Warszawa, kuchnia 3
Email: neptunessushi@gmail.com
Telefon: +48 517 102 069
Strona internetowa: neptunessushi.com`}
                    </Text>

                    <Heading as="h3" fontSize={28} mt={6}>
                        §2. Produkty i Usługi
                    </Heading>
                    <Text whiteSpace="pre-line">
                        {`Sklep oferuje produkty gastronomiczne w formie:
a) Odbioru osobistego,
b) Dostawy – realizowanej przez firmę bezpośrednio lub za pośrednictwem firm kurierskich (np. Glovo, Bolt Food, Uber Eats, Pyszne.pl).

Wszystkie produkty są prezentowane na stronie wraz z opisem, zdjęciem i ceną.

Zamówienia można składać:
a) przez stronę internetową neptunessushi.com,
b) telefonicznie,
c) osobiście w punkcie sprzedaży.

Złożenie zamówienia wymaga:
- podania danych osobowych,
- akceptacji Regulaminu,
- dokonania płatności.

Dostępne metody płatności:
a) płatność online przez system Przelewy24,
b) płatność gotówką lub kartą przy odbiorze (jeśli dostępna).

W przypadku niezatwierdzenia płatności elektronicznej przez system, zamówienie nie zostanie zrealizowane.

Nie przyjmujemy zamówień na składniki spoza menu ani indywidualne modyfikacje dań.

Czas realizacji zamówienia nie przekracza 1 dnia roboczego.`}
                    </Text>

                    <Heading as="h3" fontSize={28} mt={6}>
                        §3. Polityka Zwrotów
                    </Heading>
                    <Text whiteSpace="pre-line">
                        {`1. W związku z art. 38 ustawy z dnia 30 maja 2014 r. o prawach konsumenta, Klient nie ma prawa odstąpić od umowy zawartej na odległość w ciągu 14 dni kalendarzowych. Jednakże w przypadku dostawy towarów szybko psujących się lub mających krótki termin przydatności do użycia, takich jak produkty oferowane przez NEPTUNES SUSHI DELIVERY SP. Z O.O., Klient nie ma prawa do odstąpienia od umowy.
2. Zgodnie z art. 38 ustawy z dnia 30 maja 2014 r. o prawach konsumenta, Klient ma prawo do anulowania lub zmiany zamówienia tylko do momentu rozpoczęcia jego przygotowania przez Sprzedawcę.
3. Klient ponosi pełną odpowiedzialność za błędne złożenie zamówienia. Zwrot środków w takich przypadkach nie jest możliwy.
4. Zwrot środków nie jest możliwy po zweryfikowaniu Klienta i rozpoczęciu realizacji zamówienia.
5. W przypadku wad jakościowych lub błędów w zamówieniu, Klient ma prawo do zgłoszenia reklamacji zgodnie z §4.
6. Klient ma prawo do odstąpienia od umowy w ciągu 14 dni kalendarzowych, z wyjątkiem przypadków wskazanych w punkcie 1.`}
                    </Text>

                    <Heading as="h3" fontSize={28} mt={6}>
                        §4. Reklamacje
                    </Heading>
                    <Text whiteSpace="pre-line">
                        {`1. Klient ma prawo do złożenia reklamacji w przypadku stwierdzenia wad towaru.
2. Reklamację należy zgłosić w ciągu 24 godzin od otrzymania towaru.
3. Reklamacja dotyczy jedynie wad jakościowych lub błędów po stronie Sprzedawcy.
4. Reklamacje wynikające z błędów Klienta nie będą rozpatrywane.
5. Klient może żądać: a) wymiany produktu, b) zwrotu środków.
6. Warunkiem rozpatrzenia reklamacji jest przedstawienie dowodu zakupu oraz zdjęć.
7. Reklamacje należy kierować na email: neptunessushi@gmail.com
8. Klient zostanie poinformowany o wyniku reklamacji w ciągu 14 dni KALENDARZOWYCH.
9. Zwrot środków nastąpi tą samą metodą płatności.`}
                    </Text>

                    <Heading as="h3" fontSize={28} mt={6}>
                        §5. Postanowienia Końcowe
                    </Heading>
                    <Text whiteSpace="pre-line">
                        {`1. Regulamin jest dostępny na stronie sklepu i musi zostać zaakceptowany przed zakupem.
2. Zmiany w Regulaminie będą publikowane na stronie neptunessushi.com i wchodzą w życie z dniem publikacji.
3. W sprawach nieuregulowanych Regulaminem obowiązuje prawo polskie.
4. Treści strony, w tym zdjęcia i logo, są własnością NEPTUNES SUSHI DELIVERY i chronione prawem autorskim.
5. Akceptacja Regulaminu oznacza akceptację wszystkich warunków sprzedaży.`}
                    </Text>
                </Flex>
            </Box>
        </Container>
    )
}

export default ReglamentContent
