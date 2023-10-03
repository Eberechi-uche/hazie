"use client";

import ImageCard from "@/components/ui/card/ImageCard";
import { CollectionContext } from "@/contexts/collectionCtx";
import { Flex, Text, Heading, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Fragment, useContext } from "react";

export default function Collection() {
  const { currentCollection } = useContext(CollectionContext);
  const route = useRouter();

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

      <SimpleGrid columns={[2, 3, 4]} gap={"2"} my={"12"}>
        {currentCollection.collectionItem.length > 0 &&
          currentCollection.collectionItem.map((item) => (
            <Fragment key={item.id}>
              <ImageCard {...item} />
            </Fragment>
          ))}
      </SimpleGrid>
    </Flex>
  );
}
