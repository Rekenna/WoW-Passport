import Typography from "typography";
import funstonTheme from "typography-theme-funston";

const typography = new Typography(funstonTheme);

const theme = {
  colors: {
    black: "#333333",
    white: "#ffffff"
  }
};

typography.injectStyles();

export { typography, theme };
