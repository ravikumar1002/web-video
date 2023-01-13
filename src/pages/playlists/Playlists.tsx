import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { LoadingImage } from "../../assets";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAppSelector } from "../../store/reduxHook";
import { PlaylistsFolderCard } from "./components/playlitsFolder/PlaylistsFolder";

export const PlaylistsPage = () => {
  const { playlists, playlitsStatus } = useAppSelector(
    (state) => state.userData
  );

  useEffect(() => {
    useDocumentTitle("Playlists");
  }, []);

  return (
    <>
      {playlitsStatus === "fulfilled" && playlists.length === 0 && (
        <Box
          sx={{
            padding: "2rem 0rem",
          }}
        >
          <Typography variant="h4" component={"div"} gutterBottom>
            Playlists ({playlists.length})
          </Typography>
          <Typography
            variant="h5"
            component={"div"}
            sx={{ textAlign: "center", paddingTop: "5rem" }}
            gutterBottom
          >
            This list has no videos.
          </Typography>
        </Box>
      )}
      {playlitsStatus === "pending" && (
        <Box
          sx={{
            margin: "auto",
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={LoadingImage}
            alt="loading logo"
            style={{ height: "8rem" }}
          />
        </Box>
      )}
      {playlitsStatus === "fulfilled" && playlists.length > 0 && (
        <div>
          <Typography variant="h4" gutterBottom>
            Playlist ({playlists.length})
          </Typography>
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
      )}
    </>
  );
};
