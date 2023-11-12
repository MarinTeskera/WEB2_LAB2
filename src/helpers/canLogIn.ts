export const canLogIn = (session: any) => {
  if (session.loginAttempts && session.loginAttempts >= 3) {
    const now = new Date().getTime();
    const lastLoginAttempt = session.lastLoginAttempt || now;
    const diff = now - lastLoginAttempt;
    if (diff < 30000) {
      return false;
    }
  }

  return true;
};
