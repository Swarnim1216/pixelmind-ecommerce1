import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Must be a valid URL'),
})

export type ProductForm = z.infer<typeof productSchema>
