import './App.css'
import { UsersList } from './components/UsersList'
import useUsers from './hooks/useUsers'
import { SortBy, type queryData } from './types.d'
import { useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

function App() {
  const { users, isLoading, hasNextPage, refetch, fetchNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const filterCountryFef = useRef<HTMLInputElement | null>(null)

  const queryClient = useQueryClient()

  const toggleColors = () => {
    setShowColors((prevState) => !prevState)
  }

  const toggleSortByCountry = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
  }

  const resetState = () => {
    setFilterCountry('')
    if (filterCountryFef.current) {
      filterCountryFef.current.value = ''
    }
    refetch()
  }

  const handleNextPage = () => {
    setFilterCountry('')
    if (filterCountryFef.current) {
      filterCountryFef.current.value = ''
    }
    fetchNextPage()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== email
    })

    queryClient.setQueryData(['users'], (oldData: queryData) => {
      const newData = {
        ...oldData,
        pages: [
          {
            nextPage: oldData.pages[0].nextPage,
            users: filteredUsers,
          },
        ],
      }
      return newData
    })
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
  }, [filteredUsers, sorting])

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
        <button onClick={resetState}>Resetear estado</button>
        <input
          ref={filterCountryFef}
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
      {isLoading && <strong>Cargando...</strong>}
      {!isLoading && users.length === 0 && <strong>No existen usuarios</strong>}
      {!isLoading && hasNextPage && (
        <button onClick={handleNextPage}>Cargar más resultados</button>
      )}
      {!isLoading && !hasNextPage && <strong>No hay más resultados</strong>}
    </main>
  )
}

export default App
