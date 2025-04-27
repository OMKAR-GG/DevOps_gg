import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and exceptional sound quality.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Audio',
    rating: 4.8,
    stock: 15,
    featured: true
  },
  {
    id: '2',
    name: 'Smartwatch',
    description: 'Advanced fitness and health tracking with a beautiful OLED display and 7-day battery life.',
    price: 249.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Wearables',
    rating: 4.6,
    stock: 8,
    featured: true
  },
  {
    id: '3',
    name: 'Smartphone',
    description: 'Flagship smartphone with 6.7-inch AMOLED display, 5G connectivity, and professional-grade camera system.',
    price: 999.99,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Phones',
    rating: 4.9,
    stock: 5,
    featured: true
  },
  {
    id: '4',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation and immersive sound experience.',
    price: 179.99,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Audio',
    rating: 4.7,
    stock: 12
  },
  {
    id: '5',
    name: 'Tablet',
    description: '10.9-inch tablet with powerful processor, ideal for work and entertainment on the go.',
    price: 449.99,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Tablets',
    rating: 4.5,
    stock: 7
  },
  {
    id: '6',
    name: 'Smart Speaker',
    description: 'Voice-controlled smart speaker with premium sound and smart home integration.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/10571000/pexels-photo-10571000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Smart Home',
    rating: 4.4,
    stock: 20
  },
  {
    id: '7',
    name: 'Laptop',
    description: 'Ultra-thin, powerful laptop with 14-inch display, 16GB RAM, and 512GB SSD storage.',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Computers',
    rating: 4.8,
    stock: 3
  },
  {
    id: '8',
    name: 'Digital Camera',
    description: 'Professional mirrorless camera with 24MP sensor and 4K video recording capabilities.',
    price: 899.99,
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Cameras',
    rating: 4.6,
    stock: 4
  }
];

export const categories = [...new Set(products.map(product => product.category))];