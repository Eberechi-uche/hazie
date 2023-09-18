import { Flex, Text } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <>
      <Flex w={"100%"}>
        <Flex justify={"space-between"}>
          <Text fontWeight={"900"} color={"white"}>
            Megharia
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
