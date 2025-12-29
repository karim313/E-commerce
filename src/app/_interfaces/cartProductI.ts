import { ProductI } from "./productI"

export interface CartProductI {
  status: string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  cartOwner: string
  products: Item[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface Item {
  count: number
  _id: string
  product: ProductI
  price: number
}

