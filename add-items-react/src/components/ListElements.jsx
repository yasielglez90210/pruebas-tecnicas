// eslint-disable-next-line react/prop-types
export const ListElements = ({ items = [], handleClick }) => {
  return items.length === 0 ? (
    <p>No hay elementos en la lista</p>
  ) : (
    <ul>
      {items.map(({ id, title }) => (
        <li key={id} onClick={handleClick(id)}>
          {title}
        </li>
      ))}
    </ul>
  )
}
