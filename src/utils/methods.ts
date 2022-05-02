/**@General */
export function sameArrLen<T>(arrA: Array<T>, arrB: Array<T>): boolean {
    return arrA.length === arrB.length;
}

export function unionishArr<T>(arrA: Array<T>, arrB: Array<T>): boolean {
    /**
     * Check if the length of the arrays are the same and
     * if each element in the first array is in the second array.
     */

    return (
        sameArrLen(arrA, arrB) && arrA.every((item: T) => arrB.includes(item))
    );
}

export function sameishArr(
    arrA: Array<unknown>,
    arrB: Array<unknown>
): boolean {
    /**
     * Check if two arrays have the same values in the same order
     * with same amount of elements.
     */

    return (
        sameArrLen(arrA, arrB) &&
        arrA.every((val: unknown, i: number): boolean => arrB[i] === val)
    );
}

const objUnion = <T, U>(ob1: T, ob2: U): T & U => ({ ...ob1, ...ob2 });

