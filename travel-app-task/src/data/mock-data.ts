import { Tour, Ticket, Rent, Transfer, Product } from '@/types';

export const tours: Tour[] = [
  {
    id: '1',
    title: 'Phi phi, khai islands tour with speedboat full day',
    location: 'Rassada Pier/Rassada',
    rating: 4.3,
    reviewCount: 20,
    price: 1620,
    discountedPrice: 1400,
    discount: 30,
    image: '/images/phi-phi.jpg',
    category: 'tour',
    theme: ['Island Tour', 'Land tour'],
    activities: ['Swimming', 'Snorkelling'],
    startTime: '09:00',
    groupSize: 20,
    vehicle: 'Speedboat',
    features: ['Transfer', 'Halal Food'],
    isFavorite: false
  },
  {
    id: '2',
    title: 'Elephant Sanctuary Tour with Lunch',
    location: 'Phuket',
    rating: 4.7,
    reviewCount: 45,
    price: 1800,
    discountedPrice: 1500,
    discount: 20,
    image: '/images/elephant.jpg',
    category: 'tour',
    theme: ['Safari', 'Land tour'],
    activities: ['Elephant care'],
    startTime: '08:00',
    groupSize: 15,
    vehicle: 'Safari',
    features: ['Transfer', 'Vegetarian food'],
    isFavorite: true
  },
  {
    id: '3',
    title: 'Similan Islands Snorkeling Trip',
    location: 'Khao Lak',
    rating: 4.5,
    reviewCount: 32,
    price: 2200,
    discountedPrice: 1900,
    discount: 15,
    image: '/images/similan.jpg',
    category: 'tour',
    theme: ['Island Tour'],
    activities: ['Swimming', 'Snorkelling'],
    startTime: '07:30',
    groupSize: 25,
    vehicle: 'Speedboat',
    features: ['Transfer', 'Halal Food'],
    isFavorite: false
  },
  {
    id: '4',
    title: 'James Bond Island Tour by Longtail Boat',
    location: 'Phang Nga Bay',
    rating: 4.2,
    reviewCount: 28,
    price: 1500,
    discountedPrice: 1200,
    discount: 20,
    image: '/images/james-bond.jpg',
    category: 'tour',
    theme: ['Island Tour'],
    activities: ['Swimming', 'Canoeing'],
    startTime: '08:30',
    groupSize: 18,
    vehicle: 'Catamaran',
    features: ['Transfer', 'Vegetarian food'],
    isFavorite: false
  },
  {
    id: '5',
    title: 'Coral Island Half-Day Tour',
    location: 'Pattaya',
    rating: 4.0,
    reviewCount: 15,
    price: 1100,
    discountedPrice: 950,
    discount: 15,
    image: '/images/coral.jpg',
    category: 'tour',
    theme: ['Island Tour'],
    activities: ['Swimming', 'Snorkelling'],
    startTime: '10:00',
    groupSize: 30,
    vehicle: 'Speedcatamaran',
    features: ['Transfer', 'Halal Food'],
    isFavorite: false
  },
  {
    id: '6',
    title: 'Bangkok City Temple Tour',
    location: 'Bangkok',
    rating: 4.6,
    reviewCount: 50,
    price: 1300,
    discountedPrice: 1100,
    discount: 15,
    image: '/images/bangkok.jpg',
    category: 'tour',
    theme: ['Land tour'],
    activities: ['Walking', 'Sightseeing'],
    startTime: '09:00',
    groupSize: 20,
    vehicle: 'Safari',
    features: ['Transfer', 'Vegetarian food'],
    isFavorite: true
  }
];

export const tickets: Ticket[] = [
  {
    id: '1',
    title: 'Phuket FantaSea Show Ticket',
    location: 'Phuket',
    rating: 4.4,
    reviewCount: 30,
    price: 1200,
    discountedPrice: 1000,
    discount: 20,
    image: '/images/fantasea.jpg',
    category: 'ticket',
    date: '2023-06-15',
    type: 'Show',
    isFavorite: false
  },
  {
    id: '2',
    title: 'Chiang Mai Night Safari Ticket',
    location: 'Chiang Mai',
    rating: 4.2,
    reviewCount: 25,
    price: 800,
    discountedPrice: 700,
    discount: 15,
    image: '/images/night-safari.jpg',
    category: 'ticket',
    date: '2023-06-20',
    type: 'Safari',
    isFavorite: true
  }
];

export const rentals: Rent[] = [
  {
    id: '1',
    title: 'Scooter Rental in Phuket',
    location: 'Phuket',
    rating: 4.5,
    reviewCount: 40,
    price: 300,
    discountedPrice: 250,
    discount: 20,
    image: '/images/scooter.jpg',
    category: 'rent',
    type: 'Vehicle',
    duration: 'Daily',
    features: ['Helmet', 'Insurance'],
    isFavorite: false
  },
  {
    id: '2',
    title: 'Kayak Rental in Krabi',
    location: 'Krabi',
    rating: 4.3,
    reviewCount: 22,
    price: 500,
    discountedPrice: 400,
    discount: 20,
    image: '/images/kayak.jpg',
    category: 'rent',
    type: 'Water Equipment',
    duration: 'Hourly',
    features: ['Life Jacket', 'Waterproof Bag'],
    isFavorite: true
  }
];

export const transfers: Transfer[] = [
  {
    id: '1',
    title: 'Phuket Airport to Hotel Transfer',
    location: 'Phuket',
    rating: 4.6,
    reviewCount: 35,
    price: 600,
    discountedPrice: 500,
    discount: 20,
    image: '/images/airport-transfer.jpg',
    category: 'transfer',
    vehicle: 'Van',
    distance: '30 km',
    duration: '45 min',
    isFavorite: false
  },
  {
    id: '2',
    title: 'Bangkok Hotel to Ayutthaya Day Trip',
    location: 'Bangkok',
    rating: 4.4,
    reviewCount: 28,
    price: 1200,
    discountedPrice: 1000,
    discount: 20,
    image: '/images/ayutthaya-transfer.jpg',
    category: 'transfer',
    vehicle: 'Car',
    distance: '80 km',
    duration: '1.5 hours',
    isFavorite: true
  }
];

export const allProducts: Product[] = [...tours, ...tickets, ...rentals, ...transfers];

export const themes = ['Island Tour', 'Land tour', 'Safari'];
export const activities = ['Swimming', 'Running', 'Elephant care', 'Snorkelling'];
export const vehicles = ['Yacht', 'Speedboat', 'Safari', 'Catamaran', 'Speedcatamaran'];
export const features = ['Transfer', 'Halal Food', 'Vegetarian food']; 