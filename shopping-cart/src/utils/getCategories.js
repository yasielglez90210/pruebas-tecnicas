import { products } from '../mocks/products.json'

export const categories = [
  'all',
  ...new Set(products.map((product) => product.category)),
]
