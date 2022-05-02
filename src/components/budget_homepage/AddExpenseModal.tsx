// main
import React from "react";
import { useRef, useState } from "react";
import { Budget, BudgetAction, UUID } from "../../types/budget-types";
import "../../styles/budget-homepage.css";

// form validation
import useValidator from "../../utils/hooks/useValidation";
import { numberValidator, stringValidator } from "../../utils/input-validators";

// mui
import TransitionModal from "../flexible/TransitionModal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

// misc
import { UNCATEGORIZED_BUDGET_NAME } from "../../utils/constants";
import { v4 as uuid } from "uuid";
import { BudgetReducerMethods } from "../../utils/enums";
import { UnariableString } from "../../global";


interface UncategorizedBudget extends Budget {
    name: typeof UNCATEGORIZED_BUDGET_NAME;
}

interface AddExpenseModalProps {
    className?: string;
    open: boolean;
    onClose: () => void;
    budgets: Array<Budget>;
    budget: UncategorizedBudget | Budget;
    budgetDispatch: React.Dispatch<BudgetAction>;
}

export default function AddExpenseModal({
    className,
    open,
    onClose,
    budgets,
    budget,
    budgetDispatch,
}: AddExpenseModalProps): JSX.Element {
    const expenseDescriptionID = useRef(uuid());
    const [expenseDescription, setExpenseDescription] = useState("");
    const [expenseDescriptionError, setExpenseDescriptionError] = useState("");

    const expenseAmountID = useRef(uuid());
    const [expenseAmount, setExpenseAmount] = useState<UnariableString>("");
    const [expenseAmountError, setExpenseAmountError] = useState("");

    const [budgetAppendingID, setBudgetAppending] = useState<string | UUID>(
        budget.id
    );

    const [expenseSubmitted, setExpenseSubmitted] = useState(false);
    const expenseFormStatus = useValidator(
        expenseSubmitted,
        setExpenseSubmitted,
        [
            {
                id: expenseDescriptionID.current,
                input: expenseDescription,
                validator: stringValidator,
                errorSetter: setExpenseDescriptionError,
            },
            {
                id: expenseAmountID.current,
                input: expenseAmount,
                validator: numberValidator,
                errorSetter: setExpenseAmountError,
            },
        ]
    );

    const addExpenseHandler = () => {
        if (
            !Object.values(expenseFormStatus).every((field) => field === true)
        ) {
            // assign error messages to input
            setExpenseSubmitted(true);

            // stop flow since there's an error in input
            return;
        }

        // close modal
        onClose();

        // if there's no error, then we can submit the expense
        budgetDispatch({
            type: BudgetReducerMethods.ADD_EXPENSE,
            payload: {
                description: expenseDescription,
                amount: +expenseAmount,
                budget: budgets.find(
                    (budget: Budget) => budget.id === budgetAppendingID
                ) as Budget,
            },
        });

        // clear messages later
        [setExpenseDescription, setExpenseAmount].forEach(
            (setter: React.Dispatch<React.SetStateAction<string>>) => setter("")
        );

        // no need to reset the last budgetAppendingID, user may want to add to the same budget
    };

    return (
        <TransitionModal className={className} open={open} onClose={onClose}>
            <header>
                <div>New Expense</div>
                <Button onClick={onClose}>X</Button>
            </header>

            <TextField
                required
                label="Description"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                error={!!expenseDescriptionError}
                helperText={expenseDescriptionError}
            />
            <TextField
                required
                label="Amount"
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                error={!!expenseAmountError}
                helperText={expenseAmountError}
            />

            <FormControl>
                <InputLabel>Budget</InputLabel>
                <Select
                    required
                    label="Select"
                    value={budgetAppendingID}
                    onChange={(e) => setBudgetAppending(e.target.value)}
                >
                    {budgets.map((budget: Budget) => (
                        <MenuItem key={budget.id} value={budget.id}>
                            {budget.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                className="modal-add-expense-btn"
                onClick={addExpenseHandler}
            >
                Add
            </Button>
        </TransitionModal>
    );
}
