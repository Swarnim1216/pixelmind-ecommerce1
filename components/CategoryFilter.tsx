'use client'
import { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'

export default function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([])
  const { category, setCategory } = useStore()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(setCategories)
  }, [])

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="border p-2 rounded w-full md:w-1/2"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  )
}
