import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { DiarySingle } from "../Helpers/Interface/Diary";

interface Props {
  diary: DiarySingle;
}

const DiaryItem = ({ diary }: Props) => {
  const { title, events, createdAt, _id } = diary;
  const date = moment(createdAt).format("DD-MM-YYYY HH:mm");

  return (
    <div className="col-md-8 my-2">
      <Link to={`/diary/${_id}`} className="text-decoration-none">
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <div className="row justify-content-between">
              <div className="col-8">
                <p className="card-text">{date}</p>
              </div>
              <div className="col-2">
                <p> {events?.length} Events</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DiaryItem;
