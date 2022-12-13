import CardMedia from "@mui/material/CardMedia";

interface IVideoCardImageProps {
  imgHeight: number;
  imgAlt: string;
  imgId: string;
}

export const VideoCardImage = (props: IVideoCardImageProps) => {

    console.log(props)
  return (
    <>
      <CardMedia
        component="img"
        height={props.imgHeight}
        image={`https://i.ytimg.com/vi/${props.imgId}/maxresdefault.jpg`}
        alt={props.imgAlt}
      />
    </>
  );
};
