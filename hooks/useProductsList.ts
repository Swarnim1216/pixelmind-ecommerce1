import { useQuery } from '@tanstack/react-query'
import { useStore } from '@/store/useStore'

export const useProductsList = () => {
  const localProducts = useStore((state) => state.localProducts)

  const { data: remoteProducts = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://fakestoreapi.com/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      return res.json()
    },
  })

  // Merge local products (added by user) with remote
  const mergedProducts = [...localProducts, ...remoteProducts]

  return {
    data: mergedProducts,
    isLoading,
    isError,
  }
}
