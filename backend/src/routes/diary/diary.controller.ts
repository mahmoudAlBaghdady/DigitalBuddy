import { RequestHandler } from "express";
import Diary from "../../database/Schema/diary";
import { Request, Response } from "express";

export const getDiaries: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const diaries = await Diary.find({ author: req.userId });
    res.json(diaries);
  } catch (error) {
    res.json(error);
  }
};
export const getDiary: RequestHandler = async (req: Request, res: Response) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { id } = req.params;
    const diaryFound = await Diary.findById(id);
    if (!diaryFound) return res.status(204).json();
    else return res.json(diaryFound);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const createDiary: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const diaryFound = await Diary.findOne({
      title: req.body.title,
      author: req.userId,
    });
    if (diaryFound) {
      return res.status(301).json({ message: "this Diary Already Exists" });
    }
    const { title, description, events } = req.body;

    const diary = new Diary({
      title,
      description,
      events,
      author: req.userId,
    });
    const savedDiary = diary.save();
    res.json(savedDiary);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateDiary: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { id } = req.params;
    const { title, description, events } = req.body;
    const updatedDiary = await Diary.findByIdAndUpdate(
      id,
      {
        title,
        description,
        events,
        author: req.userId,
      },
      {
        new: true,
      }
    );
    if (!updateDiary) return res.json("Diary Update Error");
    return res.json(updateDiary);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDiary: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { id } = req.params;
    const diary = await Diary.findByIdAndDelete(id);
    if (!diary) return res.status(204).json();

    res.json(`${diary} is deleted`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
