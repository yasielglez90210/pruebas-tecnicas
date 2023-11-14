import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const originalUsers = useRef<User[]>([])
  // useRef --> para guardar un valor que queremos que se comparta
  // entre renderizados pero que al cambiar, no vuelva a renderizar
  // el componente

  const toggleColors = () => {
    setShowColors((prevState) => !prevState)
  }

  const toggleSortByCountry = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
  }

  const showOriginalUsers = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
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
    switch (sorting) {
      case SortBy.NAME:
        return filteredUsers.toSorted((a, b) =>
          a.name.first.localeCompare(b.name.first)
        )
      case SortBy.LAST:
        return filteredUsers.toSorted((a, b) =>
          a.name.last.localeCompare(b.name.last)
        )
      case SortBy.COUNTRY:
        return filteredUsers.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )

      default:
        return filteredUsers
    }

    // return sorting === SortBy.COUNTRY
    //   ? filteredUsers.toSorted((a, b) =>
    //       a.location.country.localeCompare(b.location.country)
    //     )
    //   : filteredUsers
  }, [filteredUsers, sorting])

  const handleCurrentPage = () => {
    setCurrentPage((prevState) => prevState + 1)
  }

  useEffect(() => {
    setLoading(true)

    fetch(
      `https://randomuser.me/api/?results=10&seed=yasiel&page=${currentPage}`
    )
      .then(async (res) => {
        if (!res.ok) throw new Error('Error en la petición')
        return await res.json()
      })
      .then((res) => {
        const { results } = res
        setUsers((prevUsers) => {
          const newUsers = prevUsers.concat(results)
          originalUsers.current = newUsers
          return newUsers
        })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

  return (
    <main>
      <h1>Listado de usuarios</h1>
      <div className="filters">
        <button onClick={toggleColors}>Colorea filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por país'
            : 'Ordenar por país'}
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
      {users.length > 0 && (
        <UsersList
          handleChangeSort={handleChangeSort}
          handleDelete={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      )}
      {loading && <strong>Cargando...</strong>}
      {!loading && users.length === 0 && <strong>No existen usuarios</strong>}
      {!loading && (
        <button onClick={handleCurrentPage}>Cargar más resultados</button>
      )}
    </main>
  )
}

export default App
