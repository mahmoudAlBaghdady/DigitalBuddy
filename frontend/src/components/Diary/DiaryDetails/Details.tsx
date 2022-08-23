import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DetialsItem from "./DetialsItem";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  fetchAsyncDeleteDiary,
  fetchAsyncSingleDiary,
} from "../../../store/Diary/DiarySlice";

const Details = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAsyncSingleDiary(params.id!));
  }, [dispatch, params.id]);
  return (
    <>
      <div className="container">
        <ul className="nav nav-pills justify-content-center mt-2">
          <li className="nav-item">
            <Link className="nav-link active mx-1" to={"/diary"}>
              Diaries
            </Link>
          </li>
          <li className="nav-item cursor user-select-none">
            <a
              className="nav-link bg-danger mx-1 "
              onClick={() => navigate(`/diary/update/${params.id}`)}
            >
              Edit &nbsp;
              <FontAwesomeIcon icon={faEdit} />
            </a>
          </li>
          <li className="nav-item user-select-none">
            <a
              className="nav-link  bg-danger mx-1 "
              onClick={async () => {
                await dispatch(fetchAsyncDeleteDiary(params.id!));
                navigate("/diary");
              }}
            >
              Delete &nbsp; <FontAwesomeIcon icon={faTrash} />
            </a>
          </li>
        </ul>

        <div className="row">
          <DetialsItem />
        </div>
      </div>
    </>
  );
};

export default Details;
