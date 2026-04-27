// types/index.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  price: number;
  rating: number;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
}