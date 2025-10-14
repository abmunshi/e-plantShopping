import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Tabs,
  Tab,
} from "@heroui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Auth() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-white text-black font-medium text-sm h-12"
        radius="none"
        size="md"
      >
        <UserCircleIcon className="w-6 h-6" />
        Sign In/Up
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "rounded-none",
          body: "py-6",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <Tabs
                aria-label="Options"
                disableAnimation={true}
                classNames={{
                  base: "",
                  tabList: "bg-transparent text-white",
                  tab: "data-[selected=true]:bg-transparent",
                  tabContent:
                    "group-data-[selected=true]:text-warning font-normal text-base",
                  panel: "",
                }}
              >
                <Tab key="signIn" title="Sign In">
                  <SignIn />
                </Tab>
                <Tab key="signUp" title="Sign Up">
                  <SignUp />
                </Tab>
              </Tabs>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
