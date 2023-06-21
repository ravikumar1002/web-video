import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Error404 } from "../../assets";

export const Page404 = () => {
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
            xs: "12rem",
            sm: "18rem",
            md: "23rem",
          },
        }}
        image={Error404}
      />
      <Typography variant="h5">
        This page isn't available. Sorry about that. Try searching for something
        else.
      </Typography>
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
