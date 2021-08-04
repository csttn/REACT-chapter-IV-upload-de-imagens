import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { api } from "../../services/api";
import { FileInput } from "../Input/FileInput";
import { TextInput } from "../Input/TextInput";

interface FormAddImageProps {
  closeModal: () => void;
}

interface createImageFormData {
  url?: string;
  title: string;
  description: string;
}

const formValidations = yup.object().shape({
  image: yup.string().required().label("File"),
  title: yup.string().required("Titulo obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
});

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");
  const [localImageUrl, setLocalImageUrl] = useState("");

  const toast = useToast();

  const queryClient = useQueryClient();

  const createImage = useMutation(
    async (data: createImageFormData) => {
      const response = await api.post("images", {
        url: data.url,
        title: data.title,
        description: data.description,
      });
      return response.data.image;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("images");
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm({
      resolver: yupResolver(formValidations),
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<createImageFormData> = async (
    data
  ) => {
    const { description, title } = data;
    const imageDTO: createImageFormData = {
      description,
      title,
      url: imageUrl,
    };

    try {
      if (!imageUrl) {
        return toast({
          title: "Imagem não adicionada",
          description:
            "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
            status: "error",
            duration: 9000,
            isClosable: true,
        });
      }
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
      await createImage.mutateAsync(imageDTO);

      toast({
        title: "Imagem cadastrada",
        description: "Sua imagem foi cadastrada com sucesso.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED

      toast({
        title: "Falha no cadastro",
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
         status: "error",
          duration: 9000,
          isClosable: true,
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          name="image"
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register("image")}
        />

        <TextInput
          name="title"
          placeholder="Título da imagem..."
          type="text"
          error={errors.title}
          {...register("title")}
        />

        <TextInput
          name="description"
          placeholder="Descrição da imagem..."
          type="text"
          error={errors.description}
          {...register("description")}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
