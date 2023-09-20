import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useSignOut } from "react-firebase-hooks/auth";

export default function ProfileCard({
  location,
  image,
}: {
  location: "home" | "profile";
  image: string;
}) {
  const [signOut, loading, error] = useSignOut(auth);
  return (
    <Flex>
      <Flex>
        <Menu isLazy>
          <MenuButton>
            <Image
              alt={""}
              src={image}
              boxSize={"25px"}
              borderRadius={"full"}
            />
          </MenuButton>
          <MenuList
            border={"none"}
            bg={"black"}
            color={"#fff"}
            borderRadius={"none"}
            fontSize={"xs"}
            zIndex={"3"}
          >
            <Flex
              flexDir={"column"}
              justify={"space-between"}
              h={"70vh"}
              py={"6"}
            >
              <Flex>
                <MenuItem bg={"inherit"}>New collection</MenuItem>
              </Flex>
              <Flex>
                <MenuItem bg={"inherit"} onClick={() => signOut()}>
                  Sign out
                </MenuItem>
              </Flex>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
