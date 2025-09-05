import bcrypt from "bcryptjs";
export const signUp = async (username, email, password) => {
  try {
    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      const errorMsg =
        data?.error?.message || data?.message || "Sign up failed";
      throw new Error(errorMsg);
    }

    // Store JWT and user data in session storage
    sessionStorage.setItem("jwt", data.jwt);
    sessionStorage.setItem("currentUserEmail", data.user.email);

    console.log("User registered successfully:", data);

    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
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
  const jwt = sessionStorage.getItem("jwt");
  if (!jwt) {
    return null; // No user logged in
  }
  try {
    const response = await fetch("http://localhost:1337/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.error?.message || "Failed to fetch user data";
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.log("Error fetching current user:", error);
    throw error;
  }
};
