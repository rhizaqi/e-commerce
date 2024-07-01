import { productById } from "@/app/db/models/products";


export type ParamsId = {
  params: {
    slug: string;
  };
};

export async function GET(
  request: Request,
  params: ParamsId
): Promise<Response> {
  try {
    // console.log(params, `<<<< yang ini aapa pakkkkk`);
    // console.log(params.params, `<<<< yang ini aapa pakkkkk`);
    // console.log(params.params.id,`<<<< ini pakkkkk`);
    const id = params.params.slug;

    // const prodOne = await productById("663b4d6aeecf0a39f03b47f2"); << bisa dapat 1 pakkkk

    const prodOne = await productById(id);
    return Response.json(prodOne);
  } catch (error) {
    console.log(error, `<< di route product by ID`);
    return Response.json(error);
  }
}
