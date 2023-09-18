import { Button, Flex, Text } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <>
      <Flex w={"100%"}>
        <Flex justify={"space-between"} w={"100%"} align={"center"}>
          <Text fontWeight={"900"} color={"white"}>
            Hazie
          </Text>

          <Button
            bg={"#000"}
            borderRadius={"none"}
            color={"#fff"}
            fontWeight={"900"}
            _hover={{
              background: "#fff",
              color: "#000",
            }}
            size={"sm"}
          >
            Sign in
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
