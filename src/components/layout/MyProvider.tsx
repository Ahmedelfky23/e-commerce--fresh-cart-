"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { toast } from "sonner";
import { getLoggedUserCart } from "@/actions/cart.actions";
import {
  getLoggedUserWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/actions/wishlist.actions";
import type { CartContextType, WishlistContextType } from "@/types";

// ── Cart Context ──
const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
});

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState<number>(0);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getLoggedUserCart().then((res) => {
        if (res?.status === "success") {
          setCartCount(res.numOfCartItems ?? 0);
        }
      });
    } else if (status === "unauthenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartCount(0);
    }
  }, [status]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// ── Wishlist Context ──
const WishlistContext = createContext<WishlistContextType>({
  wishlistCount: 0,
  setWishlistCount: () => {},
  wishlistIds: [],
  setWishlistIds: () => {},
  isInWishlist: () => false,
  toggleWishlist: async () => false,
});

function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      getLoggedUserWishlist().then((res) => {
        if (res?.status === "success" && Array.isArray(res.data)) {
          const ids = res.data.map((item: { _id?: string; id?: string } | string) =>
            typeof item === "string" ? item : item._id || item.id || ""
          ).filter(Boolean);
          setWishlistIds(ids);
          setWishlistCount(res.count ?? ids.length);
        }
      });
    } else if (status === "unauthenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWishlistIds([]);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWishlistCount(0);
    }
  }, [status]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = async (productId: string): Promise<boolean> => {
    if (status !== "authenticated") {
      toast.error("Please sign in to manage your wishlist");
      return false;
    }

    const isAdded = isInWishlist(productId);

    if (isAdded) {
      const res = await removeFromWishlist(productId);
      if (res?.status === "success") {
        const nextIds = Array.isArray(res.data)
          ? (res.data as string[])
          : wishlistIds.filter((id) => id !== productId);
        setWishlistIds(nextIds);
        setWishlistCount(nextIds.length);
        toast.success(res.message || "Product removed from wishlist");
        return true;
      } else {
        toast.error(res?.message || "Failed to remove from wishlist");
        return false;
      }
    } else {
      const res = await addToWishlist(productId);
      if (res?.status === "success") {
        const nextIds = Array.isArray(res.data)
          ? (res.data as string[])
          : [...wishlistIds, productId];
        setWishlistIds(nextIds);
        setWishlistCount(nextIds.length);
        toast.success(res.message || "Product added to wishlist");
        return true;
      } else {
        toast.error(res?.message || "Failed to add to wishlist");
        return false;
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        setWishlistCount,
        wishlistIds,
        setWishlistIds,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function MyProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}

export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);
