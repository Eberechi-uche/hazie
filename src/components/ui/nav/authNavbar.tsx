"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import ProfileCard from "../card/profileCard";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

import Link from "next/link";

export default function AuthNavBar() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {!user && (
        <Flex
          w={"100vw"}
          h={"100vh"}
          pos={"relative"}
          bg={"#000"}
          color={"#fff"}
          align={"center"}
          justify={"center"}
        >
          <Link href={"/UserAuth?auth=sign-in"}>
            <Flex flexDir={"column"} w={"100%"}>
              <Text
                fontWeight={"900"}
                fontSize={"xs"}
                my={"4"}
                textAlign={"center"}
              >
                Please sign in to continue
              </Text>

              <Button variant={"brandPrimary"}>Login</Button>
            </Flex>
          </Link>
        </Flex>
      )}
      {user && (
        <Flex
          w={"100%"}
          py={4}
          px={"6"}
          align={"center"}
          borderBottom={"1.5px solid"}
          borderColor={"brand.lightgray"}
        >
          <Flex w={"100%"} justify={"space-between"}>
            <Link href={"/"}>
              <Text fontWeight={"900"} color={"#000"}>
                Hazie<span className="text-brand-red">_</span>
              </Text>
            </Link>
            <ProfileCard location={"profile"} image={user?.photoURL || ""} />
          </Flex>
        </Flex>
      )}
    </>
  );
}
