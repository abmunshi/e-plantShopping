import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateQuantity,
} from "../../redux/slices/CartSlice";
import { Button } from "@heroui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { API_URL } from "../../config/config";
import Counter from "../cart/Counter";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleChange = (val) => {
    console.log("item in cart item:", item);
    dispatch(updateQuantity({ ...item, quantity: val }));
  };
  return (
    <div className="relative grid grid-cols-[120px_auto] gap-4 border-t last:border-b border-gray-300 py-6">
      <div className="bg-gray-50 h-[120px] w-[120px] text-center">
        <img
          className="max-h-full max-w-full mx-auto"
          src={`${API_URL}` + item.thumbnail}
          alt="thumbnail"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="font-bold">{item.title}</h4>
          <p className="text-sm">{item.summary}</p>
        </div>
        <div className="flex items-center justify-end">
          <Counter
            value={item.quantity}
            min={1}
            max={item.stock}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col justify-between items-end">
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

          <div className="text-right">
            <span className="block text-xs text-gray-500 font-normal mb-1">
              ${item.price} each
            </span>
            <strong className="text-green-600 font-bold block text-lg leading-tight">
              ${item.price * item.quantity}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
