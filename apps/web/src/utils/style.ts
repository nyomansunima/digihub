import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * ## mergeClass
 *
 * merging the class that allow to manage conflict
 * without error,
 *
 * @param inputs the class input to merge
 * @returns {string}
 */
export function mergeClass(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
