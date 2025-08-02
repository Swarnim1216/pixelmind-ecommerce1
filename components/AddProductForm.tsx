'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, ProductForm } from '@/lib/schema'
import { useStore } from '@/store/useStore'

export default function AddProductForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductForm>({
    resolver: zodResolver(productSchema)
  })

  const { addLocalProduct } = useStore()

  const onSubmit = (data: ProductForm) => {
    const newProduct = {
      ...data,
      id: Date.now(),
    }
    addLocalProduct(newProduct)
    alert('✅ Product added locally!')
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto mb-12"
    >
      <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-700 flex items-center justify-center gap-2">
        <span>🛒</span> Add New Product
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <input
            type="text"
            {...register('title')}
            placeholder="Product Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            {...register('description')}
            placeholder="Product Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
          <input
            type="number"
            step="0.01"
            {...register('price')}
            placeholder="e.g. 499.99"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <input
            type="text"
            {...register('category')}
            placeholder="e.g. electronics, fashion"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            {...register('image')}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition duration-200"
          >
            ➕ Add Product
          </button>
        </div>
      </div>
    </form>
  )
}
