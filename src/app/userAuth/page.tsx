"use client";

import { Flex, Grid, Text } from "@chakra-ui/react";
import Login from "./login";
import { useSearchParams } from "next/navigation";
import SignUp from "./SignUp";

export default function UserAuth() {
  const pageParam = useSearchParams().get("auth");

  return (
    <>
      <Grid
        w={"100vw"}
        height={"100dvh"}
        placeItems={"center"}
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.7)) , url(${
          pageParam === "sign-in"
            ? "images/background.jpg"
            : "images/background3.jpg"
        })`}
        bgPosition={"center"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        position={"relative"}
      >
        <Flex
          maxW={"500px"}
          bg={"#fff"}
          minH={"max-content"}
          h={{
            base: "70%",
            md: "fit-content",
          }}
          overflow={"scroll"}
          width={"100%"}
          borderTopRadius={"5px"}
          flexDir={"column"}
          alignSelf={{ base: "flex-end", md: "center", lg: "center" }}
        >
          {pageParam === "sign-in" && <Login />}
          {pageParam === "sign-up" && <SignUp />}
        </Flex>
        <Flex
          pos={"absolute"}
          left={"0"}
          p={4}
          bottom={{
            base: "90%",
            lg: "0",
          }}
        >
          {/* <ImageCreditCard /> */}
        </Flex>
      </Grid>
    </>
  );
}
