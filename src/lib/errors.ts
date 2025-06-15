export const getFriendlyErrorMessage =(code: string): string =>{
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email format';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/missing-password':
      return 'Please enter your password';
    case 'auth/invalid-credential':
      return 'Invalid credentials';
    default:
      return 'Something went wrong. Please try again';
  }
}
