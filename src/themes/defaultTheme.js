import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const primaryMainColor = "#bbded6";
const primaryLightColor = "#d1f2e5";
const primaryDarkColor = "#aeccc3";
const secondaryMainColor = "#6C63FF";
const hyperLinkColor = "#6b6664";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Open Sans,sans-serif",
      "Merienda,cursive",
      "Merienda One,cursive",
    ].join(","),
    h4: {
      fontFamily: "Merienda,cursive",
      "@media (max-width:430px)": {
        fontSize: "1.3rem",
      },
    },
  },
  palette: {
    primary: {
      main: primaryMainColor,
      light: primaryLightColor,
      dark: primaryDarkColor,
    },
    secondary: {
      main: secondaryMainColor,
    },
  },
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: "transparent",
      },
    },
    MuiButton: {
      root: {
        borderRadius: 100,
      },
    },
    MuiStepLabel: {
      iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    MuiStep: {
      horizontal: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    MuiLink: {
      root: {
        color: hyperLinkColor,
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    MuiDialogTitle: {
      root: {
        backgroundColor: primaryMainColor,
        boxShadow: "0 2px 10px 0 #000",
      },
    },
    MuiDialogContent: {
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    MuiDialogActions: {
      root: {
        flex: "1 1 auto",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
    },
    MuiInputLabel: {
      asterisk: {
        color: "red",
        fontSize: "2rem",
      },
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: primaryDarkColor,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: primaryMainColor,
        },
        "&$focused $notchedOutline": {
          borderColor: primaryDarkColor,
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
