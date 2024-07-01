import Button from "@/components/Button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function register() {
  const handleRegister = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(process.env.VERCEL_URI + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return redirect("/register?error=" + result.message);
    }
    return redirect("/login");
  };

  return (
    <div className="flex w-11/12 h-96 justify-center items-center mt-20">
      <img
        src="https://images.unsplash.com/photo-1511317559916-56d5ddb62563?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="flex w-80 p-2 "
      />
      <div className="flex flex-col w-96 gap-2">
        <div className="mb-5 text-center text-lg font-semibold"> Register </div>

        <form action={handleRegister} className="flex flex-col gap-4 w-96">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="name"
              className="grow"
              placeholder="Name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="email"
              className="grow"
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              name="password"
              placeholder="Password"
            />
          </label>
          <div className="flex w-full gap-2 justify-center ">
            <Button />
          </div>
        </form>
        {/* <button className="btn btn-accent">Register</button> */}

        <div className="text-center">
          Already has account?
          <a href="/login" className="text-blue-400">
            {" "}
            Login{" "}
          </a>{" "}
          here
        </div>
      </div>
    </div>
  );
}
