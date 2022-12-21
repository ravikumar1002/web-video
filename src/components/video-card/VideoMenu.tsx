import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../App";
import { IVideosDto } from "../../dto/videos";
import { getAuth } from "firebase/auth";
interface ICardMenuProps {
  videoDetails: IVideosDto;
}

export const VideoMenu = (props: ICardMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const container = React.useRef<HTMLUListElement | null>(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleClickOutside = (e: Event | React.SyntheticEvent) => {
    if (
      container?.current &&
      !container?.current?.contains(e.target as HTMLElement)
    ) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, [open]);

  const addDataInFirebase = async (storageValue: object, ...args: any) => {
    console.log(user?.providerData[0].uid);
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
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        sx={{
          zIndex: "10",
        }}
        onClick={(e) => {}}
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
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
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
                      handleClose(e);
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
                        "watch later"
                      );
                      handleClose(e);
                    }}
                  >
                    save to watch later
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      addDataInFirebase(props.videoDetails, "Liked");
                      handleClose(e);
                    }}
                  >
                    Add to Playlist
                  </MenuItem>
                  <p>asdf</p>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
