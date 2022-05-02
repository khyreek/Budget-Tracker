import { UnariableString } from "../global";
import { UNCATEGORIZED_BUDGET_NAME } from "../utils/constants";
import { BudgetReducerMethods } from "../utils/enums";



export type BudgetName = "Uncategorized" | "Total" | string;

export type BudgetCardVariant = "uncategorized" | "total" | "regular";
export type UUID = string;

export interface Expense {
    id: string;
    description: string;
    amount: number;
}

export interface Budget {
    id: string;
    name: BudgetName;
    limit: number;
    expenses: Array<Expense>;
    cardVariant: BudgetCardVariant;
}
export interface UncategorizedBudget extends Budget {
    name: typeof UNCATEGORIZED_BUDGET_NAME;
} 

export interface BudgetState {
    budgets: Array<Budget>;
}

export type BudgetAction =
    | {
          type: BudgetReducerMethods.ADD_BUDGET;
          payload: { name: string; limit: UnariableString };
      }
    | {
          type: BudgetReducerMethods.DELETE_BUDGET;
          payload: { id: UUID };
      }
    | {
          type: BudgetReducerMethods.ADD_EXPENSE;
          payload: {
              description: string;
              amount: number;
              budget: Budget;
          };
      }
    | {
          type: BudgetReducerMethods.DELETE_EXPENSE;
          payload: {
              id: UUID;
              budget: Budget;
          };
      };
