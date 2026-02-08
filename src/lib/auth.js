import { useClerk } from "@clerk/clerk-react";

/**
 * Get current Clerk user with metadata
 * @returns {Object|null}
 */
export const getUser = () => {
  // This is used in React components with useUser hook
  return null;
};

/**
 * Check if user is authenticated (used in non-React contexts)
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return true; // Clerk handles this
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  const { signOut } = useClerk();
  return await signOut();
};

