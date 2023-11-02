import { useId } from 'react'
import { useFilters } from '../hooks/useFilters'

export default function PriceFilter() {
  const priceId = useId()
  const { filters, handleSetFiltersMinPrice } = useFilters()

  return (
    <div className="w-full md:w-1/2">
      <label
        htmlFor={priceId}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Price:{' '}
        {filters.minPrice !== 0 ? `$${filters.minPrice}` : filters.minPrice}
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          onChange={handleSetFiltersMinPrice}
          type="range"
          name={priceId}
          id="price"
          min={0}
          max={2000}
          value={filters.minPrice}
          className="block w-full rounded-md py-2.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="0"
        />
      </div>
    </div>
  )
}
