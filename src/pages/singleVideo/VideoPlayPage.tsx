import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IVideosDto, IVideoDto } from "../../dto/videos";
import { IChannelDto, IChannelsDto } from "../../dto/channels";
import { GetYoutubeDataAsJSON } from "../../services/GetAsJSON";
import { VideoPlayerContent } from "./components/VideoContent";
import { VideoPlayer } from "./components/VideoPlayer";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const VideoPlayPage = () => {
  const [currentVideo, setCurrentVideo] = useState<IVideoDto>();
  const [currentCreator, setCurrentCreator] = useState<IChannelDto>();
  const { videoid } = useParams();

  const fetchPageData = async () => {
    const videoData = await GetYoutubeDataAsJSON<IVideosDto>("/videos", {
      params: {
        part: "snippet, contentDetails,statistics",
        id: videoid,
      },
    });
    const creatorData = await GetYoutubeDataAsJSON<IChannelsDto>("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: videoData.items[0].snippet.channelId,
      },
    });
    useDocumentTitle(`${videoData?.items[0].snippet.title}`);
    setCurrentVideo(videoData.items[0]);
    setCurrentCreator(creatorData.items[0]);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  return (
    <div>
      {currentVideo && currentCreator && (
        <>
          <VideoPlayer videoId={currentVideo.id} />
          <VideoPlayerContent
            videoDetails={currentVideo}
            creatorDetails={currentCreator}
          />
        </>
      )}
    </div>
  );
};
