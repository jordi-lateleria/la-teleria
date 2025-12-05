'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { DbProduct, DbProductVariant } from '@/types/database'

export interface CartItem {
  productId: string
  productName: string
  productSlug: string
  productImage: string | null
  price: number
  quantity: number
  selectedVariants: Record<string, string>
  variantId?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: DbProduct, quantity: number, selectedVariants: Record<string, string>) => void
  removeFromCart: (productId: string, selectedVariants?: Record<string, string>) => void
  updateQuantity: (productId: string, quantity: number, selectedVariants?: Record<string, string>) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'lateleria-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addToCart = (product: DbProduct, quantity: number, selectedVariants: Record<string, string>) => {
    setItems(prevItems => {
      const variantKey = Object.entries(selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('|')
      const existingIndex = prevItems.findIndex(
        item => item.productId === product.id &&
        Object.entries(item.selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('|') === variantKey
      )

      // Calculate price based on selected variant if applicable
      let price = product.salePrice || product.price
      if (product.variants && Object.keys(selectedVariants).length > 0) {
        const matchingVariant = product.variants.find(v =>
          selectedVariants[v.name] === v.value && v.price !== null
        )
        if (matchingVariant && matchingVariant.price !== null) {
          price = matchingVariant.price
        }
      }

      if (existingIndex > -1) {
        const newItems = [...prevItems]
        newItems[existingIndex].quantity += quantity
        return newItems
      }

      return [...prevItems, {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.images?.[0]?.url || null,
        price,
        quantity,
        selectedVariants,
      }]
    })
  }

  const removeFromCart = (productId: string, selectedVariants?: Record<string, string>) => {
    setItems(prevItems => {
      const variantKey = selectedVariants
        ? Object.entries(selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('|')
        : ''
      return prevItems.filter(item => {
        const itemVariantKey = Object.entries(item.selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('|')
        return !(item.productId === productId && itemVariantKey === variantKey)
      })
    })
  }

  const updateQuantity = (productId: string, quantity: number, selectedVariants?: Record<string, string>) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariants)
      return
    }

    setItems(prevItems => {
      const variantKey = selectedVariants
        ? Object.entries(selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('|')
        : ''
      return prevItems.map(item => {
        const itemVariantKey = Object.entries(item.selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('|')
        if (item.productId === productId && itemVariantKey === variantKey) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
