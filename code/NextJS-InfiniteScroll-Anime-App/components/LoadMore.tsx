"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { fetchAnime } from "@/app/action";
import AnimeCard from "./AnimeCard";

// Set Current State of Page
let page = 2;

// Modify Type
export type AnimeCard = JSX.Element;

// NextJS Infinite Scroll Load More
function LoadMore() {
  // useInView, Hooks aren't allowed in Server Side, to fix, add "use client" above page
  const { ref, inView } = useInView();
  // State of API Date
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    // Only if we are in View then we want to load more
    if (inView) {
      // Add fetchAnime function from previous
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
        page++;
        // Fix Images from being repetitve
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
