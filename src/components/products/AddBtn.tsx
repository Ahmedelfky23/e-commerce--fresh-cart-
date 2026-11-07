"use client";

import { useState } from "react";
import { addTocart } from "@/actions/cart.actions";
import { useCart } from "@/components/layout/MyProvider";
import { Button } from "@base-ui/react";
import React from "react";
import { toast } from "sonner";
import type { AddBtnProps } from "@/types";

export default function AddBtn({
  classes = "",
  word = "Add to Cart",
  productId,
}: AddBtnProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { setCartCount } = useCart();

  async function AddProduct() {
    if (!productId) return;

    setIsLoading(true);
    const res = await addTocart(productId);
    setIsLoading(false);

    if (res?.status === "success") {
      toast.success(res.message || "Product added to cart");
      if (res.numOfCartItems) setCartCount(res.numOfCartItems);
    } else {
      toast.error(res?.message || "Failed to add product to cart");
    }
  }

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={(e) => {
          e.preventDefault();
          AddProduct();
        }}
        className={classes}
      >
        {isLoading ? (
          <i className="fa-solid fa-circle-notch animate-spin text-sm" aria-hidden />
        ) : (
          word
        )}
      </Button>
    </>
  );
}
