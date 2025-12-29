import { ProductI } from "@/app/_interfaces/productI";
import IsLoading from "@/app/loading";
import AddToCart from "@/components/addToCart/addToCart";
import StarsIcon from "@/components/StarsIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function CardProduct({products}: {products: ProductI[]}) {
  return <>
      {products.map((product) => <div key={product.id} className="flex justify-center w-full md:p-2 ">
          <Card className="min-w-4/5 md:min-w-full max-w-sm h-[66-vh] flex flex-col p-3">
            <Link href={'/products/'+product.id}>
            <CardHeader>
              <Image
                src={product.imageCover}
                alt="image product"
                width={300}
                height={300}
                className="w-full h-60 object-cover"
              />
              <CardDescription>{product.brand.name}</CardDescription>
              <CardTitle>{product.title.split(" ",2).join(" ")}</CardTitle>
              <CardDescription>{product.subcategory[0].name}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex">
                <StarsIcon />
                <StarsIcon />
                <StarsIcon />
                <StarsIcon />
                {product.ratingsAverage}
              </div>
              <p>
                Price : <span className="fw-bolder">{product.price} </span>
                EGP
              </p>
            </CardContent>

            </Link>
            <CardFooter className="gap-3">
              <AddToCart productId={product._id}/>
            </CardFooter>
          </Card>
        </div>
      )}

  </>
}
