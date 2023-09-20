import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AddIcon, CollectinIcon } from "../icons/icons";
import { Collection } from "../modals/addCollectionModal";
import { Fragment, useState } from "react";

import { ViewCollectionModal } from "../modals/viewCollectionModal";
type CollectionCardProp = {
  id: number;
};

// function reducer(){
//   return
// }
export default function CollectionCard(props: Collection & CollectionCardProp) {
  const [files, setFiles] = useState(props.collectionItem);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dragOverStyle, setDragOverStyle] = useState({
    width: "100px",
    bg: "brand.gray",
    color: "brand.darkgray",
  });
  const HandleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const HandleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    let updateFile;
    e.preventDefault();
    e.stopPropagation();
    setDragOverStyle({
      width: "100px",
      bg: "brand.green",
      color: "brand.offwhite",
    });
    const data = e.dataTransfer.getData("files");

    if (data) {
      const imageDetails = JSON.parse(data);
      updateFile = [...files, imageDetails];
      setFiles(updateFile);
    }

    setTimeout(() => {
      setDragOverStyle({
        width: "100px",
        bg: "brand.gray",
        color: "brand.darkgray",
      });
    }, 1500);
  };
  const HandleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragOverStyle({
      width: "100px",
      bg: "brand.gray",
      color: "brand.darkgray",
    });
  };
  const HandleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setDragOverStyle({
      width: "200px",
      bg: "#000",
      color: "#fff",
    });
  };
  return (
    <>
      <Flex
        w={dragOverStyle.width}
        h={"100px"}
        bg={dragOverStyle.bg}
        mx={"2"}
        borderRadius={"2px"}
        flexDir={"column"}
        justify={"space-between"}
        p={"2"}
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
        onDragEnter={(e) => {
          HandleDragEnter(e);
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
      bg={"brand.lightgray"}
      minH={"130px"}
      p={2}
      borderColor={"brand.gray"}
      w={"100%"}
      borderRadius={"3px"}
      onDragEnter={(e) => {
        handleDragEnter(e);
      }}
      fontWeight={"900"}
      fontSize={{
        base: "xx-small",
        lg: "xs",
      }}
    >
      <Flex flexDir={"column"} justify={"space-between"} mr={"4"}>
        <Text>
          <CollectinIcon />
          your collections:
        </Text>
        <Text onClick={onOpen} cursor={"pointer"}>
          <AddIcon /> Add
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
