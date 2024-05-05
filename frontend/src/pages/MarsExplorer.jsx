import React, { useState } from "react";
import axios from "axios";
import { Slider } from "antd";
import Loader from "../components/Loader";
import debounce from "lodash/debounce";
import { Image } from "antd";
import { API_KEY } from "../API/API";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MarsExplorer = () => {
  const [isLoading, setLoading] = useState(false);
  const [solLimit, setSolLimit] = useState();
  const [selectedSol, setSelectedSol] = useState();
  const [selectedRover, setSelectedRover] = useState();
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState();
  const [changedSol, setChangedSol] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const [images, setImages] = useState(false);
  const [page, setPage] = useState(1);
  //rover names
  const rover = ["perseverance", "curiosity", "opportunity", "spirit"];

  const getImages = async () => {
    return await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?api_key=${API_KEY}&camera=${selectedCamera}&sol=${selectedSol}&page=${page}`
    );
  };

  //handle rover function
  const handleRover = async (roverName, selectedSol) => {
    setSolLimit(null);
    setChangedSol(false);
    setImages(false);
    setLoading(true);
    setSelectedRover(roverName);
    try {
      const res = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?api_key=${API_KEY}&sol=${
          selectedSol ? selectedSol : 0
        }`
      );
      const photos = res.data.photos;
      setSolLimit(photos[0].rover.max_sol);
      const cameras = photos[0].rover.cameras;
      setCameras(cameras);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //handle slider value
  const handleSliderChange = debounce((value) => {
    setImages(false);
    setSelectedCamera();
    setSelectedSol(value);
    setChangedSol(true);
  }, 300);

  //handle camera
  const handleCamera = async (
    cameraName,
    selectedRover,
    selectedSol,
    cameraFullName
  ) => {
    console.log(cameraName, selectedRover, selectedSol);
    setSelectedCamera(cameraFullName);
    setImages(false);
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?api_key=${API_KEY}&camera=${cameraName}&sol=${selectedSol}&page=${page}`
      );
      setImagesData(res.data?.photos);
      console.log(imagesData);
      setImages(true);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  //handle page changes
  const handleNextPage = async () => {};
  const handlePreviousPage = async () => {};

  //handle image number changes
  const handleNextImage = async () => {};
  const handlePreviousImage = async () => {};

  return (
    <div className="text-[#a1ecfb] font-extrabold px-4 lg:px-12 xl:px-48 mb-48">
      {/* rover name */}
      <div className="text-3xl mt-10 border border-[#26dafd] p-5">
        <h1>
          Rover Name - {selectedRover ? selectedRover : "Select a Rover "}
        </h1>
        <div className="mt-2 border border-[#26dafd]"></div>
        <div className="px-2 lg:px-10 flex flex-wrap justify-between mt-4">
          {rover.map((name, index) => (
            <button
              key={index}
              style={{ minWidth: "calc(50% - 20px)" }}
              className="p-2 lg:p-5 border-2 text-lg border-[#26dafd] rounded-lg mb-4"
              onClick={() => handleRover(name, selectedSol)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      {/* sol */}
      <div>
        {solLimit && (
          <div className="text-3xl mt-10 border border-[#26dafd] p-5">
            <h1>
              Sol -{" "}
              {selectedSol
                ? selectedSol
                : "Select a Sol Value by Draging the Dot"}
            </h1>
            <div className="mt-2 border border-[#26dafd]"></div>
            <Slider
              defaultValue={1}
              max={solLimit}
              onChange={handleSliderChange}
            />
          </div>
        )}
      </div>
      {/* cameras */}
      <div>
        {changedSol && (
          <div className="text-3xl mt-10 border border-[#26dafd] p-5">
            <h1>
              Cameras -{" "}
              {selectedCamera
                ? selectedCamera
                : "Select a Camera to View Images"}
            </h1>
            <div className="mt-2 border border-[#26dafd]"></div>
            <div className="px-2 lg:px-10 flex flex-wrap justify-between mt-4">
              {cameras.map((camera, index) => (
                <button
                  key={index}
                  className="p-2 lg:p-5 border-2 border-[#26dafd] text-sm rounded-lg mb-4"
                  style={{ minWidth: "calc(50% - 20px)" }}
                  onClick={(e) =>
                    handleCamera(
                      camera.name,
                      selectedRover,
                      selectedSol,
                      camera.full_name
                    )
                  }
                >
                  {camera.full_name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* images */}
      <div>
        {images && (
          <div className="text-3xl mt-10 border border-[#26dafd] p-5">
            <h1>Images</h1>
            <div className="px-2 lg:px-10 mt-4">
              {imagesData.length > 0 ? (
                imagesData.map((image, index) => (
                  <div
                    key={index}
                    className="p-2 lg:p-5 border-2 border-[#26dafd] text-sm flex flex-row justify-evenly rounded-lg mb-4"
                    style={{ minWidth: "calc(50% - 20px)" }}
                  >
                    {index + 1}/{imagesData.length}
                    <div>
                      {" "}
                      <Image.PreviewGroup
                        preview={{
                          onChange: (current, prev) =>
                            console.log(
                              `current index: ${current}, prev index: ${prev}`
                            ),
                        }}
                      >
                        {/* <LazyLoadImage
                          alt=""
                          effect="blur"
                          src={image.img_src}
                          className="p-5"
                          width={200}
                        /> */}
                        <Image
                          width={200}
                          src={image.img_src}
                          className="p-5"
                        />
                      </Image.PreviewGroup>
                    </div>
                    <div className="p-2 lg:p-5 border-2 border-[#26dafd] text-sm grid grid-rows rounded-lg mb-4">
                      <div className="text-xl text-white">IMAGE DETAILS</div>
                      <div>Rover Name : {image.rover.name}</div>
                      <div>Camera Name : {image.camera.full_name}</div>
                      <div>Earth Date : {image.earth_date}</div>
                      <div>Sol : {image.sol}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No images found ! Select another camera</div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Loader */}
      {isLoading && <Loader />}
    </div>
  );
};

export default MarsExplorer;
