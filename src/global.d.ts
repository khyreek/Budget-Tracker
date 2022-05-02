export type ExclusiveUnion<T, U> = Record<
    Exclude<keyof (T & U), Extract<keyof T, keyof U>>,
    unknown
>;

export declare global {
    // custom array methods
    interface Array<T> {
        /**
         * Given a filter prompt, return a new array with the left side
         * being an array of the values of the filter, and the right side
         * being an array of the values that did not pass the filter
         */
        splitFilter: <P, NP>(
            callback: (val: P | NP, i?: number, arr?: Array<P | NP>) => boolean
        ) => [passed: Array<P>, failed: Array<NP>];
    }
}

// meaning it can be converted to a number with + prefix operator
export type UnariableString = string;
