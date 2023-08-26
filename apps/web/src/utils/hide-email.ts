/**
 * ## secureEmailView
 *
 * render email with secure
 * adding some wildcard when showing the email
 * for example `j*****e@gmail.com`
 *
 * @param email the email want to hide
 * @returns {string}
 */
export const secureEmailView = (email: string): string => {
  const parts = email.split('@')

  if (parts.length !== 2) {
    // Invalid email format, return as is
    return email
  }

  const username = parts[0]
  const domain = parts[1]

  const hiddenUsername =
    username.length > 2
      ? username[0] +
        '*'.repeat(username.length - 2) +
        username[username.length - 1]
      : username

  return hiddenUsername + '@' + domain
}
