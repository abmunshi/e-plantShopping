import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/slices/CartSlice";
import { Button } from "@heroui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleChange = (val) => {
    dispatch(updateQuantity({ ...item, quantity: val }));
  };
  return (
    <div className="relative grid grid-cols-[192px_auto] gap-6 border-t last:border-b border-gray-300 py-6">
      <div className="bg-gray-50 h-[192px] w-[192px] text-center">
        <img
          className="max-h-full max-w-full mx-auto"
          src={item.image}
          alt="thumbnail"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4>{item.name}</h4>
          <p>{item.cost}</p>
        </div>
        <div className="max-w-16">
          <select
            value={item.quantity}
            className="w-full"
            onChange={(e) => handleChange(parseInt(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      <div className="absolute right-6 top-4">
        <Button
          isIconOnly
          className="bg-transparent hover:bg-gray-200 border-0"
          onPress={() => {
            dispatch(removeItem(item));
          }}
        >
          <XMarkIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
