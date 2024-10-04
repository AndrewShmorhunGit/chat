import { Box, styled } from "@mui/material";
import { MEDIA_BREAKPOINT } from "@utils/constants/media.constants";

export const PageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-x: hidden;

  @media ${MEDIA_BREAKPOINT["768"]} {
    gap: 16px;
    padding: 1rem;
  }

  @media ${MEDIA_BREAKPOINT["480"]} {
    gap: 8px;
    padding: 8px;
  }
`;

export const PageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;

  @media ${MEDIA_BREAKPOINT["768"]} {
    gap: 16px;
  }
`;

export const PaperHeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem 1rem 1rem;

  @media ${MEDIA_BREAKPOINT["768"]} {
    padding: 0.5rem 1rem 0.5rem 0.5rem;
  }

  @media ${MEDIA_BREAKPOINT["480"]} {
    // justify-content: flex-end;
  }
`;
