import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Transaction } from "../../components/Helpers/Interface/ExpenseTracker";

const API = "http://localhost:4000";

export const fetchAsyncAllTransactions = createAsyncThunk(
  "expense/fetchAsyncAllTransactions",
  async () => {
    try {
      const { data } = await axios.get(`${API}/expenseTracker`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const fetchAsyncSingleTransaction = createAsyncThunk(
  "expense/fetchAsyncSingleTransaction",
  async (id: any) => {
    try {
      const { data } = await axios.get(`${API}/expenseTracker/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const fetchAsyncAddTransaction = createAsyncThunk(
  "expense/fetchAsyncAddTransaction",
  async (transaction: Transaction) => {
    try {
      const { data } = await axios.post(`${API}/expenseTracker`, transaction, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const fetchAsyncUpdateTransaction = createAsyncThunk(
  "expense/fetchAsyncUpdateTransaction",
  async (args: any) => {
    try {
      const { singleTransaction, transaction } = args;
      const { data } = await axios.put(
        `${API}/expenseTracker/${singleTransaction._id}`,
        transaction,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
export const fetchAsyncDeleteTransaction = createAsyncThunk(
  "expense/fetchAsyncDeleteTransaction",
  async (id: any) => {
    try {
      const { data } = await axios.delete(`${API}/expenseTracker/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const initialState = {
  transactions: [],
  bills: [] as Transaction[],
  income: [] as Transaction[],
  savings: [] as Transaction[],
  purchases: [] as Transaction[],
  investments: [] as Transaction[],
  billsTotal: 0,
  incomeTotal: 0,
  savingsTotal: 0,
  purchasesTotal: 0,
  investmentsTotal: 0,
  billsPercentage: 0,
  savingsPercentage: 0,
  purchasesPercentage: 0,
  investmentsPercentage: 0,
  total: 0,
  totalExpenses: 0,
  singleTransaction: {},
  transactionStatus: "pending",
  singleTransactionStatus: "pending",
  updateTransactionStatus: "pending",
  createTransactionStatus: "pending",
  deleteTransactionStatus: "pending",
  filters: { price: [0, 1000] },
  transactionSearch: "",
};

const ExpenseSlice = createSlice({
  name: "ExpenseTracker",
  initialState,
  reducers: {
    searchTransactions: (state: any, { payload }) => {
      state.transactionSearch = payload;
    },
    filtering: (state: any, { payload }: any) => {
      state.filters = payload;
    },
    generateAmounts: (state) => {
      state.billsTotal = state.bills.slice().reduce((a, b) => a + b.amount, 0);
      state.incomeTotal = state.income
        .slice()
        .reduce((a, b) => a + b.amount, 0);
      state.savingsTotal = state.savings
        .slice()
        .reduce((a, b) => a + b.amount, 0);
      state.purchasesTotal = state.purchases
        .slice()
        .reduce((a, b) => a + b.amount, 0);
      state.investmentsTotal = state.investments
        .slice()
        .reduce((a, b) => a + b.amount, 0);
    },
    generateTotal: (state) => {
      let total =
        state.incomeTotal +
        state.savingsTotal -
        (state.purchasesTotal + state.investmentsTotal + state.billsTotal);
      console.log(total);
      state.total = total;
    },
    generateTotalExpenses: (state) => {
      state.totalExpenses =
        state.savingsTotal +
        state.purchasesTotal +
        state.investmentsTotal +
        state.billsTotal;
    },
    generatePercentages: (state) => {
      state.billsPercentage = Math.round(
        (state.billsTotal / state.totalExpenses) * 100
      );
      state.savingsPercentage = Math.round(
        (state.savingsTotal / state.totalExpenses) * 100
      );
      state.purchasesPercentage = Math.round(
        (state.purchasesTotal / state.totalExpenses) * 100
      );
      state.investmentsPercentage = Math.round(
        (state.investmentsTotal / state.totalExpenses) * 100
      );
    },
  },
  extraReducers: (builder) => {
    //*FETCHING ALL TRANSACTIONS

    builder.addCase(fetchAsyncAllTransactions.pending, (state) => {
      console.log("TRANSACTIONS PENDING");
      return {
        ...state,
        transactionStatus: "pending",
      };
    });
    builder.addCase(
      fetchAsyncAllTransactions.fulfilled,
      (state, { payload }) => {
        console.log("TRANSACTIONS FETCHED SUCCESSFULLY");

        return {
          ...state,
          transactions: payload,
          transactionStatus: "success",
          bills: payload.filter((el: any) => el.type === "bill"),
          investments: payload.filter((el: any) => el.type === "investment"),
          income: payload.filter((el: any) => el.type === "income"),
          purchases: payload.filter((el: any) => el.type === "purchase"),
          savings: payload.filter((el: any) => el.type === "saving"),
        };
      }
    );
    builder.addCase(fetchAsyncAllTransactions.rejected, (state) => {
      console.log("TRANSACTIONS FETCH FAILED");
      return {
        ...state,
        transactionStatus: "fail",
      };
    });
    //*FETCHING SINGLE TRANSACTIONS
    builder.addCase(fetchAsyncSingleTransaction.pending, (state) => {
      console.log("SINGLE TRANSACTION FETCH PENDING");
      return {
        ...state,
        singleTransactionStatus: "pending",
      };
    });
    builder.addCase(
      fetchAsyncSingleTransaction.fulfilled,
      (state, { payload }) => {
        console.log("SINGLE TRANSACTION FETCH SUCCESS");
        // console.log(payload);

        return {
          ...state,
          singleTransaction: payload,
          singleTransactionStatus: "success",
        };
      }
    );
    builder.addCase(fetchAsyncSingleTransaction.rejected, (state) => {
      console.log("SINGLE TRANSACTION FETCH FAILED");
      return {
        ...state,
        singleTransactionStatus: "fail",
      };
    });
    //UPDATING TRANSACTION
    builder.addCase(fetchAsyncUpdateTransaction.pending, (state) => {
      console.log("UPDATING TRANSACTION PENDING");
      return {
        ...state,
        updateTransactionStatus: "pending",
      };
    });
    builder.addCase(fetchAsyncUpdateTransaction.fulfilled, (state) => {
      console.log("UPDATING TRANSACTION SUCCESS");
      return {
        ...state,
        updateTransactionStatus: "success",
      };
    });
    builder.addCase(
      fetchAsyncUpdateTransaction.rejected,
      (state, { payload }) => {
        console.log("UPDATING TRANSACTION FAILED");
        return {
          ...state,
          updateTransactionStatus: "fail",
        };
      }
    );
    //CREATING TRANSACTION
    builder.addCase(fetchAsyncAddTransaction.pending, (state) => {
      console.log("CREATING TRANSACTION PENDING");
      return {
        ...state,
        createTransactionStatus: "pending",
      };
    });
    builder.addCase(
      fetchAsyncAddTransaction.fulfilled,
      (state, { payload }) => {
        console.log("CREATING TRANSACTION SUCCESS");
        return {
          ...state,
          createTransactionStatus: "success",
        };
      }
    );
    builder.addCase(fetchAsyncAddTransaction.rejected, (state) => {
      console.log("CREATING TRANSACTION FAILED");
      return {
        ...state,
        createTransactionStatus: "fail",
      };
    });
    //DELETING TRANSACTION
    builder.addCase(fetchAsyncDeleteTransaction.pending, (state) => {
      console.log("DELETING TRANSACTION PENDING");
      return {
        ...state,
        deleteTransactionStatus: "pending",
      };
    });
    builder.addCase(fetchAsyncDeleteTransaction.fulfilled, (state) => {
      console.log("DELETING TRANSACTION SUCCESS");
      return {
        ...state,
        deleteTransactionStatus: "success",
      };
    });
    builder.addCase(fetchAsyncDeleteTransaction.rejected, (state) => {
      console.log("DELETING TRANSACTION FAILED");
      return {
        ...state,
        deleteTransactionStatus: "fail",
      };
      state.deleteTransactionStatus = "fail";
    });
  },
});
export const { filtering } = ExpenseSlice.actions;
export const { searchTransactions } = ExpenseSlice.actions;
export const { generateAmounts } = ExpenseSlice.actions;
export const { generateTotal } = ExpenseSlice.actions;
export const { generateTotalExpenses } = ExpenseSlice.actions;
export const { generatePercentages } = ExpenseSlice.actions;
//Getting All Transactions
export const getAllTransactions = (state: {
  ExpenseTracker: { transactions: any };
}) => state.ExpenseTracker.transactions;
//Getting Transaction Status
export const transactionsStatus = (state: {
  ExpenseTracker: { transactionStatus: any };
}) => state.ExpenseTracker.transactionStatus;
//Getting Bills
export const getAllBills = (state: { ExpenseTracker: { bills: any } }) =>
  state.ExpenseTracker.bills;
//Getting Income
export const getAllIncome = (state: { ExpenseTracker: { income: any } }) =>
  state.ExpenseTracker.income;
//Getting Investments
export const getAllInvestments = (state: {
  ExpenseTracker: { investments: any };
}) => state.ExpenseTracker.investments;
//Getting Purchases
export const getAllPurchases = (state: {
  ExpenseTracker: { purchases: any };
}) => state.ExpenseTracker.purchases;
//Getting Savings
export const getAllSavings = (state: { ExpenseTracker: { savings: any } }) =>
  state.ExpenseTracker.savings;
//Getting Single Transaction
export const getSingleTransaction = (state: {
  ExpenseTracker: { singleTransaction: any };
}) => state.ExpenseTracker.singleTransaction;
//Getting Single Transaction Status
export const getSingleTransactionStatus = (state: {
  ExpenseTracker: { singleTransactionStatus: any };
}) => state.ExpenseTracker.singleTransactionStatus;
//Getting Updating Transaction Status
export const getUpdateTransactionStatus = (state: {
  ExpenseTracker: { updateTransactionStatus: any };
}) => state.ExpenseTracker.updateTransactionStatus;
//Getting Creating Transaction Status
export const getCreateTransactionStatus = (state: {
  ExpenseTracker: { createTransactionStatus: any };
}) => state.ExpenseTracker.createTransactionStatus;
//Getting Deleting Transaction Status
export const getDeleteTransactionStatus = (state: {
  ExpenseTracker: { deleteTransactionStatus: any };
}) => state.ExpenseTracker.deleteTransactionStatus;

export const getBillsTotal = (state: {
  ExpenseTracker: { billsTotal: number };
}) => state.ExpenseTracker.billsTotal;
export const getIncomeTotal = (state: {
  ExpenseTracker: { incomeTotal: number };
}) => state.ExpenseTracker.incomeTotal;
export const getSavingsTotal = (state: {
  ExpenseTracker: { savingsTotal: number };
}) => state.ExpenseTracker.savingsTotal;
export const getPurchasesTotal = (state: {
  ExpenseTracker: { purchasesTotal: number };
}) => state.ExpenseTracker.purchasesTotal;
export const getInvestmentsTotal = (state: {
  ExpenseTracker: { investmentsTotal: number };
}) => state.ExpenseTracker.investmentsTotal;

export const getBillsPercentage = (state: {
  ExpenseTracker: { billsPercentage: number };
}) => state.ExpenseTracker.billsPercentage;
export const getSavingsPercentage = (state: {
  ExpenseTracker: { savingsPercentage: number };
}) => state.ExpenseTracker.savingsPercentage;
export const getPurchasesPercentage = (state: {
  ExpenseTracker: { purchasesPercentage: number };
}) => state.ExpenseTracker.purchasesPercentage;
export const getInvestmentsPercentage = (state: {
  ExpenseTracker: { investmentsPercentage: number };
}) => state.ExpenseTracker.investmentsPercentage;

export const getTotal = (state: { ExpenseTracker: { total: number } }) =>
  state.ExpenseTracker.total;
export const getTotalExpenses = (state: {
  ExpenseTracker: { totalExpenses: number };
}) => state.ExpenseTracker.totalExpenses;

export const Transactionfilters = (state: {
  ExpenseTracker: { filters: any };
}) => state.ExpenseTracker.filters;
export const transactionSearchText = (state: {
  ExpenseTracker: { transactionSearch: string };
}) => state.ExpenseTracker.transactionSearch;

export default ExpenseSlice.reducer;
