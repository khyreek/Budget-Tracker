import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

type UnariableString = NonNullable<string>;
type RequirmentPassed = boolean;
type InputID = string;

/**
 * Every ValidatedInput FC will need to have;
 * 1. A 'statuses' that will will be passed to every ValidatedInput of a form section and will
 *    store all the validities of the inputs.
 * 2. A statusID that will be used to reference the status of the input. It will be used as a
 *    key of 'statuses' so it must be unique from the other keys in most cases.
 * 3. A 'submitAttempted' also passed to every ValidatedInput member of a form section which
 *    will be used to store whether or not the form has been submitted. If it has, it will
 *    trigger full analysis checks on each input element referenced by 'statuses.' The button
 *    that submits the form will also be passed this value so that it can trigger the checks.
 *
 * @NOTE The inputID is what will be used by the API user to grab the desired data. The ID
 * will be used as a key to index the object of {[key: string]: Data*} pairs.
 *
 * Mandating values (if an input must be filled out):
 * 1. 'required' in the props of the ValidatedInput. That is all, however this specific input
 *    will make a slightly confusing implementation that will be covered below.
 *
 * How the user of this API will know when all inputs are valid:
 * 1. All data inputted to an element and it's validity will be stored in 'statuses' will can
 *    be referenced by 'statusID' in the props of the ValidatedInput.
 * 2. The utilizer is recommended to loop through the 'statuses' object, checking for the
 *    'validity' property.
 * @NOTE This means that even non-required inputs will have a 'validity' property in 'statuses'
 *    as otherwise, it may be confusing to the user during the looping phase since the
 *    'validity' property won't be there. It will be declared as `true.`
 *
 */

interface InputData {
    data: any;
    status: RequirmentPassed;
}

interface DefaultValidatedInputProps {
    submitAttempted: boolean;
    setSubmitAttempted: (value: boolean) => void;
    inputID: InputID;
    inputData: React.RefObject<{
        [id: InputID]: InputData;
    }>;

    label: string;
    className?: string;
    variant?: "outlined" | "filled" | "standard";
    required?: boolean | undefined;
}

interface ValidatedNumberInputProps extends DefaultValidatedInputProps {}
interface ValidatedStringInputProps extends DefaultValidatedInputProps {}
interface ValidatedAddExpenseProps extends DefaultValidatedInputProps {}

/**
 * Each FC's abstraction will include an initial useEffect wherein the 
 * input id will be set to the inputData object.(
 *  useEffect(() => {
        inputData.current![inputID] = {
            data: null,
            status: required ? false : true,
        };
    }, [inputData, inputID, required]);
 * )
 * 
 * Must be done right away or else the mapping checks done on-submission-attempt
 * will not detect this and determine a valid form, but if this field is
 * required, it would not be 'valid.'
 * 
 * Each FC will also need a useEffect with dependencies of submitAttempted. Every
 * time the user attempts submitting, each of these useEffects in each FC will
 * check if the input is valid. If it is, it will set the status of the input.
 * 
 * They also all need to include a setSubmitAttempted(false) at the end of this
 * useEffect. This ensures that the next submission attempt will trigger another
 * validation check.
 * 
 */

export function ValidatedNumberInput({
    submitAttempted,
    setSubmitAttempted,
    inputID,
    inputData,

    label,
    className,
    variant,
    required = false,
}: ValidatedNumberInputProps): JSX.Element {
    const [number, setNumber] = useState<UnariableString>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        inputData.current![inputID] = {
            data: null,
            status: required ? false : true,
        };
    }, [inputData, inputID, required]);

    const validate = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const value = e.target.value;

        setNumber(value);
        setErrorMessage(value ? "" : "That is not a number.");

        inputData.current![inputID] = {
            data: value ? +value : null,
            status: required ? !!value : true,
        };
    };

    useEffect(() => {
        if (!submitAttempted) return;
        if (errorMessage) return;
        if (inputData.current![inputID].status) return;

        setErrorMessage(
            `Please enter a${
                "aeiou".includes(label[0]) ? "n" : ""
            } ${label.toLowerCase()}`
        );

        // reset for next submission attempt
        setSubmitAttempted(false);
    }, [
        submitAttempted,
        errorMessage,
        inputData,
        inputID,
        label,
        setSubmitAttempted,
    ]);

    return (
        <TextField
            value={number}
            onChange={validate}
            type="number"
            required={required}
            className={className || ""}
            variant={variant || "outlined"}
            label={label}
            error={!!errorMessage}
            helperText={errorMessage}
        />
    );
}

export function ValidatedStringInput({
    submitAttempted,
    setSubmitAttempted,
    inputID,
    inputData,

    label,
    className,
    variant,
    required,
}: ValidatedStringInputProps): JSX.Element {
    const [string, setString] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        inputData.current![inputID] = {
            data: null,
            status: required ? false : true,
        };
    }, [inputData, inputID, required]);

    const validate = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const value = e.target.value;

        inputData.current![inputID] = {
            data: value,
            status: required ? !!value : true,
        };

        setString(value);
        setErrorMessage("");
    };

    useEffect(() => {
        if (!submitAttempted) return;
        if (errorMessage) return;
        if (inputData.current![inputID].status) return;

        setErrorMessage(`Please enter a ${label.toLowerCase()}.`);
        setSubmitAttempted(false);
    }, [
        submitAttempted,
        errorMessage,
        inputData,
        inputID,
        label,
        setSubmitAttempted,
    ]);

    return (
        <TextField
            value={string}
            onChange={validate}
            type="text"
            required={required}
            className={className || ""}
            variant={variant || "outlined"}
            label={label}
            error={!!errorMessage}
            helperText={errorMessage}
        />
    );
}
