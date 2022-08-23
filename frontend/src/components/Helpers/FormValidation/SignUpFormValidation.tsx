import { ChangeEvent, FocusEvent, useState } from "react";
import { UserRegistration } from "../Interface/Auth";

const initialState = {
  email: "",
  confirmPassword: "",
  password: "",
  pic: "",
  name: "",
};
const SignUpFormValidation = () => {
  const [user, setUser] = useState<UserRegistration>(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  type inputChange = ChangeEvent<HTMLInputElement>;
  type textFocus = FocusEvent<HTMLInputElement>;

  const [nameIsTouched, setNameIsTouched] = useState(false);

  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [confirmPasswordIsTouched, setConfirmPasswordIsTouched] =
    useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const onChangeHandler = (event: inputChange) =>
    setUser({ ...user, [event.target.name]: event.target.value });
  const confirmPasswordonChangeHandler = (event: inputChange) =>
    setConfirmPassword(event.target.value);
  const nameFocus = (event: textFocus) => {
    setNameIsTouched(true);
  };

  const passwordFocus = (event: textFocus) => {
    setPasswordIsTouched(true);
  };
  const confirmPasswordFocus = (event: textFocus) => {
    setConfirmPasswordIsTouched(true);
  };
  const emailFocus = (event: textFocus) => {
    setEmailIsTouched(true);
  };
  const emailValidation =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { name, password, email } = user;
  let nameIsValid: boolean = name?.trim() !== "";
  const passwordValidtion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  let passwordIsValid: boolean = passwordValidtion.test(password);
  let confirmPasswordIsValid: boolean =
    passwordValidtion.test(confirmPassword) && password === confirmPassword;
  let emailIsValid: boolean = emailValidation.test(email.toLowerCase());

  let userIsValid: boolean =
    nameIsValid && passwordIsValid && confirmPasswordIsValid && emailIsValid;
  const nameError: boolean = !nameIsValid && nameIsTouched;
  const passwordError: boolean = !passwordIsValid && passwordIsTouched;
  const confirmPasswordError: boolean =
    !confirmPasswordIsValid && confirmPasswordIsTouched;
  const emailError = !emailIsValid && emailIsTouched;
  const reset = () => {
    setUser(initialState);
    setNameIsTouched(false);
    setPasswordIsTouched(false);
    setConfirmPasswordIsTouched(false);
    setEmailIsTouched(false);
  };

  const nameClassnameHandler = () => {
    let nameClassname: string;
    if (!nameError && !nameIsTouched) {
      return (nameClassname = "form-control ");
    } else if (!nameError) {
      return (nameClassname = "form-control is-valid ");
    } else if (nameError) {
      return (nameClassname = "form-control is-invalid ");
    }
  };
  const passwordClassnameHandler = () => {
    let passowrdClassname: string;
    if (!passwordError && !passwordIsTouched) {
      return (passowrdClassname = "form-control ");
    } else if (!passwordError) {
      return (passowrdClassname = "form-control is-valid ");
    } else if (passwordError) {
      return (passowrdClassname = "form-control is-invalid ");
    }
  };
  const confirmPasswordClassnameHandler = () => {
    let confirmPassowrdClassname: string;
    if (!confirmPasswordError && !confirmPasswordIsTouched) {
      return (confirmPassowrdClassname = "form-control ");
    } else if (!confirmPasswordError) {
      return (confirmPassowrdClassname = "form-control is-valid ");
    } else if (confirmPasswordError) {
      return (confirmPassowrdClassname = "form-control is-invalid ");
    }
  };
  const emailClassnameHandler = () => {
    let nameClassname: string;
    if (!emailError && !emailIsTouched) {
      return (nameClassname = "form-control ");
    } else if (!emailError) {
      return (nameClassname = "form-control is-valid ");
    } else if (emailError) {
      return (nameClassname = "form-control is-invalid ");
    }
  };
  const btnClassname: string = userIsValid
    ? "btn btn-dark mb-2  w-100 fw-bold "
    : "btn btn-dark mb-2   disabled w-100 fw-bold";

  return {
    setUser,
    user,
    onChangeHandler,
    confirmPasswordonChangeHandler,
    confirmPassword,
    nameFocus,
    passwordFocus,
    confirmPasswordFocus,
    emailFocus,
    nameClassnameHandler,
    emailClassnameHandler,
    confirmPasswordClassnameHandler,
    passwordClassnameHandler,
    btnClassname,
    reset,
  };
};

export default SignUpFormValidation;
