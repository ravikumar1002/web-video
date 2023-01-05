import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { VideoCard } from "../../components/video-card/VIdeoCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { videosThunk } from "../../thunk/VideosThunk";
import { Box, Grid } from "@mui/material";
import { CardSceleton } from "../../components/sceleton/CardSceleton";

export interface IVideoData {
  id: string;
  title: string;
  category: string;
  description: string;
  creator: string;
  uploadDate: string;
  viewCount: number;
  url: string;
}

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { videos, videosStatus } = useAppSelector((state) => state.videos);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(videosThunk());
  }, []);

  return (
    <div>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 7, sm: 8, md: 12, lg: 16 }}
        >
          {videosStatus === "pending" &&
            [...Array(20)].map((index) => {
              return (
                <Grid item xs={7} sm={4} md={4} lg={4} key={index}>
                  <CardSceleton />
                </Grid>
              );
            })}
          {videos.map((videoData) => {
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
                  <VideoCard video={editVideoData} apiVideoData={videoData} />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};
