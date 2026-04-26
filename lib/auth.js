/**
 * NovaCargo Admin Auth
 * Client-side credential check and session helpers.
 * Stored in localStorage under 'novacargo-admin-session'.
 */

// ─── Hardcoded admin credentials ─────────────────────────────────────────────
const ADMIN_EMAIL    = "info@novacargo@gmail.com";
const ADMIN_PASSWORD = "NOVAcargo237!";
const SESSION_KEY    = "novacargo-admin-session";

// ─── Session shape ────────────────────────────────────────────────────────────
// { email: string, loginAt: number, token: string }

function generateToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * Attempt login. Returns { success, error }.
 */
export function login(email, password) {
  if (email.trim() !== ADMIN_EMAIL) {
    return { success: false, error: "No admin account found for that email." };
  }
  if (password !== ADMIN_PASSWORD) {
    return { success: false, error: "Incorrect password. Please try again." };
  }

  const session = {
    email: ADMIN_EMAIL,
    loginAt: Date.now(),
    token: generateToken(),
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (_) {}

  return { success: true, session };
}

/**
 * Retrieve active session from localStorage.
 * Returns session object or null.
 */
export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    // Sessions last 8 hours
    const eightHours = 8 * 60 * 60 * 1000;
    if (Date.now() - session.loginAt > eightHours) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch (_) {
    return null;
  }
}

/**
 * Check if admin is currently authenticated.
 */
export function isAuthenticated() {
  return getSession() !== null;
}

/**
 * Clear the active session (logout).
 */
export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (_) {}
}
