import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersList } from './components/UsersList'

const ENDPOINT_URL = 'https://randomuser.me/api/?results=100'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])
  // useRef --> para guardar un valor que queremos que se comparta
  // entre renderizados pero que al cambiar, no vuelva a renderizar
  // el componente

  const toggleColors = () => {
    setShowColors((prevState) => !prevState)
  }

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState)
  }

  const showOriginalUsers = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== email
    })

    setUsers(filteredUsers)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry?.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry?.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  // users.sort((a, b) => {} --> Esta opción no funciona porque cambia el objeto original
  // structuredClone(users).sort((a, b) => {} --> Esta opción funciona porque hace una copia y es la que ordenamos
  // [...users].sort((a, b) => {} --> Esta opción funciona porque hace una copia y es la que ordenamos
  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? filteredUsers.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers
  }, [filteredUsers, sortByCountry])

  useEffect(() => {
    fetch(ENDPOINT_URL)
      .then(async (res) => await res.json())
      .then((res) => {
        const { results } = res
        setUsers(results)
        originalUsers.current = results
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <main>
      <h1>Listado de usuarios</h1>
      <div className="filters">
        <button onClick={toggleColors}>Colorea filas</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={showOriginalUsers}>Resetear estado</button>
        <input
          onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
          type="text"
          placeholder="Filtrar por país"
        />
      </div>
      <UsersList
        handleDelete={handleDelete}
        showColors={showColors}
        users={sortedUsers}
      />
    </main>
  )
}

export default App
