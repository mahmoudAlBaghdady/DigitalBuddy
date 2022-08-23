import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  fetchAsyncAllTransactions,
  generateAmounts,
  generatePercentages,
  generateTotal,
  generateTotalExpenses,
  getAllTransactions,
  getBillsTotal,
  getInvestmentsTotal,
  getPurchasesTotal,
  getSavingsTotal,
  getTotal,
} from "../../store/ExpenseTracker/ExpenseTrackerSlice";
import { useSelector } from "react-redux";
import ETPills from "./ETPills";
import ETForm from "./ETForm";
import ETRecentHistory from "./History/ETRecentHistory";

Chart.register(ArcElement);

const ExpenseTracker = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const load = async () => {
      try {
        await dispatch(fetchAsyncAllTransactions());
        await dispatch(generateAmounts());
        await dispatch(generateTotal());
        await dispatch(generateTotalExpenses());
        await dispatch(generatePercentages());
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [dispatch]);

  const total = useSelector(getTotal);
  const investmentsAmount = useSelector(getInvestmentsTotal);
  const savingsAmount = useSelector(getSavingsTotal);
  const purchasesAmount = useSelector(getPurchasesTotal);
  const billsAmount = useSelector(getBillsTotal);
  const transactions = useSelector(getAllTransactions);

  console.log(investmentsAmount);

  const generateConfig = (transactionsAmount: {
    billsAmount: number;
    investmentsAmount: number;
    savingsAmount: number;
    purchasesAmount: number;
  }) => {
    const { billsAmount, investmentsAmount, savingsAmount, purchasesAmount } =
      transactionsAmount;

    return {
      data: {
        datasets: [
          {
            label: "My Transactions",
            data: [
              billsAmount,
              investmentsAmount,
              savingsAmount,
              purchasesAmount,
            ],
            backgroundColor: ["#FD7E14", "#39CBFB", "#EA418C", "#FFC61A"],
            hoverOffset: 3,
            borderRadius: 30,
            spacing: 10,
          },
        ],
      },
      options: {
        cutout: 130,
      },
    };
  };
  const transactionsAmount = {
    billsAmount,
    investmentsAmount,
    savingsAmount,
    purchasesAmount,
  };
  console.log(transactions.length);
  const configs = generateConfig(transactionsAmount);
  let topPercentage: number = 103;
  let topPercentagesm: number = 134;

  switch (transactions.length) {
    case transactions.length > 4:
      topPercentage = 103;
      topPercentagesm = 134;
      break;
    case 3:
      topPercentage = 98;
      topPercentagesm = 127;

      break;
    case 2:
      topPercentage = 93;
      topPercentagesm = 120;

      break;
    case 1:
      topPercentage = 88;
      topPercentagesm = 113;

      break;
    default:
      break;
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <ETPills />
        </div>
    
        <div className="row justify-content-center">
          <div className="col-lg-4 col-10 my-4">
            <ETForm />
            {transactions.length !== 0 && <ETRecentHistory />}
          </div>
          {transactions.length !== 0 && (
            <div className="col-lg-6 col-10">
              <div
                className="col-lg-8 my-3 col-md-10 col-10 p-md-3 mx-auto d-none d-lg-block "
                style={{ width: "450px", height: "450px" }}
              >
                <h3
                  className="text-center mx-auto mb-5 "
                  style={{
                    position: "absolute",
                    left: 450,
                    right: 0,
                    top: "56%",
                  }}
                >
                  Total
                  <span className="fs-1 d-block user-select-none">
                    ${total}
                  </span>{" "}
                </h3>
                <Doughnut {...configs} className=""></Doughnut>
              </div>
              <div
                className="col-lg-8 my-3 col-md-10 col-10 p-md-3 mx-auto d-none d-md-block d-lg-none "
                style={{ width: "450px", height: "450px" }}
              >
                <h3
                  className="text-center mx-auto mb-5 "
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${topPercentage}%`,
                  }}
                >
                  Total
                  <span className="fs-1 d-block user-select-none">
                    ${total}
                  </span>{" "}
                </h3>
                <Doughnut {...configs} className=""></Doughnut>
              </div>
              <div
                className="col-lg-8 my-3 col-md-10 col-10 p-md-3 mx-auto d-sm-block d-md-none "
                style={{ width: "300px", height: "300px" }}
              >
                <h3
                  className="text-center mx-auto mb-5 "
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${topPercentagesm}%`,
                  }}
                >
                  Total
                  <span className="fs-1 d-block user-select-none">
                    ${total}
                  </span>{" "}
                </h3>
                <Doughnut {...configs} className=""></Doughnut>
              </div>
              <div className="col-lg-9 mx-auto col-md-8 col-12 ">
                <Labels />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
