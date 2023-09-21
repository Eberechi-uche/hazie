import { Flex, Input, Text } from "@chakra-ui/react";

type SearchBarProps = {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PlaceHolder: string;
};
export function SearchBar({
  searchValue,
  handleSearch,
  PlaceHolder,
}: SearchBarProps) {
  return (
    <>
      <Input
        value={searchValue}
        onChange={handleSearch}
        borderRadius={"none"}
        borderColor={"brand.gray"}
        focusBorderColor="#000"
        border={"1.2px solid"}
        placeholder={PlaceHolder}
        _placeholder={{
          fontWeight: "900px",
          fontSize: "10px",
        }}
      />
    </>
  );
}

export function SearchBarLayout(props: SearchBarProps) {
  return (
    <>
      <Flex
        w={{
          base: "100%",
          lg: "50%",
        }}
      >
        <SearchBar
          searchValue={props.searchValue}
          handleSearch={props.handleSearch}
          PlaceHolder={props.PlaceHolder}
        />
      </Flex>
    </>
  );
}
