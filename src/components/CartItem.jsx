import { useDispatch } from "react-redux";
import { removeItemFromCart, updateQuantity } from "../redux/slices/CartSlice";
import { Button } from "@heroui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { API_URL } from "../config/config";
import Counter from "./cart/Counter";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleChange = (val) => {
    console.log("item in cart item:", item);
    dispatch(updateQuantity({ ...item, quantity: val }));
  };
  return (
    <div className="relative grid grid-cols-[192px_auto] gap-6 border-t last:border-b border-gray-300 py-6">
      <div className="bg-gray-50 h-[192px] w-[192px] text-center">
        <img
          className="max-h-full max-w-full mx-auto"
          src={`${API_URL}` + item.thumbnail}
          alt="thumbnail"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4>{item.title}</h4>
          <p>{item.price}</p>
        </div>
        <div className="max-w-16">
          <Counter
            value={item.quantity}
            min={1}
            max={item.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="absolute right-6 top-4">
        <Button
          isIconOnly
          className="bg-transparent hover:bg-gray-200 border-0"
          onPress={() => {
            console.log("clicked on delete button in cart item");
            dispatch(removeItemFromCart({ id: item.id }));
          }}
        >
          <XMarkIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
