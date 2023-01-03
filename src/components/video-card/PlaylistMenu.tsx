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
import { useState } from "react";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../App";

interface IPlaylistModalProps {
  openPlaylistModal: () => void;
  closePlaylistModal: () => void;
  openModal: boolean;
}

export const PlaylistMenuModal = (props: IPlaylistModalProps) => {
  const { openPlaylistModal, closePlaylistModal, openModal } = props;
  const [playlistNameInput, setPlaylistNameInput] = useState<string>();
  const [playlistsName, setPlaylistsName] = useState<string[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const addDataInFirebase = async (...args: any) => {
    try {
      const docRef = await setDoc(doc(db, ...args), {});
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getPlaylistsName = async (userID: string | undefined) => {
    const docSnap = await getDocs(
      collection(db, "User", `${userID}`, "playlists")
    );
    console.log(docSnap, docSnap);
    const PlaylistArray = docSnap.docs.map((item) => {
      return item.id;
    });
    console.log(PlaylistArray);
    setPlaylistsName(PlaylistArray);
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
        {playlistsName.map((playlistId) => {
          return <FormControlLabel control={<Checkbox />} label={playlistId} />;
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
              "User",
              `${user?.providerData[0].uid}`,
              "playlists",
              `${playlistNameInput}`
            );
            setPlaylistNameInput("");
            getPlaylistsName(user?.providerData[0].uid);
          }}
        >
          Create
        </Button>
      </Box>
    </BasicModal>
  );
};
