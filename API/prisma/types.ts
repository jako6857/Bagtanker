export const fieldTypes: Record<string, Record<string, 'string' | 'number' | 'boolean' | 'date'>> = {
  user: {
    id: 'number',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: 'string',
    description: 'string',
    image: 'string',
    refreshToken: 'string',
    isActive: 'boolean'
  },
  category: {
    id: 'number',
    title: 'string',
    slug: 'string',
    description: 'string',
    isActive: 'boolean',
    createdAt: 'date',
    updatedAt: 'date'
  },
  product: {
    id: 'number',
    title: 'string',
    slug: 'string',
    description: 'string',
    imageUrl: 'string',
    durationInMinutes: 'number',
    amount: 'number',
    price: 'number',
    isActive: 'boolean',
    createdAt: 'date'
  },
  ingredient: {
    id: 'number',
    title: 'string'
  },
  unit: {
    id: 'number',
    name: 'string',
    abbreviation: 'string'
  },
  news: {
    id: 'number',
    title: 'string',
    slug: 'string',
    teaser: 'string',
    content: 'string',
    imageUrl: 'string',
    isActive: 'boolean',
    createdAt: 'date',
    updatedAt: 'date'
  },
  message: {
    id: 'number',
    name: 'string',
    email: 'string',
    message: 'string',
    createdAt: 'date'
  },
  newsletterSubscriber: {
    id: 'number',
    email: 'string',
    createdAt: 'date'
  },
  slide: {
    id: 'number',
    name: 'string',
    imageUrl: 'string',
    orderNum: 'number'
  },
  categoryProduct: {
    id: 'number',
    categoryId: 'number',
    productId: 'number'
  },
  productIngredient: {
    id: 'number',
    productId: 'number',
    ingredientId: 'number',
    unitId: 'number',
    amount: 'number',
    orderNum: 'number',
  },
  favorite: {
    id: 'number',
    productId: 'number',
    userId: 'number'
  },
  review: {
    id: 'number',
    title: 'string',
    comment: 'string',
    numStars: 'number',
    productId: 'number',
    userId: 'number',
    isActive: 'boolean',
    createdAt: 'date',
    updatedAt: 'date'
  }
};