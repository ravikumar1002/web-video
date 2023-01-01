import ReactPlayer from "react-player/youtube";

interface IVideoPlayerProps {
  videoId: string | undefined;
}

export const VideoPlayer = (props: IVideoPlayerProps) => {
  console.log(props.videoId);
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${props.videoId}`}
      controls
      width="100%"
      height="50%"
      playing={true}
    />
  );
};
