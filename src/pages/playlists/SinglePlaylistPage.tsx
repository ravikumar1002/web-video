import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VideoCard } from "../../components/video-card/VIdeoCard";
import { IVideoDto, IVideosDto } from "../../dto/videos";
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

  const { playlists } = useAppSelector((state) => state.userData);
  const [playlistVideos, setPlaylistVideo] = useState<IVideoDto[]>([]);

  console.log(playlistid);

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
    const playlistVideosUID = playlists.filter(
      (playlist) => playlist.name === playlistID
    );
    getplaylistsVideos(playlistVideosUID[0].videos);
  };

  useEffect(() => {
    getPlaylistData(playlistid);
  }, [playlistid]);

  return (
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
              <VideoCard video={editVideoData} apiVideoData={videoData} />
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};
