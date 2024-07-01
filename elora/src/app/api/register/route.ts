import { createUser } from "@/app/db/models/users";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body: {
      email: string;
      password: string;
      name: string;
      username: string;
    } = await request.json();

    // const body = await request.json() //! bisa dapat juga

    const parsedData = z
      .object({
        name: z.string(),
        username: z
          .string({ message: "Username is required" })
          .nonempty({ message: "Username is required" }),
        email: z
          .string({ message: "Email is required" })
          .email({ message: "Email format is invalid" })
          .nonempty({ message: "Email is required" }),
        password: z
          .string({ message: "Password is required" })
          .min(5, { message: "Password minimal 5 character" })
          .nonempty({ message: "Password is required" }),
      })
      .safeParse(body);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    // console.log(body, `,<<<< biya kah?`);
    const reg = await createUser(body);

    return Response.json({
      reg: reg,
      message: "You have succesfully register",
    });
  } catch (error) {
    console.log(error, 99999999999);

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
