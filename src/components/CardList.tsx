import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Card, ICard } from "./Card";
import { ModalViewImage } from "./Modal/ViewImage";

interface CardsProps {
  cards: ICard[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  function viewImage(url: string) {
    onOpen();
    setSelectedImageUrl(url);
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {cards.map((card) => (
          <GridItem key={card.id}>
            <Card data={card} viewImage={viewImage} />
          </GridItem>
        ))}
      </Grid>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImageUrl}
      />
    </>
  );
}
