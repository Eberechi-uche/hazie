import { Button, Flex, Input, Text } from "@chakra-ui/react";

type SearchBarProps = {
  value: string;
  updateValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PlaceHolder: string;
};
export function SearchBar({ value, updateValue, PlaceHolder }: SearchBarProps) {
  return (
    <>
      <Input
        value={value}
        onChange={updateValue}
        borderRadius={"none"}
        borderColor={"brand.gray"}
        focusBorderColor="#000"
        border={"0.5px solid"}
        placeholder={PlaceHolder}
        _placeholder={{
          fontWeight: "900px",
          fontSize: "10px",
        }}
      />
    </>
  );
}

type SearchBarLayoutProps = {
  showButton: boolean;
  handleSearch?: () => void;
  loading?: boolean;
};

export function SearchBarLayout(props: SearchBarProps & SearchBarLayoutProps) {
  return (
    <>
      <Flex
        w={{
          base: "100%",
          lg: "50%",
        }}
        align={"center"}
        border={"1px solid"}
      >
        <SearchBar
          value={props.value}
          updateValue={props.updateValue}
          PlaceHolder={props.PlaceHolder}
        />
        {props.showButton && (
          <Button onClick={props.handleSearch} isLoading={props.loading}>
            search
          </Button>
        )}
      </Flex>
    </>
  );
}
