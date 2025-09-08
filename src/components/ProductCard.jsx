import { Button } from "@heroui/react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/CartSlice";
import { StarIcon } from "@heroicons/react/16/solid";
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
      <h4 className="font-bold text-base mb-1">{name}</h4>
      <p className="text-sm leading-tight mb-3 line-clamp-2">{description}</p>
      <div className="flex items-center gap-2 justify-between mb-3.5">
        <p className="flex items-center gap-1">
          <span className="inline-block font-bold text-base">${cost - 5}</span>
          <span className="line-through inline-block font-normal text-xs ml-1 text-black/60 leading-tight">
            ${cost}
          </span>
        </p>
        <p className="flex items-center gap-1">
          <span className="inline-flex items-center gap-[2px]">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <strong className="inline-block text-sm font-bold">4.5</strong>
          </span>
          <span className="inline-block text-black/60 text-xs">
            (49 Reviews)
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button className="rounded-none">View Details</Button>
        <Button
          onPress={handleAddToCart}
          className="bg-primary rounded-none text-white"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
