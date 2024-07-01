"use client";

import { useFormStatus } from "react-dom";

export default function ButtonSearch() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button
          className="btn btn-sm flex justify-center"
          style={{ width: 100 }}
        >
          Loading in....
        </button>
      ) : (
        <button
          className="btn btn-sm flex justify-center"
          type="submit"
          style={{ width: 100 }}
        >
          Search
        </button>
      )}
    </>
  );
}
