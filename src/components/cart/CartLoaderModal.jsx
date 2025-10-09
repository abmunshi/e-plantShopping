import {
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  useSelect,
} from "@heroui/react";
import { useSelector } from "react-redux";

const CartLoaderModal = () => {
  const loading = useSelector((state) => state.cart.loading);
  console.log("Cart modal state:", loading);
  return (
    <Modal
      size="xs"
      isOpen={loading}
      hideCloseButton
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      classNames={{
        base: "bg-transparent shadow-none max-w-20",
      }}
    >
      <ModalContent>
        <div className="bg-white w-20 h-20 rounded-full grid place-content-center relative mx-auto overflow-hidden">
          <span className="inline-block text-3xl">🌱</span>
          <div className="loader w-[74px] border-8 border-[#F2EAD3] border-r-primary-600 rounded-full aspect-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
        </div>
      </ModalContent>
      {/* sdfjlsfjlsdfjlsdfjlk */}
    </Modal>
  );
};

export default CartLoaderModal;
