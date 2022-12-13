import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import GoogleLogo from "../../assets/google.svg";
import Box from "@mui/material/Box";
import { VideoMenu } from "./VideoMenu";
export const VideoCardContent = () => {
  return (
    <>
      <CardContent
        sx={{
          display: "flex",
          gap: "0.5rem",
          padding: "8px",
          "&:last-child": { pb: 1 },
        }}
      >
        <div style={{ padding: "0.5rem 0.25rem" }}>
          <Avatar
            alt="Creator"
            src={GoogleLogo}
            sx={{ width: 24, height: 24 }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "600", maxHeight: "4rem", flexGrow: 1 }}
            >
              Title of Video
            </Typography>
            <VideoMenu />
          </Box>

          <div>
            <Typography
              variant="body2"
              component="div"
              sx={{ cursor: "default", fontWeight: "500" }}
            >
              Creator
            </Typography>
            <div>
              <Typography
                variant="body2"
                component="span"
                sx={{ cursor: "default", fontWeight: "500" }}
              >
                Total Views
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="span"
                sx={{ cursor: "default", fontWeight: "500" }}
              >
                Upload Date
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};
