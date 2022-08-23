import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAsyncLogin } from "../../store/Auth/AuthSlice";
import { AppDispatch } from "../../store/store";
import LoginFormValidation from "../Helpers/FormValidation/LoginFormValidation";
import { UserLogin } from "../Helpers/Interface/Auth";
import { removedToast, succesToast } from "../Helpers/Utilities/Toast";
import "./LoginSignUp.css";
const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const userInfo = localStorage.getItem("token");
    if (userInfo) {
      navigate("/videos");
    }
  }, [navigate]);
  const {
    setUser,
    user,
    passwordError,
    emailBlur,
    onChangeHandler,
    passwordBlur,
    emailClassnameHandler,
    passwordClassNameHandler,
    btnClassname,
    userIsValid,
    reset,
  } = LoginFormValidation();
  // const initialState = {
  //   email: "",
  //   password: "",
  // };
  // const [login, setLogin] = useState<UserLogin>(initialState);

  // const loginOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setLogin({ ...login, [e.target.name]: e.target.value });
  // };
  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userIsValid) {
      try {
        await dispatch(fetchAsyncLogin(user));
        reset();
        succesToast("Successfully Logged In ");
        navigate("/videos");
      } catch (error) {
        removedToast("Invalid Email Or Password");
      }
    }
  };
  return (
    <>
      <div className="container-fluid d-none d-lg-block ">
        <div className="row align-items-center bg-dark">
          <div className="col-5 ">
            <div className="row ">
              <h1 className="text-center display-4">Login</h1>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="alert alert-dismissible alert-secondary mx-1 ">
                  <form onSubmit={formSubmitHandler}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className={emailClassnameHandler()}
                        id="email"
                        aria-describedby="emailHelp"
                        value={user?.email}
                        name="email"
                        onChange={onChangeHandler}
                        onBlur={emailBlur}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className={passwordClassNameHandler()}
                        id="password"
                        name="password"
                        value={user?.password}
                        onChange={onChangeHandler}
                        onBlur={passwordBlur}
                      />
                      <div className="invalid-feedback text-dark">
                        Minimum eight characters, at least one uppercase letter,
                        one lowercase letter and one number
                      </div>
                    </div>

                    <button type="submit" className={btnClassname}>
                      Login
                    </button>
                  </form>
                  <div className="card-footer text-muted bg-body text-center">
                    Dont Have An Account?{" "}
                    <Link to={"/register"} className="text-light ">
                      Register
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
      {/* for md screens */}
      <div className="container-fluid d-none d-md-block d-lg-none  landingImageMd vh-100">
        <div className="row ">
          <div className="col-12 text-center my-3">
            <h1 className="display-1 "> Digital Buddy</h1>
            <h1 className="display-4 text-center user-select-none mt-2">
              Your Personal Reminder, Helper & Secret Holder
            </h1>
          </div>
        </div>
        <div className="row align-items-center justify-content-center  ">
          <div className="col-md-10 col-11 mb-4">
            <div className="card border-dark mb-2 ">
              <div className="card-header fw-bolder fs-4 text-center">
                Login
              </div>
              <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={emailClassnameHandler()}
                      id="email"
                      aria-describedby="emailHelp"
                      value={user?.email}
                      name="email"
                      onChange={onChangeHandler}
                      onBlur={emailBlur}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={passwordClassNameHandler()}
                      id="password"
                      name="password"
                      value={user?.password}
                      onChange={onChangeHandler}
                      onBlur={passwordBlur}
                    />
                    <div className="invalid-feedback text-dark">
                      Minimum eight characters, at least one uppercase letter,
                      one lowercase letter and one number
                    </div>
                  </div>

                  <button type="submit" className={btnClassname}>
                    Login
                  </button>
                </form>
                <div className="card-footer text-muted bg-body text-center">
                  Dont Have An Account?{" "}
                  <Link to={"/register"} className="text-light">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* for sm screens */}
      <div className=" container-fluid landingImageMd  d-md-none  d-lg-none  vh-100">
        <div className="row ">
          <div className="col-12 text-center mt-2 mb-1">
            <h1 className="display-1 "> Digital Buddy</h1>
            <h1 className="display-4 text-center user-select-none mt-2">
              Your Personal Reminder, Helper & Secret Holder
            </h1>
          </div>
        </div>
        <div className="row align-items-center justify-content-center  ">
          <div className="col-md-10 col-11 mb-1">
            <div className="card border-dark mb-2 ">
              <div className="card-header fw-bolder fs-4 text-center">
                Login
              </div>
              <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={emailClassnameHandler()}
                      id="email"
                      aria-describedby="emailHelp"
                      value={user?.email}
                      name="email"
                      onChange={onChangeHandler}
                      onBlur={emailBlur}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={passwordClassNameHandler()}
                      id="password"
                      name="password"
                      value={user?.password}
                      onChange={onChangeHandler}
                      onBlur={passwordBlur}
                    />
                    <div className="invalid-feedback text-dark">
                      Minimum eight characters, at least one uppercase letter,
                      one lowercase letter and one number
                    </div>
                  </div>

                  <button type="submit" className={btnClassname}>
                    Login
                  </button>
                </form>
                <div className="card-footer text-muted bg-body text-center">
                  Dont Have An Account?{" "}
                  <Link to={"/register"} className="text-light">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
