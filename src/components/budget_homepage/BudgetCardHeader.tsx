import React from "react";
import "../../styles/budget-homepage.css";

// misc
import { Budget } from "../../types/budget-types";
import { currencyFormatter } from "../../utils/constants";

interface BudgetCardHeaderProps {
    budget: Budget;
    totalExpenses: number;
    budgetsLimit: number;
}

export default function BudgetCardHeader({
    budget: { name, limit, cardVariant },
    totalExpenses,
    budgetsLimit,
}: BudgetCardHeaderProps): JSX.Element {
    // show a different max if the budget is the total budget
    const budgetLimitVisual = cardVariant === "total" ? budgetsLimit : limit;

    // only show the limit if the budget is not uncategorized
    const progressVisual = cardVariant !== "uncategorized" && (
        <>
            {" "}
            /{" "}
            <span style={{ all: "initial", fontSize: "90%" }}>
                {currencyFormatter.format(budgetLimitVisual)}
            </span>
        </>
    );

    return (
        <header className="budget-category-card-header">
            <div className="si">{name}</div>
            <div className="si">
                {currencyFormatter.format(totalExpenses)}
                {progressVisual}
            </div>
        </header>
    );
}
