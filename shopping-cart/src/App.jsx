import { Fragment, useState } from 'react'
import Products from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import CategoryFilter from './components/CategoryFilter'
import PriceFilter from './components/PriceFilter'
import { useFilters } from './hooks/useFilters'

function App() {
  const [products] = useState(initialProducts)
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <Fragment>
      <h1 className="text-3xl font-bold text-center mt-10 mb-10">
        Shopping Cart
      </h1>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mx-auto gap-6 px-4 sm:px-6 max-w-2xl">
        <PriceFilter />
        <CategoryFilter />
      </div>
      <Products products={filteredProducts} />
    </Fragment>
  )
}

export default App
