function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductItem({
  id,
  href,
  thumbnail,
  title,
  price,
  quantityProductInCart,
  handleAddToCart,
  handleRemoveFromCart,
}) {
  return (
    <div key={id} href={href} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900 flex justify-between">
        ${price}
        {quantityProductInCart > 0 && (
          <small className="font-normal">Qty: {quantityProductInCart}</small>
        )}
      </p>
      <div className="flex items-center justify-between gap-4">
        {quantityProductInCart > 0 && (
          <button
            onClick={handleRemoveFromCart}
            className="mt-2 p-1 rounded-lg text-white bg-red-500 w-1/2"
          >
            Remove -
          </button>
        )}
        <button
          onClick={handleAddToCart}
          className={classNames(
            quantityProductInCart === 0 ? 'w-full' : 'w-1/2',
            'mt-2 p-1 rounded-lg text-white bg-blue-500'
          )}
        >
          Add +
        </button>
      </div>
    </div>
  )
}
