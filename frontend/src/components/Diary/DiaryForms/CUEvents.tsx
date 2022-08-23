import React, { ChangeEvent, useState } from "react";
import { Diary } from "../../Helpers/Interface/Diary";

interface Props {
  index: number;
  event: { id: number; title: string; description: string };
  diary: Diary;
  setDiary: React.Dispatch<React.SetStateAction<Diary>>;
}

const CUEvents = (props: Props) => {
  const { event, diary, setDiary } = props;

  const [eventData, setEventData] = useState<{
    id: number;
    title: string;
    description: string;
  }>(event);
  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const eventsCopy = [...diary.events];

    for (const event of eventsCopy) {
      if (event.id === eventData.id) {
        event.title = e.target.value;
      }
    }
    setDiary({ ...diary, events: eventsCopy });
  };
  const descriptionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const eventsCopy = [...diary.events];

    for (const event of eventsCopy) {
      if (event.id === eventData.id) {
        event.description = e.target.value;
      }
    }
    setDiary({ ...diary, events: eventsCopy });
  };

  return (
    <div>
      <div className="progress">
        <div
          className="progress-bar bg-dark"
          role="progressbar"
          style={{ width: "100%" }}
        />
      </div>
      <div className="mb-2 mt-2" key={1221}>
        <label htmlFor="title" className="form-label">
          Event {props.index + 1}
        </label>
        <input
          type="title"
          className="form-control"
          id={`eventTitle${props.index + 1}`}
          aria-describedby="title"
          name="title"
          value={eventData.title}
          onChange={titleChangeHandler}
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor={`eventDescription${props.index + 1}`}
          className="form-label"
        >
          Event {props.index + 1} Description
        </label>
        <textarea
          className="form-control"
          id={`eventDescription${props.index + 1}`}
          placeholder="tell us what happened today"
          onChange={descriptionChangeHandler}
          value={eventData.description}
        />
      </div>
    </div>
  );
};

export default CUEvents;
