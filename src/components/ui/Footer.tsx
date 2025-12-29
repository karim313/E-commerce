"use client";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* BRAND */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-black group-hover:text-primary transition-colors">ShopMart</span>
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Your one-stop destination for the latest technology, fashion,
              and lifestyle products. Quality guaranteed with fast shipping
              and excellent customer service.
            </p>

            <div className="space-y-3">

              {/* Address */}
              <div className="flex items-center text-gray-600 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-2 text-primary"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>123 Shop Street, Octoper City, DC 12345</span>
              </div>

              {/* Phone */}
              <div className="flex items-center text-gray-600 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-2 text-primary"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
                <span>(+20) 01093333333</span>
              </div>

              {/* Email */}
              <div className="flex items-center text-gray-600 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-2 text-primary"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <span>support@shopmart.com</span>
              </div>
            </div>
          </div>

          {/* SHOP */}
          <FooterSection
            title="SHOP"
            links={[
              { name: "Electronics", href: "/categories" },
              { name: "Fashion", href: "/categories" },
              { name: "Home & Garden", href: "/categories" },
              { name: "Sports", href: "/categories" },
              { name: "Deals", href: "/categories" },
            ]}
          />

          {/* CUSTOMER SERVICE */}
          <FooterSection
            title="CUSTOMER SERVICE"
            links={[
              { name: "Contact Us", href: "/contact" },
              { name: "Help Center", href: "/help" },
              { name: "Track Your Order", href: "/track-order" },
              { name: "Returns & Exchanges", href: "/returns" },
              { name: "Size Guide", href: "/size-guide" },
            ]}
          />

          {/* ABOUT */}
          <FooterSection
            title="ABOUT"
            links={[
              { name: "About Shopmart", href: "/about" },
              { name: "Careers", href: "/careers" },
              { name: "Press", href: "/press" },
              { name: "Investor Relations", href: "/investor-relations" },
              { name: "Sustainability", href: "/sustainability" },
            ]}
          />

          {/* POLICIES */}
          <FooterSection
            title="POLICIES"
            links={[
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms of Service", href: "/terms-of-service" },
              { name: "Cookie Policy", href: "/cookie-policy" },
              { name: "Shipping Policy", href: "/shipping-policy" },
              { name: "Refund Policy", href: "/refund-policy" },
            ]}
          />
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------- Footer Section Component ---------------------------- */

function FooterSection({ title, links }: { title: string; links: any[] }) {
  return (
    <div>
      <h3 className="text-black font-bold text-sm mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="text-gray-600 text-sm hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
