import { UnariableString } from "../global";
import { ErrorMessage } from "../types/form-validation-types";


export function numberValidator(num: UnariableString): ErrorMessage {
    if (num.length === 0) return "This field is required";
    if (isNaN(+num)) return "Please enter a number";

    return "";
}

export function stringValidator(str: string): ErrorMessage {
    return str.length === 0 ? "This field in required" : "";
}

export function budgetMaxValidator(max: UnariableString): ErrorMessage {
    if (max.length === 0) return "This field is required";
    if (isNaN(+max)) return "Please enter a number";

    if (+max <= 0) return "Must be greater than 0";
    return "";
}
