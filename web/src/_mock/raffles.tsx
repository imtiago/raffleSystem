import { faker } from '@faker-js/faker';
import { IRaffle } from '../components/cards/RaffleCard';

const raffles: IRaffle[] = [
  {
    id: faker.datatype.uuid(),
    numbersAvailable: 10,
    price: 10,
    completionDate: '30/11/2022',
    products: [
      {
        id: faker.datatype.uuid(),
        name: 'Iphone 12',
        price: 8000,
        isNew: true,
        details: 'Iphone 12 preto',
        images: [
          {
            id: faker.datatype.uuid(),
            name: 'Iphone 13',
            url: 'https://img.freepik.com/premium-photo/all-screen-blank-smartphone-mockup-isolated-black-3d-render_118047-1785.jpg?w=740',
          },
          {
            id: faker.datatype.uuid(),
            name: 'Iphone 13',
            url: 'https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147849866.jpg?w=826&t=st=1663814284~exp=1663814884~hmac=9fe6bcbc25a9e2c0b1ddaef36056acdf8cf8aa0cecc6abc78043a8ba8584a735',
          },
          {
            id: faker.datatype.uuid(),
            name: 'Iphone 13',
            url: 'https://img.freepik.com/free-vector/smartphone-with-gradient-wallpaper_23-2147843160.jpg?w=826&t=st=1663814318~exp=1663814918~hmac=11a5d14aa9d1a16c37f7b80d58e1b390bde3ecfb75cf173a9569974c446d620d',
          },
        ],
      },
    ],
  },
  // {
  //   id: faker.datatype.uuid(),
  //   price: 20,
  //   numbersAvailable: 80,
  //   completionDate: '30/11/2022',
  //   products: [
  //     {
  //       id: faker.datatype.uuid(),
  //       name: 'moto',
  //       price: 18000,
  //       isNew: true,
  //       details: 'Uma motoca Top',
  //       images: [
  //         {
  //           id: faker.datatype.uuid(),
  //           name: 'Iphone 13',
  //           url: 'https://img.freepik.com/premium-psd/isolated-black-sport-bike-from-left-front-view_16145-349.jpg?w=1380',
  //         },
  //         {
  //           id: faker.datatype.uuid(),
  //           name: 'Iphone 13',
  //           url: 'https://img.freepik.com/free-vector/red-color-motorcycle-isolated-white-background_1284-38725.jpg?w=996&t=st=1663814401~exp=1663815001~hmac=a9af4be83cf0d2abb120e45b2e0f34ff755dfc910141d710b2a087660c65bb92',
  //         },
  //         {
  //           id: faker.datatype.uuid(),
  //           name: 'Iphone 13',
  //           url: 'https://img.freepik.com/premium-psd/isolated-white-sport-bike-from-left-front-view_16145-365.jpg?w=1380',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   price: 50,
  //   numbersAvailable: 50,
  //   completionDate: '30/11/2022',
  //   products: [
  //     {
  //       id: faker.datatype.uuid(),
  //       name: 'carro',
  //       price: 40000,
  //       isNew: false,
  //       details: 'honda Civic',
  //       images: [
  //         {
  //           id: faker.datatype.uuid(),
  //           name: 'Iphone 13',
  //           url: 'https://img.freepik.com/premium-photo/compact-sports-car-family-sedan-3d-illustration_101266-13581.jpg?w=1480',
  //         },
  //         {
  //           id: faker.datatype.uuid(),
  //           name: 'Iphone 13',
  //           url: 'https://img.freepik.com/premium-photo/blue-family-innovative-electric-suv-car-white-background-3d-rendering_101266-26688.jpg?w=1480',
  //         },
  //       ],
  //     },
  //   ],
  // }
];

export default raffles;
