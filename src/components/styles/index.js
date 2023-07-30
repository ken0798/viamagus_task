import { styled } from "@mui/system";

export const MainContainer = styled("section")({
  display: "flex",
  justifyContent: "center",
  padding: "16px",
  "& > div": {
    width: "100%",
    maxWidth: "1040px",
  },
});
