import { create } from 'zustand'

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

type ProductStore = {
    products: Product[]
    setProducts: (products: Product[]) => void
}

const useProductsStore = create<ProductStore>()((set) => ({
    products: [],
    setProducts: (products) => set(() => ({ products })),
}))

export default useProductsStore