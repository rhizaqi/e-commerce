import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Button from "@/components/Button";

export default function Login() {
  const handleLogin = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(process.env.VERCEL_URI + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();
    // console.log(result,`<<< ??`);

    if (!response.ok) {
      return redirect("/login?error=" + result.message);
    }
    // console.log(result.data.access_token, `,<<<< token kah?`);

    if (result.data.access_token) {
      cookies().set("Authorization", `Bearer ${result.data.access_token}`);
    }

    return redirect("/product");
  };

  return (
    <div className="flex w-11/12 h-96 justify-center items-center mt-20">
      <img
        src="https://plus.unsplash.com/premium_photo-1664201890484-a5f7109c8e56?q=80&w=1576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="flex w-80 p-2"
      />
      <div className="flex flex-col w-96 gap-2">
        <div className="mb-5 text-center text-lg font-semibold"> Login </div>

        <form action={handleLogin} className="flex flex-col gap-4 w-96">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="email"
              className="grow"
              placeholder="Email"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              required
            />
          </label>
          <div className="flex w-full gap-2 justify-center ">
            <Button />
          </div>
        </form>

        <div className="text-center">
          Doesnt has account?
          <a href="/register" className="text-blue-400">
            {" "}
            Register{" "}
          </a>{" "}
          here
        </div>
      </div>
    </div>
  );
}
