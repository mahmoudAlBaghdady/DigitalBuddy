import React from "react";
import { useSelector } from "react-redux";
import {
  getAllGoals,
  getGoalsFilter,
  goalSearchText,
} from "../../store/Goals/GoalsSlice";
import { Goal } from "../Helpers/Interface/Goal";
import GoalsItem from "./GoalItem";

const GoalsList = () => {

  const allGoals = useSelector(getAllGoals);
  const filter = useSelector(getGoalsFilter);
  const searchText = useSelector(goalSearchText);

  let filteredGoals = allGoals;

  switch (filter) {
    case "All":
      filteredGoals = allGoals;
      break;
    case "Progress":
      filteredGoals = allGoals.filter((e) => e.finished === false);
      break;
    case "Finished":
      filteredGoals = allGoals.filter((e) => e.finished === true);
      break;
    default:
      break;
  }
  let goals = filteredGoals;
  if (searchText === "") {
    goals = filteredGoals;
  } else if (searchText.length > 0) {
    goals = filteredGoals.filter((e: { title: string }) =>
      e.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
  return (
    <div className="row justify-content-center">
      {goals.map((goal: Goal, i: any) => {
        return <GoalsItem goal={goal} key={goal._id} index={i} />;
      })}
    </div>
  );
};

export default GoalsList;
