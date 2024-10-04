import { ThemeOptions } from "@mui/material";

export const MUI_COMPONENTS_STYLES: ThemeOptions["components"] = {
    MuiButton: {
        styleOverrides: {
            root: {
                color: "white",
                backgroundColor: "secondary.main",
                fontFamily: "Gosha Sans, sans-serif",
                padding: "12px 18px",
                minWidth: "fit-content",

                "&:hover": {
                    backgroundColor: "primary.main"
                },

                "&.Mui-disabled": {
                    filter: "brightness(0.8)"
                }
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: {
                fontFamily: "Gosha Sans, sans-serif"
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                display: "flex",
                gap: "16px",
                padding: "16px",
                borderRadius: "16px",
                backgroundImage: "none",

                "@media (max-width:480px)": {
                    gap: "8px",
                    padding: "8px",
                    borderRadius: "8px"
                }
            }
        }
    },
    MuiCheckbox: {
        styleOverrides: {
            root: {
                padding: 0
            }
        }
    },
    MuiTypography: {
        styleOverrides: {
            body1: {
                "@media (max-width:768px)": {
                    fontSize: "16px",
                    lineHeight: "19px"
                },
                "@media (max-width:480px)": {
                    fontSize: "12px",
                    lineHeight: "14px"
                }
            },
            body2: {
                "@media (max-width:768px)": {
                    fontSize: "14px",
                    lineHeight: "17px"
                },
                "@media (max-width:480px)": {
                    fontSize: "12px",
                    lineHeight: "14px"
                },
                "@media (max-width:320px)": {
                    fontSize: "10px",
                    lineHeight: "12px"
                }
            },
            subtitle1: {
                "@media (max-width:480px)": {
                    fontSize: "11px",
                    lineHeight: "14px"
                },
                "@media (max-width:320px)": {
                    fontSize: "10px",
                    lineHeight: "12px"
                }
            },
            subtitle2: {
                "@media (max-width:480px)": {
                    fontSize: "7px",
                    lineHeight: "8px"
                },
                "@media (max-width:320px)": {
                    fontSize: "10px",
                    lineHeight: "12px"
                }
            },
            h1: {
                "@media (max-width:1024px)": {
                    fontSize: "36px",
                    lineHeight: "43px"
                },
                "@media (max-width:768px)": {
                    fontSize: "30px",
                    lineHeight: "36px"
                },
                "@media (max-width:480px)": {
                    fontSize: "24px",
                    lineHeight: "28px"
                },
                "@media (max-width:320px)": {
                    fontSize: "18px",
                    lineHeight: "22px"
                }
            },
            h2: {
                "@media (max-width:1440px)": {
                    fontSize: "30px",
                    lineHeight: "36px"
                },
                "@media (max-width:1024px)": {
                    fontSize: "24px",
                    lineHeight: "28px"
                },
                "@media (max-width:320px)": {
                    fontSize: "16px",
                    lineHeight: "19px"
                }
            },
            h3: {
                "@media (max-width:1024px)": {
                    fontSize: "18px",
                    lineHeight: "22px"
                },
                "@media (max-width:768px)": {
                    fontSize: "16px",
                    lineHeight: "19px"
                }
            }
        }
    }
};
