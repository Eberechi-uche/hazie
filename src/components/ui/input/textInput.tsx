import { Input, Textarea } from "@chakra-ui/react";

type InputProps = {
  value: string;
  setValue: (
    e:
      | React.ChangeEvent<HTMLInputElement> &
          React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeHolder: string;
  name: string;
};
export default function TextInput({
  value,
  setValue,
  placeHolder,
  name,
}: InputProps) {
  return (
    <Input
      name={name}
      value={value}
      onChange={setValue}
      borderRadius={"none"}
      borderColor={"brand.gray"}
      focusBorderColor="#000"
      border={"1.2px solid"}
      placeholder={placeHolder}
      _placeholder={{
        fontWeight: "900px",
        fontSize: "10px",
      }}
    />
  );
}

export function TextAreaInput({
  value,
  setValue,
  placeHolder,
  name,
}: InputProps) {
  return (
    <Textarea
      my={4}
      name={name}
      value={value}
      onChange={setValue}
      borderRadius={"none"}
      borderColor={"brand.gray"}
      focusBorderColor="#000"
      border={"1.2px solid"}
      placeholder={placeHolder}
      _placeholder={{
        fontWeight: "900px",
        fontSize: "10px",
      }}
    />
  );
}
