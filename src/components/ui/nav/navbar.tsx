import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const route = useRouter();
  return (
    <>
      <Flex w={"100%"}>
        <Flex justify={"space-between"} w={"100%"} align={"center"}>
          <Text fontWeight={"900"} color={"white"}>
            Hazie_
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
            onClick={() => {
              route.push("/UserAuth?auth=sign-in");
            }}
          >
            Sign in
          </Button>
        </Flex>
      </Flex>
    </>
  );
}