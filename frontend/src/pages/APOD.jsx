import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { DatePicker, Space } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const APOD = () => {
  const [data, setData] = useState({});
  const currentDate = new Date().toISOString().split("T")[0];
  const [isLoader, setIsLoader] = useState(false);

  const [date, setDate] = useState(currentDate);
  useEffect(() => {
    const getAPOD = async () => {
      try {
        setIsLoader(true);
        const res = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=cTdgtkyT80G2IaNxwswbHNF28SlIj0U6w4RdctAk&date=${date}`
        );
        setData(res.data);
        setIsLoader(false);
        console.log("url is", res);
      } catch (error) {
        setIsLoader(false);
        console.log("error is", error);
      }
    };
    getAPOD();
  }, [date]);
  const onChange = (date, dateString) => {
    console.log(dateString);
    setDate(dateString);
  };
  function disabledDate(current) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current > today;
  }
  return (
    <div>
      {isLoader ? (
        <Loader />
      ) : (
        <div className="px-48 mb-16">
          <Space direction="vertical" className="flex mb-5 text-right">
            <DatePicker
              onChange={onChange}
              style={{ backgroundColor: "white", border: "2px solid #7F1D1D" }}
              disabledDate={disabledDate}
            />
          </Space>
          <h1 className="text-5xl mb-10 text-[#a1ecfb] text-center">
            Astronomy Picture of the Day
          </h1>
          <p className="text-5xl mb-10 text-red-800 text-center">
            {" "}
            {data.date}
          </p>
          <p className="text-2xl mb-10 text-white text-center">
            {data.explanation}
          </p>
          <div className="flex justify-center border-2 border-cyan-100">
            <LazyLoadImage
              alt=""
              effect="blur"
              src={data.url}
              className="max-w-[100%] max-h-auto "
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default APOD;
