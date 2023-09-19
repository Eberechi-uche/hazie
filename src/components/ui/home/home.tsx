"use client";
import { Button, Flex, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import NavBar from "../nav/navbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ImageCreditCard from "../card/imageCreditCard";
import { useRouter } from "next/navigation";
import { createApi } from "unsplash-js";
import ImageCard from "../card/ImageCard";
import { photos } from "unsplash-js/dist/internals";

type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};

export type BackgroundImage = {
  name: string;
  profileImg: string;
  imageSm: string;
  imageLg: string;
  userLink: string;
};
const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY as string,
});

export default function UnAuthHome() {
  const [photo, setPhoto] = useState<BackgroundImage[]>([]);
  const [tag, setTag] = useState("Street Photography");
  const [background, setBackground] = useState(4);

  const route = useRouter();

  useEffect(() => {
    api.search
      .getPhotos({ query: tag, orientation: "landscape" })
      .then((result) => {
        // console.log(result);
        if (result.response?.results) {
          const bgImages = result.response.results.map((item) => ({
            name: item.user.name,
            profileImg: item.user.profile_image.small,
            userLink: item.user.portfolio_url,
            imageLg: item.urls.full,
            imageSm: item.urls.regular,
          }));
          console.log(bgImages);
          setPhoto(bgImages as BackgroundImage[]);
        }
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [tag]);

  function updateBackgroundImg() {
    let number = Math.floor(Math.random() * 10);
    setBackground(number);
  }

  useEffect(() => {
    const interval = setInterval(updateBackgroundImg, 4000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <Flex
        w={"100%"}
        flexDir={"column"}
        bg={"#000"}
        transition={"all 2s ease-in-out"}
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.7)) , url(${
          photo.length > 0 && photo[background].imageSm
        })`}
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
        {photo.length > 1 && (
          <Flex pos={"absolute"} p={4} bottom={"0"}>
            <ImageCreditCard
              profileUrl={photo[background].profileImg}
              profilelink={""}
              name={photo[background].name}
            />
          </Flex>
        )}

        <NavBar />
        <Flex
          w={"100%"}
          flexDir={"column"}
          py={"12"}
          color={"#fff"}
          fontWeight={"900"}
          h={{
            base: "65%",
            md: "50%",
            lg: "85%",
          }}
          justify={"space-between"}
          maxW={"1500px"}
          alignSelf={"center"}
          mb={12}
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
                md: "5xl",
                lg: "5xl",
              }}
            >
              Curate, create or organise photos. perfect the collection
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
    </>
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
