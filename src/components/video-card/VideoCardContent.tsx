import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import GoogleLogo from "../../assets/google.svg";
import Box from "@mui/material/Box";
import { VideoMenu } from "./VideoMenu";
import { Link } from "react-router-dom";

export const VideoCardContent = () => {
  return (
    <>
      <CardContent
        sx={{
          display: "flex",
          gap: "0.5rem",
          padding: "0",
          "&:last-child": { pb: 1 },
        }}
      >
        <div>
          <Link
            to={"/history"}
            style={{
              padding: "0.5rem 0.25rem",
              textDecoration: "none",
              color: "inherit",
              display: "inline-block",
            }}
          >
            <Avatar
              alt="Creator"
              src={GoogleLogo}
              sx={{ width: 24, height: 24 }}
            />
          </Link>
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
            <Link
              to={"/history"}
              style={{
                textDecoration: "none",
                color: "inherit",
                flexGrow: "2",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "600", maxHeight: "4rem", flexGrow: 1 }}
              >
                Title of Video
              </Typography>
            </Link>
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
