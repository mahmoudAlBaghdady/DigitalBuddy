import React from "react";
import { useSelector } from "react-redux";
import { getAllTransactions } from "../../../store/ExpenseTracker/ExpenseTrackerSlice";
import ETHistoryDisplay from "./ETHistoryDisplay";


const ETRecentHistory = () => {

    const transactions = useSelector(getAllTransactions)

  let recentTransactions = transactions?.slice(-4).reverse();

  return (
    <>
      <div className="my-1 mt-2">
        <h2 className="text-center">Recent Transactions</h2>
        {recentTransactions.map((e: any, i: number) => {
          return <ETHistoryDisplay t={'recent'}  item={e} key={i} />;
        })}
      </div>
    </>
  );
};

export default ETRecentHistory;
