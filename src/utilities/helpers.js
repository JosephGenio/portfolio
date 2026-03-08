/**
 * Validates an email address format.
 * Checks for: non-empty local part, @ symbol, domain with at least one dot, and valid TLD (2+ chars).
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
