import { API_URL } from "../config/config";

export const getProducts = async ({ page = 1, pageSize = 12 }) => {
  const res = await fetch(`${API_URL}/api/products?populate[image]=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("getProducts response:", res);

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
