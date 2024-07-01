"use client";

import { deleteWL, fetchData } from "@/app/action";
import { useEffect, useState } from "react";

interface MyWishlist {
  wishlist: Wishlist;
  user: User;
}
interface Wishlist {
  wishlistId: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: string;
  tags: string[];
  thumbnail: string;
  images: string[];
}

interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
}

export default function Wishlist() {
  const [data, setData] = useState<MyWishlist[]>([]);
  const [name, setName] = useState<string>();

  async function myWishlist() {
    const wishlist = await fetchData();
    console.log(wishlist, `<<<<??? lagi`);
    // console.log(wishlist[0].user.name, `<<<<??? cari nama`);

    setName(wishlist[0].user.name);
    setData(wishlist);
  }

  async function goDeleteWL(wishlistId: string) {
    console.log(`blablabla`, wishlistId);
    await deleteWL(wishlistId);
  }

  useEffect(() => {
    myWishlist();
  }, []);

  return (
    <div>
      <div className="flex justify-center text-center ">Welcome {name} </div>
      <div className="flex p-4 py-10 justify-center ">
        <div className="overflow-x-auto w-11/12">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th> No </th>
                <th>Name </th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, i) => (
                <tr className="bg-base-200" key={i}>
                  <td> {i + 1} </td>
                  <td> {el.wishlist.name} </td>
                  <td>
                    <img
                      className="w-20 h-20"
                      src={el.wishlist?.images[0]}
                      alt=""
                    />
                  </td>
                  <td> {el.wishlist.price} </td>
                  <td>
                    <button
                      className="btn btn-error flex justify-center"
                      onClick={() => goDeleteWL(el.wishlist.wishlistId)}
                      style={{ width: 100 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
