import { Flex, Image, Text } from "@chakra-ui/react";
import { BackgroundImage } from "../home/home";
import Link from "next/link";
import { RemoveIcon } from "../icons/icons";

type ImageCardProps = {
  delete?: (id: string) => void;
};
export default function ImageCard(props: BackgroundImage & ImageCardProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    e.dataTransfer.effectAllowed = "copy";
    const data = JSON.stringify({ ...props });
    e.dataTransfer.setData("files", data);
  };

  return (
    <Flex
      w={"100%"}
      h={"100%"}
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
        maxH={"150px"}
        src={props.imageSm}
        alt={props.name}
        objectFit={"cover"}
        loading={"eager"}
        fallbackSrc={"/images/placeholder.jpeg"}
      />
      <Flex w={"100%"} align={"center"} justify={"space-between"}>
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
            <Link href={props.userLink} target="_blank" className="link">
              {props.name}
            </Link>
          </Text>
        </Flex>
        {props.delete && (
          <Text
            cursor={"pointer"}
            onClick={() => {
              props.delete && props.delete(props.id);
            }}
          >
            <RemoveIcon />
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
