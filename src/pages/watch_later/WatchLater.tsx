import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { getAuth } from "firebase/auth";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { VideoCard } from "../../components/video-card/VIdeoCard";
import { IVideoDto, IVideosDto } from "../../dto/videos";
import { GetYoutubeDataAsJSON } from "../../services/GetAsJSON";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { IVideoData } from "../home/Home";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../App";
import { watchlaterThunk } from "../../thunk/watchlaterThunk";

export const WatchLaterPage = () => {
  const { watchlater } = useAppSelector((state) => state.userData);
  const [watchlaterVideos, setWatchlaterVideo] = useState<IVideoDto[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();

  const getWatchlaterVideos = async (videosId: string[] | undefined) => {
    const splitArray = videosId?.join(",");
    const videoData = await GetYoutubeDataAsJSON<IVideosDto>("/videos", {
      params: {
        part: "snippet, contentDetails,statistics",
        id: `${splitArray}`,
      },
    });
    setWatchlaterVideo(videoData.items);
  };

  const deleteAllVideoFromWatchLater = async (...arg: any[]) => {
    const deleteData = await deleteDoc(doc(db, ...arg));
    dispatch(watchlaterThunk(user?.providerData[0].uid));
  };

  useEffect(() => {
    getWatchlaterVideos(watchlater);
  }, [watchlater]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2rem 0rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          watchlater ({watchlater.length})
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: "red",
          }}
          startIcon={<DeleteIcon />}
          onClick={() => {
            deleteAllVideoFromWatchLater(
              "User",
              `${user?.providerData[0].uid}`,
              "watchlater",
              "watchlater"
            );
          }}
        >
          Delete All
        </Button>
      </div>

      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 7, sm: 8, md: 12, lg: 16 }}
      >
        {watchlaterVideos.map((videoData) => {
          const editVideoData = {
            id: videoData.id,
            title: videoData.snippet.title,
            category: videoData.snippet.categoryId,
            description: videoData.snippet.description,
            creator: videoData.snippet.channelTitle,
            uploadDate: videoData.snippet.publishedAt,
            viewCount: 123,
            url: `https://youtu.be/${videoData.id}`,
          } as IVideoData;

          return (
            <Grid item xs={7} sm={4} md={4} lg={4} key={editVideoData.id}>
              <div
                key={editVideoData.id}
                onClick={(e) => {
                  navigate(`/${editVideoData.id}`);
                }}
              >
                <VideoCard
                  video={editVideoData}
                  apiVideoData={videoData}
                  typeOfCard={"watchlater"}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
