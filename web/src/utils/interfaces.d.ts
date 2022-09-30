export interface IImage {
  id: string;
  url: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  isNew: boolean;
  link?: string;
  details: string;
  images: IImage[];
}

export interface IRaffle {
  id: string;
  price: number;
  status: string;
  completionDate: string;
  numbersAvailable: number;
  products: IProduct[];
}
