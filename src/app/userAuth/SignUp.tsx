import AuthCard from "@/components/ui/card/authCard";
import extractUserId from "@/utils/extractUserId";
import { Flex, Heading, Button, Text, Icon } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

import { auth, storage } from "@/firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERROR } from "@/firebase/error";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AuthInput from "@/components/ui/input/authInput";

export default function SignUp() {
  const [userDetails, setUserDetails] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
    displayName: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [userError, setUserError] = useState("");
  const [userFlow, setUserFlow] = useState(0);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const route = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value, name },
    } = e;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserError("");
    if (userDetails.Password !== userDetails.ConfirmPassword) {
      setUserError("Passwords do not match");
      return;
    }
    const result = await createUserWithEmailAndPassword(
      userDetails.Email,
      userDetails.Password
    );
    if (result) {
      setUserFlow(1);
    }
  }
  async function handleProfileUpdate() {
    const { displayName, Email } = userDetails;
    const profileId = extractUserId(Email);
    const imageData = await fetch(
      `https://api.dicebear.com/6.x/initials/svg?seed=${userDetails.Email}`
    );
    const imageBlob = await imageData.blob();
    const profileRef = ref(storage, `profilePhotos/${profileId}`);
    await uploadBytes(profileRef, imageBlob);
    const profileUrl = await getDownloadURL(profileRef);

    const profileUpdateStatus = await updateProfile({
      displayName,
      photoURL: profileUrl,
    });

    if (profileUpdateStatus) {
      route.push(`/${profileId}`);
    }
  }
  return (
    <>
      <Flex p={"10"} flexDir={"column"} w={"100%"} minH={"max-content"}>
        <Heading fontWeight={"900"} fontSize={"4xl"} mb={"5"}>
          Hazie_
        </Heading>

        <Text fontWeight={"700"} fontSize={"3xl"}>
          Create an account
        </Text>
        {userFlow === 0 && (
          <>
            <Flex w={"100%"} my={"2"}>
              <Text> Already have an account ?</Text>
              <Link href={"/UserAuth?auth=sign-in"}>
                <Text
                  color={"brand.primary"}
                  mx={"2"}
                  fontWeight={"900"}
                  cursor={"pointer"}
                  fontSize={"sm"}
                >
                  sign in
                </Text>
              </Link>
            </Flex>
            {(userError || error) && (
              <Flex fontSize={"xs"} color={"red.600"} fontWeight={"900"}>
                {error && (
                  <Text>
                    {
                      FIREBASE_ERROR[
                        error.message as keyof typeof FIREBASE_ERROR
                      ]
                    }
                  </Text>
                )}
                {userError && <Text>{userError}</Text>}
              </Flex>
            )}

            <Flex w={"100%"}>
              <form onSubmit={handleSignUp}>
                <AuthInput
                  value={userDetails.Email}
                  name={"Email"}
                  type="email"
                  placeHolder="Email"
                  onChange={handleChange}
                />
                <AuthInput
                  value={userDetails.Password}
                  name={"Password"}
                  type="password"
                  placeHolder="Password"
                  onChange={handleChange}
                />
                <AuthInput
                  value={userDetails.ConfirmPassword}
                  name={"ConfirmPassword"}
                  type="password"
                  placeHolder="confirm Password"
                  onChange={handleChange}
                />
                <Flex mt={"3"} justifyContent={"flex-end"}>
                  <Button
                    size={"sm"}
                    type={"submit"}
                    isLoading={loading}
                    variant={"outline"}
                  >
                    continue
                  </Button>
                </Flex>
              </form>
            </Flex>
          </>
        )}
        {userFlow === 1 && (
          <Flex w={"100%"} align={"center"} flexDir={"column"}>
            <AuthCard
              name={extractUserId(userDetails.Email)}
              image={`https://api.dicebear.com/6.x/initials/svg?seed=${userDetails.Email}`}
            />
            <Text my={"4"}>Almost done.</Text>
            <AuthInput
              value={userDetails.displayName}
              name={"displayName"}
              type="text"
              placeHolder="Display Name"
              onChange={handleChange}
            />

            <Button
              w={"50%"}
              onClick={handleProfileUpdate}
              isLoading={updating}
              isDisabled={userDetails.displayName.length < 4}
            >
              Done
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
}
