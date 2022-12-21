import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import GoogleLogo from "../../assets/google.svg";
import Box from "@mui/material/Box";
import { VideoMenu } from "./VideoMenu";
import { Link } from "react-router-dom";
import { useDateFormat } from "../../hooks/useDateFormat";
import { IVideoCardData } from "./VIdeoCard";
import { IVideosDto } from "../../dto/videos";

interface IVideoContentData {
  videoContentData: IVideoCardData;
  videoDetails: IVideosDto;
}

export const VideoCardContent = (props: IVideoContentData) => {
  const {
    id,
    title,
    category,
    description,
    creator,
    uploadDate,
    viewCount,
    url,
  } = props.videoContentData;

  const getLimitWordTitle = (title: string) =>
    title.length > 40 ? `${title.slice(0, 40)}...` : title;
  return (
    <>
      <CardContent
        sx={{
          display: "flex",
          gap: "0.5rem",
          padding: "0",
          paddingTop: "0.5rem",
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
                variant="body1"
                component="div"
                sx={{
                  fontWeight: "600",
                  maxHeight: "4rem",
                  flexGrow: 1,
                  // wordBreak: "break-all",
                }}
              >
                {getLimitWordTitle(title)}
              </Typography>
            </Link>
            <VideoMenu videoDetails={props.videoDetails} />
          </Box>

          <div>
            <Typography
              variant="caption"
              component="div"
              sx={{ cursor: "default", fontWeight: "600", color: "#6d6d6d" }}
            >
              {creator}
            </Typography>
            <div>
              <Typography
                variant="caption"
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
                {useDateFormat(uploadDate)}
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};
