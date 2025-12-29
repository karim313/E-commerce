"use client";
import React from "react";
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
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ProductSlider({
  images,
  altContent,
}: {
  images: string[];
  altContent: string;
}) {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        className=" flex items-center object-fit-contain"
      >
        <CarouselContent>
          {/* <CarouselItem></CarouselItem> */}
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={altContent}
                width={300}
                height={300}
                className="w-full h-auto"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
