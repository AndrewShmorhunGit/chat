import { ThemeOptions } from "@mui/material";
import { MUI_PALETTE } from "./mui.palette.config";
import { MUI_TYPOGRAPHY_STYLES } from "./mui.typography.config";
import { MUI_COMPONENTS_STYLES } from "./mui.components.config";
import { ThemeModeEnum } from "../utils/enums/theme";

const DARK_THEME: ThemeOptions = {
  components: MUI_COMPONENTS_STYLES,
  typography: MUI_TYPOGRAPHY_STYLES,
  palette: MUI_PALETTE[ThemeModeEnum.DARK],
};

const LIGHT_THEME: ThemeOptions = {
  components: MUI_COMPONENTS_STYLES,
  typography: MUI_TYPOGRAPHY_STYLES,
  palette: MUI_PALETTE[ThemeModeEnum.LIGHT],
};

type MuiThemes = { [key in ThemeModeEnum]: ThemeOptions };
export const MUI_THEMES: MuiThemes = {
  [ThemeModeEnum.DARK]: DARK_THEME,
  [ThemeModeEnum.LIGHT]: LIGHT_THEME,
};
