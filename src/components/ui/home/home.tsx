"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import NavBar from "../nav/navbar";
import { Dispatch, SetStateAction, useState } from "react";

export default function UnAuthHome() {
  const [photo, setPhoto] = useState([]);
  const [tag, setTag] = useState("tribe");
  const active = "#fff";
  const notactive = "#9a9a9a";
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
    >
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
              bg={"#fff"}
              borderRadius={"none"}
              fontWeight={"900"}
              _hover={{
                background: "#c53211",
                color: "#fff",
              }}
              w={"50%"}
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
            <TagSelector
              id="tribe"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
            <TagSelector
              id="lagos"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
            <TagSelector
              id="africa"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
            <TagSelector
              id="color"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
            <TagSelector
              id="Landscape"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
            <TagSelector
              id="sunrise"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
            <TagSelector
              id="people"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
            <TagSelector
              id="art"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
            <TagSelector
              id="photography"
              active={active}
              notactive={notactive}
              setTag={setTag}
              tag={tag}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

function TagSelector({
  tag,
  id,
  active,
  notactive,
  setTag,
}: {
  tag: string;
  id: string;
  active: string;
  notactive: string;
  setTag: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Text
      mx={"4"}
      cursor={"pointer"}
      color={tag === id ? active : notactive}
      onClick={() => {
        setTag(id);
      }}
      textTransform={"capitalize"}
    >
      {id}
    </Text>
  );
}
