import { Icon, useDisclosure } from "@chakra-ui/react";

export function SearchIcon(props: any) {
  return (
    <>
      <Icon fontSize={"13px"}>
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 13L9 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"
            stroke={props.color || "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Icon>
    </>
  );
}

export function AddIcon(props: any) {
  return (
    <>
      <Icon fontSize={"16px"}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0001 3C10.5524 3 11.0001 3.44772 11.0001 4V9H16.0001C16.5524 9 17.0001 9.44772 17.0001 10C17.0001 10.5523 16.5524 11 16.0001 11H11.0001V16C11.0001 16.5523 10.5524 17 10.0001 17C9.44784 17 9.00012 16.5523 9.00012 16V11H4.00012C3.44784 11 3.00012 10.5523 3.00012 10C3.00012 9.44771 3.44784 9 4.00012 9L9.00012 9V4C9.00012 3.44772 9.44784 3 10.0001 3Z"
            fill="#111827"
          />
        </svg>
      </Icon>
    </>
  );
}

export function CollectinIcon(props: any) {
  return (
    <>
      <Icon fontSize={"18px"}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.00012 3C3.89555 3 3.00012 3.89543 3.00012 5V7C3.00012 8.10457 3.89555 9 5.00012 9H7.00012C8.10469 9 9.00012 8.10457 9.00012 7V5C9.00012 3.89543 8.10469 3 7.00012 3H5.00012Z"
            fill="#111827"
          />
          <path
            d="M5.00012 11C3.89555 11 3.00012 11.8954 3.00012 13V15C3.00012 16.1046 3.89555 17 5.00012 17H7.00012C8.10469 17 9.00012 16.1046 9.00012 15V13C9.00012 11.8954 8.10469 11 7.00012 11H5.00012Z"
            fill="#696969"
          />
          <path
            d="M11.0001 5C11.0001 3.89543 11.8956 3 13.0001 3H15.0001C16.1047 3 17.0001 3.89543 17.0001 5V7C17.0001 8.10457 16.1047 9 15.0001 9H13.0001C11.8956 9 11.0001 8.10457 11.0001 7V5Z"
            fill="#111827"
          />
          <path
            d="M11.0001 13C11.0001 11.8954 11.8956 11 13.0001 11H15.0001C16.1047 11 17.0001 11.8954 17.0001 13V15C17.0001 16.1046 16.1047 17 15.0001 17H13.0001C11.8956 17 11.0001 16.1046 11.0001 15V13Z"
            fill="#111827"
          />
        </svg>
      </Icon>
    </>
  );
}

export function RemoveIcon(props: any) {
  return (
    <>
      <Icon fontSize={"18px"}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM7 13H17V11H7V13Z"
            fill="#D2042D"
          />
        </svg>
      </Icon>
    </>
  );
}

export function ShareIcon(props: any) {
  return (
    <>
      <Icon fontSize={"18px"}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 3V2H22V3H21ZM11.7071 13.7071C11.3166 14.0976 10.6834 14.0976 10.2929 13.7071C9.90237 13.3166 9.90237 12.6834 10.2929 12.2929L11.7071 13.7071ZM20 11V3H22V11H20ZM21 4H13V2H21V4ZM21.7071 3.70711L11.7071 13.7071L10.2929 12.2929L20.2929 2.29289L21.7071 3.70711Z"
            fill="#000"
          />
          <path
            d="M20 15V15C20 16.8692 20 17.8038 19.5981 18.5C19.3348 18.9561 18.9561 19.3348 18.5 19.5981C17.8038 20 16.8692 20 15 20H10C7.17157 20 5.75736 20 4.87868 19.1213C4 18.2426 4 16.8284 4 14V9C4 7.13077 4 6.19615 4.40192 5.5C4.66523 5.04394 5.04394 4.66523 5.5 4.40192C6.19615 4 7.13077 4 9 4V4"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Icon>
    </>
  );
}
