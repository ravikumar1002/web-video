import { VideoCardImage } from "./VideoCardImage";

interface IVideoCardData {
  _id: string;
  title: string;
  category: string;
  description: string;
  creator: string;
  uploadDate: string;
  viewCount: number;
  url: string;
}

interface IVideoCardProps {
  video: IVideoCardData;
}

export const VideoCard = (props: IVideoCardProps) => {
  const {
    _id,
    title,
    category,
    description,
    creator,
    uploadDate,
    viewCount,
    url,
  } = props.video;

  return (
    <div>
      <div>
        <VideoCardImage imgHeight={190} imgAlt={title} imgId={_id} />
      </div>
    </div>
  );
};
