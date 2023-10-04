"use client";

import ImageCard from "@/components/ui/card/ImageCard";
import { CollectionContext } from "@/contexts/collectionCtx";
import { Flex, Text, Heading, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useState } from "react";

export default function Collection() {
  const { currentCollection } = useContext(CollectionContext);
  const [images, setImageArray] = useState(currentCollection.collectionItem);
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

  return (
    <Flex flexDir={"column"} w={"100%"}>
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
      <Flex w={"100%"} justify={"space-between"}>
        <Flex flexDir={"column"}>
          <Heading fontSize={"lg"} textTransform={"uppercase"}>
            {currentCollection.name}
          </Heading>
          <Text fontSize={"xs"}> {currentCollection.note}</Text>
        </Flex>
        <Text fontSize={"xs"}> Edit Image position</Text>
      </Flex>

      <SimpleGrid
        columns={[2, 3, 4]}
        gap={"2"}
        my={"12"}
        transition={"all 0.5s ease-in-out"}
      >
        {currentCollection.collectionItem.length > 0 &&
          images.map((item) => (
            <Fragment key={item.id}>
              <ImageCard
                {...item}
                getDragElementRef={getDragElementRef}
                getTargetElementRef={UpdatePositon}
                handleDragEnd={handleDragEnd}
              />
            </Fragment>
          ))}
      </SimpleGrid>
    </Flex>
  );
}
