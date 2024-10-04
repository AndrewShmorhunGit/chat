import React from "react";

import { ThemeToggleButton } from "@components/Theme/ThemeToggleButton";
import { PaperHeaderContainer } from "@styles/StyledComponents/Containers";

export function PageHeader(): React.ReactNode {
  return (
    <PaperHeaderContainer sx={{ borderBottom: "1px solid" }}>
      <img
        src="https://media.licdn.com/dms/image/v2/C4D0BAQH3rOaRqRSF7w/company-logo_200_200/company-logo_200_200/0/1630550399365/4k_soft_logo?e=1736380800&amp;v=beta&amp;t=YxysqupV1xt15Iot67AKu_2CkPdj1-_5vexPvQFpBj8"
        loading="lazy"
        alt="4K-Soft Ltd. logo"
        style={{ height: "60px", borderRadius: "59%" }}
      />
      <ThemeToggleButton />
    </PaperHeaderContainer>
  );
}
