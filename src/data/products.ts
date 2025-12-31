export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  image: string;
  isNew?: boolean;
  description: string;
  benefits?: string[];
  usage?: string;
  ingredients?: string[];
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ashwagandha-gold',
    title: 'Ashwagandha Gold',
    price: 499,
    oldPrice: 599,
    image: '/images/product-placeholder.png',
    isNew: true,
    category: 'Vitamins',
    description: 'A premium Ayurvedic rejuvenating tonic that helps in stress management and supports vitality. Formulated with high-potency Ashwagandha root extract.',
    benefits: ['Reduces stress and anxiety', 'Improves sleep quality', 'Boosts energy levels', 'Supports immune system'],
    usage: 'Take 1 tablet twice a day with warm milk or water, or as directed by a physician.',
    ingredients: ['Ashwagandha Extract', 'Vidhara Root', 'Shatavari']
  },
  {
    id: 'brahmi-memory',
    title: 'Brahmi Memory',
    price: 349,
    oldPrice: 449,
    image: '/images/product-placeholder.png',
    category: 'Vitamins',
    description: 'Classic Ayurvedic herb for brain health. Brahmi is known to improve focus, concentration, and cognitive performance.',
    benefits: ['Enhances memory recall', 'Improves focus and attention', 'Calms the nervous system'],
    usage: '1-2 capsules daily after meals.',
    ingredients: ['Brahmi Extract', 'Gotu Kola']
  },
  {
    id: 'tulsi-drops',
    title: 'Tulsi Drops',
    price: 199,
    oldPrice: 249,
    image: '/images/product-placeholder.png',
    category: 'Immunity',
    description: 'Highly concentrated extracts of 5 types of Tulsi plants. A natural immunity booster for everyday wellness.',
    benefits: ['Natural immunity support', 'Relieves cough and cold', 'Aids respiratory health'],
    usage: 'Add 1-2 drops to a glass of water or tea.',
    ingredients: ['Rama Tulsi', 'Shyama Tulsi', 'Vana Tulsi', 'Arka Tulsi', 'Kapoor Tulsi']
  },
  {
    id: 'neem-purifier',
    title: 'Neem Purifier',
    price: 299,
    oldPrice: 399,
    image: '/images/product-placeholder.png',
    category: 'Personal Care',
    description: 'Potent blood purifier that helps in maintaining healthy and clear skin from within.',
    benefits: ['Purifies blood', 'Helps control acne and pimples', 'Anti-fungal and Anti-bacterial properties'],
    usage: '2 capsules twice a day after meals.',
    ingredients: ['Neem Leaf Extract', 'Neem Bark Extract']
  },
  {
    id: 'saffron-serum',
    title: 'Saffron Serum',
    price: 899,
    oldPrice: 1299,
    image: '/images/product-placeholder.png',
    category: 'Personal Care',
    description: 'An ancient Ayurvedic beauty formulation with real Saffron for a radiant and even skin tone.',
    benefits: ['Provides natural glow', 'Reduces dark spots', 'Hydrates and rejuvenates skin'],
    usage: 'Apply 2-3 drops on clean face and neck at night.',
    ingredients: ['Pure Saffron', 'Sandalwood Oil', 'Manjistha']
  },
];
