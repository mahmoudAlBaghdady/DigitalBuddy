import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAsyncAllTransactions } from "../../store/ExpenseTracker/ExpenseTrackerSlice";
import { AppDispatch } from "../../store/store";

const ETPills = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="row ">
      <ul className="nav nav-pills  justify-content-center my-2">
        <li className="nav-item mx-1">
          <Link className="nav-link bg-primary" to={"/expenseTracker"}>
            Transactions
          </Link>
        </li>

        <li className="nav-item mx-1">
          <Link
            className="nav-link  bg-warning"
            to={"/expenseTracker/history"}
            onClick={async () => await dispatch(fetchAsyncAllTransactions())}
          >
            History
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ETPills;
