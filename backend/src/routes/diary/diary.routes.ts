import { Router } from "express";
import * as diaryCtrl from "./diary.controller";
import isLogged from "../../middleware/authMiddleware";

const router = Router();

router.get("/diary", isLogged, diaryCtrl.getDiaries);
router.get("/diary/:id", isLogged, diaryCtrl.getDiary);
router.post("/diary", isLogged, diaryCtrl.createDiary);
router.put("/diary/:id", isLogged, diaryCtrl.updateDiary);
router.delete("/diary/:id", isLogged, diaryCtrl.deleteDiary);
export default router;
