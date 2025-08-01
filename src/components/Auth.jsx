import { useSelector } from "react-redux";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tabs,
  Tab,
  useSelect,
} from "@heroui/react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Auth() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const authState = useSelector((state) => state.auth);

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-white text-black font-medium text-sm"
      >
        Sign In/Up
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs
                    aria-label="Options"
                    fullWidth
                    classNames={{
                      base: "",
                      tabList: "",
                      tab: "",
                      panel: "",
                    }}
                  >
                    <Tab key="signIn" title="Sign In">
                      <SignIn authState={authState} />
                    </Tab>
                    <Tab key="signUp" title="Sign Up">
                      <SignUp authState={authState} />
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
