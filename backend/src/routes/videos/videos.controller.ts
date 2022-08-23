import { RequestHandler } from "express";
import Video from "../../database/Schema/video";
import { Request, Response } from "express";

export const getVideos: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const videos = await Video.find({ author: req.userId });
    return res.json(videos);
  } catch (error) {
    res.json(error);
  }
};
export const getVideo: RequestHandler = async (req: Request, res: Response) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { id } = req.params;
    const videoFound = await Video.findById(id);
    if (!videoFound) return res.status(204).json();
    return res.json(videoFound);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const createVideo: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  console.log("in create");

  try {
    const { url, title, description } = req.body;
    const videoFound = await Video.findOne({ url, author: req.userId });
    if (videoFound) {
      return res.json("this URL already exist");
    }
    const video = new Video({
      url,
      description,
      title,
      author: req.userId,
    });
    const savedVideo = await video.save();
    res.json(savedVideo);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateVideo: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { id } = req.params;
    console.log(id);
    const { url, title, description } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      {
        url,
        description,
        title,
        author: req.userId,
      },
      {
        new: true,
      }
    );
    if (!updatedVideo) return res.status(204).json();
    return res.json(updatedVideo);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteVideo: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { id } = req.params;
    console.log(id);
    const video = await Video.findByIdAndDelete(id);
    if (!video) return res.status(204).json();
    res.json(`${video} is deleted`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
