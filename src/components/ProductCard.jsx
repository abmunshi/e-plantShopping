import { Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/CartSlice";
const ProductCard = ({ name, image, description, cost }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addItem({ name, image, cost }));
  };
  return (
    <div className="border border-gray-300 p-4">
      <div className="bg-gray-50 h-[246px] text-center mb-3">
        <img
          className="max-h-full max-w-full mx-auto"
          src={image}
          alt="thumbnail"
        />
      </div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-[15px] leading-tight mb-2">{description}</p>
      <p className="mb-2">{cost}</p>
      <Button onPress={handleAddToCart}>Add To Cart</Button>
    </div>
  );
};

export default ProductCard;
