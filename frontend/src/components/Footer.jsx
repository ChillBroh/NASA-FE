import React from "react";
import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0  bg-black p-4 px-10 flex flex-rows justify-between gap-8 text-white">
      <div className="">
        <h3 className="text-2xl font-bold text-red-900">
          Copyright @2023 <span className="text-white">NASA</span>
        </h3>
      </div>
      <div>
        <div className="flex text-red-800 gap-10 md:w-28">
          <FaWhatsappSquare size={30} />
          <FaFacebookSquare size={30} />
          <FaInstagramSquare size={30} />
          <FaTwitterSquare size={30} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
