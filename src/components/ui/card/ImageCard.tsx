import { Flex, Image, Text } from "@chakra-ui/react";
import { BackgroundImage } from "../home/home";
import Link from "next/link";
import { useState } from "react";

export default function ImageCard(props: BackgroundImage) {
  const [dragStyleView, setDragStyleView] = useState({
    size: "100%",
    opacity: "1",
  });
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // e.dataTransfer.setData('text/plain', {...props})
    e.dataTransfer.dropEffect = "copy";
    e.dataTransfer.effectAllowed = "copy";

    const data = JSON.stringify({ ...props });
    e.dataTransfer.setData("files", data);
  };
  // const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  //   setDragStyleView({
  //     size: "100%",
  //     opacity: "1",
  //   });
  // };
  return (
    <Flex
      w={dragStyleView.size}
      h={dragStyleView.size}
      flexDir={"column"}
      fontWeight={"900"}
      color={"brand.mute"}
      pos={"relative"}
      onDragStart={(e) => {
        handleDragStart(e);
      }}
      draggable={"true"}
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
