"use client";

import { useEffect, useRef } from "react";

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes  from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const comp = useRef(null);

  useEffect(() => {
    let cxt = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          delay: 0.5,
          rotate: 0,
          ease: "elastic.out(1,0.5)",
          duration: 1,
          transformOrigin: "left top",
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );

      tl.fromTo(
        ".job-title",
        {
          y: 50,
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scale: 1,
          ease: "bounce.out",
        }
      );
    }, comp);
    return () => cxt.revert();
  }, []);

  const renderLetter = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={comp}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,18vmin,18rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300">
              {renderLetter(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
              {renderLetter(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-extrabold text-transparent text-2xl opacity-0 tracking-[.1em] md:text-3xl lg:text-4xl uppercase">
            <>{slice.primary.tag_line}</>
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
