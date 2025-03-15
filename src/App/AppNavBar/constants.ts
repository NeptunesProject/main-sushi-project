import futomaki from 'assets/icons/category/futomaki.svg'
import california from 'assets/icons/category/california.svg'
import appetisers from 'assets/icons/category/appetisers.svg'
import sets from 'assets/icons/category/sets.svg'
import nigiri from 'assets/icons/category/nigiri.svg'
import hosomaki from 'assets/icons/category/hosomaki.svg'
import tempura from 'assets/icons/category/tempura.jpg'

const CATEGORY = [
    {
        name: 'Zestawy',
        nameUa: 'Набори',
        nameRu: 'Наборы',
        nameEn: 'Sets',
        route: 'Zestawy',
        translateId: 'Zestawy',
        img: sets,
    },
    {
        name: 'Tempura',
        nameUa: 'Tempura',
        nameRu: 'Tempura',
        nameEn: 'Tempura',
        route: 'Tempura',
        translateId: 'Tempura',
        img: tempura,
    },
    {
        name: 'California',
        nameUa: 'Каліфорнія ',
        nameRu: 'Калифорния',
        nameEn: 'California',
        route: 'California Rolls',
        translateId: 'California Rolls',
        img: california,
    },
    {
        name: 'Futomaki',
        nameUa: 'Футомакі',
        nameRu: 'Футомаки',
        nameEn: 'Futomaki',
        route: 'Futomaki',
        translateId: 'Futomaki',
        img: futomaki,
    },
    {
        name: 'Nigiri',
        nameUa: 'Нігірі',
        nameRu: 'Нигири',
        nameEn: 'Nigiri',
        route: 'Nigiri',
        translateId: 'Nigiri',
        img: nigiri,
    },
    {
        name: 'Hosomaki',
        nameUa: 'Хосомаки',
        nameRu: 'Хосомаки',
        nameEn: 'Hosomaki',
        route: 'Hosomaki',
        translateId: 'Hosomaki',
        img: hosomaki,
    },
    {
        name: 'Przystawki',
        nameUa: 'Закуски',
        nameRu: 'Закуски',
        nameEn: 'Appetizers',
        route: 'Przystawki',
        translateId: 'Przystawki',
        img: appetisers,
    }
]

export {CATEGORY}
