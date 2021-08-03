import { Box, Button } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { InfiniteData, useInfiniteQuery } from "react-query";
import { ICard } from "../components/Card";
import { CardList } from "../components/CardList";
import { Error } from "../components/Error";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../services/api";

export default function Home(): JSX.Element {
  const [loadingImages, setloadingImages] = useState(false);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "images",
    async ({ pageParam = null }) => {
      const response = await api.get(`/images`);
      console.log(response.data);
      return response.data;
    },
    {
      getNextPageParam: (data) => {
        return data.after ? data.after : null;
      },
    }
  );

  useEffect(() => {
    isFetchingNextPage ? setloadingImages(true) : setloadingImages(false);
    console.log("Carregando novas imagens");
  }, [isFetchingNextPage]);

  function formattedImagesData(data: InfiniteData<any>): ICard[] {
    if (data) {
      const imagesFormatted = data.pages.map((content) => {
        const imagesData = content.data.map((image) => ({
          title: image.title,
          description: image.description,
          url: image.url,
          id: image.id,
        }));
        return imagesData;
      });
      return imagesFormatted.flat();
    }

    return;
  }

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const dataFormatted = formattedImagesData(data);
    if (dataFormatted) return dataFormatted;
  }, [data]);

  const renderContent = () => {
    if (isError) return <Error />;

    if (isLoading) return <Loading />;

    if (formattedData) {
      return <CardList cards={formattedData} />;
    }
  };

  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        {renderContent()}
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}

        <Button colorScheme="red" onClick={() => fetchNextPage()}>
          Carregar mais...
        </Button>

        {loadingImages && <Loading />}
      </Box>
    </>
  );
}
