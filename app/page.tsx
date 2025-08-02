'use client'

import AddProductForm from '@/components/AddProductForm'
import CategoryFilter from '@/components/CategoryFilter'
import ProductModal from '@/components/ProductModal'
import SearchBar from '@/components/SearchBar'
import { useProductsList } from '@/hooks/useProductsList'
import { useStore } from '@/store/useStore'

export default function Home() {
  const { data, isLoading, isError } = useProductsList()
  const { search, category, setSelectedProductId } = useStore()

  if (isLoading) return <p className="text-center mt-10">Loading products...</p>
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load products</p>

  const filtered = data
    .filter((product: any) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product: any) =>
      category ? product.category === category : true
    )

  return (
    <main className="p-4 max-w-6xl mx-auto bg-gray-100 min-h-screen">

      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold rounded-md mb-6 shadow-lg">
        🧠 PixelMind E-Commerce
      </header>

      {/* Add Form */}
      <AddProductForm />

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-white p-4 rounded-md shadow border border-blue-100">
          <SearchBar />
        </div>
        <div className="flex-1 bg-white p-4 rounded-md shadow border border-blue-100">
          <CategoryFilter />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product: any) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer bg-white hover:bg-blue-100 transition"
            onClick={() => setSelectedProductId(product.id)}
          >
            {/* Image and Content Block */}
            <div className="border border-blue-100 p-4 flex flex-col items-center justify-center text-center bg-blue-50 rounded-md">
              <img
                src={product.image}
                alt={product.title}
                className="h-[100px] max-w-[200px] object-contain mb-4"
              />
              <h2 className="text-lg font-semibold text-blue-900 mb-1">{product.title}</h2>
              <p className="text-green-600 font-bold">₹ {product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      <ProductModal />
    </main>
  )
}
