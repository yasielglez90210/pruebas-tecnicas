import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  handleDelete: (email: string) => void
  handleChangeSort: (sort: SortBy) => void
}

export function UsersList({
  users,
  showColors,
  handleDelete,
  handleChangeSort,
}: Props) {
  return (
    <table className={showColors ? 'table-odd-even' : ''}>
      <thead>
        <tr>
          <th>Foto</th>
          <th
            onClick={() => {
              handleChangeSort(SortBy.NAME)
            }}
          >
            Nombre
          </th>
          <th
            onClick={() => {
              handleChangeSort(SortBy.LAST)
            }}
          >
            Apellido
          </th>
          <th
            onClick={() => {
              handleChangeSort(SortBy.COUNTRY)
            }}
          >
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 && (
          <tr>
            <td style={{ display: 'table-cell', padding: '20px' }} colSpan={5}>
              No existen usuarios
            </td>
          </tr>
        )}

        {users.map((user) => {
          return (
            <tr key={user.email}>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`Imagen del usuario ${user.email}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(user.email)
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
