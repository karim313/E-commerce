"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Plus, Trash2, MapPin, Phone, Building2, MapPinned } from "lucide-react";
import { getAddresses, addAddress, removeAddress } from "@/Helpers/address";
import { AddressI } from "@/app/_interfaces/addressI";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

export default function UserAddresses() {
    const { data: session } = useSession();
    const token = session?.token;
    const [addresses, setAddresses] = useState<AddressI[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        details: "",
        phone: "",
        city: "",
    });

    useEffect(() => {
        if (token) {
            fetchAddresses();
        }
    }, [token]);

    const fetchAddresses = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await getAddresses(token);
            if (res.status === "success") {
                setAddresses(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        try {
            setIsAdding(true);
            const res = await addAddress(formData, token);
            if (res.status === "success") {
                toast.success("Address added successfully");
                setDialogOpen(false);
                setFormData({ name: "", details: "", phone: "", city: "" });
                fetchAddresses();
            } else {
                toast.error(res.message || "Failed to add address");
            }
        } catch (error) {
            toast.error("An error occurred while adding address");
        } finally {
            setIsAdding(false);
        }
    };

    const handleDeleteAddress = async (id: string) => {
        if (!token) return;

        try {
            const res = await removeAddress(id, token);
            if (res.status === "success") {
                toast.success("Address removed successfully");
                fetchAddresses();
            } else {
                toast.error(res.message || "Failed to remove address");
            }
        } catch (error) {
            toast.error("An error occurred while removing address");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPinned className="w-6 h-6 text-primary" />
                    My Addresses
                </h2>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 rounded-xl">
                            <Plus className="w-4 h-4" />
                            Add Address
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-3xl">
                        <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddAddress} className="space-y-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="address-name">Address Name (e.g., Home, Work)</Label>
                                <Input
                                    id="address-name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Home"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    placeholder="Cairo"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="details">Detailed Address</Label>
                                <Input
                                    id="details"
                                    value={formData.details}
                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                    placeholder="Street name, building number..."
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="01xxxxxxxxx"
                                    required
                                />
                            </div>
                            <DialogFooter className="pt-4">
                                <Button type="submit" className="w-full" loading={isAdding}>
                                    Save Address
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <div
                            key={address._id}
                            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group relative"
                        >
                            <button
                                onClick={() => handleDeleteAddress(address._id)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete address"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                                        {address.name}
                                    </h3>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <p>{address.details}, {address.city}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Phone className="w-4 h-4 flex-shrink-0" />
                                        <p>{address.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 py-12 text-center bg-gray-50 dark:bg-zinc-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-700">
                        <MapPinned className="w-12 h-12 text-gray-300 dark:text-zinc-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No saved addresses found.</p>
                        <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">Add your shipping addresses for faster checkout.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
