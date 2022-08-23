import React from "react";
import { useNavigate } from "react-router";

const Fail = () => {
  const navigate = useNavigate();
  return (
    <div className="row my-1">
      <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 my-5 col-11 mx-auto">
        <div className="alert alert-dismissible alert-danger text-secondary">
          <button
            type="button"
            className="btn-close "
            data-bs-dismiss="alert"
          />
          <h3 className="alert-heading display-2">Server Error</h3>
          <h4 className="mb-0 text-secondary">
            We Are currently facing some server errors you have nothing to do
            with this <br />
            Please try again later .
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Fail;
