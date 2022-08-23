import { RequestHandler } from "express";
import Goals from "../../database/Schema/goals";
import { Request, Response } from "express";

export const getGoals: RequestHandler = async (req: Request, res: Response) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const goals = await Goals.find({ author: req.userId });
    res.json(goals);
  } catch (error) {
    res.json(error);
  }
};
export const getGoal: RequestHandler = async (req: Request, res: Response) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { id } = req.params;
    const goalFound = await Goals.findById(id);
    if (!goalFound) return res.status(204).json();
    return res.json(goalFound);
  } catch (error) {
    console.log("getGoal", error);
    return res.json(error);
  }
};
export const createGoal: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    console.log(req.body);
    const { title, description } = req.body;
    const goalFound = await Goals.findOne({
      title,
      author: req.userId,
    });
    if (goalFound) {
      return res.json({ message: "this Goal Already Exists" });
    }
    const goal = new Goals({
      title,
      description,
      finished: false,
      author: req.userId,
    });
    const savedGoal = await goal.save();
    res.json(savedGoal);
  } catch (error) {
    console.log("create Goal", error);
    return res.json(error);
  }
};
export const updateGoal: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { title, description, finished } = req.body;
    const { id } = req.params;
    const updatedGoal = await Goals.findByIdAndUpdate(
      id,
      {
        title,
        description,
        finished,
        author: req.userId,
      },
      {
        new: true,
      }
    );
    if (!updatedGoal) return res.json("Goal Update Error");
    return res.json(updatedGoal);
  } catch (error) {
    console.log("update Goal", error);
    return res.json(error);
  }
};
export const deleteGoal: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { id } = req.params;
    const goal = await Goals.findByIdAndDelete(id);
    if (!goal) return res.json("Goal Delete Failed");
    res.json(`${goal} is deleted`);
  } catch (error) {
    console.log("Delete Goal", error);
    return res.json(error);
  }
};
