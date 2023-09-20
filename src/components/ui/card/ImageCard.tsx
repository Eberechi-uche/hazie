import { Flex, Image, Text } from "@chakra-ui/react";
import { BackgroundImage } from "../home/home";
import Link from "next/link";

export default function ImageCard(props: BackgroundImage) {
  return (
    <Flex
      flexDir={"column"}
      fontWeight={"900"}
      color={"brand.mute"}
      pos={"relative"}
    >
      <Image
        boxSize={"100%"}
        src={props.imageSm}
        alt={props.name}
        objectFit={"cover"}
      />
      <Flex py={"2"}>
        <Image
          boxSize={"15px"}
          src={props.profileImg}
          alt={props.name}
          objectFit={"cover"}
          borderRadius={"full"}
          mr={"2"}
          fallbackSrc="/images/placeholder.jpeg"
          loading={"lazy"}
        />

        <Text fontSize={"2xs"} isTruncated>
          <Link href={props.userLink} target="_blank" className="link">
            {props.name}
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
