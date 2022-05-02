// main
import React, { useState } from "react";
import BudgetCardHeader from "./BudgetCardHeader";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import "../../styles/budget-homepage.css";

// mui
import Button from "@mui/material/Button";
import LabelledLinearProgress from "../flexible/LabelledLinearProgress";

// misc
import { Budget, BudgetAction, Expense } from "../../types/budget-types";
import { UNCATEGORIZED_BUDGET_NAME } from "../../utils/constants";

interface BudgetCategoryCardProps {
    budget: Budget;
    budgets: Array<Budget>;
    budgetDispatch: React.Dispatch<BudgetAction>;
}

export default function BudgetCard({
    budget,
    budgets,
    budgetDispatch,
}: BudgetCategoryCardProps): JSX.Element {
    const { name, limit, expenses, cardVariant } = budget;
    const totalExpenses = expenses.reduce((acc: number, expense: Expense) => {
        return acc + expense.amount;
    }, 0);
    const budgetsLimit =
        budgets.reduce((acc: number, budget: Budget) => {
            return acc + budget.limit;
        }, 0) +
        (
            budgets.find(
                (budget: Budget) => budget.name === UNCATEGORIZED_BUDGET_NAME
            ) as Budget
        ).expenses.reduce((acc, expense) => acc + expense.amount, 0);

    const [addingExpense, setAddingExpense] = useState(false);
    const [viewingExpenses, setViewingExpenses] = useState(false);

    return (
        <div
            // if the budget is the total budget, then add the 'total' class onto
            // the card, it will be used to shade the background
            className={`budget-category-card ${
                ["total", "uncategorized"].includes(cardVariant)
                    ? "predefined"
                    : ""
            }`}
        >
            {/* header */}
            <BudgetCardHeader
                budget={budget}
                totalExpenses={totalExpenses}
                budgetsLimit={budgetsLimit}
            />

            {/* only show this if budget is not uncategorized */}
            {cardVariant !== "uncategorized" && (
                <LabelledLinearProgress
                    value={
                        (totalExpenses /
                            (budget.cardVariant === "total"
                                ? budgetsLimit
                                : limit)) *
                        100
                    }
                />
            )}

            <div className="budget-card-btns">
                <Button
                    onClick={() => setAddingExpense(true)}
                    variant="outlined"
                >
                    Add Expense
                </Button>
                <AddExpenseModal
                    className="add-expense-modal"
                    open={addingExpense}
                    onClose={() => setAddingExpense(false)}
                    budget={budget}
                    budgets={budgets}
                    budgetDispatch={budgetDispatch}
                />

                <Button
                    onClick={() => setViewingExpenses(true)}
                    variant="outlined"
                    className="header-view-expenses-btn"
                >
                    View Expenses
                </Button>
                <ViewExpensesModal
                    className="view-expenses-modal"
                    open={viewingExpenses}
                    onClose={() => setViewingExpenses(false)}
                    budget={budget}
                    budgetDispatch={budgetDispatch}
                />
            </div>
        </div>
    );
}
