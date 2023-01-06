import { Grid } from "@mui/material";
import { useAppSelector } from "../../store/reduxHook";
import { PlaylistsFolderCard } from "./components/playlitsFolder/PlaylistsFolder";

export const PlaylistsPage = () => {
  const { playlists } = useAppSelector((state) => state.userData);

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 7, sm: 8, md: 12, lg: 16 }}
      >
        {playlists.map((playlist) => {
          return (
            <Grid item xs={7} sm={4} md={4} lg={4} key={playlist.name}>
              <PlaylistsFolderCard playlistData={playlist} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
