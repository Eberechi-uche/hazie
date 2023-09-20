import { Input } from "@chakra-ui/react";

export default function TextInput({
  value,
  setValue,
  placeHolder,
}: {
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}) {
  return (
    <Input
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
