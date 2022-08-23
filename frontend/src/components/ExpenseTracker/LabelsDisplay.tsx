import React from "react";
interface Props {
  label: {
    type: string;
    color: string;
    percent: number;
  };
}

const LabelsDisplay = ({ label }: Props) => {
  const { color, type, percent } = label;
  return (
    <>
      <div className="col-12  offset-lg-2">
        <div
          className={`alert ms-md-2 alert-${color ?? "dark"} d-none d-lg-block user-select-none`}
          style={{ paddingTop: "5px", paddingBottom: "5px", width: "60%" }}
        >
          <div data-toggle="modal" data-target="#exampleModal" role="button">
            <h4 className="d-inline  ">
              {type ?? ""}
              
              <span
                className={`d-inline  pb-3 rounded-pill badge my-auto bg-${
                  color ?? "dark"
                }`}
                style={{ right: "15px", position: "absolute" }}
              >
                {percent ?? 0}%
              </span>
            </h4>
          </div>
        </div>

 
        <div
          className={`  user-select-none alert ms-md-2 alert-${
            color ?? "dark"
          } w-100 d-md-none d-lg-none`}
          style={{ paddingTop: "5px", paddingBottom: "5px" }}
        >
          <div data-toggle="modal" data-target="#exampleModal" role="button">
            <h4 className="d-inline  ">
              {type ?? ""}
              <span
                className={`d-inline  pb-3 rounded-pill badge my-auto bg-${
                  color ?? "dark"
                }`}
                style={{ right: "15px", position: "absolute" }}
              >
                {percent ?? 0}%
              </span>
            </h4>
          </div>
        </div>
        <div
          className={`alert  alert-${
            color ?? "dark"
          } w-100  user-select-none d-none d-md-block d-lg-none`}
          style={{
            paddingTop: "5px",
            paddingBottom: "5px",
            marginRight: "30px",
          }}
        >
          <div data-toggle="modal" data-target="#exampleModal" role="button">
            <h4 className="d-inline  ">
              {type ?? ""}
              <span
                className={`d-inline  pb-3 rounded-pill badge my-auto bg-${
                  color ?? "dark"
                }`}
                style={{ right: "15px", position: "absolute" }}
              >
                {percent ?? 0}%
              </span>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelsDisplay;
