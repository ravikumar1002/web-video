import { IVideoDto } from "../../../dto/videos";
import { Typography, Avatar, Paper } from "@mui/material";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { Link } from "react-router-dom";
import { IChannelDto } from "../../../dto/channels";

interface IVideoPlayerContent {
  videoDetails: IVideoDto;
  creatorDetails: IChannelDto;
}

export const VideoPlayerContent = (props: IVideoPlayerContent) => {
  const {
    videoDetails: { id, snippet, statistics: videoStatistics },
    creatorDetails: {
      snippet: { thumbnails },
      statistics,
    },
  } = props;

  return (
    <div>
      <div>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "700",
            maxHeight: "4rem",
            flexGrow: 1,
            padding: "1rem 0",
          }}
        >
          {snippet.title}
        </Typography>
      </div>
      <div>
        <Link
          to={`#`}
          style={{
            display: "flex",
            gap: "0.5rem",
            padding: "0.5rem 0",
            textDecoration: "none",
            color: "inherit",
            cursor: "default",
          }}
        >
          <Avatar
            alt="Creator"
            src={thumbnails.default.url}
            sx={{ width: 48, height: 48 }}
          />
          <div>
            <Typography
              variant="body2"
              component="div"
              sx={{ fontWeight: "600", color: "#3f3f3f" }}
            >
              {snippet.channelTitle}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ fontWeight: "600", color: "#6d6d6d" }}
            >
              {statistics.subscriberCount} subscribers
            </Typography>
          </div>
        </Link>
      </div>
      <div style={{ width: "100%" }}>
        <Paper
          elevation={3}
          sx={{
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Typography
              variant="caption"
              component="span"
              sx={{ cursor: "default", fontWeight: "600" }}
            >
              {videoStatistics.viewCount} views
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="span"
              sx={{ cursor: "default", fontWeight: "600" }}
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
