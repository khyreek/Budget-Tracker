import { useEffect, useRef } from "react";
import {
    Observable,
    Observables,
    ObservablesStatus,
} from "../../types/form-validation-types";

/**
 * Observable is the input that he being watched. When it changes,
 * the other given information like the callback is called.a
 */

export default function useValidator(
    submitAttempted: boolean,
    setSubmitAttemped: React.Dispatch<React.SetStateAction<boolean>>,
    observables: Observables
): ObservablesStatus {
    /**
     * The structure of an observable is [id, input, validator, errorSettor], where
     * validator is a function that takes in the input and returns an error message
     * depending on the input. errorSettor is a function that will set the error
     * message which corresponds to the errorMessage state in the component where this
     * hook is used.
     * @REQUIRED IDs must be different for each observable.
     *
     * This will not avoid validation checking if an input is not required, it is up to
     * the user to not include an observable if it is not required.
     *
     * The user can check validity by checking the status of each input key: data pair
     * which will be returned here.
     */

    /**
     * The @CLEARING_CHECK_CORNER_CASE : after the submission
     * is confirmed to be true and all the data is sent to be handled, the input
     * box will be cleared to an empty string, but this will call this useEffect
     * since the input is a dependency.
     *
     * This is handled by individual checks in each useEffect which will be
     * documented as gone along.
     *
     * @NECCESSITY The methods used will rely on the number of validity elements
     * being checked to be greater than one. If you expect only one observable
     * involved in the form, it is recommended to
     * manually write the baby version of this. Using this
     * hook for a single observed element will not come at the cost of any
     * functionality, however the styles of the input element will be wrong
     * at times.
     */

    const prevState = useRef<Observables>(observables);

    // default each input status to false
    const validationInfo = useRef<ObservablesStatus>(
        observables.reduce(
            (
                acc: ObservablesStatus,
                { id }: Observable
            ): ObservablesStatus => ({
                ...acc,
                [id]: false,
            }),
            {}
        )
    );
    // console.log(validationInfo);

    useEffect(
        () => {
            /**
             * @Note there will always be a changed here except for the first
             * render because the dependencies only include the state values.
             * So if no input changed, this validation check will not happen.
             */

            // find what changed, this will first be an array of all changed items
            // see @CLEARING_CHECK_CORNER_CASE
            let changed: Array<Observable> | Observable = observables.filter(
                (observable) => {
                    const corresponding = prevState.current.find(
                        (prevObservable) => observable.id === prevObservable.id
                    );

                    return observable.input !== corresponding?.input;
                }
            );

            // if more than one thing changed, it's assumed a reset has happened
            // do not do a validation check
            if (changed.length > 1) {
                // Object.keys(validationInfo.current).forEach(
                //     (key) => (validationInfo.current[key] = false)
                // );
                return;
            }
            changed = changed[0];

            // there will be no changes on the very first render
            if (!changed) return;

            // set a possible error message
            const { id, input, validator, errorSetter } = changed;
            const error = validator(input);
            errorSetter(validator(input));

            // depending on the error, set the status to false
            validationInfo.current[id] = !error;

            // update the previous record
            prevState.current = observables;
        },

        observables.map((observable: Observable) => observable.input)
    );

    useEffect(() => {
        // if the hasSubmitted property was set to false, it's just a refresh
        // no need to do anything here
        if (!submitAttempted) return;
        // refresh so the next submission will trigger a validation check
        setSubmitAttemped(false);

        // see @CLEARING_CHECK_CORNER_CASE, if all the inputs are valid and the user
        // has submitted, then stop here before the validation checks
        if (
            Object.values(validationInfo.current).every((validity) => validity)
        ) {
            return;
        }

        // validate each input value
        for (const observable of observables) {
            const { input, validator, errorSetter } = observable;
            errorSetter(validator(input));
        }

        // refresh for the next submit attempt to trigger this effect
    }, [submitAttempted]);

    // useEffect(() => {
    //     if (successfulSubmissionThrough) return;
    // }, [successfulSubmissionThrough]);

    // return the status of each input
    return validationInfo.current;
}
