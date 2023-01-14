import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingImage } from "../../assets";
import { VideoCard } from "../../components/video-card/VIdeoCard";
import { IVideoDto, IVideosDto } from "../../dto/videos";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { GetYoutubeDataAsJSON } from "../../services/GetAsJSON";
import { useAppSelector } from "../../store/reduxHook";

interface SinglePlaylistPage {}

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

export const SinglePlayListPage = (props: SinglePlaylistPage) => {
  const { playlistid } = useParams();
  const navigate = useNavigate();
  const { playlists, playlitsStatus } = useAppSelector(
    (state) => state.userData
  );
  const [playlistVideos, setPlaylistVideo] = useState<IVideoDto[]>([]);

  const getplaylistsVideos = async (videosId: string[] | undefined) => {
    const splitArray = videosId?.join(",");
    const videoData = await GetYoutubeDataAsJSON<IVideosDto>("/videos", {
      params: {
        part: "snippet, contentDetails,statistics",
        id: `${splitArray}`,
      },
    });
    setPlaylistVideo(videoData.items);
  };

  const getPlaylistData = (playlistID: string | undefined) => {
    const playlistVideosUID = playlists.find(
      (playlist) => playlist.name === playlistID
    );
    getplaylistsVideos(playlistVideosUID?.videos);
  };

  useEffect(() => {
    getPlaylistData(playlistid);
  }, [playlistid, playlists]);

  useEffect(() => {
    useDocumentTitle(`${playlistid}`);
  }, []);

  return (
    <>
      {playlitsStatus === "fulfilled" && playlists.length === 0 && (
        <Box
          sx={{
            padding: "2rem 0rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="h4" gutterBottom component={"div"}>
              {playlistid}
            </Typography>
            <Typography variant="h5" gutterBottom component={"div"}>
              {playlistVideos.length} Videos
            </Typography>
          </div>
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
      {playlitsStatus === "pending" && (
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
      {playlitsStatus === "fulfilled" && playlists.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Typography variant="h4" gutterBottom component={"div"}>
              {playlistid}
            </Typography>
            <Typography variant="h5" gutterBottom component={"div"}>
              {playlistVideos.length} Videos
            </Typography>
          </div>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 7, sm: 8, md: 12, lg: 16 }}
          >
            {playlistVideos.map((videoData) => {
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
                      typeOfCard={"playlist"}
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
