import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncAllDiaries } from "../../store/Diary/DiarySlice";
import { AppDispatch } from "../../store/store";
import Search from "../UI/Search/Search";
import DiaryCreate from "./DiaryForms/DiaryCreate";
import DiaryList from "./DiaryList";

const Diary = () => {
 
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAsyncAllDiaries());
  }, [dispatch]);

  return (
    <div className="container">
      <DiaryCreate />
      <div className="row my-2 mb-4">
        <div className="col-md-10 offset-md-1">
          <Search />
        </div>
      </div>
      <DiaryList />
    </div>
  );
};

export default Diary;
