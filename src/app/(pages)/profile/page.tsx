import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";
import { User, Mail, ShieldCheck, ShoppingBag } from "lucide-react";
import { getUserOrders } from "@/Helpers/getUserOrders";
import OrderList from "@/components/profile/OrderList";
import UserAddresses from "@/components/profile/UserAddresses";
import UpdatePassword from "@/components/profile/UpdatePassword";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const orders = await getUserOrders();

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800 overflow-hidden relative">

        {/* Decorative Background Header */}
        <div className="h-48 w-full bg-gradient-to-r from-violet-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-12 relative">

          {/* Avatar Section */}
          <div className="relative -mt-20 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="w-40 h-40 rounded-full border-4 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-xl text-5xl font-bold text-primary">
              {user?.name?.slice(0, 2).toUpperCase() || "Pf"}
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white pb-1">
                {user?.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center justify-center md:justify-start gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Active Now
              </p>
            </div>

            <div className="mb-4 md:mb-2">
              <LogoutButton />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

            {/* User Details Card */}
            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-700 hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                  <User className="w-5 h-5 text-primary" />
                  Account Information
                </h2>
                <UpdatePassword />
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1 ml-1">Full Name</label>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border-l-4 border-primary shadow-sm text-gray-800 dark:text-gray-200 font-medium group-hover:shadow-md transition-all">
                    {user?.name}
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1 ml-1">Email Address</label>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border-l-4 border-primary shadow-sm text-gray-800 dark:text-gray-200 font-medium flex items-center gap-2 group-hover:shadow-md transition-all">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {user?.email}
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1 ml-1">Account Role</label>
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border-l-4 border-indigo-500 shadow-sm text-gray-800 dark:text-gray-200 font-medium flex items-center gap-2 group-hover:shadow-md transition-all capitalize">
                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                    {user?.role || "User"}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats or Welcome Message (Placeholder for future data) */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Welcome to ShopMart!</h3>
                  <p className="text-indigo-100">
                    We're glad to have you here. Explore our latest products and exclusive deals curated just for you.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 ml-1">Account Status</h3>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm w-1/3">
                    <span className="text-2xl font-bold text-green-500">Verified</span>
                    <span className="text-xs text-gray-500 mt-1">Email</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm w-1/3">
                    <span className="text-2xl font-bold text-indigo-600">Active</span>
                    <span className="text-xs text-gray-500 mt-1">Membership</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm w-1/3 hover:shadow-md transition-shadow">
                    <span className="text-2xl font-bold text-indigo-600">{orders?.length || 0}</span>
                    <span className="text-xs text-gray-500 mt-1">Orders</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Addresses Section */}
          <div className="mt-12 border-t border-gray-100 dark:border-zinc-800 pt-12">
            <UserAddresses />
          </div>

          {/* Orders Section */}
          <div className="mt-12 border-t border-gray-100 dark:border-zinc-800 pt-12">
            <OrderList orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}
