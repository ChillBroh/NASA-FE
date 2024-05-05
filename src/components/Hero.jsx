import React from "react";
import light from "../assets/light.png";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Hero = () => {
  return (
    <>
      <div class="md:px-36 px-8 md:py-28 py-5">
        <div class="grid grid-rows   md:grid-cols-2 gap-10">
          <div class="flex flex-col gap-5 justify-center p-5">
            <h1 class="text-4xl md:text-6xl font-bold text-[#41A4FF]">
              100 Million Light-Years Away
            </h1>
            <p class="mt-4 text-white">
              This NASA/ESA Hubble Space Telescope image features the dwarf
              galaxy IC 776. This swirling collection of new and old stars is
              located in the constellation Virgo, in the Virgo galaxy cluster,
              100 million light-years from Earth. This NASA/ESA Hubble Space
              Telescope image features the dwarf galaxy IC 776. This swirling
              collection of new and old stars is located in the constellation
              Virgo, in the Virgo galaxy cluster, 100 million light-years from
              Earth.
            </p>
            <button className="text-lg bg-red-800 text-white">
              <Link
                to={
                  "https://science.nasa.gov/missions/hubble/hubble-hunts-visible-light-sources-of-x-rays/"
                }
                target="_blank"
              >
                Read More
              </Link>
            </button>
          </div>
          <div class="">
            <LazyLoadImage
              alt=""
              effect="blur"
              src={light}
              class="rounded-3xl h-[100%] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
