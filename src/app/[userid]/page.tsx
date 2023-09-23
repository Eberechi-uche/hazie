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
import {
  SearchBar,
  SearchBarLayout,
} from "@/components/ui/searchBar/searchBar";
import { auth } from "@/firebase/clientApp";
import {
  Flex,
  SimpleGrid,
  Spinner,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { it } from "node:test";
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
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [collection, setCollection] = useState<Collection[]>([
    {
      name: "drag items here to add - click to view collection",
      note: "when in modal drag images out of modal to remove image from collection",
      collectionItem: [],
    },
  ]);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function fetchImage(query: string) {
    setLoading(true);
    api.search
      .getPhotos({
        query: query || "street art",
        orientation: "landscape",
        perPage: 25,
      })
      .then((result) => {
        if (result.response?.results) {
          const bgImages = result.response.results.map((item) => ({
            name: item.user.name,
            profileImg: item.user.profile_image.small,
            userLink: item.user.links.html,
            imageLg: item.urls.regular,
            imageSm: item.urls.small,
            alt_description: item.alt_description,
            id: item.id,
          }));

          setPhoto(bgImages as BackgroundImage[]);
          setLoading(false);
        }
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }

  useEffect(() => {
    if (user) {
      fetchImage(tag);
    }
  }, [user, tag]);
  return (
    <Flex flexDir={"column"} pos={"relative"}>
      <AuthNavBar />
      {user && (
        <>
          <Flex w={"100%"} justify={"center"}>
            <Flex
              maxW={"1050px"}
              align={"center"}
              w={"100%"}
              px={"4"}
              flexWrap={{
                base: "wrap",
                md: "nowrap",
              }}
            >
              <Flex
                w={"100%"}
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
                mr={{
                  lg: "4",
                }}
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
              <SearchBarLayout
                value={search}
                updateValue={handleSearch}
                showButton={true}
                loading={loading}
                handleSearch={() => {
                  fetchImage(search);
                }}
                PlaceHolder="search specific name"
              />
            </Flex>
          </Flex>

          <Flex align={"center"} w={"100%"} flexDir={"column"}>
            <Flex w={"100%"} maxW={"1050px"} flexDir={"column"} px={"2"}>
              <Flex
                w={"100%"}
                align={"flex-start"}
                my={6}
                justify={"space-between"}
                flexDir={"column"}
                minH={"170px"}
                pos={"sticky"}
                top={"1px"}
                zIndex={"2"}
              >
                <CollectionCardLayout onOpen={onOpen} collection={collection} />
              </Flex>
              <SearchBarLayout
                value={filter}
                updateValue={handleFilter}
                showButton={false}
                PlaceHolder="enter 3 or more character to filter"
              />
              {loading && (
                <Spinner
                  alignSelf={"center"}
                  justifySelf={"center"}
                  my={"10%"}
                />
              )}
              {!loading && (
                <SimpleGrid columns={[2, 3, 3, 4]} gap={"2"} py={"6"}>
                  {photo
                    .filter((item) => {
                      if (item.alt_description.includes(filter)) {
                        return item;
                      }
                    })
                    .map((item) => (
                      <Fragment key={item.id}>
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
