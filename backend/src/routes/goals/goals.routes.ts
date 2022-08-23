import { Router } from "express";
import * as goalsCtrl from "./goals.controller";
import isLogged from "../../middleware/authMiddleware";

const router = Router();

router.get("/goals", isLogged, goalsCtrl.getGoals);
router.get("/goals/:id", isLogged, goalsCtrl.getGoal);
router.post("/goals", isLogged, goalsCtrl.createGoal);
router.put("/goals/:id", isLogged, goalsCtrl.updateGoal);
router.delete("/goals/:id", isLogged, goalsCtrl.deleteGoal);

export default router;
