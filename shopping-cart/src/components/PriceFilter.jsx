export default function PriceFilter({ selected, onChange: setSelected }) {
  return (
    <div className="w-full md:w-1/2">
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Price: {selected !== 0 ? `$${selected}` : selected}
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          onChange={setSelected}
          type="range"
          name="price"
          id="price"
          min={0}
          max={2000}
          className="block w-full rounded-md py-2.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="0"
        />
      </div>
    </div>
  )
}
