// react
import React, { useRef, useState } from "react";
import "../../styles/budget-homepage.css";

// mui
import TransitionModal from "../flexible/TransitionModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// form validation
import useValidator from "../../utils/hooks/useValidation";
import {
    budgetMaxValidator,
    stringValidator,
} from "../../utils/input-validators";

// misc
import { v4 as uuid } from "uuid";
import { BudgetAction } from "../../types/budget-types";
import { BudgetReducerMethods } from "../../utils/enums";

interface AddBudgetModalProps {
    className?: string;
    open: boolean;
    onClose: () => void;
    budgetDispatch: React.Dispatch<BudgetAction>;
}

export default function AddBudgetModal({
    className,
    open,
    onClose,
    budgetDispatch,
}: AddBudgetModalProps): JSX.Element {
    const budgetNameId = useRef(uuid());
    const [budgetName, setBudgetName] = useState("");
    const [budgetNameError, setBudgetNameError] = useState("");

    const budgetMaxId = useRef(uuid());
    const [budgetMax, setBudgetMax] = useState("");
    const [budgetMaxError, setBudgetMaxError] = useState("");

    const [budgetSubmitted, setBudgetSubmitted] = useState(false);
    const validStatus = useValidator(budgetSubmitted, setBudgetSubmitted, [
        {
            id: budgetNameId.current,
            input: budgetName,
            validator: stringValidator,
            errorSetter: setBudgetNameError,
        },
        {
            id: budgetMaxId.current,
            input: budgetMax,
            validator: budgetMaxValidator,
            errorSetter: setBudgetMaxError,
        },
    ]);

    const addBudgetHandler = () => {
        setBudgetSubmitted(true);

        // check if each input has been passed
        if (!Object.values(validStatus).every((valid: boolean) => valid)) {
            // notify that the budget has been submitted

            return;
        }

        // add budget
        budgetDispatch({
            type: BudgetReducerMethods.ADD_BUDGET,
            payload: { name: budgetName, limit: budgetMax },
        });

        // close modal
        onClose();

        // reset form
        [setBudgetName, setBudgetMax].forEach(
            (setter: React.Dispatch<React.SetStateAction<string>>) => setter("")
        );
        // no need to reset the errors as well, if the flow reaches this point
        // it means the form was submitted and so there must be no errors
    };

    return (
        <TransitionModal
            className={className} // undefined classname has no effect
            open={open}
            onClose={onClose}
        >
            <header>
                <div>New Budget</div>
                <Button onClick={onClose}>X</Button>
            </header>

            {/* Budget Name */}
            <TextField
                label="Budget Name"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
                error={!!budgetNameError}
                helperText={budgetNameError}
            />

            {/* Maximum Spending */}
            <TextField
                label="Maximum Spending"
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                error={!!budgetMaxError}
                helperText={budgetMaxError}
            />
            <Button className="modal-add-budget-btn" onClick={addBudgetHandler}>
                Add
            </Button>
        </TransitionModal>
    );
}
