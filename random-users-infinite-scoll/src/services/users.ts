export const fetchUsers = async (pageParam: number) => {
  return await fetch(
    `https://randomuser.me/api/?results=20&seed=yasiel&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then((res) => {
      const currentPage = Number(res.info.page)
      const nextPage = currentPage > 3 ? undefined : currentPage + 1
      return {
        users: res.results,
        nextPage,
      }
    })
}
