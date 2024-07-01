import {
  allWishlist,
  deleteWishlist,
  toMyWishlist,
} from "@/app/db/models/wishlist";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-id") as string;
    const myWishlist = await allWishlist(userId);

    // console.log(myWishlist, `<<<< kah??`);

    return Response.json(myWishlist);
  } catch (error) {
    console.log(error, `<< di route wislis`);

    return Response.json(error);
  }
}

export async function POST(request: Request) {
  try {
    const body: { productId: string } = await request.json();
    const userId = request.headers.get("x-id") as string;

    const result = await toMyWishlist(body.productId, userId);

    return Response.json({
      message: "Product is added to your wishlist",
    });
  } catch (error) {
    return Response.json(error);
  }
}

export async function DELETE(request: Request) {
  try {

    // console.log(`masuk dinisi gak??`);
    
    const body: { wishlistId: string } = await request.json();

    console.log(body.wishlistId,`<<< yang mau didelete`);
    

    const goDelWishlist = await deleteWishlist(body.wishlistId);

    return Response.json({
      //   goDelWishlist,
      message: "Product has been deleted",
    });
  } catch (error) {
    console.log(error, `<< error del wislit`);
    return Response.json(error);
  }
}
