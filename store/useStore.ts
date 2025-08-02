import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

interface StoreState {
  search: string
  category: string
  selectedProductId: number | null
  localProducts: Product[]
  setSearch: (search: string) => void
  setCategory: (category: string) => void
  setSelectedProductId: (id: number | null) => void
  addLocalProduct: (product: Product) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      search: '',
      category: '',
      selectedProductId: null,
      localProducts: [],
      setSearch: (search) => set({ search }),
      setCategory: (category) => set({ category }),
      setSelectedProductId: (id) => set({ selectedProductId: id }),
      addLocalProduct: (product) =>
        set((state) => ({
          localProducts: [product, ...state.localProducts],
        })),
    }),
    {
      name: 'pixelmind-products', // key for localStorage
      partialize: (state) => ({ localProducts: state.localProducts }), // persist only this
    }
  )
)
