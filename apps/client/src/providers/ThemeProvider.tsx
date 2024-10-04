import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

import { enUS } from "@mui/material/locale";
import {
  ThemeProvider as MuiThemeProvider,
  Theme,
  createTheme,
} from "@mui/material/styles";

import { ThemeModeEnum } from "../utils/enums/theme";
import { GlobalStyle } from "@styles/GlobalStyle";
import { CssBaseline } from "@mui/material";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { getLocalStorageItem } from "@utils/functions/storage/local";
import { MUI_THEMES } from "../mui/mui.theme.config";

type ThemeModeContextType = {
  themeMode: ThemeModeEnum;
  setThemeMode: (theme: ThemeModeEnum) => void;
  theme: Theme;
};

const STORAGE_THEME_MODE_VARIABLE = "themeMode";

const INITIAL_THEME_MODE =
  (getLocalStorageItem(STORAGE_THEME_MODE_VARIABLE) as ThemeModeEnum) ??
  ThemeModeEnum.DARK;

const ThemeContext = createContext<ThemeModeContextType>({
  themeMode: INITIAL_THEME_MODE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setThemeMode: () => {},
  theme: createTheme(MUI_THEMES[INITIAL_THEME_MODE], enUS),
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useLocalStorageState<ThemeModeEnum>(
    STORAGE_THEME_MODE_VARIABLE,
    INITIAL_THEME_MODE
  );

  const theme = createTheme(MUI_THEMES[mode], enUS);

  const handleSetMode = (themeMode: ThemeModeEnum) => {
    setMode(themeMode);
  };

  const contextValue: ThemeModeContextType = useMemo(
    () => ({
      themeMode: mode,
      setThemeMode: handleSetMode,
      theme,
    }),
    [mode, setMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
