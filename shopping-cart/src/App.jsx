import { useState } from 'react'
import Products from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import CategoryFilter from './components/CategoryFilter'
import PriceFilter from './components/PriceFilter'
import { useFilters } from './hooks/useFilters'
import Headers from './components/Header'
import { CartProvider } from './context/cart'

function App() {
  const [products] = useState(initialProducts)
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Headers />
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mx-auto gap-6 px-4 sm:px-6 max-w-2xl">
        <PriceFilter />
        <CategoryFilter />
      </div>
      <Products products={filteredProducts} />
    </CartProvider>
  )
}

export default App
