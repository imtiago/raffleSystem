import { faker } from '@faker-js/faker';
import { IProduct } from '../utils/interfaces';

const products: IProduct[] = [
  {
    id: faker.datatype.uuid(),
    name: 'Nike Air Force 1 NDESTRUKT',
    details: 'Nike Air Force 1 NDESTRUKT',
    link: 'https://www.google.com/',
    price: 500,
    isNew: true,
    images: [`/static/mock-images/products/product_3.jpg`],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Pix',
    details: 'Pix',
    link: 'https://www.google.com/',
    price: 5200,
    isNew: true,
    images: [`/static/mock-images/products/product_5.jpg`],
  },
];

export default products;
