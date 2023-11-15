import { fetchUsers } from '../services/users'
import { type User } from '../types.d'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function useUsers() {
  const { isLoading, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      nextPage: number | undefined
      users: User[]
    }>({
      queryKey: ['users'],
      queryFn: async ({ pageParam }) => {
        const res = await fetchUsers(Number(pageParam))
        return res
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      getPreviousPageParam: (firstPage) => firstPage ?? undefined,
      // para que no ejecute el fetching de datos cuando vuelva a focus nuestra página
      refetchOnWindowFocus: false,
      // refetchOnWindowFocus === true, logramos mantener
      // nuestros datos por 5 min sin hacer fetching
      staleTime: 1000 * 60 * 5,
      // repetir la petición 3 veces en caso de error
      retry: 3,
      // tiempo de espera para repetir la petición
      retryDelay: 200,
    })

  return {
    users: data?.pages.flatMap((page) => page.users) ?? [],
    isLoading,
    hasNextPage,
    refetch,
    fetchNextPage,
  }
}
