import { Input, Text } from "@chakra-ui/react";

import { CollectinIcon } from "../icons/icons";
import { Dispatch, SetStateAction } from "react";

export function SearchBar({
  searchValue,
  handleSearch,
  setView,
}: {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setView: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <Input
        value={searchValue}
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
        cursor={"pointer"}
      >
        <CollectinIcon />
        back to collections
      </Text>
    </>
  );
}
