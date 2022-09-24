export interface IProduct {
  id: string;
  name: string;
  price: number;
  isNew: boolean;
  link?: string;
  details: string;
  images: string[];
}