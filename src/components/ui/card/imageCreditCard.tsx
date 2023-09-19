import { Flex, Text, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function ImageCreditCard() {
  return (
    <Flex color={"#fff"} w={"fit-content"} align={"center"}>
      <Image
        boxSize={"25px"}
        alt={"username"}
        src={"/images/background2.jpg"}
        borderRadius={"full"}
        mr={"4"}
      />
      <Flex color={"brand.mute"} align={"center"} fontSize={"xs"}>
        <Text fontWeight={"900"} mr={"2"}>
          by
        </Text>
        <Link href={""} target="_blank">
          long and some
        </Link>
      </Flex>
    </Flex>
  );
}
