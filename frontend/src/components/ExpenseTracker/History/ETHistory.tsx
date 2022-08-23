import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAsyncAllTransactions,
  getAllBills,
  getAllIncome,
  getAllInvestments,
  getAllPurchases,
  getAllSavings,
  getAllTransactions,
  Transactionfilters,
  transactionSearchText,
} from "../../../store/ExpenseTracker/ExpenseTrackerSlice";
import { AppDispatch } from "../../../store/store";
import Search from "../../UI/Search/Search";
import ETPills from "../ETPills";
import ETHistoryDisplay from "./ETHistoryDisplay";
import ETHistoryModal from "./ETHistoryModal";

const ETHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const load = async () => {
      await dispatch(fetchAsyncAllTransactions());
    };
    load();
  }, [dispatch]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const allTransactions = useSelector(getAllTransactions);
  const searchText = useSelector(transactionSearchText);
  const filtering = useSelector(Transactionfilters);
  const bills = useSelector(getAllBills);
  const purchases = useSelector(getAllPurchases);
  const savings = useSelector(getAllSavings);
  const income = useSelector(getAllIncome);
  const investments = useSelector(getAllInvestments);

  let transactionCategory = allTransactions;
  console.log(allTransactions);
  switch (filtering.category) {
    case "All":
      transactionCategory = allTransactions;
      break;
    case "bill":
      transactionCategory = bills;
      break;
    case "investment":
      transactionCategory = investments;
      break;
    case "income":
      transactionCategory = income;
      break;
    case "saving":
      transactionCategory = savings;
      break;
    case "purchase":
      transactionCategory = purchases;
      break;
    default:
      break;
  }

  const filteredTransactions = transactionCategory.filter(
    (e: { name(name: any): unknown; date: any; amount: number }) => {
      console.log("first one date",e.date)
      console.log("second one",moment(e.date).unix());

      if (
        e.amount >= filtering.price[0] &&
        e.amount <= filtering.price[1] &&
        moment(e.date).unix() >= filtering.date1 &&
        moment(e.date).unix() <= filtering.date2
      ) {
        console.log(moment(e.date).unix());

        return e;
      }
    }
  );

  let Transactions;
  if (searchText === "") {
    Transactions = filteredTransactions;
  } else if (searchText.length > 0) {
    Transactions = filteredTransactions.filter((e: { name: string }) =>
      e.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <ETPills />
        </div>
        <div className="row mb-3">
          <h1 className="display-4">Expense History</h1>
        </div>
        <div className="row justify-content-center ">
          <div className="col-2 d-none d-md-block"></div>
          <div className="col-md-6  my-auto">
            <Search />
          </div>
          <div className="col-md-4 my-3 text-center">
            <button
              type="button"
              className="btn btn-primary text-secondary"
              onClick={() => setShowFilterModal(true)}
            >
              <FontAwesomeIcon
                icon={faFilter}
                className=" text-secondary me-3"
              />{" "}
              Filter
            </button>
          </div>
        </div>
        <div className="row mt-md-3 mb-5 justify-content-center">
          <div className="col-md-10  ">
            {Transactions.map((e: any, i: number) => {
              return <ETHistoryDisplay t={"filtered"} item={e} key={i} />;
            })}
          </div>
        </div>
      </div>
      <ETHistoryModal
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
      />
    </>
  );
};

export default ETHistory;

