import {
    Budget,
    BudgetAction,
    BudgetState,
    Expense,
} from "../../types/budget-types";
import { TOTAL_BUDGET_NAME, UNCATEGORIZED_BUDGET_NAME } from "../constants";
import { BudgetReducerMethods } from "../enums";
import {} from "../array-methods";
import { v4 as uuid } from "uuid";

export default function budgetReducer(
    state: BudgetState,
    { type, payload }: BudgetAction
): BudgetState {
    // switch case for budgets, uncate, total
    switch (type) {
        case BudgetReducerMethods.ADD_BUDGET:
            let { name, limit } = payload;
            const newLimit = +limit; // limit is a unaraiable string

            // this will separate the user-created budgets from the uncategorized and total
            // budgets which are predefined. This is done as a backup measure to make sure
            // the predefined budgets go last in the list, and new budget categories come
            // just before them.
            const defaultBudgets = [
                UNCATEGORIZED_BUDGET_NAME,
                TOTAL_BUDGET_NAME,
            ];
            const [defaults, customs] = state.budgets.splitFilter(
                (val: Budget) => defaultBudgets.includes(val.name)
            );

            return {
                ...state,

                // the specified order mentioned above defaultBudgets
                budgets: [
                    ...customs,
                    {
                        id: uuid(),
                        name,
                        limit: newLimit,
                        expenses: [],
                        cardVariant: "regular",
                    },
                    ...defaults,
                ],
            };

        case BudgetReducerMethods.DELETE_BUDGET:
            if (payload.id === UNCATEGORIZED_BUDGET_NAME) return state;
            return {
                ...state,
                budgets: state.budgets.filter(
                    (budget) => budget.id !== payload.id
                ),
            };

        case BudgetReducerMethods.ADD_EXPENSE:
            // console.log(payload);
            const { description, amount, budget: budgetAdded } = payload;

            return {
                ...state,
                budgets: state.budgets.map((budget: Budget) => {
                    // if current is total, add to it
                    if (budget.name === TOTAL_BUDGET_NAME)
                        return {
                            ...budget,
                            expenses: [
                                ...budget.expenses,
                                { id: uuid(), description, amount },
                            ],
                        };

                    // check if budget is the one added
                    if (!(budget.id === budgetAdded.id)) return budget;

                    // add expense to budget
                    return {
                        ...budget,
                        expenses: [
                            ...budget.expenses,
                            { id: uuid(), description, amount },
                        ],
                    };
                }),
            };

        case BudgetReducerMethods.DELETE_EXPENSE:
            console.log(payload);

            return {
                ...state,
                budgets: state.budgets.map((budget: Budget) => {
                    if (budget.id !== payload.budget.id) return budget;

                    return {
                        ...budget,
                        expenses: budget.expenses.filter(
                            (expense: Expense): boolean =>
                                expense.id !== payload.id
                        ),
                    };
                }),
            };

        default:
            console.log("type:", type, "caught in default of budgetReducer");
            return state;
    }
}
