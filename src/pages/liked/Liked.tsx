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
import { likedThunk } from "../../thunk/likedThunk";
import { Box } from "@mui/material";
import { LoadingImage } from "../../assets";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

interface ILikedVideoPage {}

export const LikedPage = (props: ILikedVideoPage) => {
  const { likedVideos, likedStatus } = useAppSelector(
    (state) => state.userData
  );
  const [likeAddedVideos, setLikedAddedVideos] = useState<IVideoDto[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();

  const getLikesVideos = async (videosId: string[] | undefined) => {
    const splitArray = videosId?.join(",");
    const videoData = await GetYoutubeDataAsJSON<IVideosDto>("/videos", {
      params: {
        part: "snippet, contentDetails,statistics",
        id: `${splitArray}`,
      },
    });
    setLikedAddedVideos(videoData.items);
  };

  const deleteAllVideoFromLiked = async (...arg: any[]) => {
    // @ts-ignore
    const deleteData = await deleteDoc(doc(db, ...arg));
    dispatch(likedThunk(user?.providerData[0].uid));
  };

  useEffect(() => {
    getLikesVideos(likedVideos);
  }, [likedVideos]);

  useEffect(() => {
    useDocumentTitle("Likes");
  }, []);
  return (
    <>
      {likedStatus === "fulfilled" && likedVideos.length === 0 && (
        <Box
          sx={{
            padding: "2rem 0rem",
          }}
        >
          <Typography variant="h4" component={"div"} gutterBottom>
            Liked ({likedVideos.length})
          </Typography>
          <Typography
            variant="h5"
            component={"div"}
            sx={{ textAlign: "center", paddingTop: "5rem" }}
            gutterBottom
          >
            This list has no videos.
          </Typography>
        </Box>
      )}

      {likedStatus === "pending" && (
        <Box
          sx={{
            margin: "auto",
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={LoadingImage}
            alt="loading logo"
            style={{ height: "8rem" }}
          />
        </Box>
      )}

      {likedStatus === "fulfilled" && likedVideos.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2rem 0rem",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Liked ({likedVideos.length})
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: "red",
              }}
              startIcon={<DeleteIcon />}
              onClick={() => {
                deleteAllVideoFromLiked(
                  "User",
                  `${user?.providerData[0].uid}`,
                  "liked",
                  "liked"
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
            {likeAddedVideos.map((videoData) => {
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
                      typeOfCard={"liked"}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
};
