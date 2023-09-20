import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./button";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    green: "#40a829",
    blue: "#00B6FE",
    yellow: "#FFBF01",
    purple: "#BA9BFC",
    gray: "#DBDBDE",
    darkgray: "#696969",
    lightgray: "#F8F8F8",
    dark: "#5F5B48",
    black: "#000",
    matte: "#28282B",
    offwhite: "#FAF9F6",
    primary: "#c53211",
    mute: "#9a9a9a",
  },
};

export const theme = extendTheme({
  colors,
  styles: {
    global: {
      "html, body": {
        fontSize: "16px",
        color: "#191919",
        lineHeight: "tall",
      },
    },
  },

  components: {
    Button: buttonTheme,
  },
});
