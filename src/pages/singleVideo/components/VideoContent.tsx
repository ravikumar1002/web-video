import { IVideoDto } from "../../../dto/videos";
import { Typography, Avatar, Paper } from "@mui/material";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { Link } from "react-router-dom";
import { GoogleLogo } from "../../../assets/index";

interface IVideoPlayerContent {
  videoDetails: IVideoDto;
}

export const VideoPlayerContent = (props: IVideoPlayerContent) => {
  const { id, snippet } = props.videoDetails;

  return (
    <div>
      <div>
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontWeight: "600",
            maxHeight: "4rem",
            flexGrow: 1,
          }}
        >
          {snippet.title}
        </Typography>
      </div>
      <div>
        <Link
          to={`${id}`}
          style={{
            display: "flex",
            gap: "0.5rem",
            padding: "0",
            paddingTop: "0.5rem",
          }}
        >
          <Avatar
            alt="Creator"
            src={GoogleLogo}
            sx={{ width: 24, height: 24 }}
          />
          <Typography
            variant="caption"
            component="div"
            sx={{ cursor: "default", fontWeight: "600", color: "#6d6d6d" }}
          >
            {snippet.channelTitle}
          </Typography>
        </Link>
      </div>
      <div style={{ width: "100%" }}>
        <Paper
          elevation={3}
          sx={{
            padding: "1rem",
          }}
        >
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
              {useDateFormat(snippet.publishedAt)}
            </Typography>
          </div>
          <div>
            <Typography
              variant="caption"
              component="span"
              //   sx={{ cursor: "default", fontWeight: "500" }}
            >
              {snippet.description}
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
};
