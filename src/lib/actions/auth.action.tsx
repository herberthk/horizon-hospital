"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

/**
 * Session duration constant set to 1 week in seconds
 * Used for setting cookie expiration and session duration
 */
const SESSION_DURATION = 60 * 60 * 24 * 7;

/**
 * Creates and sets a session cookie in the browser using Firebase ID token
 * @param idToken - Firebase ID token from authenticated user
 */
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie with Firebase
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // Convert to milliseconds
  });

  // Set secure HTTP-only cookie in browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

/**
 * Creates a new user account in Firebase and stores user data in Firestore
 * @param params - Object containing uid, name, and email of new user
 * @returns Object with success status and message
 */
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  console.log("SignUp Params", params);
  try {
    // Check for existing user
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // Create new user document
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Handle Firebase specific errors
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

/**
 * Authenticates user and creates session cookie
 * @param params - Object containing email and Firebase ID token
 * @returns Object with success status and message if error occurs
 */
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    await setSessionCookie(idToken);
  } catch (error) {
    console.log("Error:", error);

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

/**
 * Ends user session by removing session cookie
 */
export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

/**
 * Retrieves current user data from session cookie
 * @returns User object if session is valid, null otherwise
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;
 
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Fetch user data from Firestore
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Checks if user has valid authentication session
 * @returns boolean indicating authentication status
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
