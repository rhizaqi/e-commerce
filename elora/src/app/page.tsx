import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { ProductType } from "@/type";

async function fetchHome() {
  try {
    const response = await fetch(process.env.VERCEL_URI +"/products");

    console.log(response, `response nya server`);

    if (!response.ok) {
      throw new Error("Respon fetch tidak oke");
    }
    return await response.json();
  } catch (error) {
    return new Error
  }
}

export default async function Home() {
  // const data = await fetchHome();
  // const fewData = data.slice(0, 5);
  
  // console.log(data, `,<<<<< ?`);
  // console.log(fewData, ` apa ya< ?`);

  return (
    <div className="flex flex-col p-4 justify-center items-center">
      <div className="flex bg-red-200 w-screen h-8 justify-center items-center text-center text-black">
        Use Code NEW2024 at checkout to save 20% on your first registration
      </div>
      <div className="flex w-11/12 h-96 mt-5">
        <img
          src="https://images.unsplash.com/photo-1714745455353-f47a2e2b5647?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="object-cover static"
        />
        <div className=" m-1 p-4 absolute backdrop-blur-sm bg-white/30  hover:backdrop-blur-lg text-red-600 font-semibold text-center w-80">
          <div className="text-2xl ">Lorem Ipsum </div>
          <div>
            is simply dummy text of the printing and typesetting industry.{" "}
          </div>
          <button className="mt-5 w-40 h-10 border rounded-full bg-green-200">
            {" "}
            🐱‍🏍🐱‍👤🐱‍👤🐱‍👤🐱‍🏍{" "}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {/* {fewData ? (
          fewData.map((el: ProductType, i: string) => {
            return <Card key={i} product={el} />;
          })
        ) : (
          <p> Loading.... </p>
        )}{" "} */}
      </div>
      <div className="mt-5"> -- see all -- </div>
      <div> 
        <a href="/login"> LOGIN </a>
      </div>
      <div className="mt-5">
        is simply dummy text of the printing and typesetting industry. logo logo
        logo
      </div>
    </div>
  );
}
