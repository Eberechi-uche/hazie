"use client";

import { Flex } from "@chakra-ui/react";

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      w={"100%"}
      justify={"center"}
      p={{
        base: "4",
        lg: "12",
      }}
    >
      <Flex maxW={"1100px"} w={"100%"}>
        {children}
      </Flex>
    </Flex>
  );
}
