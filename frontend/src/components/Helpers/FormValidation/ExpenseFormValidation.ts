import React, { ChangeEvent, FocusEvent, useState } from "react";
import { Transaction } from "../Interface/ExpenseTracker";
import moment from "moment";

const ExpenseFormValidation = () => {
  const initialState = {
    name: "",
    amount: 0,
    type: "1",
    date: moment().format("YYYY-MM-DD"),
  };
  const [transaction, setTransaction] = useState<Transaction>(initialState);
  type inputChange =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>;
  type textFocus = FocusEvent<HTMLInputElement>;
  type selectFocus = FocusEvent<HTMLSelectElement>;

  const [nameIsTouched, setNameIsTouched] = useState(false);

  const [amountIsTouched, setAmountIsTouched] = useState(false);
  const [typeIsTouched, setTypeIsTouched] = useState(false);
  const onChangeHandler = (event: inputChange) => {
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
    console.log("transacrion", transaction.date);
  };
  const nameFocus = (event: textFocus) => {
    setNameIsTouched(true);
  };

  const amountFocus = (event: textFocus) => {
    setAmountIsTouched(true);
  };
  const typeFocus = (event: selectFocus) => {
    setTypeIsTouched(true);
  };
  const { name, amount } = transaction;
  let nameIsValid: boolean = name?.trim().length > 0;
  let amountIsValid: boolean = amount > 0;

  let transactionIsValid: boolean =
    nameIsValid && amountIsValid && transaction.type !== "1";

  const nameError: boolean = !nameIsValid && nameIsTouched;
  const amountError: boolean = !amountIsValid && amountIsTouched;

  const reset = () => {
    setTransaction(initialState);
    setNameIsTouched(false);
    setAmountIsTouched(false);
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

  const amountClassnameHandler = () => {
    let amountClassname: string;
    if (!amountError && !amountIsTouched) {
      return (amountClassname = "form-control ");
    } else if (!amountError) {
      return (amountClassname = "form-control is-valid ");
    } else if (amountError) {
      return (amountClassname = "form-control is-invalid ");
    }
  };
  const typeClassnameHandler = () => {
    let typeClassname: string;
    if (!typeIsTouched) {
      return (typeClassname = "form-select ");
    } else if (typeIsTouched && transaction.type !== "1") {
      return (typeClassname = "form-select is-valid");
    } else if (typeIsTouched && transaction.type === "1") {
      return (typeClassname = "form-select is-invalid ");
    }
  };

  const btnClassname: string = transactionIsValid
    ? "btn btn-primary w-100 fw-bold "
    : "btn btn-primary disabled w-100 fw-bold";

  return {
    setTransaction,
    transaction,
    onChangeHandler,
    nameFocus,
    amountFocus,
    nameClassnameHandler,
    amountClassnameHandler,
    btnClassname,
    typeClassnameHandler,
    reset,
  };
};

export default ExpenseFormValidation;
