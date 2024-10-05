import { ThemeOptions } from "@mui/material";
import { ThemeModeEnum } from "../utils/enums/theme";

const DARK_PALETTE: ThemeOptions["palette"] = {
  mode: ThemeModeEnum.DARK,
  primary: { main: "#00ACC1", dark: "#007C91", contrastText: "#FFFFFF" },
  secondary: {
    main: "#FF4081",
    dark: "#F50057",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#E0E0E0",
    secondary: "#B0BEC5",
    disabled: "#546E7A",
  },
  background: {
    paper: "#121212",
    default: "#1E1E1E",
  },
  success: {
    main: "#00E676",
    contrastText: "#212121",
  },
  error: {
    main: "#FF5252",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#FFC107",
    contrastText: "#212121",
  },
  info: {
    main: "#29B6F6",
    contrastText: "#212121",
  },
  grey: {
    "50": "#2E2E2E",
    "100": "#424242",
    "200": "#616161",
    "300": "#757575",
    "400": "#9E9E9E",
    "500": "#BDBDBD",
    "600": "#E0E0E0",
    "700": "#EEEEEE",
    "800": "#F5F5F5",
    "900": "#FFFFFF",
  },
};

const LIGHT_PALETTE: ThemeOptions["palette"] = {
  mode: ThemeModeEnum.LIGHT,
  primary: {
    main: "#1E88E5",
    dark: "#1565C0",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#FF7043",
    dark: "#E64A19",
    contrastText: "#263238",
  },
  text: {
    primary: "#263238",
    secondary: "#607D8B",
    disabled: "#B0BEC5",
  },
  background: {
    paper: "#FAFAFA",
    default: "#F0F0F0",
  },
  success: {
    main: "#66BB6A",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#E53935",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#FFB300",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#29B6F6",
    contrastText: "#FFFFFF",
  },
  grey: {
    "50": "#FAFAFA",
    "100": "#F5F5F5",
    "200": "#EEEEEE",
    "300": "#E0E0E0",
    "400": "#BDBDBD",
    "500": "#9E9E9E",
    "600": "#757575",
    "700": "#616161",
    "800": "#424242",
    "900": "#212121",
  },
};

type MuiPalette = { [key in ThemeModeEnum]: ThemeOptions["palette"] };
export const MUI_PALETTE: MuiPalette = {
  [ThemeModeEnum.DARK]: DARK_PALETTE,
  [ThemeModeEnum.LIGHT]: LIGHT_PALETTE,
};
