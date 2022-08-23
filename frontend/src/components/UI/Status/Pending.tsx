import React from "react";

interface Props {
  text: string;
}
const Pending = ({ text }: Props) => {
  return (
    <>
      <div className="row my-1">
        <div className=" text-center mt-5">
          <div
            className="spinner-border ms-auto  text-primary"
            role="status"
            aria-hidden="true"
            style={{ width: "10rem", height: "10rem", borderWidth: "1rem" }}
          />
        </div>
      </div>
      <div className="row my-3">
        <div className=" text-center mb-5">
          <h1>{text}</h1>
        </div>
      </div>
    </>
  );
};

export default Pending;
