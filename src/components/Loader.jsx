import React from "react";
import { RocketOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = () => {
  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  return (
    <div className="text-center mb-[500px]" style={overlayStyles}>
      <Spin
        indicator={
          <RocketOutlined
            style={{
              fontSize: 36,
            }}
            spin
          />
        }
      />
    </div>
  );
};

export default Loader;
