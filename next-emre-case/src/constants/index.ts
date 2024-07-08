import { Card, SecondTableRow, FirstTableRow } from 'src/types'

// First Table's Data
export const firstTableHead: string[] = ['PROJECT', 'TOTAL TASK', 'PROGRESS', 'HOURS']

export const firstTableData: FirstTableRow[] = [
  {
    name: 'BGC eCommerce App',
    totalTask: '122/240',
    progress: 78,
    hours: '18:22',
    image: '/react.png'
  },
  {
    name: 'Falcon Logo Design',
    totalTask: '9/56',
    progress: 18,
    hours: '20:42',
    image: '/figma.png'
  },
  {
    name: 'Dashboard Design',
    totalTask: '290/320',
    progress: 62,
    hours: '120:87',
    image: '/vue.png'
  },
  {
    name: 'Foodista Mobile App',
    totalTask: '7/63',
    progress: 8,
    hours: '89:19',
    image: '/xamarin.png'
  },
  {
    name: 'Dojo React Project',
    totalTask: '120/186',
    progress: 49,
    hours: '230:10',
    image: '/python.png'
  },
  {
    name: 'Blockchain WEbsite',
    totalTask: '99/109',
    progress: 92,
    hours: '342:41',
    image: '/sketch.png'
  },
  {
    name: 'Hoffman Website',
    totalTask: '98/110',
    progress: 88,
    hours: '342:41',
    image: '/html.png'
  }
]

// Second Table's Data
export const secondTableHead: string[] = ['TOPIC', 'STATUS', 'SUCCESS RATE', 'COMPLATION RATE']

export const secondTableData: SecondTableRow[] = [
  { name: 'Polynom', status: 'OverDue', success: '%32', rate: '+24%' },
  { name: 'Functions', status: 'Active', success: '%45', rate: '-12%' },
  { name: 'Graph', status: 'OverDue', success: '%12', rate: '+24%' },
  { name: 'Matrix', status: 'Not Assigned', success: '%0', rate: '0%' }
]

// data for lesson cards
export const lessons = [
  {
    title: 'Math',
    img: '/google.png',
    styles: { borderStyle: 'solid', borderColor: '#e7411c' }
  },
  {
    title: 'Chemistry',
    img: '/instagram.webp'
  },
  {
    title: 'Psysic',
    img: '/facebook.png'
  },
  {
    title: 'Biology',
    img: '/biology.png'
  },
  {
    title: '',
    img: '/plus.png'
  }
]

// data for packages
export const cardData: Card[] = [
  {
    title: 'SAT FULL PRACTICE',
    shortTag: 'SAT',
    price: '$89',
    examContent: '5 Practices & 3 Exams',
    date: 'Valid until 13 january 2024',
    progress: 68,
    btn: 'SHOW INVOİCE',
    desc: 'You can extend the time before expiration date '
  },
  {
    title: 'TOLC FULL EXAM PREP',
    shortTag: 'TOLC',
    price: '$289',
    examContent: '5 Practices & 3 Exams',
    date: 'Valid until 02 March 2024',
    progress: 38,
    btn: 'SHOW INVOİCE',
    desc: 'You can extend the time before expiration date '
  },
  {
    title: 'IB MATH & SCIENCE',
    shortTag: 'SAT',
    price: '$329',
    examContent: '4 Practices & 6 Exams',
    date: 'Valid until 23 February 2024',
    progress: 72,
    btn: 'SHOW INVOİCE',
    desc: 'You can extend the time before expiration date '
  }
]
