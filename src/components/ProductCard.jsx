import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/slices/CartSlice";
import { Badge, Button, Chip } from "@heroui/react";
import toast from "react-hot-toast";
import { StarIcon } from "@heroicons/react/16/solid";
import { API_URL } from "../config/config";
import { getJWT } from "../helpers/jwt";
const ProductCard = ({ productId, thumbnail, title, summary, price }) => {
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    const jwt = getJWT();
    if (!jwt) {
      toast.error("Please login to add items to your cart.", {
        id: "add-to-cart-error",
      });
      return;
    }
    await dispatch(addItemToCart({ productId, quantity: 1 }));
  };
  return (
    <div className="border border-gray-300 p-4 relative">
      <div className="absolute right-0 -top-4">
        <Chip
          variant="solid"
          color="danger"
          className="bg-[#F4991A] text-white"
        >
          -10%
        </Chip>
      </div>
      <div className="bg-gray-50 h-[246px] text-center mb-3">
        <img
          className="max-h-full max-w-full mx-auto"
          src={`${API_URL}` + thumbnail}
          alt="thumbnail"
        />
      </div>
      <h4 className="font-bold text-base mb-1">{title}</h4>
      <p className="text-sm leading-tight mb-3 line-clamp-2 h-[35px]">
        {summary}
      </p>
      <div className="flex items-center gap-2 justify-between mb-3.5">
        <p className="flex items-center gap-1">
          <span className="inline-block font-bold text-base">${price - 5}</span>
          <span className="line-through inline-block font-normal text-xs ml-1 text-black/60 leading-tight">
            ${price}
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
        <Button className="rounded-none">Quick View</Button>
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
