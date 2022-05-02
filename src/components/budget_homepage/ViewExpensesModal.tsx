// main
import React from "react";
import Button from "@mui/material/Button";
import "../../styles/budget-homepage.css";

import TransitionModal from "../flexible/TransitionModal";
import {} from "../../utils/array-methods";
import { Budget, BudgetAction, Expense } from "../../types/budget-types";

import { currencyFormatter } from "../../utils/constants";
import { BudgetReducerMethods } from "../../utils/enums";

interface ViewExpensesModalProps {
    open: boolean;
    onClose: () => void;
    budget: Budget;
    className?: string;
    budgetDispatch: React.Dispatch<BudgetAction>;
}

export default function ViewExpensesModal({
    open,
    onClose,
    className,
    budget,
    budgetDispatch,
}: ViewExpensesModalProps): JSX.Element {
    return (
        <TransitionModal className={className} open={open} onClose={onClose}>
            <header>
                <div className="view-expenses-modal-left-header">
                    <div className="esb">Expenses - {budget.name}</div>
                    <Button
                        className="budget-component-deleting-btn delete-budget-btn"
                        onClick={() =>
                            budgetDispatch({
                                type: BudgetReducerMethods.DELETE_BUDGET,
                                payload: {
                                    id: budget.id,
                                },
                            })
                        }
                    >
                        Delete
                    </Button>
                </div>
                <Button className="esb" onClick={onClose}>
                    X
                </Button>
            </header>

            <div className="expenses-list">
                {budget.expenses.map(
                    (expense: Expense): JSX.Element => (
                        <div
                            key={expense.id}
                            className="expense-item expense-slogan"
                        >
                            <div className="expense-item-description">
                                {expense.description}
                            </div>
                            <div className="expense-left-bar-side">
                                <div className="expense-item-expense-amount">
                                    {currencyFormatter.format(expense.amount)}
                                </div>
                                <Button
                                    className="budget-component-deleting-btn"
                                    onClick={() =>
                                        budgetDispatch({
                                            type: BudgetReducerMethods.DELETE_EXPENSE,
                                            payload: {
                                                id: expense.id,
                                                budget,
                                            },
                                        })
                                    }
                                >
                                    X
                                </Button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </TransitionModal>
    );
}
