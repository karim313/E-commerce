'use client'
import React, { useContext, useRef, useState, useEffect } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { getAddresses, addAddress } from '@/Helpers/address'
import { AddressI } from '@/app/_interfaces/addressI'
import { useRouter } from 'next/navigation'
import { clearCart } from '@/Helpers/clearCart'
import { CartContext } from '../context/cartContext'

export default function CheckOut({ cartId }: { cartId: string }) {
  const { data: session } = useSession();
  const token = session?.token;

  const [open, setOpen] = useState(false);
  const [loadingCashOrder, setLoadingCashOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<AddressI[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("new");

  const detailsInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { setCartData } = useContext(CartContext)

  useEffect(() => {
    if (token && open) {
      fetchAddresses();
    }
  }, [token, open]);

  const fetchAddresses = async () => {
    if (!token) return;
    const res = await getAddresses(token);
    if (res.status === "success") {
      setAddresses(res.data);
    }
  };

  const getShippingAddress = async () => {
    if (selectedAddressId !== "new") {
      const selected = addresses.find(addr => addr._id === selectedAddressId);
      if (selected) {
        return {
          details: selected.details,
          phone: selected.phone,
          city: selected.city
        };
      }
    }

    const newAddress = {
      details: detailsInput.current?.value || "",
      phone: phoneInput.current?.value || "",
      city: cityInput.current?.value || "",
      name: `Address ${new Date().toLocaleDateString()}`
    };

    // Save the new address if it's new
    if (token) {
      await addAddress(newAddress, token);
    }

    return newAddress;
  }

  async function createCashOrder() {
    if (!token) {
      toast.error("No token found");
      return;
    }
    setLoadingCashOrder(true);
    const shippingAddress = await getShippingAddress();

    try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/orders/' + cartId, {
        method: "POST",
        body: JSON.stringify(shippingAddress),
        headers: {
          token: token,
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      if (data.status === 'success') {
        toast.success("Order created successfully");
        clearCart(token!, setCartData);
        router.push('/allorders');
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create order");
    } finally {
      setLoadingCashOrder(false);
    }
  }

  async function checkOutSession() {
    if (!token) {
      toast.error("No token found");
      return;
    }

    setLoading(true);
    const shippingAddress = await getShippingAddress();

    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`, {
        method: "POST",
        body: JSON.stringify(shippingAddress),
        headers: {
          token: token,
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      if (data.status === 'success') {
        window.location.href = data.session.url
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full p-5 my-1 bg-black border-1 rounded-5 cursor-pointer text-white hover:bg-black hover:text-white">Proceed to checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle>Shipping Selection</DialogTitle>
            <DialogDescription>
              Choose a saved address or enter a new one.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {addresses.length > 0 && (
              <div className="grid gap-3">
                <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">Saved Addresses</Label>
                <div className="grid gap-2 max-h-[200px] overflow-y-auto pr-2">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      onClick={() => setSelectedAddressId(address._id)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${selectedAddressId === address._id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-gray-100 dark:border-zinc-800 hover:border-gray-200"
                        }`}
                    >
                      <div className="flex-1">
                        <p className="text-xs font-black uppercase text-primary mb-1">{address.name}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{address.details}</p>
                        <p className="text-xs text-gray-500">{address.city} • {address.phone}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddressId === address._id ? "border-primary bg-primary" : "border-gray-300"}`}>
                        {selectedAddressId === address._id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={() => setSelectedAddressId("new")}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${selectedAddressId === "new"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-gray-100 dark:border-zinc-800 hover:border-gray-200"
                      }`}
                  >
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Use a new address</p>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddressId === "new" ? "border-primary bg-primary" : "border-gray-300"}`}>
                      {selectedAddressId === "new" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedAddressId === "new" && (
              <div className="grid gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" ref={cityInput} placeholder="e.g. Cairo" className="rounded-xl" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="details">Detailed Address</Label>
                  <Input id="details" ref={detailsInput} placeholder="Street, Building..." className="rounded-xl" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" ref={phoneInput} placeholder="01xxxxxxxxx" className="rounded-xl" />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
            <Button
              type="button"
              className="w-full sm:flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg transition-all"
              onClick={createCashOrder}
              loading={loadingCashOrder}
            >
              Cash on Delivery
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:flex-1 h-12 border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-xl transition-all"
              onClick={checkOutSession}
              loading={loading}
            >
              Visa Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
