import React, { FormEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAsynSignUp } from "../../store/Auth/AuthSlice";
import { AppDispatch } from "../../store/store";
import SignUpFormValidation from "../Helpers/FormValidation/SignUpFormValidation";
import { avatarData } from "../Helpers/Utilities/AvatarData";
import { removedToast, succesToast } from "../Helpers/Utilities/Toast";
import "./LoginSignUp.css";

const SignUp = () => {
  const {
    setUser,
    user,
    onChangeHandler,
    nameFocus,
    confirmPasswordonChangeHandler,
    confirmPassword,
    passwordFocus,
    confirmPasswordFocus,
    emailFocus,
    nameClassnameHandler,
    emailClassnameHandler,
    confirmPasswordClassnameHandler,
    passwordClassnameHandler,
    btnClassname,
    reset,
  } = SignUpFormValidation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { email, password, name, pic } = user;
  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(fetchAsynSignUp(user));
      succesToast("Successfully Register  ");
      navigate("/videos");
    } catch (error) {
      removedToast("Registration Error");
    }
    reset();
  };
  return (
    <>
      {/* md display */}
      <div className="container-fluid landingImageMd overflow-hidden d-md-block d-none  d-lg-none  vh-100 ">
        <div className="row ">
          <div className="col-12 text-center my-2">
            <h1 className="display-1 user-select-none mt-2"> Digital Buddy</h1>
            <h1 className="display-4 text-center user-select-none mt-2">
              Your Personal Reminder, Helper & Secret Holder
            </h1>
          </div>
        </div>
        <div className="row justify-content-center vh-100">
          <div className=" col-sm-10 my-1">
            <div className="card border-dark mb-md-2 ">
              <div className="card-header fw-bolder fs-4 text-center">
                Register
              </div>
              <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={nameClassnameHandler()}
                      id="name"
                      aria-describedby="name"
                      name="name"
                      value={name}
                      onChange={onChangeHandler}
                      onBlur={nameFocus}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={emailClassnameHandler()}
                      id="email"
                      aria-describedby="emailHelp"
                      name="email"
                      onChange={onChangeHandler}
                      onBlur={emailFocus}
                      value={email}
                    />
                  </div>
                  <div className="row">
                    <div className="mb-2 col-md-6">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className={passwordClassnameHandler()}
                        onChange={onChangeHandler}
                        onBlur={passwordFocus}
                        value={password}
                      />
                      <div className="invalid-feedback text-dark">
                        Minimum eight characters, at least one uppercase letter,
                        one lowercase letter and one number
                      </div>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={confirmPasswordClassnameHandler()}
                        onChange={confirmPasswordonChangeHandler}
                        onBlur={confirmPasswordFocus}
                        value={confirmPassword}
                      />
                      <div className="invalid-feedback text-dark">
                        Passwords Doesnt Match
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row  mb-2">
                      <div className="col-8">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => setShow(true)}
                        >
                          Choose Avatar
                        </button>
                      </div>
                      <div className="col-4">
                        <img
                          src={pic}
                          alt=""
                          className="img-thumbnail"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </div>
                    </div>
                    {/* Modal */}
                    <Modal
                      show={show}
                      onHide={() => setShow(false)}
                      backdrop="static"
                      keyboard={false}
                      key={55555}
                      className={` bg-opacity-50`}
                    >
                      <Modal.Header>
                        <Modal.Title className={`text-light`}>
                          Choose Avatar
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {avatarData.map((e: any) => {
                          return (
                            <img
                              src={e.url}
                              alt=""
                              className="img-thumbnail m-1 selected user-select-none"
                              style={{ width: "50px", height: "50px" }}
                              onClick={() => setUser({ ...user, pic: e.url })}
                            />
                          );
                        })}
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          type="button"
                          className="btn btn-dark"
                          data-bs-dismiss="modal"
                          onClick={() => setShow(false)}
                        >
                          Save Avatar
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <button type="submit" className={btnClassname}>
                        Register
                      </button>
                    </div>
                  </div>
                </form>
                <div className="card-footer text-muted bg-body text-center">
                  Already Have An Account?{" "}
                  <Link to={"/login"} className="text-light">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sm display */}

      <div className="container-fluid landingImageMd  d-md-none  d-lg-none  h-100 ">
        <div className="row ">
          <div className="col-12 text-center my-3">
            <h1 className="display-1 user-select-none mt-2"> Digital Buddy</h1>
            <h1 className="display-4 text-center user-select-none mt-2">
              Your Personal Reminder, Helper & Secret Holder
            </h1>{" "}
          </div>
        </div>
        <div className="row justify-content-center vh-100">
          <div className=" col-sm-10 my-1">
            <div className="card border-dark mb-md-2 ">
              <div className="card-header fw-bolder fs-4 text-center">
                Register
              </div>
              <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={nameClassnameHandler()}
                      id="name"
                      aria-describedby="name"
                      name="name"
                      value={name}
                      onChange={onChangeHandler}
                      onBlur={nameFocus}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={emailClassnameHandler()}
                      id="email"
                      aria-describedby="emailHelp"
                      name="email"
                      onChange={onChangeHandler}
                      onBlur={emailFocus}
                      value={email}
                    />
                  </div>
                  <div className="row">
                    <div className="mb-2 col-md-6">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className={passwordClassnameHandler()}
                        onChange={onChangeHandler}
                        onBlur={passwordFocus}
                        value={password}
                      />
                      <div className="invalid-feedback text-dark">
                        Minimum eight characters, at least one uppercase letter,
                        one lowercase letter and one number
                      </div>
                    </div>
                    <div className="mb-2 col-md-6">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={confirmPasswordClassnameHandler()}
                        onChange={confirmPasswordonChangeHandler}
                        onBlur={confirmPasswordFocus}
                        value={confirmPassword}
                      />
                      <div className="invalid-feedback text-dark">
                        Passwords Doesnt Match
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row  mb-2">
                      <div className="col-8">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => setShow(true)}
                        >
                          Choose Avatar
                        </button>
                      </div>
                      <div className="col-4">
                        <img
                          src={pic}
                          alt=""
                          className="img-thumbnail"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </div>
                    </div>
                    {/* Modal */}
                    <Modal
                      show={show}
                      onHide={() => setShow(false)}
                      backdrop="static"
                      keyboard={false}
                      key={55555}
                      className={` bg-opacity-50`}
                    >
                      <Modal.Header>
                        <Modal.Title className={`text-light`}>
                          Choose Avatar
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {avatarData.map((e: any) => {
                          return (
                            <img
                              src={e.url}
                              alt=""
                              className="img-thumbnail m-1 selected user-select-none"
                              style={{ width: "50px", height: "50px" }}
                              onClick={() => setUser({ ...user, pic: e.url })}
                            />
                          );
                        })}
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          type="button"
                          className="btn btn-dark"
                          data-bs-dismiss="modal"
                          onClick={() => setShow(false)}
                        >
                          Save Avatar
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <button type="submit" className={btnClassname}>
                        Register
                      </button>
                    </div>
                  </div>
                </form>
                <div className="card-footer text-muted bg-body text-center">
                  Already Have An Account?{" "}
                  <Link to={"/login"} className="text-light">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* lg display */}
      <div className="container-fluid d-none d-lg-block ">
        <div className="row align-items-center bg-dark">
          <div className="col-5 ">
            <div className="row ">
              <h1 className="text-center display-4">Register</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="alert alert-dismissible alert-secondary mx-1 ">
                  <form onSubmit={formSubmitHandler}>
                    <div className="mb-2">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className={nameClassnameHandler()}
                        id="name"
                        aria-describedby="name"
                        name="name"
                        value={name}
                        onChange={onChangeHandler}
                        onBlur={nameFocus}
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className={emailClassnameHandler()}
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        onChange={onChangeHandler}
                        onBlur={emailFocus}
                        value={email}
                      />
                    </div>
                    <div className="row">
                      <div className="mb-2 col-md-6">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className={passwordClassnameHandler()}
                          onChange={onChangeHandler}
                          onBlur={passwordFocus}
                          value={password}
                        />
                        <div className="invalid-feedback text-dark">
                          Minimum eight characters, at least one uppercase
                          letter, one lowercase letter and one number
                        </div>
                      </div>
                      <div className="mb-2 col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className={confirmPasswordClassnameHandler()}
                          onChange={confirmPasswordonChangeHandler}
                          onBlur={confirmPasswordFocus}
                          value={confirmPassword}
                        />
                        <div className="invalid-feedback text-dark">
                          Passwords Doesnt Match
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="row  mb-2">
                        <div className="col-8">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => setShow(true)}
                          >
                            Choose Avatar
                          </button>
                        </div>
                        <div className="col-4">
                          <img
                            src={pic}
                            alt=""
                            className="img-thumbnail"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </div>
                      </div>
                      {/* Modal */}
                      <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        backdrop="static"
                        keyboard={false}
                        key={55555}
                        className={` bg-opacity-50`}
                      >
                        <Modal.Header>
                          <Modal.Title className={`text-light`}>
                            Choose Avatar
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {avatarData.map((e: any) => {
                            return (
                              <img
                                src={e.url}
                                alt=""
                                className="img-thumbnail m-1 selected user-select-none"
                                style={{ width: "50px", height: "50px" }}
                                onClick={() => setUser({ ...user, pic: e.url })}
                              />
                            );
                          })}
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            type="button"
                            className="btn btn-dark"
                            data-bs-dismiss="modal"
                            onClick={() => setShow(false)}
                          >
                            Save Avatar
                          </button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <button type="submit" className={btnClassname}>
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="card-footer text-muted bg-body text-center">
                    Already Have An Account?{" "}
                    <Link to={"/login"} className="text-light">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7 landingImage">
            <h1 className="display-1 text-center user-select-none my-5">
              Digital Buddy
            </h1>
            <h1 className="display-4 text-center user-select-none my-5">
              Your Personal Reminder, Helper & Secret Holder
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
