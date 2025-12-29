"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { ProductI } from "@/app/_interfaces/productI";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<ProductI[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allProducts, setAllProducts] = useState<ProductI[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Fetch all products on mount
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
                const { data }: { data: ProductI[] } = await res.json();
                setAllProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    // Close search when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Search function
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        const timeoutId = setTimeout(() => {
            const query = searchQuery.toLowerCase();

            const filteredResults = allProducts.filter((product) => {
                const matchesName = product.title.toLowerCase().includes(query);
                const matchesBrand = product.brand.name.toLowerCase().includes(query);
                const matchesCategory = product.category.name.toLowerCase().includes(query);
                const matchesSubcategory = product.subcategory.some(sub =>
                    sub.name.toLowerCase().includes(query)
                );

                return matchesName || matchesBrand || matchesCategory || matchesSubcategory;
            });

            setResults(filteredResults.slice(0, 8)); // Limit to 8 results
            setIsLoading(false);
        }, 300); // Debounce for 300ms

        return () => clearTimeout(timeoutId);
    }, [searchQuery, allProducts]);

    const handleClear = () => {
        setSearchQuery("");
        setResults([]);
        setIsOpen(false);
    };

    const handleResultClick = () => {
        setIsOpen(false);
        setSearchQuery("");
        setResults([]);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search products, brands, categories..."
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {searchQuery && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            {isOpen && searchQuery && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-2xl max-h-[500px] overflow-y-auto z-50">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                    ) : results.length > 0 ? (
                        <div className="p-2">
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                                Found {results.length} result{results.length !== 1 ? 's' : ''}
                            </div>
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    onClick={handleResultClick}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors group"
                                >
                                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                                        <Image
                                            src={product.imageCover}
                                            alt={product.title}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {product.brand.name}
                                            </span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {product.category.name}
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-primary mt-1">
                                            {product.price} EGP
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {results.length === 8 && (
                                <div className="text-xs text-center text-gray-500 dark:text-gray-400 py-2">
                                    Showing top 8 results
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 px-4">
                            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                No products found
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Try searching with different keywords
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
