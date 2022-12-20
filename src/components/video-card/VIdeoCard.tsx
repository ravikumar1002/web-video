import Card from "@mui/material/Card";
import { VideoCardContent } from "./VideoCardContent";

import { VideoCardImage } from "./VideoCardImage";

export interface IVideoCardData {
  id: string;
  title: string;
  category: string;
  description: string;
  creator: string;
  uploadDate: string;
  viewCount: number;
  url: string;
}

export interface IVideoCardProps {
  video: IVideoCardData;
}

export const VideoCard = (props: IVideoCardProps) => {
  const {
    id,
    title,
    category,
    description,
    creator,
    uploadDate,
    viewCount,
    url,
  } = props.video;
  console.log(id, "image");

  return (
    <Card sx={{ maxWidth: 300 }}>
      <div>
        <VideoCardImage imgHeight={190} imgAlt={title} imgId={id} />
      </div>
      <div>
        <VideoCardContent videoContentData={props.video} />
      </div>
    </Card>
  );
};
