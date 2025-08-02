// hooks/useProduct.ts
// For fetching a single product
import { useQuery } from '@tanstack/react-query';

// Define the Product interface here if you don't have a shared types file
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface UseProductProps {
  id: number | null; // ID can be null if not available yet
}

export const useProduct = ({ id }: UseProductProps) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id], // Unique query key including the ID
    queryFn: async () => {
      if (!id) {
        // This case should ideally be handled by `enabled: !!id` but good for type safety
        throw new Error('Product ID is required.');
      }
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) {
        // Throw an error with the actual status and message for better debugging
        const errorText = await res.text();
        throw new Error(`Failed to fetch product with ID ${id}: ${res.status} - ${errorText}`);
      }
      return res.json();
    },
    enabled: !!id, // Only run the query if 'id' is a truthy value (not null or 0)
    // Add other react-query options like staleTime, cacheTime if needed
  });
};