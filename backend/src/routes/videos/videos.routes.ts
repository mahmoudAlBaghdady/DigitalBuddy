import { Router } from "express";
import * as videoCtrl from "./videos.controller";
import isLogged from "../../middleware/authMiddleware";
const router = Router();

router.get("/videos", isLogged, videoCtrl.getVideos);
router.get("/videos/:id", isLogged, videoCtrl.getVideo);
router.post("/videos", isLogged, videoCtrl.createVideo);
router.put("/videos/:id", isLogged, videoCtrl.updateVideo);
router.delete("/videos/:id", isLogged, videoCtrl.deleteVideo);

export default router;
