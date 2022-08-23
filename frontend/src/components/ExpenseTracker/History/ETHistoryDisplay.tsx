import React, { useState, MouseEvent } from "react";
import { removedToast } from "../../Helpers/Utilities/Toast";
import { TransactionProps } from "../../Helpers/Interface/ExpenseTracker";
import ETFormModal from "../ETFormModal";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import {
  fetchAsyncAllTransactions,
  fetchAsyncDeleteTransaction,
  fetchAsyncSingleTransaction,
  generateAmounts,
  generatePercentages,
  generateTotal,
  generateTotalExpenses,
} from "../../../store/ExpenseTracker/ExpenseTrackerSlice";
import moment from "moment";

interface Props {
  item: TransactionProps;
  t: string;
}

const ETHistoryDisplay = ({ item, t }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { name, date, _id, type, amount } = item;
  const [modalShow, setModalShow] = useState(false);
  const deleteHandler = async (e: MouseEvent<HTMLElement>) => {
    await dispatch(fetchAsyncDeleteTransaction(_id));
    await dispatch(fetchAsyncAllTransactions());
    await dispatch(generateAmounts());
    await dispatch(generateTotal());
    await dispatch(generateTotalExpenses());
    await dispatch(generatePercentages());
    removedToast("Successfully removed transaction");
  };
  let color = "";
  switch (type) {
    case "bill":
      color = "danger";
      break;
    case "income":
      color = "light";
      break;
    case "investment":
      color = "info";
      break;
    case "purchase":
      color = "warning";
      break;
    case "saving":
      color = "primary";
      break;
    default:
      color = "light";
  }
  const clas = t === "filtered" ? "" : "col-12";
  return (
    <>
      <div className={clas}>
        <div
          className={`alert  alert-${color ?? "dark"} w-100 `}
          style={{
            paddingTop: "6.5px",
            paddingBottom: "6.5px",
            marginRight: "30px",
          }}
        >
          <h4 className="d-inline  ">
            <div
              data-toggle="modal"
              data-target="#exampleModal"
              role="button"
              onClick={async () => {
                await dispatch(fetchAsyncSingleTransaction(_id));
                setModalShow(true);
              }}
            >
              {name ?? ""}
            </div>
          </h4>
          {t === "filtered" && (
            <>
            <span className="">
              <h6 className="d-inline ">${amount}</h6>
            </span>
            <span className="">
              <p className="d-block ">{moment(date).format("YYYY-MM-DD")}</p>
            </span>
            </>
          )}
          <span
            className={`d-inline pb-5   rounded-pill badge my-auto bg-${
              color ?? "dark"
            }`}
            style={{ right: "15px", top: "10px", position: "absolute" }}
          >
            <i
              role={"button"}
              className="fa fa-trash fa-2x d-inline "
              aria-hidden="true"
              onClick={deleteHandler}
            ></i>
          </span>
        </div>
      </div>
      <ETFormModal
        show={modalShow}
        setModalShow={setModalShow}
        name={name}
        color={color}
        _id={_id}
      />
    </>
  );
};

export default ETHistoryDisplay;
