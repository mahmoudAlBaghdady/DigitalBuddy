import React, { FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAsyncAddTransaction,
  fetchAsyncAllTransactions,
  fetchAsyncSingleTransaction,
  fetchAsyncUpdateTransaction,
  generateAmounts,
  generatePercentages,
  generateTotal,
  generateTotalExpenses,
  getSingleTransaction,
} from "../../store/ExpenseTracker/ExpenseTrackerSlice";
import { AppDispatch } from "../../store/store";
import ExpenseFormValidation from "../Helpers/FormValidation/ExpenseFormValidation";
import { succesToast } from "../Helpers/Utilities/Toast";
import moment from "moment";

interface Props {
  _id?: string;
  setModalShow?: (value: boolean) => void;
}

const ETForm = ({ _id, setModalShow }: Props) => {
  const {
    setTransaction,
    transaction,
    onChangeHandler,
    nameFocus,
    amountFocus,
    nameClassnameHandler,
    amountClassnameHandler,
    typeClassnameHandler,
    btnClassname,
    reset,
  } = ExpenseFormValidation();

  const dispatch = useDispatch<AppDispatch>();
  const singleTransaction = useSelector(getSingleTransaction);
  useEffect(() => {
    _id && dispatch(fetchAsyncSingleTransaction(_id));
    setTransaction({
      name: singleTransaction.name,
      amount: singleTransaction.amount,
      type: singleTransaction.type,
      date: singleTransaction.date,
    });
  }, [_id]);

  let btnText = _id ? "Update" : "Add";
  let headerText = _id ? "Update" : "Create";
  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(transaction);
    if (transaction.date === undefined) {
      transaction.date = moment().format("YYYY-MM-DD");
    }
    if (_id) {
      const args = { transaction, singleTransaction };
      await dispatch(fetchAsyncUpdateTransaction(args));
      await dispatch(fetchAsyncAllTransactions());
      await dispatch(generateAmounts());
      await dispatch(generateTotal());
      await dispatch(generateTotalExpenses());
      await dispatch(generatePercentages());

      succesToast("Successfully Updated Transaction");
      setModalShow!(false);
    } else if (!_id) {
      await dispatch(fetchAsyncAddTransaction(transaction));
      await dispatch(fetchAsyncAllTransactions());
      await dispatch(generateAmounts());
      await dispatch(generateTotal());
      await dispatch(generateTotalExpenses());
      await dispatch(generatePercentages());

      succesToast("Successfully Added A New Transaction");
    }
    reset();
  };
  console.log(moment().format("MM-DD-YYYY"));
  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <fieldset>
          <legend className="fw-bold fs-2 mb-3 mt-2 text-center">
            {headerText} Transactions
          </legend>
          <div className="form-group mb-2 ">
            <input
              type="text"
              placeholder="salary , house , rent"
              className={nameClassnameHandler()}
              value={transaction.name}
              name="name"
              onBlur={nameFocus}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group mb-2">
            <select
              className={typeClassnameHandler()}
              onChange={onChangeHandler}
              name={"type"}
              id="type"
              value={transaction.type}
            >
              <option value="1" disabled selected>
                Select your option
              </option>
              <option value={"bill"}>Bills</option>
              <option value={"investment"}>Investments</option>
              <option value={"income"}>Income</option>
              <option value={"saving"}>Savings</option>
              <option value={"purchase"}>Purchases</option>
            </select>
          </div>
          <div className="form-group">
            <div className="input-group mb-2">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className={amountClassnameHandler()}
                placeholder="amount"
                value={transaction.amount}
                name={"amount"}
                onBlur={amountFocus}
                onChange={onChangeHandler}
                aria-label="Amount (to the nearest dollar)"
              />
              <span className="input-group-text">.00</span>
            </div>
          </div>
          <div className="form-group mb-2 ">
            <input
              type="date"
              className="form-control"
              id="inputValid"
              value={transaction.date}
              name={"date"}
              onChange={onChangeHandler}
            />
          </div>
          <button className={btnClassname}>{btnText} Transaction</button>
        </fieldset>
      </form>
    </>
  );
};

export default ETForm;
