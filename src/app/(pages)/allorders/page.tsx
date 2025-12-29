import { authOptions } from '@/auth';
import { Button } from '@/components/ui/button';
import { getUserOrders } from '@/Helpers/getUserOrders';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import OrderList from '@/components/profile/OrderList';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default async function AllOrders() {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      redirect("/login");
    }
  
    const orders = await getUserOrders();
    
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-zinc-950 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-black dark:bg-white rounded-lg">
                <ShoppingBag className="w-5 h-5 text-white dark:text-black" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">All Orders</h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Check the status and history of all your purchases.</p>
          </div>
          
          <Link href="/products">
            <Button variant="outline" className="rounded-xl border-gray-200 dark:border-zinc-800 font-bold flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-zinc-900/50 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-zinc-800 shadow-sm">
          <OrderList orders={orders} />
        </div>
      </div>
    </div>
  );
}
