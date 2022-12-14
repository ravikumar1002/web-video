import Card from "@mui/material/Card";
import { VideoCardContent } from "./VideoCardContent";

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
    <Card sx={{ maxWidth: 300}} >
      <div>
        <VideoCardImage imgHeight={190} imgAlt={title} imgId={_id} />
      </div>
      <div>
        <VideoCardContent/>
      </div>
    </Card>
  );
};
