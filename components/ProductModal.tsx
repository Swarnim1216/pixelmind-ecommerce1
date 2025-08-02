'use client'

import { useProduct } from '../hooks/useProduct'  // make sure file is named useProduct.ts (singular)
import { useStore } from '../store/useStore'

export default function ProductModal() {
  const { selectedProductId, setSelectedProductId } = useStore()
  const { data, isLoading, isError, error } = useProduct({ id: selectedProductId })

  if (!selectedProductId) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-xl relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductId(null)}
          className="absolute top-2 right-3 text-2xl font-bold hover:text-red-500 focus:outline-none"
        >
          ✖
        </button>

        {/* Loading State */}
        {isLoading && (
          <p className="text-center p-8">Loading product details...</p>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center p-8 text-red-600">
            <p>Error loading product: {error?.message || 'Unknown error'}</p>
            <button
              onClick={() => setSelectedProductId(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        )}

        {/* No data fallback */}
        {!isLoading && !isError && !data && (
          <div className="text-center p-8 text-gray-600">
            <p>Product not found.</p>
            <button
              onClick={() => setSelectedProductId(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        )}

        {/* Product Details */}
        {data && (
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={data.image}
              alt={data.title}
              className="h-40 md:h-52 object-contain mx-auto flex-shrink-0 rounded shadow"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.title}</h2>
              <p className="text-gray-700 mb-3">{data.description}</p>
              <p className="text-xl font-bold text-green-600">₹ {data.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">Category: {data.category}</p>
              {data.rating && (
                <p className="text-sm text-gray-500 mt-1">
                  Rating: {data.rating.rate} ({data.rating.count} reviews)
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
