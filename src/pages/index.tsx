import { Box, Button } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { InfiniteData, useInfiniteQuery } from "react-query";
import { Card } from "../components/Card";
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
    async (pageParam = null) => {
      const response = await api.get(`/images`);
      return response.data;
    }, // TODO AXIOS REQUEST WITH PARAM
    {
      getNextPageParam: (data) => (data.after ? data.after : null),
    }
  );

  function formattedImagesData(data: InfiniteData<any>) {
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
      return formattedData.map((card) => <Card key={card.id} data={card} />);
    }
  };

  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        {renderContent()}
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}

        <Button colorScheme="red">Carregar mais...</Button>
      </Box>
    </>
  );
}
