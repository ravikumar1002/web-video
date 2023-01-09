import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../../store/reduxHook";
import { getAuth } from "firebase/auth";
import { historyThunk } from "../../thunk/historyThunk";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { likedThunk } from "../../thunk/likedThunk";

interface IVideoCardImageProps {
  imgHeight: number;
  imgAlt: string;
  imgId: string;
  typeOfCard: string;
}

export const VideoCardImage = (props: IVideoCardImageProps) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();

  const deleteVideoFromHistory = async (videoId: string, ...arg: any[]) => {
    const videoDoc = doc(db, ...arg);
    const deleteData = await updateDoc(videoDoc, {
      [videoId]: deleteField(),
    });
    dispatch(historyThunk(user?.providerData[0].uid));
  };

  const deleteVideoFromLiked = async (videoId: string, ...arg: any[]) => {
    const videoDoc = doc(db, ...arg);
    const deleteData = await updateDoc(videoDoc, {
      [videoId]: deleteField(),
    });
    dispatch(likedThunk(user?.providerData[0].uid));
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {props.typeOfCard === "liked" && (
        <Box
          sx={{
            borderRadius: "50%",
            top: "2%",
            position: "absolute",
            color: "black",
            background: "#f0f0f0cc",
            right: "1%",
            "&:hover": {
              background: "#efefef",
            },
          }}
        >
          <Tooltip title="Delete">
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                deleteVideoFromLiked(
                  `${props.imgId}`,
                  "User",
                  `${user?.providerData[0].uid}`,
                  "liked",
                  "liked"
                );
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {props.typeOfCard === "history" && (
        <Box
          sx={{
            borderRadius: "50%",
            top: "2%",
            position: "absolute",
            color: "black",
            background: "#f0f0f0cc",
            right: "1%",
            "&:hover": {
              background: "#efefef",
            },
          }}
        >
          <Tooltip title="Delete">
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                deleteVideoFromHistory(
                  `${props.imgId}`,
                  "User",
                  `${user?.providerData[0].uid}`,
                  "history",
                  "history"
                );
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <CardMedia
        component="img"
        height={props.imgHeight}
        image={`https://i.ytimg.com/vi/${props.imgId}/maxresdefault.jpg`}
        alt={props.imgAlt}
        title={props.imgAlt}
      />
    </div>
  );
};
