import ImageCard from "@/components/ui/card/ImageCard";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";

export default function User() {
  return (
    <>
      <main>
        <Flex>
          <Text> i am home</Text>
          <Flex></Flex>
        </Flex>
        {/* <SimpleGrid h={"70vh"} columns={[2, 3, 3, 4]} gap={"2"} p={4}>
        <ImageCard {...photo[0]} />
        <ImageCard {...photo[1]} />
        <ImageCard {...photo[2]} />
        <ImageCard {...photo[3]} />
        <ImageCard {...photo[4]} />
        <ImageCard {...photo[5]} />
        <ImageCard {...photo[6]} />
        <ImageCard {...photo[7]} />
        <ImageCard {...photo[8]} />
        <ImageCard {...photo[9]} />
      </SimpleGrid> */}
      </main>
    </>
  );
}
