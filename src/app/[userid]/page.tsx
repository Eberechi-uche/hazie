"use client";
import ImageCard from "@/components/ui/card/ImageCard";
import { CollectionCardLayout } from "@/components/ui/card/collectionCard";
import { BackgroundImage, TagSelector } from "@/components/ui/home/home";
import { SearchIcon } from "@/components/ui/icons/icons";
import {
  AddCollectionModal,
  Collection,
} from "@/components/ui/modals/addCollectionModal";
import AuthNavBar from "@/components/ui/nav/authNavbar";
import { SearchBar } from "@/components/ui/searchBar/searchBar";
import { auth } from "@/firebase/clientApp";
import { Flex, SimpleGrid, Spinner, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createApi } from "unsplash-js";
const collectionTag = [
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
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY as string,
});
export default function User() {
  const [photo, setPhoto] = useState<BackgroundImage[]>([]);
  const [user, , error] = useAuthState(auth);
  const [tag, setTag] = useState("Street Photography");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("collection");
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [collection, setCollection] = useState<Collection[]>([]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (user) {
      setLoading(true);
      api.search
        .getPhotos({ query: tag, orientation: "landscape" })
        .then((result) => {
          if (result.response?.results) {
            const bgImages = result.response.results.map((item) => ({
              name: item.user.name,
              profileImg: item.user.profile_image.small,
              userLink: item.user.links.html,
              imageLg: item.urls.full,
              imageSm: item.urls.regular,
              alt_description: item.alt_description,
            }));

            setPhoto(bgImages as BackgroundImage[]);
            setLoading(false);
          }
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    }
  }, [tag, user]);
  return (
    <Flex flexDir={"column"} pos={"relative"}>
      <AuthNavBar />
      {user && (
        <>
          <Flex>
            <Flex w={"100%"} bg={"#000"} justify={"center"}>
              <Flex
                w={"100%"}
                maxW={"1050px"}
                overflowX={"scroll"}
                sx={{
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                fontSize={{
                  base: "xs",
                  lg: "md",
                }}
                fontWeight={"900"}
                py={6}
                px={"4"}
              >
                {collectionTag.map((item, index) => (
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
                flexDir={"column"}
                minH={"170px"}
                pos={"sticky"}
                top={"10px"}
                zIndex={"1"}
                bg={"whiteAlpha.700"}
              >
                <Flex
                  w={"100%"}
                  h={"fit-content"}
                  display={view === "search" ? "none" : "flex"}
                  flexDir={"column"}
                >
                  <CollectionCardLayout
                    onOpen={onOpen}
                    collection={collection}
                  />
                  <Flex
                    border={"1.5px solid"}
                    p={"2"}
                    h={"fit-content"}
                    w={"fit-content"}
                    borderRadius={"full"}
                    borderColor={"brand.gray"}
                    onClick={() => {
                      setView("search");
                    }}
                    alignSelf={"flex-end"}
                    cursor={"pointer"}
                    my={"4"}
                  >
                    <SearchIcon color={"#000"} />
                  </Flex>
                </Flex>

                <>
                  <Flex
                    w={"100%"}
                    display={view === "collection" ? "none" : "flex"}
                  >
                    <SearchBar
                      setView={setView}
                      searchValue={search}
                      handleSearch={handleSearch}
                    />
                  </Flex>
                </>
              </Flex>
              {loading && <Spinner alignSelf={"center"} />}
              {!loading && (
                <SimpleGrid columns={[2, 3, 3, 4]} gap={"2"} py={"6"}>
                  {photo
                    .filter((item) => {
                      if (item.alt_description.includes(search)) {
                        return item;
                      }
                    })
                    .map((item, index) => (
                      <Fragment key={index}>
                        <ImageCard {...item} />
                      </Fragment>
                    ))}
                </SimpleGrid>
              )}
            </Flex>
            {isOpen && (
              <AddCollectionModal
                isOpen={isOpen}
                onClose={onClose}
                collection={collection}
                setCollection={setCollection}
              />
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
}
