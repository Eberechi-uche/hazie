import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/navigation";
import { FIREBASE_ERROR } from "@/firebase/error";
import AuthInput from "@/components/ui/input/authInput";

export default function Login() {
  const [userDefails, setUserDetails] = useState({
    Email: "",
    Password: "",
  });
  const route = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value, name },
    } = e;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSignIn() {
    const { Email, Password } = userDefails;
    const result = await signInWithEmailAndPassword(Email, Password);
    if (result) {
      route.push("/");
      return;
    }
  }
  return (
    <Flex h={"max-content"} p={"10"} flexDir={"column"} w={"100%"}>
      <Heading fontWeight={"400"} fontSize={"4xl"} mb={"5"}>
        lynnk
      </Heading>
      <Text fontWeight={"700"} fontSize={"4xl"}>
        Sign in
      </Text>
      <Flex w={"100%"} my={"2"}>
        <Text> New user ? </Text>
        <Link href={"/UserAuth?auth=sign-up"}>
          <Text
            color={"brand.yellow"}
            mx={"2"}
            fontWeight={"600"}
            cursor={"pointer"}
          >
            Create an account
          </Text>
        </Link>
      </Flex>
      {error && (
        <Text fontSize={"xs"} color={"red.600"} fontWeight={"900"}>
          {FIREBASE_ERROR[error.message as keyof typeof FIREBASE_ERROR]}
        </Text>
      )}
      <form>
        <AuthInput
          value={userDefails.Email}
          name={"Email"}
          onChange={handleChange}
          type="email"
          placeHolder="Email"
        />
        <AuthInput
          value={userDefails.Password}
          name={"Password"}
          onChange={handleChange}
          type="password"
          placeHolder="Password"
        />
        <Flex mt={"3"} justifyContent={"flex-end"}>
          <Button size={"sm"} onClick={handleSignIn} isLoading={loading}>
            Log in
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
