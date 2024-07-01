import { ObjectId } from "mongodb";
import {
  COLLECTION_PRODUCT,
  COLLECTION_USER,
  COLLECTION_WISHLISTS,
} from "./constants";
import { getBD } from "./db";

export const allWishlist = async (userId: string) => {
  const db = await getBD();

  const newAggr = [
    {
      $match: {
        _id: new ObjectId(`${userId}`),
      },
    },
    {
      $lookup: {
        from: "Wishlist",
        localField: "_id",
        foreignField: "userId",
        as: "wishlist",
      },
    },
    {
      $unwind: "$wishlist",
    },
    {
      $lookup: {
        from: "Products",
        localField: "wishlist.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $project: {
        _id: 0,
        user: {
          _id: "$_id",
          name: "$name",
          email: "$email",
          username: "$username",
        },
        wishlist: {
          wishlistId: "$wishlist._id",
          productId: "$wishlist.productId",
          name: { $arrayElemAt: ["$product.name", 0] },
          slug: { $arrayElemAt: ["$product.slug", 0] },
          description: { $arrayElemAt: ["$product.description", 0] },
          excerpt: { $arrayElemAt: ["$product.excerpt", 0] },
          price: { $arrayElemAt: ["$product.price", 0] },
          tags: { $arrayElemAt: ["$product.tags", 0] },
          thumbnail: { $arrayElemAt: ["$product.thumbnail", 0] },
          images: { $arrayElemAt: ["$product.images", 0] },
        },
      },
    },
  ];

  const wishlist = await db
    .collection(COLLECTION_USER)
    .aggregate(newAggr)
    .toArray();

  console.log(wishlist, `<<< dpaat kah?`);

  return wishlist;
};

export const toMyWishlist = async (productId: string, userId: string) => {
  // console.log(input, `yang di modellll`);
  // console.log(userId,`<<< userId di model wislit`);

  console.log(productId,`<<<< product id`);
  
  const db = await getBD();

  const findProd = await db
    .collection(COLLECTION_PRODUCT)
    .findOne({ _id: new ObjectId(productId) });

    console.log(findProd,`<<<< dpaat produck yang mau ditambah`);
    

  const addToWL = await db.collection(COLLECTION_WISHLISTS).insertOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  // console.log(addToWL, `<<< apa sih?`);

  return addToWL;
};

export const deleteWishlist = async (wishlistId: string) => {
  const db = await getBD();

  const delWishlist = db.collection(COLLECTION_WISHLISTS).deleteOne({
    _id: new ObjectId(wishlistId),
  });

  return delWishlist;
};
