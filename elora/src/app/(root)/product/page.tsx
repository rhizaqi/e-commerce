"use client";

import { ProductType } from "@/type";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ButtonCategory from "@/components/ButtonCategory";
import ButtonSearch from "@/components/ButtonSearch";

export default function Product() {
  const [data, setData] = useState<ProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchProds = async () => {
    console.log(process.env.NEXT_PUBLIC_VERCEL_URI + "/products");
    try {
      let response;
      if (searchQuery) {
        response = await fetch(
          process.env.NEXT_PUBLIC_VERCEL_URI +
            "/products" +
            `?search=${searchQuery}`
        );
      } else {
        response = await fetch(
          process.env.NEXT_PUBLIC_VERCEL_URI + "/products"
        );
      }
      // console.log(response,`,<< cekkkk bannggg`);

      if (!response.ok) {
        throw new Error("Respon fetch tidak oke");
      }

      const prods = await response.json();
      setData(prods);
      // console.log(prods,`,<< dapat????? bannggg`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    console.log(data, `ccceck lagi bang`);

    fetchProds();
  }, []);

  console.log(data, `ccceck lagi bang`);

  return (
    <div className="flex flex-col p-4 justify-center">
      <div className="p-4 flex gap-20 justify-center">
        <div className="flex flex-col gap-5 ">
          <div className="form-control mb-10">
            <form action="" className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
              <ButtonSearch />
            </form>
          </div>
          <ButtonCategory />
        </div>

        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={fetchProds}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-wrap gap-4 w-2/3 justify-center">
            {data ? (
              data.map((el: ProductType, i) => {
                return <Card key={i} product={el} />;
              })
            ) : (
              <p> Loading.... </p>
            )}{" "}
            {/* masih gak bisa Loading wkwwkwk */}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
