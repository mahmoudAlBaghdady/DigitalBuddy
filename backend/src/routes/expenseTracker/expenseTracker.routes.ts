import { Router } from "express";
import * as expenseCtrl from "./expenseTracker.controller";
import isLogged from "../../middleware/authMiddleware";

const router = Router();

router.get("/expenseTracker", isLogged, expenseCtrl.getAllTransactions);
router.get("/expenseTracker/:id", isLogged, expenseCtrl.getTransaction);
router.post("/expenseTracker", isLogged, expenseCtrl.createTransaction);
router.put("/expenseTracker/:id", isLogged, expenseCtrl.updateTransaction);
router.delete("/expenseTracker/:id", isLogged, expenseCtrl.deleteTransaction);

export default router;
