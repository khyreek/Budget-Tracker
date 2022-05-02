export {};

/**
 * @Custom array methods
 *
 * To use,
 * Import this file and then use the methods as you would normally.
 * The import should just be empty brackets,
 * import {} from "[path]/array-methods";
 *
 * [array].[method](...)
 *
 */

Array.prototype.splitFilter = function <Passing, NotPassing>(
    callback: (
        val: Passing | NotPassing,
        i?: number,
        arr?: Array<Passing | NotPassing>
    ) => boolean
): [Array<Passing>, Array<NotPassing>] | any {
    // see types.d.ts for the definition of this function

    const filtered: Array<Passing> = [];
    const unfiltered: Array<NotPassing> = [];

    // the array that called this method
    this.forEach(
        (
            val: Passing | NotPassing,
            i: number,
            arr: Array<Passing | NotPassing>
        ) => {
            const result = callback(val, i, arr);

            // if the callback returns true, add the value to the filtered array
            (result ? filtered : unfiltered).push(val as any);
        }
    );

    return [filtered, unfiltered];
};
