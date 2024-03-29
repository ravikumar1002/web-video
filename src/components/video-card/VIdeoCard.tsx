import Card from "@mui/material/Card";
import { IVideoDto } from "../../dto/videos";
import { VideoCardContent } from "./VideoCardContent";
import { VideoCardImage } from "./VideoCardImage";
import "./video_card.css";
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
  apiVideoData: IVideoDto;
  typeOfCard: string;
}

export const VideoCard = (props: IVideoCardProps) => {
  const { id, title } = props.video;

  return (
    <Card className="img-hover-zoom--colorize">
      <div>
        <VideoCardImage
          imgHeight={190}
          imgAlt={title}
          imgId={id}
          typeOfCard={props.typeOfCard}
        />
      </div>
      <div>
        <VideoCardContent
          videoContentData={props.video}
          videoDetails={props.apiVideoData}
          typeOfCard={props.typeOfCard}
        />
      </div>
    </Card>
  );
};
