"use client";

import { Flex, Grid, Text } from "@chakra-ui/react";
import Login from "./login";
import { useSearchParams } from "next/navigation";
import SignUp from "./SignUp";

export default function UserAuth() {
  const pageParam = useSearchParams().get("auth");
  console.log(pageParam);

  return (
    <>
      <Grid
        w={"100vw"}
        minH={"inherit"}
        placeItems={"center"}
        bgImage={
          pageParam === "sign-in" ? "images/weave.webp" : "images/signUp.webp"
        }
        bgPosition={"center"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        pt={"50px"}
        transition={"all 0.7s ease-out"}
        overflow={"scroll"}
      >
        <Flex
          maxW={"500px"}
          bg={"#FFFFFF"}
          minH={"max-content"}
          overflow={"scroll"}
          width={"100%"}
          borderRadius={"5px"}
          flexDir={"column"}
          alignSelf={{ base: "flex-end", md: "center", lg: "center" }}
        >
          {pageParam === "sign-in" && <Login />}
          {pageParam === "sign-up" && <SignUp />}
        </Flex>
      </Grid>
    </>
  );
}
