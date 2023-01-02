import * as React from "react";
import { useState, useRef, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  IconButton,
  ClickAwayListener,
  TextField,
  Button,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../App";
import { IVideoDto } from "../../dto/videos";
import { getAuth } from "firebase/auth";
import { BasicModal } from "../modal/Modal";
interface ICardMenuProps {
  videoDetails: IVideoDto;
}

export const VideoMenu = (props: ICardMenuProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const container = useRef<HTMLUListElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleMenuClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenMenu(false);
  };

  const handleClickOutside = (e: Event | React.SyntheticEvent) => {
    if (
      container?.current &&
      !container?.current?.contains(e.target as HTMLElement)
    ) {
      setOpenMenu(false);
    }
  };

  const openPlaylistModal = () => setOpenModal(true);
  const closePlaylistModal = () => setOpenModal(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  const addDataInFirebase = async (storageValue: object, ...args: any) => {
    try {
      const docRef = await addDoc(collection(db, ...args), {
        ...storageValue,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={openMenu ? "composition-menu" : undefined}
        aria-expanded={openMenu ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuToggle}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={openMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        sx={{
          zIndex: "10",
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList
                  autoFocusItem={openMenu}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  ref={container}
                  className="container"
                >
                  <MenuItem
                    onClick={(e) => {
                      addDataInFirebase(
                        props.videoDetails,
                        "User",
                        `${user?.providerData[0].uid}`,
                        "Liked"
                      );
                      handleMenuClose(e);
                    }}
                  >
                    Liked
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      addDataInFirebase(
                        props.videoDetails,
                        "User",
                        `${user?.providerData[0].uid}`,
                        "watch-later"
                      );
                      handleMenuClose(e);
                    }}
                  >
                    save to watch later
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      openPlaylistModal();
                      handleMenuClose(e);
                    }}
                  >
                    Add to Playlist
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <BasicModal
        openPlaylistModal={openPlaylistModal}
        closePlaylistModal={closePlaylistModal}
        openModal={openModal}
      >
        <div>
          {/* <label htmlFor="playlistName">
            <input type="checkbox" name="playlistName" id="playlistName"  onClick={() => {
              console.log("input clicked")
            }}/>
            <span>Playlist name</span>
          </label> */}
        </div>
        <div
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
            sx={{
              width: "100%",
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              console.log("Create");
            }}
          >
            Create
          </Button>
        </div>
      </BasicModal>
    </div>
  );
};
