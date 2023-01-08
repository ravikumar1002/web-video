import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { VideoCard } from "../../components/video-card/VIdeoCard";
import { IVideoDto, IVideosDto } from "../../dto/videos";
import { GetYoutubeDataAsJSON } from "../../services/GetAsJSON";
import { useAppSelector } from "../../store/reduxHook";
import { IVideoData } from "../home/Home";

interface HistoryPageProps {}

export const HistoryPage = (props: HistoryPageProps) => {
  const { history } = useAppSelector((state) => state.userData);
  const [HistoryVideos, setHistoryVideo] = useState<IVideoDto[]>([]);
  const navigate = useNavigate();

  const getHistoryVideos = async (videosId: string[] | undefined) => {
    const splitArray = videosId?.join(",");
    const videoData = await GetYoutubeDataAsJSON<IVideosDto>("/videos", {
      params: {
        part: "snippet, contentDetails,statistics",
        id: `${splitArray}`,
      },
    });
    setHistoryVideo(videoData.items);
  };

  useEffect(() => {
    getHistoryVideos(history);
  }, [history]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        History ({history.length})
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 7, sm: 8, md: 12, lg: 16 }}
      >
        {HistoryVideos.map((videoData) => {
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
                  typeOfCard={"history"}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
