import { useCart } from '../hooks/useCart'

export default function CartItem({
  id,
  href,
  thumbnail,
  title,
  price,
  quantity,
  addToCart,
}) {
  const { handleRemoveFromCart } = useCart()

  return (
    <div href={href} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-28 object-cover object-center"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
      <div className="flex items-center justify-between">
        <div className="flex-initial w-fit">
          <span>Qty: {quantity}</span>
        </div>
        <div className="flex-initial w-fit">
          <button
            onClick={() => handleRemoveFromCart(id)}
            className="w-fit bg-red-500 p-1 px-3 rounded-lg text-white mr-3"
          >
            -
          </button>
          <button
            onClick={addToCart}
            className="w-fit bg-blue-500 p-1 px-3 rounded-lg text-white"
          >
            +
          </button>
        </div>
      </div>
      <hr className="mt-10" />
    </div>
  )
}
