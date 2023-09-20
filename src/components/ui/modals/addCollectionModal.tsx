import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

import TextInput from "../input/textInput";
import { BackgroundImage } from "../home/home";

export type Collection = {
  name: string;
  collectionItem: BackgroundImage[];
};
export function AddCollectionModal({
  isOpen,
  onClose,
  collection,
  setCollection,
}: {
  isOpen: boolean;
  onClose: () => void;
  collection: Collection[] | [];
  setCollection: Dispatch<SetStateAction<Collection[]>>;
}) {
  const [collectionName, setCollectionName] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(e.target.value);
  };
  const createCollection = () => {
    const newCollection: Collection = {
      name: collectionName,
      collectionItem: [],
    };
    setCollection((prev) => [...prev, newCollection]);
    setCollectionName("");
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"80%"} borderRadius={"2px"}>
          <ModalHeader fontSize={"xs"}>Add new collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TextInput
              value={collectionName}
              setValue={handleInputChange}
              placeHolder="your collection name"
            />
            <Button my={"4"} size={"sm"} onClick={createCollection}>
              Add
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
