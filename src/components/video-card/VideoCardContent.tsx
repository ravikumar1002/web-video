import { CardContent, Typography, Avatar, Box } from "@mui/material";
import GoogleLogo from "../../assets/google.svg";
import { VideoMenu } from "./VideoMenu";
import { Link } from "react-router-dom";
import { useDateFormat } from "../../hooks/useDateFormat";
import { IVideoCardData } from "./VIdeoCard";
import { IVideoDto } from "../../dto/videos";
import { GetYoutubeDataAsJSON } from "../../services/GetAsJSON";
import { IChannelDto, IChannelsDto } from "../../dto/channels";
import { useEffect, useState } from "react";

interface IVideoContentData {
  videoContentData: IVideoCardData;
  videoDetails: IVideoDto;
  typeOfCard: string;
}

export const VideoCardContent = (props: IVideoContentData) => {
  const { id, title, creator, uploadDate } = props.videoContentData;
  const [creatorDetails, setCreatorDetails] = useState<IChannelDto>();

  const fetchCreatorData = async () => {
    const creatorData = await GetYoutubeDataAsJSON<IChannelsDto>("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: props.videoDetails.snippet.channelId,
      },
    });
    setCreatorDetails(creatorData.items[0]);
  };
  useEffect(() => {
    fetchCreatorData();
  }, []);

  const getLimitWordTitle = (title: string) =>
    title.length > 40 ? `${title.slice(0, 40)}...` : title;
  return (
    <>
      <CardContent
        sx={{
          display: "flex",
          gap: "0.5rem",
          padding: "0",
          paddingTop: "0.5rem",
          "&:last-child": { pb: 1 },
        }}
      >
        <div>
          <a
            href={`https://www.youtube.com/@${props?.videoDetails?.snippet?.channelTitle}`}
            style={{
              padding: "0.5rem 0.25rem",
              textDecoration: "none",
              color: "inherit",
              display: "inline-block",
            }}
            onClick={(e)=>{
              e.stopPropagation()
            }}
          >
            <Avatar
              alt="Creator"
              src={creatorDetails?.snippet.thumbnails.default.url}
              sx={{ width: 36, height: 36 }}
            />
          </a>
        </div>
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to={`${id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                flexGrow: "2",
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontWeight: "600",
                  maxHeight: "4rem",
                  flexGrow: 1,
                }}
              >
                {getLimitWordTitle(title)}
              </Typography>
            </Link>
            <VideoMenu
              videoDetails={props.videoDetails}
              typeOfCard={props.typeOfCard}
            />
          </Box>

          <div>
            <Typography
              variant="caption"
              component="div"
              sx={{ cursor: "default", fontWeight: "600", color: "#6d6d6d" }}
            >
              {creator}
            </Typography>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Typography
                variant="caption"
                component="span"
                sx={{ cursor: "default", fontWeight: "500" }}
              >
                {props.videoDetails.statistics.viewCount} views
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="span"
                sx={{ cursor: "default", fontWeight: "500" }}
              >
                {useDateFormat(uploadDate)}
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};
