import React from "react";
import { useSelector } from "react-redux";
import { diarySearch, getAllDiaries } from "../../store/Diary/DiarySlice";
import DiaryItem from "./DiaryItem";

const DiaryList = () => {
  const allDiaries = useSelector(getAllDiaries);
  const searchText = useSelector(diarySearch);
  let diaries = allDiaries;
  if (searchText === "") {
    diaries = allDiaries;
  } else if (searchText.length > 0) {
    diaries = allDiaries.filter((e: { title: string }) =>
      e.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
  console.log(allDiaries);
  return (
    <>
      <div className="row justify-content-center">
        {diaries.map((diary: any) => {
          return <DiaryItem diary={diary} key={diary._id} />;
        })}
      </div>
    </>
  );
};

export default DiaryList;
