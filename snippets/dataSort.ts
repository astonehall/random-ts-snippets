/**
 *  Sort an array of objects by a key that is a string or number
 * @param array - The array to sort
 * @param key - The key to sort by
 * @param ascending - Whether to sort in ascending order (default: true)
 * @returns The sorted array
 * @example
 * const sortedArray = sortAscDescByStringOrNumberKey(array, 'name', true)
 * @example
 * const sortedArray = sortAscDescByStringOrNumberKey(array, 'age', false)
 *
 * PRO: Works really well with strings and numbers
 * PRO: Can sort in ascending or descending order
 * PRO: Useful in the situation where you want to sort objects but the key to sort by is inconsistent
 * CON: Does not work with dates (see below)
 * CON: Does not work with nested keys (havent found a good way to implement this yet, but also have not needed to)
 */

export function sortAscDescByStringOrNumberKey<T>(
  array: T[],
  key: keyof T,
  ascending: boolean = true
): T[] {
  return array.sort((a, b) => {
    const aValue = String(a[key]).toLowerCase();
    const bValue = String(b[key]).toLowerCase();
    if (aValue < bValue) {
      return ascending ? -1 : 1;
    }
    if (aValue > bValue) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
}

/**
 *  Sort an array of objects by a key that is a date
 * @param array - The array to sort
 * @param key - The key to sort by
 * @param ascending - Whether to sort in ascending order (default: true)
 * @returns The sorted array
 * @example
 * const sortedArray = sortAscDescByDateKey(array, 'date', true)
 * @example
 * const sortedArray = sortAscDescByDateKey(array, 'dateOfBirth', false)
 *
 * Note: Date functions are a pain in the ass with about a million different formats/combinations
 * This can be expanded to handle "non standard" formats (like dd/mm/yyyy below)
 *
 * PRO: Works really well with dates
 * PRO: Can sort in ascending or descending order
 * CON: Does not work with strings or numbers (see above)
 * CON: Does not work with nested keys (havent found a good way to implement this yet, but also have not needed to)
 */

export function sortAscDescByDateKey<T>(
  array: T[],
  key: keyof T,
  ascending: boolean = true
): T[] {
  return array.sort((a, b) => {
    let aValue = a[key] || new Date(0);
    let bValue = b[key] || new Date(0);

    // If the values are dates in the format "dd/mm/yyyy", convert them to Date objects
    if (typeof aValue === "string" && typeof bValue === "string") {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(aValue)) {
        const [aDay, aMonth, aYear] = aValue.split("/");
        const [bDay, bMonth, bYear] = bValue.split("/");
        aValue = new Date(Number(aYear), Number(aMonth) - 1, Number(aDay));
        bValue = new Date(Number(bYear), Number(bMonth) - 1, Number(bDay));
      } else if (/^\d{2}\.\d{4}$/.test(aValue)) {
        // If the values are dates in the format "mm.yyyy"
        const [aMonth, aYear] = aValue.split(".");
        const [bMonth, bYear] = bValue.split(".");
        aValue = new Date(Number(aYear), Number(aMonth) - 1);
        bValue = new Date(Number(bYear), Number(bMonth) - 1);
      }
    }

    if (aValue < bValue) {
      return ascending ? -1 : 1;
    }
    if (aValue > bValue) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
}

