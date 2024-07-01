import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Navbar() {
  const token = cookies().get("Authorization");

  const goLogout = async () => {
    "use server";
    cookies().delete("Authorization");
    redirect("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Elora</a>
      </div>
      <div className="flex-none gap-10">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}
        <div>
          <a href="/wishlist"> WISHLIST </a>
        </div>
        <form action={goLogout}>
          <button
            className="btn btn-error flex justify-center"
            // onClick={goLogout}
            style={{ width: 100 }}
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
