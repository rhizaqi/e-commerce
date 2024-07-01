import { login } from "@/app/db/models/users";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();

    const parsedData = z
      .object({
        email: z
          .string({ message: "Email is required" })
          .email({ message: "Email format is invalid" })
          .nonempty({ message: "Email is required" }),
        password: z
          .string({ message: "Password is required" })
          .nonempty({ message: "Password is required" }),
      })
      .safeParse(body);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const mauLogin = await login(body);
    // console.log(mauLogin,`<<<< cawwwwhh`);

    // Response.cookies().set("Authorization", `Bearer ${mauLogin}`);

    const response = NextResponse.json({
      message: "Login success",
      data: {
        access_token: mauLogin,
      },
    });

    response.cookies.set("Authorization", `Bearer ${mauLogin}`);
    return response;
  } catch (error) {
    console.log(error, 9999999999999);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    } else if (error instanceof Error) {
      return Response.json({
        message: error.message,
      });
    } else {
      return Response.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
