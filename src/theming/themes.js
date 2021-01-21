import { AppTheme } from "./themetypes";
import {
    grey,
    red,
    blue,
    green,
    yellow,
    black,
} from "@material-ui/core/colors";

const themeindependent = {
    mixins: {
        textfieldminheight: "38px",
    },
};

const appThemeOptions = {
    [AppTheme.LIGHT]: {
        palette: {
            primary: {
                light: "#6ab7ff",
                main: "#1e88e5",
                dark: "#005cb2",
            },
            secondary: {
                light: green[400],
                main: green[600],
                dark: green[800],
            },
            background: {
                paper: "#fff",
                default: "#eee",
                hover: "#f8f8f8",
            },
            text: {
                primary: "rgba(0, 0, 0, 0.87)",
                secondary: "rgba(0, 0, 0, 0.54)",
                disabled: "rgba(0, 0, 0, 0.87)",
            },
        },
        ...themeindependent,
    },
    [AppTheme.DARK]: {
        palette: {
            primary: {
                light: "#616161",
                main: "#424242",
                dark: "#212121",
            },
            secondary: {
                light: "#5A42EA",
                main: "#3E22E6",
                dark: "#22108E",
            },
            background: {
                paper: "#303030",
                default: "#000",
                hover: "#383838",
            },
            text: {
                primary: "#fff",
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "#fff",
            },
        },
        ...themeindependent,
    },
};

export default appThemeOptions;
