import {
  Box,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export interface ICard {
  title: string;
  description: string;
  url: string;
  ts: number;
  id?: string;
}

interface CardProps {
  data: ICard;
  viewImage?: (url: string) => void;
}

export function Card({ data, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Box
        key={data.ts}
        borderRadius="md"
        bgColor="pGray.800"
        w="290px"
        h="290px"
      >
        <Skeleton isLoaded={!isLoading}>
          <Image
            src={data.url}
            alt={data.title}
            objectFit="cover"
            w="max"
            h="190px"
            borderTopRadius="md"
            onClick={() => viewImage(data.url)}
            onLoad={() => setIsLoading(false)}
            cursor="pointer"
          />
        </Skeleton>

        <Box pt={5} pb={4} px={6}>
          {isLoading ? (
            <>
              <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
              <SkeletonText fontSize="md" mt={7} noOfLines={1} />
            </>
          ) : (
            <>
              <Heading fontSize="2xl">{data.title}</Heading>
              <Text mt={2.5} fontSize="md">
                {data.description}
              </Text>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
