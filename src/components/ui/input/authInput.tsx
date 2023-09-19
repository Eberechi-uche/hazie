import { Input } from "@chakra-ui/react";

export default function AuthInput(props: {
  value: string;
  name: string;
  type: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <Input
        value={props.value}
        name={props.name}
        bgColor={"none"}
        onChange={(e) => {
          props.onChange(e);
        }}
        border={"2px solid"}
        borderColor={"brand.gray"}
        focusBorderColor="brand.primary"
        type={props.type}
        borderRadius={"none"}
        placeholder={props.placeHolder}
        my={"2"}
        py={"5"}
      />
    </>
  );
}

export function UserInputs(props: {
  value: string;
  name: string;
  type: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <Input
        value={props.value}
        name={props.name}
        onChange={(e) => {
          props.onChange(e);
        }}
        // borderColor={"brand.dark"}
        border={"2px solid"}
        borderColor={"brand.gray"}
        type={props.type}
        borderRadius={"3px"}
        focusBorderColor="brand.yellow"
        placeholder={props.placeHolder}
        my={"5"}
        py={"5"}
      />
    </>
  );
}
