import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { VideoCard } from "../../components/video-card/VIdeoCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { categoriesVideosThunk, videosThunk } from "../../thunk/VideosThunk";
import {
  Box,
  Chip,
  Grid,
  Stack,
  Tab,
  tabClasses,
  Tabs,
  tabsClasses,
  tabScrollButtonClasses,
} from "@mui/material";
import { CardSceleton } from "../../components/sceleton/CardSceleton";
import { categoriesThunk } from "../../thunk/categoriesThunk";

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
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();
  const { videos, videosStatus, categories } = useAppSelector(
    (state) => state.videos
  );
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(videosThunk());
    dispatch(categoriesThunk());
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ paddingBottom: "1rem", width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="categories"
            sx={{
              [`& .${tabsClasses.scroller}`]: {
                marginLeft: "-40px",
                marginRight: "-40px",
              },
              [`& .${tabsClasses.scrollButtons}`]: {
                backgroundColor: "#c9d9e7",
                [`&:not(.${tabScrollButtonClasses.disabled})`]: {
                  zIndex: 10,
                  backgroundColor: "#c9d9e7",
                  opacity: '1',
                },
              },
            }}
          >
            <Tab
              label="All"
              sx={{
                padding: "0.5rem",
                fontWeight: "600",
              }}
              onClick={() => {
                dispatch(videosThunk());
              }}
            />
            {categories.map((categroy, i) => {
              return (
                <Tab
                  key={i}
                  label={`${categroy.snippet.title}`}
                  sx={{
                    padding: "0.5rem",
                    fontWeight: "600",
                  }}
                  onClick={(e) => {
                    dispatch(categoriesVideosThunk(categroy.id));
                  }}
                />
              );
            })}
          </Tabs>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 7, sm: 8, md: 12, lg: 16 }}
        >
          {videosStatus === "pending" &&
            [...Array(20)].map((_, index) => {
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
                  <VideoCard
                    video={editVideoData}
                    apiVideoData={videoData}
                    typeOfCard={"video"}
                  />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};
