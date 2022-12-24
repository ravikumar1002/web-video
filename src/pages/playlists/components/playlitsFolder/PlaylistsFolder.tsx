import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { DeleteLogo } from "../../../../assets";

export const PlaylistsFolderCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: "0",
        display: "inline-block",
      }}
    >
      <Link
        to={"/playlists"}
        style={{
          textDecoration: "none",
          color: "inherit",
          flexGrow: "2",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height={200}
            image={`https://i.ytimg.com/vi/P1Ohc8GDFPI/maxresdefault.jpg`}
            alt={"Nothing"}
            title={"nothing"}
          />
          <div className="playlist-card-count-section" style={{

          }}>
          </div>
        </CardActionArea>
      </Link>

      <CardActions
        sx={{
          padding: "0",
          "&:last-child": { pb: 0 },
        }}
      >
        <Link
          to={"/playlists"}
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
              Lizard
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
