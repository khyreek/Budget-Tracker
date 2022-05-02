// main
import React, { useReducer, useState } from "react";
import "../../styles/budget-homepage.css";
import budgetReducer from "../../utils/reducers/BudgetReducer";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import BudgetCard from "./BudgetCard";

// mui
import Button from "@mui/material/Button";

// misc
import { v4 as uuid } from "uuid";
import { Budget, UncategorizedBudget } from "../../types/budget-types";
import {
    TOTAL_BUDGET_NAME,
    UNCATEGORIZED_BUDGET_NAME,
} from "../../utils/constants";
import {} from "../../utils/array-methods";

interface BudgetHomepageProps {}

export default function BudgetHomepage({}: BudgetHomepageProps): JSX.Element {
    const [state, budgetDispatch] = useReducer(budgetReducer, {
        budgets: [
            {
                id: uuid(),
                name: UNCATEGORIZED_BUDGET_NAME,
                limit: 0,
                expenses: [],
                cardVariant: "uncategorized",
            },
            {
                id: uuid(),
                name: TOTAL_BUDGET_NAME,
                limit: 0,
                expenses: [],
                cardVariant: "total",
            },
        ],
    });
    // console.log(state.budgets);

    const [addingBudget, setAddingBudget] = useState(false);
    const [addingExpense, setAddingExpense] = useState(false);

    return (
        <div className="page-container">
            {/* <button onClick={() => console.log(state)}>debug</button> */}
            {/* <button>testing</button> */}

            <header>
                <div className="header-title">Budgets</div>

                <div className="budget-header-btns">
                    <Button
                        onClick={() => setAddingBudget(true)}
                        variant="contained"
                        className="add-budget-btn"
                    >
                        Add Budget
                    </Button>
                    <AddBudgetModal
                        className="add-budget-modal"
                        open={addingBudget}
                        onClose={() => setAddingBudget(false)}
                        budgetDispatch={budgetDispatch}
                    />

                    <Button
                        onClick={() => setAddingExpense(true)}
                        variant="outlined"
                        className="add-expense-btn"
                    >
                        Add Expense
                    </Button>
                    {/* this expense is one of two buttons located in the header 
                    and will thus be defaulted to 'uncategorized' */}
                    <AddExpenseModal
                        className="add-expense-modal"
                        open={addingExpense}
                        onClose={() => setAddingExpense(false)}
                        budgets={state.budgets}
                        budget={
                            state.budgets.find(
                                (budget) =>
                                    budget.name === UNCATEGORIZED_BUDGET_NAME
                            ) as UncategorizedBudget // this wont be undefined
                            // since it's initialized manually at the start
                        }
                        budgetDispatch={budgetDispatch}
                    />
                </div>
            </header>

            <div className="budget-container">
                {state.budgets.map((budget: Budget) => (
                    <BudgetCard
                        key={budget.id}
                        budget={budget}
                        budgets={state.budgets}
                        budgetDispatch={budgetDispatch}
                    />
                ))}
            </div>
        </div>
    );
}
