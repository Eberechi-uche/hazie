"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import NavBar from "../nav/navbar";
import { Dispatch, SetStateAction, useState } from "react";
import ImageCreditCard from "../card/imageCreditCard";
import { useRouter } from "next/navigation";

export default function UnAuthHome() {
  const [photo, setPhoto] = useState([]);
  const [tag, setTag] = useState("tribe");
  const route = useRouter();

  return (
    <Flex
      w={"100%"}
      flexDir={"column"}
      bgImage={`linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.7)) , url("images/background.jpg")`}
      bgPos={"center"}
      bgSize={"cover"}
      h={"100vh"}
      p={{
        base: "6",
        lg: "12",
      }}
      justify={"space-between"}
      position={"relative"}
    >
      <Flex pos={"absolute"} p={4} bottom={"0"}>
        <ImageCreditCard />
      </Flex>
      <NavBar />
      <Flex
        w={"100%"}
        flexDir={"column"}
        py={"12"}
        color={"#fff"}
        fontWeight={"900"}
        h={{
          base: "65%",
          lg: "85%",
        }}
        justify={"space-between"}
        maxW={"1500px"}
        alignSelf={"center"}
      >
        <Flex
          w={{
            base: "90%",
            lg: "45%",
          }}
          flexDir={"column"}
        >
          <Text
            fontSize={{
              base: "3xl",
              lg: "5xl",
            }}
          >
            Curate, create or organise. make the collection of yours
          </Text>
          <Flex my={"4"}>
            <Button
              variant={"brandPrimary"}
              w={"50%"}
              onClick={() => {
                route.push("/UserAuth?auth=sign-up");
              }}
            >
              Get started
            </Button>
          </Flex>
        </Flex>
        <Flex align={"flex-end"} w={"100%"} flexDir={"column"}>
          <Flex
            w={{
              base: "70%",
              lg: "60%",
            }}
            py={"4"}
            px={"4"}
          >
            <Text fontSize={"2xs"} alignSelf={"flex-start"}>
              click to see collection
            </Text>
          </Flex>

          <Flex
            w={{
              base: "70%",
              lg: "60%",
            }}
            overflowX={"scroll"}
            fontSize={"lg"}
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <TagSelector id="culture" setTag={setTag} tag={tag} />
            <TagSelector id="lagos" setTag={setTag} tag={tag} />
            <TagSelector id="africa" setTag={setTag} tag={tag} />
            <TagSelector id="wonderlust" setTag={setTag} tag={tag} />
            <TagSelector id="sunrise" setTag={setTag} tag={tag} />
            <TagSelector id="people" setTag={setTag} tag={tag} />
            <TagSelector id="art" setTag={setTag} tag={tag} />
            <TagSelector id="photography" setTag={setTag} tag={tag} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

function TagSelector({
  tag,
  id,

  setTag,
}: {
  tag: string;
  id: string;

  setTag: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Text
      mx={"4"}
      cursor={"pointer"}
      color={tag === id ? "#fff" : "brand.mute"}
      onClick={() => {
        setTag(id);
      }}
      textTransform={"capitalize"}
    >
      {id}
    </Text>
  );
}
