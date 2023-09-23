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

import TextInput, { TextAreaInput } from "../input/textInput";
import { BackgroundImage } from "../home/home";

export type Collection = {
  name: string;
  collectionItem: BackgroundImage[];
  note: string;
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
  const [collectionName, setCollectionName] = useState({
    title: "",
    note: "",
  });
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement> &
          React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCollectionName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const createCollection = () => {
    const newCollection: Collection = {
      name: collectionName.title,
      collectionItem: [],
      note: collectionName.note,
    };
    setCollection((prev) => [...prev, newCollection]);
    setCollectionName({
      title: "",
      note: "",
    });
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
              value={collectionName.title}
              setValue={handleInputChange}
              placeHolder="your collection name"
              name={"title"}
            />
            <TextAreaInput
              value={collectionName.note}
              setValue={handleInputChange}
              placeHolder="collection note (optional)"
              name={"note"}
            />
            <Button
              my={"4"}
              size={"sm"}
              onClick={createCollection}
              isDisabled={collectionName.title.length === 0}
            >
              Add
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
