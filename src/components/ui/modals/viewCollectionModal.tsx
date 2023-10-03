import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";

import { BackgroundImage } from "../home/home";
import ImageCard from "../card/ImageCard";

import { CollectionContext } from "@/contexts/collectionCtx";
import { useRouter } from "next/navigation";

type ViewCollectionModalprops = {
  isOpen: boolean;
  onClose: () => void;
  note: string;
  collection: BackgroundImage[];
  collectionName: string;
  handleRemove: (id: string) => void;
};

export type Collection = {
  name: string;
  collectionItem: BackgroundImage[];
};
export function ViewCollectionModal({
  isOpen,
  onClose,
  collection,
  collectionName,
  note,
  handleRemove,
}: ViewCollectionModalprops) {
  const { setCollection, currentCollection } = useContext(CollectionContext);
  const route = useRouter();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"} autoFocus={false}>
        <ModalOverlay />
        <ModalContent
          w={"80%"}
          borderRadius={"2px"}
          overflowY={"scroll"}
          maxH={"70vh"}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          pos={"relative"}
        >
          <ModalHeader
            fontSize={"xs"}
            pos={"sticky"}
            top={"0px"}
            zIndex={"2"}
            bg={"#fff"}
          >
            <Flex flexDir={"column"}>
              <Text>{collectionName}</Text>
              <Text color={"brand.darkgray"}>{note}</Text>
            </Flex>
            <Flex
              w={"100%"}
              fontWeight={"900"}
              my={"4"}
              cursor={"pointer"}
              color={"brand.mute"}
              justify={"space-between"}
            >
              <Text
                textTransform={"uppercase"}
                _hover={{
                  color: "brand.share",
                  letterSpacing: "2px",
                }}
                transition={"all 0.5s ease-in-out"}
              >
                Share collection
              </Text>
              <Text
                textTransform={"uppercase"}
                onClick={() => {
                  setCollection({
                    name: collectionName,
                    collectionItem: [...collection],
                    note: note,
                  });
                  route.push("/collection");
                }}
                _hover={{
                  color: "brand.share",
                  letterSpacing: "2px",
                }}
                transition={"all 0.5s ease-in-out"}
              >
                view all
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody fontSize={"xs"} my={"4"}>
            <Flex h={"20%"} bg={"red.600"}></Flex>
            <SimpleGrid columns={2} gap={"2"}>
              {collection.length > 0 &&
                collection.map((item) => (
                  <Fragment key={item.id}>
                    <ImageCard {...item} delete={handleRemove} />
                  </Fragment>
                ))}
            </SimpleGrid>
            {collection.length === 0 && <Text>You have no collection</Text>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
