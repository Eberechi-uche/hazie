import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { Fragment } from "react";

import { BackgroundImage } from "../home/home";
import ImageCard from "../card/ImageCard";

export type Collection = {
  name: string;
  collectionItem: BackgroundImage[];
};
export function ViewCollectionModal({
  isOpen,
  onClose,
  collection,
  collectionName,
}: {
  isOpen: boolean;
  onClose: () => void;
  collection: BackgroundImage[];
  collectionName: string;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w={"80%"}
          borderRadius={"2px"}
          overflowY={"scroll"}
          maxH={"70vh"}
        >
          <ModalHeader fontSize={"xs"}>{collectionName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} gap={"2"}>
              {collection.length > 0 &&
                collection.map((item, index) => (
                  <Fragment key={index}>
                    <ImageCard {...item} />
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
