'use client'
import { useStore } from '@/store/useStore'

export default function SearchBar() {
  const { search, setSearch } = useStore()

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search products..."
      className="border p-2 rounded w-full md:w-1/2"
    />
  )
}

