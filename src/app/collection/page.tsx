"use client";

import ImageCard from "@/components/ui/card/ImageCard";
import { CollectionContext } from "@/contexts/collectionCtx";
import { Flex, Text, Heading, SimpleGrid, Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";

export default function Collection() {
  const { currentCollection } = useContext(CollectionContext);
  const [images, setImageArray] = useState(currentCollection.collectionItem);
  const [] = useState();
  const route = useRouter();
  let dragElement: string;
  let targetElement: string;
  let targetPosition: number;
  let dragElementPosition: number;

  function getDragElementRef(id: string) {
    dragElement = id;
  }

  function UpdatePositon(id: string) {
    targetElement = id;
  }
  function handleDragEnd() {
    const newArray = [...images];
    targetPosition = images.findIndex((image) => image.id === targetElement);
    dragElementPosition = images.findIndex((image) => image.id === dragElement);
    const dragItem = images[dragElementPosition];
    const targetItem = images[targetPosition];
    newArray.splice(targetPosition, 1, dragItem);
    newArray.splice(dragElementPosition, 1, targetItem);
    setImageArray(newArray);
  }
  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault;
  }
  return (
    <Flex flexDir={"column"} w={"100%"} minH={"100vh"}>
      <Text
        fontSize={"xs"}
        my={"8"}
        cursor={"pointer"}
        onClick={() => {
          route.back();
        }}
      >
        &#8592; Back to Collection
      </Text>
      <Flex w={"100%"} justify={"space-between"} my={"4"}>
        <Flex flexDir={"column"}>
          <Heading fontSize={"lg"} textTransform={"uppercase"}>
            {currentCollection.name}
          </Heading>
          <Text fontSize={"xs"}> {currentCollection.note}</Text>
        </Flex>
        <Text fontSize={"xs"}> Edit Image position</Text>
      </Flex>

      <Flex
        p={"8"}
        transition={"all 0.5s ease-in-out"}
        position={"relative"}
        flex={1}
        gap={"4"}
        h={"100%"}
        w={"100%"}
        flexWrap={"wrap"}
        bg={"brand.offwhite"}
        borderRadius={"6px"}
        justify={"center"}
      >
        {currentCollection.collectionItem.length > 0 &&
          images.map((item) => (
            <Draggable bounds={"parent"} key={item.id}>
              <Box
                className="handle drag"
                bgImage={`url(${item.imageSm})`}
                onDragStart={handleDragStart}
                w={"100px"}
                h={"120px"}
                bgSize={"cover"}
                borderRadius={"6px"}
                m={"2"}
              />
            </Draggable>
          ))}
      </Flex>
    </Flex>
  );
}
