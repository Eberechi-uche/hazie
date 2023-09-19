"use client";
import ImageCard from "@/components/ui/card/ImageCard";
import { BackgroundImage, TagSelector } from "@/components/ui/home/home";
import { CollectinIcon, SearchIcon } from "@/components/ui/icons/icons";
import AuthNavBar from "@/components/ui/nav/authNavbar";
import { Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
const collection = [
  "Photography",
  "Art",
  "People",
  "Sunrise",
  "Wonderlust",
  "Africa",
  "Lagos",
  "Culture",
  "happy",
  "wedding",
  "travel",
];
const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY as string,
});
export default function User() {
  const [photo, setPhoto] = useState<BackgroundImage[]>([]);
  const [tag, setTag] = useState("Street Photography");
  const [view, setView] = useState("collection");
  const [search, setSearch] = useState("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    api.search
      .getPhotos({ query: tag, orientation: "landscape" })
      .then((result) => {
        if (result.response?.results) {
          const bgImages = result.response.results.map((item) => ({
            name: item.user.name,
            profileImg: item.user.profile_image.small,
            userLink: item.user.portfolio_url,
            imageLg: item.urls.full,
            imageSm: item.urls.regular,
          }));

          setPhoto(bgImages as BackgroundImage[]);
        }
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [tag]);
  return (
    <>
      <main>
        <AuthNavBar />
        <Flex border={"2px solid"}>
          <Flex w={"100%"} bg={"#000"} justify={"center"}>
            <Flex
              w={"100%"}
              maxW={"1050px"}
              flexWrap={"wrap"}
              fontSize={{
                base: "xs",
                lg: "md",
              }}
              fontWeight={"900"}
              py={6}
              px={"4"}
            >
              {collection.map((item, index) => (
                <Fragment key={index}>
                  <TagSelector
                    id={item}
                    setTag={setTag}
                    tag={tag}
                    color={"brand.primary"}
                  />
                </Fragment>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex align={"center"} w={"100%"} flexDir={"column"}>
          <Flex w={"100%"} maxW={"1050px"} flexDir={"column"} px={"4"}>
            <Flex
              w={"100%"}
              align={"flex-start"}
              my={6}
              justify={"space-between"}
            >
              {view === "collection" && (
                <>
                  <Flex
                    flexGrow={"1"}
                    border={"1.5px dashed"}
                    minH={"100px"}
                    p={2}
                    borderColor={"brand.gray"}
                  >
                    <Text fontWeight={"900"} fontSize={"xs"}>
                      your collections:
                    </Text>
                  </Flex>
                  <Flex
                    ml={"4"}
                    justify={"flex-end"}
                    border={"1px solid"}
                    p={"2"}
                    borderRadius={"full"}
                    borderColor={"brand.gray"}
                    onClick={() => {
                      setView("search");
                    }}
                  >
                    <SearchIcon color={"#000"} />
                  </Flex>
                </>
              )}
              {view === "search" && (
                <>
                  <Flex w={"100%"}>
                    <Input
                      value={search}
                      onChange={handleSearch}
                      borderRadius={"none"}
                      borderColor={"brand.gray"}
                      focusBorderColor="#000"
                      border={"1.2px solid"}
                      placeholder="enter 3 or more character to filter"
                      _placeholder={{
                        fontWeight: "900px",
                        fontSize: "10px",
                      }}
                    />
                    <Text
                      fontWeight={"900"}
                      fontSize={"xs"}
                      ml={"4"}
                      onClick={() => {
                        setView("collection");
                      }}
                    >
                      <CollectinIcon />
                      back to collections
                    </Text>
                  </Flex>
                </>
              )}
            </Flex>

            <SimpleGrid h={"70vh"} columns={[2, 3, 3, 4]} gap={"2"}>
              {photo.map((item, index) => (
                <Fragment key={index}>
                  <ImageCard {...item} />
                </Fragment>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
