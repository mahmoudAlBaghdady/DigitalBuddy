import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Slider } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  filtering,
  getAllTransactions,
} from "../../../store/ExpenseTracker/ExpenseTrackerSlice";
import { AppDispatch } from "../../../store/store";
import moment from "moment";

interface Props {
  showFilterModal: boolean;
  setShowFilterModal: (value: boolean) => void;
}

const ETHistoryModal = ({ showFilterModal, setShowFilterModal }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(filtering(filters));
  }, [dispatch]);
  const allTransactions = useSelector(getAllTransactions);

  let maxValue =
    Math.max(...allTransactions.map((o: any) => o.amount)) === -Infinity
      ? 10000000
      : Math.max(...allTransactions.map((o: any) => o.amount));

  const [date1, setDate1] = useState(
    moment().subtract(1, "years").format("YYYY-MM-DD")
  );
  const [date2, setDate2] = useState(
    moment(date1).add(3, "years").format("YYYY-MM-DD")
  );

  const [price, setPrice] = useState<number[]>([0, maxValue]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  const [category, setCategory] = useState("All");

  const reset = async () => {
    setCategory("All");
    setPrice([0, maxValue]);
    setDate1(moment().subtract(1, "years").format("YYYY-MM-DD"));
    setDate2(moment(date1).add(3, "years").format("YYYY-MM-DD"));
    const resetFilters = {
      category: "All",
      price: [0, maxValue],
      date1: moment().subtract(1, "years").unix(),
      date2: moment(date1).add(1, "years").unix(),
    };
    await dispatch(filtering(resetFilters));
  };
  const filters = {
    category,
    price,
    date1: moment(date1).unix(),
    date2: moment(date2).unix(),
  };
  return (
    <>
      <Modal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className={`bg-info bg-opacity-50`}
        centered
      >
        <Modal.Header closeButton className="bg-dark ">
          <Modal.Title className={`text-light`}>
            FIlter Transactions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div className="col-12 my-2">
            <legend>Transaction Category</legend>
          </div>
          <div className="form-group mb-2">
            <select
              className="form-select"
              onChange={(e: any) => {
                setCategory(e.target.value);
              }}
              name={"type"}
              id="type"
              value={category}
            >
              <option value="All" selected>
                All Categories
              </option>

              <option value={"bill"}>Bills</option>
              <option value={"investment"}>Investments</option>
              <option value={"income"}>Income</option>
              <option value={"saving"}>Savings</option>
              <option value={"purchase"}>Purchases</option>
            </select>
          </div>
          {/* price */}
          <div className="col-12 my-4">
            <legend>Price Range</legend>
          </div>
          <div className="col-12 text-center ">
            <div className="row">
              <div className="col-2">
                <legend className="text-warning">$0</legend>
              </div>
              <div className="col-8">
                <Slider
                  getAriaLabel={() => "amount range"}
                  value={price}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  min={0}
                  name="price"
                  max={maxValue}
                />
              </div>
              <div className="col-2">
                <legend className="text-warning">${maxValue}</legend>
              </div>
            </div>
          </div>

          {/* date */}
          <div className="col-12 my-4">
            <legend>Date Range</legend>
          </div>
          <div className="row text-center ">
            <div className="col-6">
              <div className="form-group text-center my-2 ">
                <input
                  type="date"
                  className="form-control"
                  id="inputValid"
                  value={date1}
                  max={date2}
                  name={"date"}
                  onChange={(e: any) => {
                    setDate1(moment(e.target.value).format("YYYY-MM-DD"));
                  }}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group text-center mt-2 ">
                <input
                  type="date"
                  className="form-control"
                  id="inputValid"
                  value={date2}
                  min={date1}
                  onChange={(e: any) => {
                    setDate2(moment(e.target.value).format("YYYY-MM-DD"));
                  }}
                  name={"date"}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="start bg-dark">
          <Button
            className="btn btn-primary"
            onClick={async () => {
              await reset();
              setShowFilterModal(false);
            }}
          >
            Reset
          </Button>
          <Button
            className="btn btn-light"
            onClick={() => setShowFilterModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-light"
            onClick={async () => {
              setShowFilterModal(false);
              await dispatch(filtering(filters));
            }}
          >
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ETHistoryModal;
