import { ProductI } from "@/app/_interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductSlider from "@/components/productSlider/productSlider";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon, StarIcon } from "lucide-react";
import StarsIcon from "@/components/StarsIcon";
import AddToCart from "@/components/addToCart/addToCart";



export default async function productDetails({ params }: { params: Params }) {
  let { productId } = await params;
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId
  );
  const { data: product }: { data: ProductI } = await res.json();

  return (
    <>
      <div className=" mt-20">
        <Card className="grid md:grid-cols-2 gap-2 items-center md:w-1/2 mx-auto ">
        <div >
        <ProductSlider images={product.images} altContent={product.title} />
          </div>       
        <div className="flex flex-col  gap-4"> 
          <CardHeader>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle>{product.title}</CardTitle>
          </CardHeader>
            <CardDescription className="my-3 ms-5 text-black ">{product.description}</CardDescription>
          <CardContent>
            <CardDescription>{product.subcategory[0].name}</CardDescription>
            <div className="flex gap-1">
              <StarsIcon />
              <StarsIcon />
              <StarsIcon />
              <StarsIcon />
              <StarsIcon />
              ({product.ratingsAverage})
            </div>
            <div className="flex justify-between my-3">
            <p className="text-2xl"> {product.price} EGP</p>
            <p>Quantity : {product.quantity}</p>
            </div>
          </CardContent>
          <CardFooter className="gap-1">
            <AddToCart productId={product.id} />
          </CardFooter>
        </div>
      </Card>
      </div>
    </>
  );
}
