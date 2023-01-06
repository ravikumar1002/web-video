import { Link } from "react-router-dom";
import {
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { DeleteLogo } from "../../../../assets";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";

interface IPlaylistValue {
  name: string;
  videos: string[];
}

interface IPlaylistsFolderCardProps {
  playlistData: IPlaylistValue;
}

export const PlaylistsFolderCard = (props: IPlaylistsFolderCardProps) => {
  const { playlistData } = props;

  return (
    <Card
      sx={{
        padding: "0",
      }}
    >
      <Link
        to={`/playlists/${playlistData?.name}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          flexGrow: "2",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          height={200}
          image={`https://i.ytimg.com/vi/${playlistData.videos[0]}/maxresdefault.jpg`}
          alt={"Nothing"}
          title={"nothing"}
        />
        <div
          style={{
            background: "#6d6d6dc4",
            position: "absolute",
            top: "0%",
            right: " 0%",
            height: "100%",
            width: "25%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            wordBreak: "break-word",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="h5" component="div">
              {playlistData?.videos.length}
            </Typography>
            <Typography variant="h5" component="div">
              Videos
            </Typography>
            <Typography variant="h4" component="div">
              <PlaylistPlayIcon fontSize="large" />
            </Typography>
          </div>
        </div>
      </Link>

      <CardActions
        sx={{
          padding: "0",
          "&:last-child": { pb: 0 },
        }}
      >
        <Link
          to={"/playlists/12345"}
          style={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: "2",
          }}
        >
          <CardContent
            sx={{
              padding: "8px",
              "&:last-child": { pb: 1 },
            }}
          >
            <Typography variant="h5" component="div">
              {playlistData?.name}
            </Typography>
          </CardContent>
        </Link>

        <Button size="small" color="primary">
          <img src={DeleteLogo} alt="Delte Logo" style={{ height: "1.5rem" }} />
        </Button>
      </CardActions>
    </Card>
  );
};
