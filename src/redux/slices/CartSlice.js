import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getCurrent,
  addItemToCart as addItemToCartApi,
  removeItemFromCart as removeItemFromCartApi,
  updateQuantity as updateQuantityApi,
} from "../../api/cart";
import { getJWT } from "../../helpers/jwt";

function setCartItems(cart_items) {
  return cart_items.map((item) => ({
    id: item.documentId,
    productId: item.product.documentId,
    thumbnail: item.product.image.formats?.thumbnail.url,
    title: item.product.title,
    summary: item.product.summary,
    description: item.product.description,
    price: item.product.price,
    quantity: item.quantity,
    variant: item.variant,
    stock: item.product.stock,
  }));
}

export const getCurrentCart = createAsyncThunk(
  "cart/getCurrentCart",
  async () => {
    return await getCurrent(getJWT());
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const jwt = getJWT();
      const updatedCart = await addItemToCartApi(jwt, productId, quantity);
      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ id }, { rejectWithValue }) => {
    try {
      const jwt = getJWT();
      const updatedCart = await removeItemFromCartApi(jwt, id);
      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const jwt = getJWT();
      const updatedCart = await updateQuantityApi(jwt, id, quantity);
      return updatedCart;
    } catch (err) {
      console.error("Error updating quantity:", error);
      return rejectWithValue(err.message);
    }
  }
);
export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
    },

    setCart: (state, action) => {
      state.items = action.payload.cartItems.map((item) => ({
        id: item.id,
        name: item.plant.name,
        image: item.plant.image,
        cost: item.plant.price,
        quantity: item.quantity,
        plantId: item.plant.id,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentCart.fulfilled, (state, action) => {
      console.log("Cart API payload:", action.payload);
      state.loading = false;
      state.items = setCartItems(action.payload.cart_items);
      state.error = null;
    });
    builder.addCase(getCurrentCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      console.log("AddItemToCart API payload:", action.payload);
      state.loading = false;
      state.error = null;
      state.items = setCartItems(action.payload.cart_items);
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(removeItemFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = setCartItems(action.payload.cart_items);
      state.error = null;
    });
    builder.addCase(removeItemFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateQuantity.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.items = setCartItems(action.payload.cart_items);
      state.error = null;
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addItem, removeItem, setCart } = CartSlice.actions;

export default CartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotals = createSelector([selectCartItems], (items) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const taxRate = 0.03; // 3% tax
  const shippingFee = items.length > 0 ? 1.5 : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingFee;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    shipping: shippingFee,
    total: parseFloat(total.toFixed(2)),
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
  };
});

export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);
