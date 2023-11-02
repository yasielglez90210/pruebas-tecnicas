import { useContext } from 'react'
import { FiltersContext } from '../context/filters'

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      const { category, minPrice } = filters
      const hasCategory = category === 'all' || product.category === category
      const hasMinPrice = product.price >= minPrice

      return hasCategory && hasMinPrice
    })
  }

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

  return {
    filters,
    filterProducts,
    handleSetFiltersCategory,
    handleSetFiltersMinPrice,
  }
}
