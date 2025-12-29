
import { OrderI } from "@/app/_interfaces/orderI";
import { ShoppingBag, Calendar, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function OrderList({ orders }: { orders: OrderI[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-zinc-800/30 rounded-2xl p-8 text-center border border-dashed border-gray-200 dark:border-zinc-700">
        <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-zinc-600 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">No orders found yet.</p>
        <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">When you make a purchase, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-indigo-600" />
        Order History
      </h2>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            {/* Order Header */}
            <div className="p-4 md:p-6 border-b border-gray-50 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50 dark:bg-zinc-800/20">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Order ID</span>
                <p className="text-sm font-mono text-gray-600 dark:text-gray-300">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <div className="flex gap-4 md:gap-8">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Date
                  </span>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center justify-end gap-1">
                    <CreditCard className="w-3 h-3" /> Total
                  </span>
                  <p className="text-sm font-bold text-indigo-600">
                    {order.totalOrderPrice} EGP
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 md:p-6">
              <div className="flex flex-wrap gap-4">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="relative group/item">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-700 relative">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        sizes="64px"
                        className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg shadow-sm">
                        x{item.count}
                      </div>
                    </div>
                  </div>
                ))}
                {order.cartItems.length > 5 && (
                  <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 text-sm font-medium border border-dashed border-gray-200 dark:border-zinc-700">
                    +{order.cartItems.length - 5}
                  </div>
                )}
              </div>
            </div>

            {/* Order Footer / Status */}
            <div className="px-4 py-3 md:px-6 md:py-4 bg-gray-50/30 dark:bg-zinc-800/10 flex items-center justify-between border-t border-gray-50 dark:border-zinc-800">
              <div className="flex gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isPaid
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                  {order.isPaid ? 'Paid' : 'Payment Pending'}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isDelivered
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                  {order.isDelivered ? 'Delivered' : 'Processing'}
                </span>
              </div>
              <button className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all group-hover:underline">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
