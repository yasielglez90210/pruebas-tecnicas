import { type User } from '../types'

interface Props {
  users: User[]
  showColors: boolean
  handleDelete: (email: string) => void
}

export function UsersList({ users, showColors, handleDelete }: Props) {
  return (
    <table className={showColors ? 'table-odd-even' : ''}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
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
