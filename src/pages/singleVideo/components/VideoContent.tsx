import { IVideoDto } from "../../../dto/videos";
import { Typography, Avatar, Paper } from "@mui/material";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { Link } from "react-router-dom";
import { IChannelDto } from "../../../dto/channels";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useAppDispatch, useAppSelector } from "../../../store/reduxHook";
import { getAuth } from "firebase/auth";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../App";
import { likedThunk } from "../../../thunk/likedThunk";
import { VideoMenu } from "../../../components/video-card/VideoMenu";
import { useNumberFormat } from "../../../hooks/useNumberFormat";

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

  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();
  const { likedVideos } = useAppSelector((state) => state.userData);

  const addVideoInLiked = async (data: string, ...args: any) => {
    try {
      if (likedVideos.length > 0) {
        // @ts-ignore
        const docRef = await updateDoc(doc(db, ...args), {
          [data]: data,
        });
      } else {
        // @ts-ignore
        const setLikedPath = setDoc(doc(db, ...args), { [data]: data });
      }
      dispatch(likedThunk(user?.providerData[0].uid));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteVideoFromLiked = async (videoId: string, ...arg: any[]) => {
    // @ts-ignore
    const videoDoc = doc(db, ...arg);
    const deleteData = await updateDoc(videoDoc, {
      [videoId]: deleteField(),
    });
    dispatch(likedThunk(user?.providerData[0].uid));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "700",
            maxHeight: {
              xs: "auto",
              sm: "5rem",
              md: "4rem",
            },
            flexGrow: 1,
            padding: "1rem 0",
          }}
        >
          {snippet.title}
        </Typography>

        <div>
          {likedVideos.includes(id) ? (
            <Tooltip title="liked">
              <IconButton
                onClick={(e) => {
                  deleteVideoFromLiked(
                    `${id}`,
                    "User",
                    `${user?.providerData[0].uid}`,
                    "liked",
                    "liked"
                  );
                }}
              >
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="liked">
              <IconButton
                onClick={(e) => {
                  addVideoInLiked(
                    id,
                    "User",
                    `${user?.providerData[0].uid}`,
                    "liked",
                    "liked"
                  );
                }}
              >
                <ThumbUpOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <VideoMenu
          videoDetails={props.videoDetails}
          typeOfCard={"single player"}
        />
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
              {useNumberFormat(Number(statistics.subscriberCount))} subscribers
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
              {useNumberFormat(Number(videoStatistics.viewCount))} views
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
            <Typography variant="caption" component="span">
              {snippet.description}
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
};
