/**
 * ## generateRandomString
 *
 * Generate random string to allow use in the
 * verification, code, or anything
 *
 * @param length the chars length
 * @returns {string}
 */
export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const characterCount = characters.length
  let randomString = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterCount)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}
