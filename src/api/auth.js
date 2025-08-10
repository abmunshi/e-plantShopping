import bcrypt from "bcryptjs";
export const signUp = async (firstName, lastName, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((user) => user.email === email);
      if (user) {
        reject({
          message: "User already exists",
          code: "auth/email-already-in-use",
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        users.push({ firstName, lastName, email, password: hashedPassword });
        localStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("currentUserEmail", email);
        resolve({
          uid: `mock-uid-${Date.now()}`,
          email,
          message: "Registration successful",
        });
      }
    }, 500);
  });
};

export const signIn = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email);
      if (user && bcrypt.compareSync(password, user.password)) {
        sessionStorage.setItem("currentUserEmail", email);
        resolve({
          uid: `mock-uid-${Date.now()}`,
          email,
          message: "SignIn successful",
        });
      } else {
        reject({
          message: "Invalid credentials",
          code: "auth/invalid-credentials",
        });
      }
    }, 1000);
  });
};

export const signOut = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      sessionStorage.removeItem("currentUserEmail"); // Clear session storage
      resolve({ message: "Logged out successfully" });
    }, 300);
  });
};

export const getCurrentUser = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const storedUserEmail = sessionStorage.getItem("currentUserEmail");
      const user = users.find((u) => u.email === storedUserEmail);
      if (user) {
        resolve({
          uid: `mock-uid-${Date.now()}`,
          email: storedUserEmail,
          name: user.fullName,
        });
      } else {
        resolve(null); // No user logged in
      }
    }, 100);
  });
};
