import { COLLECTION_PRODUCT } from "./constants";
import { getBD } from "./db";
import { ObjectId } from "mongodb";

export type Products = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tag: string[];
  thumbnail: string;
  images: string[];
};

export const getAllProducts = async () => {
  const db = await getBD();
  const products = await db.collection(COLLECTION_PRODUCT).find().toArray();
  // console.log(products, `,<<<< di model`);
  return products;
};

export const searchProducts = async (name: string) => {
  const db = await getBD();
  const regex = new RegExp(name, "i");

  const query = {
    $or: [{ name: { $regex: regex } }],
  };

  const products = await db
    .collection(COLLECTION_PRODUCT)
    .find(query)
    .toArray();

  return products;
};

export const productById = async (slug: string) => {
  const db = await getBD();

  const query = {
    slug:slug
  };

  const product = await db.collection(COLLECTION_PRODUCT).findOne(query);
  // console.log(product,`<< detail product`);
  
  return product;
};
