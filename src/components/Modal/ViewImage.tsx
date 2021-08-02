import {
  Image,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

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

      <ModalContent pb={2}>
        <Image src={imgUrl} />
      </ModalContent>

      <Link href={imgUrl} colorScheme="gray">
        Abrir original
      </Link>
    </Modal>
  );
}
