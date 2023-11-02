import { Fragment, useState } from 'react'
import Products from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import CategoryFilter from './components/CategoryFilter'
import { categories } from './utils/getCategories'
import PriceFilter from './components/PriceFilter'

function App() {
  const [products] = useState(initialProducts)
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
  })

  const handleSetFiltersCategory = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category,
    }))
  }

  const handleSetFiltersMinPrice = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: parseInt(event.target.value),
    }))
  }

  const filterProducts = (products) => {
    return products.filter((product) => {
      const { category, minPrice } = filters
      const hasCategory = category === 'all' || product.category === category
      const hasMinPrice = product.price >= minPrice

      return hasCategory && hasMinPrice
    })
  }

  const filteredProducts = filterProducts(products)

  return (
    <Fragment>
      <h1 className="text-3xl font-bold text-center mt-10 mb-10">
        Shopping Cart
      </h1>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mx-auto gap-6 px-4 sm:px-6 max-w-2xl">
        <PriceFilter
          selected={filters.minPrice}
          onChange={handleSetFiltersMinPrice}
        />

        <CategoryFilter
          categories={categories}
          selected={filters.category}
          onChange={handleSetFiltersCategory}
        />
      </div>
      <Products products={filteredProducts} />
    </Fragment>
  )
}

export default App
