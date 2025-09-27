import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrent,
  addItemToCart as addItemToCartApi,
  removeItemFromCart as removeItemFromCartApi,
  updateQuantity as updateQuantityApi,
} from "../../api/cart";
import { getJWT } from "../../helpers/jwt";

export const getCurrentCart = createAsyncThunk(
  "cart/getCurrentCart",
  async () => {
    return await getCurrent(getJWT());
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const jwt = getJWT();
      await addItemToCartApi(jwt, productId, quantity);
      await dispatch(getCurrentCart());
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const jwt = getJWT();
      await removeItemFromCartApi(jwt, id);
      await dispatch(getCurrentCart());
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const jwt = getJWT();
      await updateQuantityApi(jwt, id, quantity);
      await dispatch(getCurrentCart());
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
      state.items = action.payload.cart_items.map((item) => ({
        id: item.documentId,
        productId: item.product.documentId,
        thumbnail: item.product.image.formats?.thumbnail.url,
        title: item.product.title,
        description: item.product.description,
        price: item.product.price,
        quantity: item.quantity,
        variant: item.variant,
        stock: item.product.stock,
      }));
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
      state.loading = false;
      state.error = null;
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
