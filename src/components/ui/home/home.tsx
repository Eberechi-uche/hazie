"use client";
import { Button, Flex, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import NavBar from "../nav/navbar";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import ImageCreditCard from "../card/imageCreditCard";
import { useRouter } from "next/navigation";
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
  alt_description: string;
  id: string;
};
const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY as string,
});

export default function UnAuthHome() {
  const [photo, setPhoto] = useState<BackgroundImage[]>([]);
  const [tag, setTag] = useState("wallpaper");
  const [background, setBackground] = useState(0);

  const route = useRouter();

  useEffect(() => {
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
            id: item.id,
          }));

          setPhoto(bgImages as BackgroundImage[]);
        }
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [tag]);

  function updateBackgroundImg() {
    if (background < 9) {
      setBackground(() => background + 1);
      return;
    }
    if (background >= 9) {
      setBackground(() => 0);
      return;
    }
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
        transition={"all 1s ease-in-out"}
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
              profilelink={photo[background].userLink}
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
            base: "75%",
            md: "80%",
            lg: "85%",
          }}
          justify={"space-between"}
          maxW={"1500px"}
          alignSelf={"center"}
          mb={12}
        >
          <Flex
            w={{
              base: "80%",
              md: "80%",
              lg: "50%",
            }}
            flexDir={"column"}
          >
            <Text
              fontSize={{
                base: "2xl",
                md: "5xl",
                lg: "4xl",
              }}
            >
              Empower your visual assets - elevate your image curation and
              organization
            </Text>
            <Text
              fontWeight={"400"}
              fontSize={{
                base: "xs",
                md: "sm",
              }}
            >
              create image collection for your needs as simple as draging and
              droping it.
            </Text>
            <Flex my={"4"}>
              <Button
                variant={"brandPrimary"}
                w={"50%"}
                onClick={() => {
                  route.push("user/UserAuth?auth=sign-up");
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
      </Flex>
    </>
  );
}

export function TagSelector({
  tag,
  id,
  color,
  setTag,
}: {
  tag: string;
  id: string;
  color?: string;

  setTag: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Text
      mx={"4"}
      cursor={"pointer"}
      color={tag === id ? color || "#fff" : "brand.mute"}
      onClick={() => {
        setTag(id);
      }}
      textTransform={"capitalize"}
    >
      {id}
    </Text>
  );
}
