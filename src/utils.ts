
/**
 * Flattens the given array
 * @param array to flatten
 */
export function flatten<T>(array: Array<Array<T>>): Array<T> {
  return array.reduce((acc, next)=>[...acc, ...next], [])
}