import { Flex, Image, Text } from "@chakra-ui/react";
import { BackgroundImage } from "../home/home";

export default function ImageCard(props: BackgroundImage) {
  return (
    <Flex flexDir={"column"} fontWeight={"900"} color={"brand.mute"}>
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
        />
        <Text fontSize={"2xs"} isTruncated>
          {props.name}
        </Text>
      </Flex>
    </Flex>
  );
}
