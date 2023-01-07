import { BasicModal } from "../modal/Modal";
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../App";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { playlistsThunk } from "../../thunk/playliststhunk";

interface IPlaylistModalProps {
  openPlaylistModal: () => void;
  closePlaylistModal: () => void;
  openModal: boolean;
  videoId: string;
}

export const PlaylistMenuModal = (props: IPlaylistModalProps) => {
  const { openPlaylistModal, closePlaylistModal, openModal } = props;
  const [playlistNameInput, setPlaylistNameInput] = useState<string>();

  const { playlists } = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const addDataInFirebase = async (data: string, ...args: any) => {
    try {
      const docRef = await setDoc(doc(db, ...args), { [data]: data });
      dispatch(playlistsThunk(user?.providerData[0].uid));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addVideoInFirebase = async (data: string, ...args: any) => {
    try {
      const docRef = await updateDoc(doc(db, ...args), { [data]: data });
      dispatch(playlistsThunk(user?.providerData[0].uid));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const checkVideoInPlaylist = (
    playlists: { name: string; videos: string[] }[],
    playlistName: string,
    videoId: string
  ) => {
    return playlists
      .find((video) => video?.name === playlistName)
      ?.videos.includes(videoId);
  };

  return (
    <BasicModal
      openPlaylistModal={openPlaylistModal}
      closePlaylistModal={closePlaylistModal}
      openModal={openModal}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{ cursor: "default", fontWeight: "700", alignSelf: "center" }}
        >
          Save to...
        </Typography>
        <IconButton aria-label="close" onClick={() => closePlaylistModal()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <FormGroup
        sx={{
          paddingBottom: "1rem",
        }}
      >
        {playlists.map((playlist) => {
          return (
            <FormControlLabel
              control={<Checkbox />}
              label={playlist?.name}
              key={playlist?.name}
              checked={checkVideoInPlaylist(playlists, playlist?.name, props.videoId)}
              onClick={() => {
                console.log(props.videoId);
                addVideoInFirebase(
                  props.videoId,
                  "User",
                  `${user?.providerData[0].uid}`,
                  "playlists",
                  `${playlist?.name}`
                );
              }}
            />
          );
        })}
      </FormGroup>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "end",
          gap: "0.5rem",
          flexDirection: "column",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Playlist Name"
          variant="outlined"
          size="small"
          value={playlistNameInput}
          sx={{
            width: "100%",
          }}
          onChange={(e) => {
            setPlaylistNameInput(e.target.value);
          }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            addDataInFirebase(
              props.videoId,
              "User",
              `${user?.providerData[0].uid}`,
              "playlists",
              `${playlistNameInput}`
            );
            setPlaylistNameInput("");
            closePlaylistModal();
          }}
        >
          Create
        </Button>
      </Box>
    </BasicModal>
  );
};
