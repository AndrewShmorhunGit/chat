import React from "react";
import { IconButton, Box } from "@mui/material";
import { ThemeModeEnum } from "../../utils/enums/theme";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useThemeContext } from "@providers/ThemeProvider";
import { useTheme } from "@mui/material/styles";

export const ThemeToggleButton = () => {
    const { themeMode, setThemeMode } = useThemeContext();
    const theme = useTheme();

    const toggleTheme = () => {
        const newMode = themeMode === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
        setThemeMode(newMode);
    };

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <IconButton onClick={toggleTheme} color="primary" aria-label="toggle theme">
                {themeMode === ThemeModeEnum.LIGHT ? (
                    <DarkMode fontSize="large" sx={{ color: theme.palette.primary.main }} />
                ) : (
                    <LightMode fontSize="large" sx={{ color: theme.palette.primary.main }} />
                )}
            </IconButton>
        </Box>
    );
};
