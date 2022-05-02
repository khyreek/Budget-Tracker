import { UUID } from "./budget-types";

export type ValidatedStatus = boolean;
export type ValidatedInput = any;
export type ErrorMessage = string;
export type Observables = Array<Observable>;

export interface Observable {
    id: UUID;
    input: ValidatedInput;
    validator: (input: ValidatedInput) => ErrorMessage;
    errorSetter: React.Dispatch<React.SetStateAction<any>>;
}

export interface ObservablesStatus {
    [key: UUID]: ValidatedStatus;
}

// TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT -------------RMK4X1Z-----------
type RequirmentPassed = boolean;
type InputID = string;
export interface InputData {
    [id: InputID]: {
        data: any;
        status: RequirmentPassed;
    };
}
