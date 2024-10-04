import { ThemeProvider } from "@providers/ThemeProvider";

import React from "react";

type AppProvidersProps = { children: React.ReactNode };

export const AppProvider: React.FC<AppProvidersProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
