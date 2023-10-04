import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AddIcon, CollectinIcon } from "../icons/icons";
import { Collection } from "../modals/addCollectionModal";
import { Fragment, useContext, useState } from "react";

import { ViewCollectionModal } from "../modals/viewCollectionModal";

type CollectionCardProp = {
  id: number;
};

const collectiondefaultui = {
  width: "200px",
  bg: "brand.offwhite",
  color: "brand.mute",
};
export default function CollectionCard(props: Collection & CollectionCardProp) {
  const [files, setFiles] = useState(props.collectionItem);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dragOverStyle, setDragOverStyle] = useState(collectiondefaultui);

  const HandleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    let updateFile;
    e.preventDefault();
    e.stopPropagation();
    setDragOverStyle({
      width: "200px",
      bg: "brand.green",
      color: "brand.offwhite",
    });
    const data = e.dataTransfer.getData("files");
    if (data) {
      const imageDetails = JSON.parse(data);
      const added = files.find((item) => item.id === imageDetails.id);
      if (added) {
        setDragOverStyle({
          width: "200px",
          bg: "red.500",
          color: "brand.offwhite",
        });
        setTimeout(() => {
          setDragOverStyle(collectiondefaultui);
        }, 1500);
        return;
      }
      updateFile = [...files, imageDetails];
      setFiles(updateFile);
    }
    setTimeout(() => {
      setDragOverStyle(collectiondefaultui);
    }, 1500);
  };
  const HandleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverStyle(collectiondefaultui);
  };

  const handleRemoveItem = (id: string) => {
    const prevState = files;
    const newFiles = files.filter((element) => element.id !== id);
    setFiles(newFiles);
  };
  const HandleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setDragOverStyle({
      width: "300px",
      bg: "#000",
      color: "#fff",
    });
  };
  return (
    <>
      <Flex
        w={dragOverStyle.width}
        h={"150px"}
        bg={dragOverStyle.bg}
        mx={"2"}
        borderRadius={"5px"}
        flexDir={"column"}
        justify={"space-between"}
        p={"6"}
        fontWeight={"600"}
        fontSize={"xs"}
        color={dragOverStyle.color}
        onClick={onOpen}
        transition={"all 0.2s ease-in"}
        onDrop={(e) => {
          HandleDrop(e);
        }}
        onDragOver={(e) => {
          HandleDragOver(e);
        }}
        onDragLeave={(e) => {
          HandleDragLeave(e);
        }}
        cursor={"pointer"}
      >
        <Flex flexDir={"column"}>
          <CollectinIcon color={"brand.lightgray"} />
          <Text
            fontSize={"x-small"}
            fontWeight={"900"}
            textTransform={"capitalize"}
          >
            {props.name}
          </Text>
        </Flex>
        <Flex justify={"flex-end"}>
          <Text>{files.length}</Text>
        </Flex>
        {isOpen && (
          <ViewCollectionModal
            collection={files}
            onClose={onClose}
            isOpen={isOpen}
            collectionName={props.name}
            note={props.note}
            handleRemove={handleRemoveItem}
          />
        )}
      </Flex>
    </>
  );
}

export function CollectionCardLayout({
  onOpen,
  collection,
}: {
  onOpen: () => void;
  collection: Collection[];
}) {
  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
  }
  return (
    <Flex
      flexGrow={"1"}
      bg={"#fff"}
      minH={"130px"}
      p={4}
      w={"100%"}
      onDragEnter={(e) => {
        handleDragEnter(e);
      }}
      fontWeight={"700"}
      fontSize={{
        base: "xs",
        lg: "sm",
      }}
      flexDir={"column"}
    >
      <Flex
        justify={"space-between"}
        w={{
          base: "100%",
          md: "50%",
        }}
        py={"4"}
        textTransform={"capitalize"}
      >
        <Text fontWeight={"500"}>your collections {collection.length}</Text>
        <Text onClick={onOpen} cursor={"pointer"}>
          <AddIcon /> Create collection
        </Text>
      </Flex>

      <Flex
        overflowX={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Flex>
          {collection.length > 0 &&
            collection.map((item, index) => (
              <Fragment key={index}>
                <CollectionCard {...item} id={index} />
              </Fragment>
            ))}
          {collection.length === 0 && (
            <Text
              w={{
                base: "80%",
                lg: "50%",
              }}
              color={"brand.darkgray"}
              fontSize={"xs"}
            >
              you have no collection, create collection folder and drag images
              to add to it. click to view your added images. click the add
              button to create
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
