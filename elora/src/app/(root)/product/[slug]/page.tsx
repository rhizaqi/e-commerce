"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Card from "@/components/Card";
import { ProductType } from "@/type";

export default function Detail() {
  const [data, setData] = useState<ProductType>();
  const params = useParams();

  const { slug } = params;

  const fetchOne = async () => {
    try {
      const response = await fetch(process.env.VERCEL_URI + "/products" + slug);

      const product = await response.json();
      setData(product);
    } catch (error) {
      throw new Error("Failed to fetch product");
    }
  };

  useEffect(() => {
    fetchOne();
  }, []);

  const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const response = await fetch(
      process.env.VERCEL_URI + "/products" + `${params.slug}`
    );
    const product = await response.json();
    return {
      title: `${product.name} - Product Detail`,
      description: `Details of ${product.name}`,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const metadata = await generateMetadata({
        params: { slug: slug as string },
      });
      document.title = metadata.title;
    };
    fetchData();
  }, [slug]);

  return (
    <div>
      <div className="flex p-4 justify-center">
        <div className="flex ">
          {data ? <Card product={data} /> : <p> Loading.... </p>}
        </div>
      </div>
    </div>
  );
}
