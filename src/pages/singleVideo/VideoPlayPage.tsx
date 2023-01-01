import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IVideosDto, IVideoDto } from "../../dto/videos";
import { GetYoutubeDataAsJSON } from "../../services/GetAsJSON";
import { VideoPlayerContent } from "./components/VideoContent";
import { VideoPlayer } from "./components/VIdeoPlayer";

export const VideoPlayPage = () => {
  const [currentVideo, setCurrentVideo] = useState<IVideoDto | undefined>();
  const { videoid } = useParams();
  const getVideoData = async () => {
    const videoData = await GetYoutubeDataAsJSON<IVideosDto>("/videos", {
      params: {
        part: "snippet",
        contentDetails: "statistics",
        id: videoid,
      },
    });
    console.log(videoData)
    setCurrentVideo(videoData.items[0]);
  };

  useEffect(() => {
    getVideoData();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      {currentVideo && (
        <>
          <VideoPlayer videoId={currentVideo.id} />
          <VideoPlayerContent videoDetails={currentVideo} />
        </>
      )}
    </div>
  );
};
