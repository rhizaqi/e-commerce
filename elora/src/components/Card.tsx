"use client";

import { addWishlist } from "@/app/action";
import { ProductType } from "@/type";
import { ObjectId } from "mongodb";
import Link from "next/link";

interface Props {
  product: ProductType;
}

export default function Card({ product }: Props) {

  async function goAdd(id: ObjectId) {
    await addWishlist(id);
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={product.images[0]} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p> {product.description}</p>
        <div className="flex flex-col gap-4">
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Funiture</div>
            <div className="badge badge-outline">Products</div>
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => goAdd(product._id)}
            >
              {" "}
              Add to wishlist
            </button>

            <Link href={`/product/${product.slug}`}>
              {" "}
              <button className="btn btn-secondary"> Detail </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
