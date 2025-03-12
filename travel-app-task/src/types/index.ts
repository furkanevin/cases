export interface Tour {
    id: string;
    title: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: number;
    discountedPrice?: number;
    discount?: number;
    image: string;
    category: 'tour';
    theme?: string[];
    activities?: string[];
    startTime?: string;
    groupSize?: number;
    vehicle?: string;
    features?: string[];
    isFavorite?: boolean;
  }
  
  export interface Ticket {
    id: string;
    title: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: number;
    discountedPrice?: number;
    discount?: number;
    image: string;
    category: 'ticket';
    date?: string;
    type?: string;
    isFavorite?: boolean;
  }
  
  export interface Rent {
    id: string;
    title: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: number;
    discountedPrice?: number;
    discount?: number;
    image: string;
    category: 'rent';
    type?: string;
    duration?: string;
    features?: string[];
    isFavorite?: boolean;
  }
  
  export interface Transfer {
    id: string;
    title: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: number;
    discountedPrice?: number;
    discount?: number;
    image: string;
    category: 'transfer';
    vehicle?: string;
    distance?: string;
    duration?: string;
    isFavorite?: boolean;
  }
  
  export type Product = Tour | Ticket | Rent | Transfer;