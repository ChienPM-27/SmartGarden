// NewsTypes.ts
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category: string;
}

export const mockLatestNews: NewsItem[] = [
  {
    id: '1',
    title: 'Revolutionary Smart Irrigation System Reduces Water Usage by 40%',
    description: 'New AI-powered irrigation technology helps gardeners optimize water consumption while maintaining healthy plants.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop',
    source: 'Garden Tech Today',
    publishedAt: '2024-01-15',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Best Indoor Plants for Air Purification in 2024',
    description: 'Discover the top 10 houseplants that can dramatically improve your indoor air quality.',
    imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=200&fit=crop',
    source: 'Home & Garden',
    publishedAt: '2024-01-14',
    category: 'Health',
  },
  {
    id: '3',
    title: 'Sustainable Gardening Practices Gain Popularity',
    description: 'More gardeners are adopting eco-friendly methods to create sustainable home gardens.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop',
    source: 'Eco Living',
    publishedAt: '2024-01-13',
    category: 'Environment',
  },
];

export const mockRecommendedNews: NewsItem[] = [
  {
    id: '4',
    title: 'How to Create a Vertical Garden in Small Spaces',
    description: 'Maximize your growing space with these creative vertical gardening techniques perfect for apartments and small homes.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=80&fit=crop',
    source: 'Urban Garden',
    publishedAt: '2024-01-12',
    category: 'Tips',
  },
  {
    id: '5',
    title: 'Common Plant Diseases and How to Prevent Them',
    description: 'Learn to identify and treat the most common plant diseases before they damage your garden.',
    imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=120&h=80&fit=crop',
    source: 'Plant Health Weekly',
    publishedAt: '2024-01-11',
    category: 'Health',
  },
  {
    id: '6',
    title: 'Seasonal Plant Care: Winter Preparation Guide',
    description: 'Essential tips for protecting your plants during the winter months and ensuring spring growth.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=80&fit=crop',
    source: 'Seasonal Garden',
    publishedAt: '2024-01-10',
    category: 'Seasonal',
  },
  {
    id: '7',
    title: 'Smart Garden Sensors: Worth the Investment?',
    description: 'A comprehensive review of popular garden monitoring devices and their effectiveness.',
    imageUrl: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=120&h=80&fit=crop',
    source: 'Tech Garden Review',
    publishedAt: '2024-01-09',
    category: 'Technology',
  },
  {
    id: '8',
    title: 'Organic Fertilizers vs Chemical: Which is Better?',
    description: 'Compare the benefits and drawbacks of organic and chemical fertilizers for your garden.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=80&fit=crop',
    source: 'Garden Science',
    publishedAt: '2024-01-08',
    category: 'Science',
  },
];
