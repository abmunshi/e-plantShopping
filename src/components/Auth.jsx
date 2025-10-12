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

export default function Auth() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                      <SignIn />
                    </Tab>
                    <Tab key="signUp" title="Sign Up">
                      <SignUp />
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
