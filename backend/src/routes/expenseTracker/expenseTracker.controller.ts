import { RequestHandler } from "express";
import ExpenseTracker from "../../database/Schema/expenseTracker";
import { Request, Response } from "express";

export const getAllTransactions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const transacrtions = await ExpenseTracker.find({ author: req.userId });
    res.json(transacrtions);
  } catch (error) {
    res.json(error);
  }
};

export const getTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const id = req.params.id;
    const transactionFound = await ExpenseTracker.findById(id);
    if (!transactionFound) {
      return res.status(204).json();
    }
    return res.json(transactionFound);
  } catch (error) {
    res.json(error);
  }
};

export const createTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const { name, type, date, amount } = req.body;
    const transaction = new ExpenseTracker({
      name,
      type,
      date,
      amount,
      author: req.userId,
    });
    console.log(req.body);

    const savedTransaction = await transaction.save();
    res.json(savedTransaction);
  } catch (error) {
    res.json(error);
  }
};
export const updateTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const id = req.params.id;
    const { name, type, date, amount } = req.body;

    const updatedTransaction = await ExpenseTracker.findByIdAndUpdate(
      id,
      {
        name,
        type,
        date,
        amount,
        author: req.userId,
      },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(204).json();
    }
    return res.json(updatedTransaction);
  } catch (error) {
    res.json(error);
  }
};
export const deleteTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated!!!!");
  }
  try {
    const id = req.params.id;
    const deletedTransaction = await ExpenseTracker.findByIdAndDelete(id);
    if (!deletedTransaction) return res.status(204).json();
    res.json(`${deletedTransaction} is successfully deleted`);
  } catch (error) {
    res.json(error);
  }
};
