// ProductTypes.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Organic Coffee Beans',
    price: 24.99,
    description: 'Single-origin organic coffee beans, medium roast, 1lb bag',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
    category: 'Food',
  },
  {
    id: '3',
    name: 'Yoga Mat',
    price: 39.99,
    description: 'Non-slip eco-friendly yoga mat, 6mm thick, perfect for home workouts',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop',
    category: 'Fitness',
  },
  {
    id: '4',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Advanced fitness tracking, GPS, heart rate monitor, 7-day battery',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    category: 'Electronics',
  },
  {
    id: '5',
    name: 'Leather Wallet',
    price: 79.99,
    description: 'Handcrafted genuine leather bifold wallet with RFID protection',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop',
    category: 'Accessories',
  },
];
