import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generatePercentages,
  getBillsPercentage,
  getInvestmentsPercentage,
  getPurchasesPercentage,
  getSavingsPercentage,
} from "../../store/ExpenseTracker/ExpenseTrackerSlice";
import { AppDispatch } from "../../store/store";

import LabelsDisplay from "./LabelsDisplay";

const Labels = () => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(generatePercentages());

  const billsPercentage = useSelector(getBillsPercentage);
  const investmentspercentage = useSelector(getInvestmentsPercentage);
  const savingsPercentage = useSelector(getSavingsPercentage);
  const purchasesPercentage = useSelector(getPurchasesPercentage);
  console.log(isNaN(billsPercentage));
  const labels = [
    {
      type: "Bills",
      color: "danger",
      percent:
        isNaN(billsPercentage) === false
          ? billsPercentage > 10
            ? billsPercentage
            : "0" + billsPercentage
          : 0,
    },

    {
      type: "Invetments",
      color: "info",
      percent:
        isNaN(investmentspercentage) === false
          ? investmentspercentage > 10
            ? investmentspercentage
            : "0" + investmentspercentage
          : 0,
    },
    {
      type: "Purchases",
      color: "warning",
      percent:
        isNaN(purchasesPercentage) === false
          ? purchasesPercentage > 10
            ? purchasesPercentage
            : "0" + purchasesPercentage
          : 0,
    },
    {
      type: "Savings",
      color: "primary",
      percent:
        isNaN(savingsPercentage) === false
          ? savingsPercentage > 10
            ? savingsPercentage
            : "0" + savingsPercentage
          : 0,
    },
  ];
  return (
    <>
      {labels.map((l: any, i: number) => {
        return <LabelsDisplay label={l} key={i} />;
      })}
    </>
  );
};

export default Labels;
