import React from "react";
import { useSelector } from "react-redux";
import { getDiaryDetails } from "../../../store/Diary/DiarySlice";

import DetailsEvents from "./DetailsEvents";

const DetialsItem = () => {
  const diary = useSelector(getDiaryDetails);

  return (
    <>
      <div className="row my-4 justify-content-center">
        <div className="col-10">
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item ">
              <h2 className="accordion-header  " id="panelsStayOpen-headingOne">
                <div className="accordion-item text-center py-2 bg-primary text-capitalize fw-bolder ">
                  {diary.title}
                </div>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div className="accordion-body">{diary.description}</div>
              </div>
            </div>

            {diary.events?.map((e: any, index: number) => {
              return <DetailsEvents events={e} key={e.id} index={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetialsItem;
