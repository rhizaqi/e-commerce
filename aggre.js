// const aggr1 = [
//   {
//     $match: {
//       userId: new ObjectId("663ed2923c5c1a3d32aa6e0d"), // user id jgn lupa
//     },
//   },
//   {
//     $lookup: {
//       from: "Products",
//       localField: "productId",
//       foreignField: "_id",
//       as: "Product",
//     },
//   },
//   {
//     $lookup: {
//       from: "Users",
//       localField: "userId",
//       foreignField: "_id",
//       as: "user",
//     },
//   },
//   {
//     $project: {
//       createdAt: 0,
//       updatedAt: 0,
//       user: {
//         password: 0,
//       },
//     },
//   },
//   {
//     $unwind: {
//       path: "$Product",
//       preserveNullAndEmptyArrays: true,
//     },
//   },
//   {
//     $group: {
//       _id: "$userId",
//       user: { $first: "$user" },
//       wishlist: { $push: "$Product" },
//     },
//   },
// ];

// const aggr2 =  [
//   {
//     $match: {
//       userId: userId
//     }
//   },
//   {
//     $lookup: {
//       from: "Users",
//       localField: "userId",
//       foreignField: "_id",
//       as: "user"
//     }
//   },
//   {
//     $unwind: "$user"
//   },
//   {
//     $project: {
//       _id: 0,
//       user: "$user",
//       wishlist: {
//         _id: "$_id",
//         productId: "$productId",
//         createdAt: "$createdAt",
//         updatedAt: "$updatedAt"
//       }
//     }
//   }
// ];

// const aggr3 = [
//   {
//     $match: {
//       userId: new ObjectId("663ed2923c5c1a3d32aa6e0d"),
//     },
//   },
//   {
//     $lookup: {
//       from: "Products",
//       localField: "productId",
//       foreignField: "_id",
//       as: "wishlist",
//     },
//   },
//   {
//     $lookup: {
//       from: "Users",
//       localField: "userId",
//       foreignField: "_id",
//       as: "user",
//     },
//   },
//   {
//     $unwind: "$user",
//   },
//   {
//     $group: {
//       _id: "$user._id",
//       user: { $first: "$user" },
//       wishlist: { $push: "$wishlist" },
//     },
//   },
//   {
//     $project: {
//       _id: 0, // Exclude _id field
//       user: "$user", // Keep the user object as it is
//       wishlist: {
//         $reduce: {
//           input: "$wishlist",
//           initialValue: [],
//           in: { $concatArrays: ["$$value", "$$this"] },
//         },
//       }, // Merge wishlists into a single array
//     },
//   },
// ];
[
  {
    user: {
      _id: "_id",
      name: "name",
      email: "email",
      username: "username",
    },
  },
  {
    wishlist: [
      {
        wishlistId: "_id",
        productId: "_id",
        name: "Rocking Chair",
        slug: "rocking-chair",
        description: "A classic rocking chair for relaxation.",
        excerpt: "Enjoy gentle rocking motions.",
        price: "$250",
        tags: ["living room", "classic", "wood"],
        thumbnail: "rocking-chair-thumbnail.jpg",
        images: [
          "https://www.leekes.co.uk/media/catalog/product/cache/41de4231f41aba4009fa4e5cf5d5b0d6/1/1/1123229_3l.jpg",
        ],
      },
      {
        wishlistId: "_id",
        productId: "_id",
        name: "Desk",
        slug: "desk",
        description: "A practical desk for your home office.",
        excerpt: "Boost productivity with a dedicated workspace.",
        price: "$150",
        tags: ["home office", "metal", "minimalist"],
        thumbnail: "desk-thumbnail.jpg",
        images: [
          "https://cdn11.bigcommerce.com/s-a4t1eyps9l/images/stencil/1280x1280/products/24005/51220/5026b6e6-23a9-4565-8a72-0e62945e06c7__35286.1667925608.jpg?c=2",
        ],
      },
      {
        _id: "663b4d6aeecf0a39f03b47f3",
        name: "Dining Table",
        slug: "dining-table",
        description: "A sturdy dining table for family gatherings.",
        excerpt: "Perfect for hosting dinners and parties.",
        price: "$500",
        tags: ["dining room", "wood", "family"],
        thumbnail: "dining-table-thumbnail.jpg",
        images: [
          "https://cdn-images.article.com/products/SKU379/2890x1500/image122650.jpg",
        ],
      },
    ],
  },
];

// << wanted result susaaaah
