import toast from "react-hot-toast";

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
    console.log("User registered successfully:", data);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password: password }),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMsg =
        data?.error?.message || data?.message || "Sign in failed";
      throw new Error(errorMsg);
    }
    sessionStorage.setItem("jwt", data.jwt);
    console.log("User signed in successfully:", data);
  } catch (err) {
    toast.error(err.message || "Sign in failed");
    console.log(err.message);
    throw err;
  }
};

export const signOut = async () => {
  sessionStorage.removeItem("jwt");
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
