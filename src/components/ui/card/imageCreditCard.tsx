import { Flex, Text, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function ImageCreditCard({
  profileUrl,
  name,
  profilelink,
}: {
  profileUrl: string;
  name: string;
  profilelink: string;
}) {
  return (
    <Flex color={"#fff"} w={"fit-content"} align={"center"}>
      <Image
        boxSize={"25px"}
        alt={"username"}
        src={profileUrl}
        borderRadius={"full"}
        mr={"4"}
      />
      <Flex color={"brand.mute"} align={"center"} fontSize={"xs"}>
        <Text fontWeight={"900"} mr={"2"}>
          by
        </Text>
        <Link href={profilelink} target="_blank" className="link">
          {name}
        </Link>
      </Flex>
    </Flex>
  );
}
