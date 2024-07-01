"use server";

import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

//? FETCH WISHLIST
export async function fetchData() {
  "use server";

  const response = await fetch(process.env.VERCEL_URI + "/wishlist", {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const myWishlist = await response.json();
  // console.log(myWishlist,`<<, iyaj??`);
  return myWishlist;
}

//? INI REMOVE WISLIS
export async function deleteWL(wishlistId: string) {
  console.log(`di action del`, wishlistId);

  const response = await fetch(process.env.VERCEL_URI + "/wishlist", {
    method: "DELETE",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ wishlistId }),
  });

  const result = await response.json();
  console.log(result, `,,<<< hasil dari action delete`);
}

export async function token() {
  return cookies().toString();
}

export async function addWishlist(productId: ObjectId) {
  console.log(productId, `<<<<< di action`);

  const response = await fetch(process.env.VERCEL_URI + "/wishlist", {
    method: "POST",
    headers: {
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ productId }),
  });

  const result = await response.json();
}
