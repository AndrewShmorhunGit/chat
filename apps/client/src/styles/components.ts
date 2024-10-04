import { ThemeOptions } from "@mui/material";

export const MUI_COMPONENTS_STYLES: ThemeOptions["components"] = {
    MuiButton: {
        styleOverrides: {
            root: {
                fontFamily: "Poppins, sans-serif",
                "&:hover": {
                    backgroundColor: "#2E4C8A"
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
                fontFamily: "Poppins, sans-serif"
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: "none",
                borderRadius: "8px",
                boxShadow: "0px 4px 20px 0px rgba(113, 113, 113, 0.15",
                "@media (max-width:480px)": {}
            }
        }
    },
    MuiCheckbox: {
        styleOverrides: {
            root: {
                // padding: 0,
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
