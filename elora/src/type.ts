import { ObjectId } from "mongodb";

export interface UserType {
  _id: ObjectId;
  name: string;
  username: string;
  password: string;
}

export interface ProductType {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// export interface WishListType {
//   _id: ObjectId;
//   userId: string;
//   productId: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface ProductsWL {
  _id: string;
  userId: {
    _id: ObjectId;
    name: string;
    username: string;
    email: string;
  };
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  Product: ProductType[];
}
