import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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

export interface ProductSelected {
    id: number
    quantity: number
}

type ProductStore = {
    products: Product[]
    setProducts: (products: Product[]) => void

    productsSelected: ProductSelected[]
    addProductToCart: (product: Product) => void
    updateQuantityProductSelected: (productId: number, quantity: number) => void
}

const useProductsStore = create<ProductStore>()(persist(
    (set) => ({
        products: [],
        setProducts: (products) => set(() => ({ products })),

        productsSelected: [],
        addProductToCart: (product) => set((state) => {
            const newList = [...state.productsSelected]
            const indexItem = newList.findIndex(p => p.id === product.id)
            if (indexItem >= 0) {
                newList[indexItem].quantity += 1
            } else {
                newList.push({ id: product.id, quantity: 1 })
            }
            return {
                ...state,
                productsSelected: newList,
            }
        }),
        updateQuantityProductSelected: (productId, quantity) => set((state) => {
            const newList = [...state.productsSelected]
            const indexItem = newList.findIndex(p => p.id === productId)
            if (quantity <= 0)
                newList.splice(indexItem, 1)
            else
                newList[indexItem].quantity = quantity
            return {
                ...state,
                productsSelected: newList,
            }
        })
    }),
    {
        name: 'product-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => AsyncStorage), 
    }
))
export default useProductsStore