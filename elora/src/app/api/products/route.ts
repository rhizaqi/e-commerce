import { getAllProducts, searchProducts } from "@/app/db/models/products";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest } from "next/server";
import { URLSearchParams } from "url";
export const dynamic = 'force-dynamic'

// export type searchQuery = {
//   name: string
// };

export async function GET(request: NextRequest): Promise<Response> {
  try {
    
    const name = request.nextUrl.searchParams.get("search" ) || ''
    console.log(name,`query`);
    
    
    if (!name) {
      const prods = await getAllProducts();
      return Response.json(prods);
    } else {
      const prods = await searchProducts(name);
      console.log(prods);
      return Response.json(prods);
    }

    // const prods = await getAllProducts();
    // return Response.json(prods);
  } catch (error) {
    console.log(error, `<< di route porduct`);
    return Response.json(error);
  }
}
