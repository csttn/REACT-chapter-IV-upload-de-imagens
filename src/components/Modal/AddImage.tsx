import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FormAddImage } from "../Form/FormAddImage";

interface ModalAddImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddImage({
  isOpen,
  onClose,
}: ModalAddImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={handleCloseModal}
      isCentered
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent bgColor="pGray.900">
        <ModalHeader fontSize="4xl">Nova imagem</ModalHeader>

        <ModalCloseButton />

        <ModalBody px={60}>
          <FormAddImage closeModal={handleCloseModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
