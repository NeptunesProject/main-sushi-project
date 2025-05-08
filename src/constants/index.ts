import { WorkingHours } from '../types'

const NAV_LINKS = ['/']
const EXTERNAL_LINKS = [
  'https://www.instagram.com/neptunes.sushi/',
  'tel:+48517102069',
]
const THANK_NOTE_TEXT = [
  'Świeże składniki: Używamy tylko najświeższych składników, zapewniając wysoką jakość i smak naszych sushi.',
  'Bogate menu: Nasze menu oferuje szeroki wybór sushi, zapewniająccoś dla każdego, bez względu na preferencje smakowe.',
  'Szybka dostawa: Zapewniamy szybką i terminową dostawę, dzięki czemu możesz cieszyć się naszym pysznym sushi w wygodnym dla Ciebie czasie.',
  'Kreatywne kompozycje: Nasze sushi jest nie tylko smaczne, ale także pięknie podane, sprawiając, że jedzenie staje się również przyjemnością dla oka.',
  'Wysoka jakość obsługi klienta: Dbamy o naszych klientów i zawsze staramy się zapewnić im najlepsze doświadczenie związane z zamawianiem i spożywaniem naszego sushi.',
]

export { NAV_LINKS, THANK_NOTE_TEXT, EXTERNAL_LINKS }

export const openingHoursFallBack: WorkingHours = {
  '1': '12:00 : 22:30',
  '2': '12:00 : 22:30',
  '3': '12:00 : 22:30',
  '4': '12:00 : 22:30',
  '5': '12:00 : 22:30',
  '6': '12:00 : 22:30',
  '0': '12:00 : 22:30',
}
export const minimalPrice = 65
export const storageVersion = 'v2'
