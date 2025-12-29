'use client'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/cartContext'
import { addToCartAction } from '@/app/(pages)/_actions/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToWishlist } from '@/Helpers/favourite'


export default function AddToCart({productId}:{productId:string}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isWishlistLoading, setIsWishlistLoading] = useState(false)
    const {cartData , setCartData} =  useContext(CartContext)
    const session = useSession()
    const router = useRouter()
    
    async function addToCart(){
        if(session.status === 'authenticated'){
          setIsLoading(true)
          const data = await addToCartAction(productId)
          console.log(data);
          if(data.status==="success"){
              toast.success("Product added to cart")
              setCartData(data)
          }
          setIsLoading(false)
        }else{
          router.push('/login')
        }
    }

  
   
  return (
    <div className="flex items-center gap-2 w-full">
      <Button 
        className="grow h-11 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 cursor-pointer" 
        loading={isLoading} 
        onClick={addToCart}
      >
        <ShoppingCartIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Add to Cart</span>
      </Button>
      
    </div>
  )
}
