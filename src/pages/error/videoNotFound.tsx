import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { UnavialableImg } from "../../assets";
export const VideoNotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{
          width: {
            xs: "13rem",
            sm: "19rem",
            md: "25rem",
          },
        }}
        image={UnavialableImg}
      />
      <Typography variant="h4">This video isn't available any more</Typography>
      <Button
        onClick={() => {
          navigate("/", { replace: true });
        }}
        variant="contained"
      >
        Go to Home
      </Button>
    </Box>
  );
};
