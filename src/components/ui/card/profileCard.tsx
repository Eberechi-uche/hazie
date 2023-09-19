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

export default function ProfileCard({
  location,
  image,
}: {
  location: "home" | "profile";
  image: string;
}) {
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
                <MenuItem bg={"inherit"}>Sign out</MenuItem>
              </Flex>
            </Flex>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
