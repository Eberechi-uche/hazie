import { Flex, Text } from "@chakra-ui/react";
import { BackgroundImage } from "../home/home";
import { AddIcon, CollectinIcon } from "../icons/icons";
import { Collection } from "../modals/addCollectionModal";
import { Fragment } from "react";
type CollectionCardProp = {
  name: string;
  // items:BackgroundImage[]
};
export default function CollectionCard(props: Collection) {
  return (
    <>
      <Flex
        w={"100px"}
        h={"100px"}
        bg={"brand.gray"}
        mx={"2"}
        borderRadius={"2px"}
        flexDir={"column"}
        justify={"space-between"}
        p={"2"}
        fontWeight={"600"}
        fontSize={"xs"}
        color={"brand.darkgray"}
        // _hover={{
        //   w: "200px",
        // }}
        transition={"all 0.2s ease-in"}
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
          <Text>{props.collectionItem?.length}</Text>
        </Flex>
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
    console.log("i entered");
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
      <Flex
        flexDir={"column"}
        justify={"space-between"}
        mr={"4"}
        // wordBreak={"break-word"}
      >
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
                <CollectionCard {...item} />
              </Fragment>
            ))}
          {collection.length === 0 && (
            <Text>you have no collection, create one</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
