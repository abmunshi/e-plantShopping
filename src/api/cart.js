import { API_URL } from "../config/config.js";
export const getCurrent = async (jwt) => {
  try {
    const res = await fetch(`${API_URL}/api/carts/me/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error?.message || "Failed to fetch current cart");
    }
    console.log("getCurrent cart response data:", data.data);
    return data.data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const addItemToCart = async (jwt, productId, quantity = 1) => {
  try {
    const res = await fetch(`${API_URL}/api/carts/add-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMsg = data?.error?.message || "Failed to add item to cart";
      throw new Error(errorMsg);
    }

    console.log("addItemToCart response data:", data);

    return data.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const removeItemFromCart = async (jwt, id) => {
  try {
    const res = await fetch(`${API_URL}/api/carts/remove-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMsg =
        data?.error?.message || "Failed to remove item from cart";
      throw new Error(errorMsg);
    }
    console.log("removeItemFromCart response data:", data);
    return data.data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const updateQuantity = async (jwt, id, quantity) => {
  try {
    const res = await fetch(`${API_URL}/api/carts/update-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ id, quantity }),
    });
    const data = await res.json();
    if (!res.ok) {
      const errorMsg = data?.error?.message || "Failed to update item quantity";
      throw new Error(errorMsg);
    }
    console.log("updateQuantity response data:", data);
    return data.data;
  } catch (error) {
    console.error("Error updating item quantity in cart:", error);
    throw error;
  }
};
