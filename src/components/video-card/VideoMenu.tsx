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
} from "@mui/material";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../App";
import { IVideoDto } from "../../dto/videos";
import { getAuth } from "firebase/auth";
import { BasicModal } from "../modal/Modal";
import { PlaylistMenuModal } from "./PlaylistMenu";
import { useAppDispatch } from "../../store/reduxHook";
import { playlistsThunk } from "../../thunk/playliststhunk";
import { useParams } from "react-router";

interface ICardMenuProps {
  videoDetails: IVideoDto;
  typeOfCard: string;
}

export const VideoMenu = (props: ICardMenuProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const container = useRef<HTMLUListElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();
  const { playlistid } = useParams();

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

  const deleteVideoFromPlaylist = async (videoId: string, ...arg: any[]) => {
    const videoDoc = doc(db, ...arg);
    const deleteData = await updateDoc(videoDoc, {
      [videoId]: deleteField(),
    });
    dispatch(playlistsThunk(user?.providerData[0].uid));
  };

  return (
    <div
      onClick={(e) => {
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
                  {props.typeOfCard === "playlist" && (
                    <MenuItem
                      onClick={(e) => {
                        deleteVideoFromPlaylist(
                          `${props.videoDetails.id}`,
                          "User",
                          `${user?.providerData[0].uid}`,
                          "playlists",
                          `${playlistid}`
                        );
                      }}
                    >
                      Remove from playlist
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <PlaylistMenuModal
        openPlaylistModal={openPlaylistModal}
        closePlaylistModal={closePlaylistModal}
        deleteVideoFromPlaylist={deleteVideoFromPlaylist}
        openModal={openModal}
        videoId={props.videoDetails.id}
      />
    </div>
  );
};
