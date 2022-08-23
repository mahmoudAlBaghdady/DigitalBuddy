import React from "react";
interface Props {
  index: number;
  events: {
    title: string;
    description: string;
  };
}
const DetailsEvents = ({ events, index }: Props) => {
  const { title, description } = events;
  const newIndex = index + 2;
  const indexString = newIndex.toString();

  return (
    <div className="accordion-item">
      <h2
        className="accordion-header"
        id={`panelsStayOpen-heading${indexString}`}
      >
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#panelsStayOpen-collapse${indexString}`}
          aria-expanded="false"
          aria-controls={`panelsStayOpen-collapse${indexString}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`panelsStayOpen-collapse${indexString}`}
        className="accordion-collapse collapse"
        aria-labelledby={`panelsStayOpen-heading${indexString}`}
      >
        <div className="accordion-body">{description}</div>
      </div>
    </div>
  );
};

export default DetailsEvents;
