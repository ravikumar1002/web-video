import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import ReactPlayer from "react-player/youtube";
import { db } from "../../../App";
import { useAppDispatch, useAppSelector } from "../../../store/reduxHook";
import { historyThunk } from "../../../thunk/historyThunk";

interface IVideoPlayerProps {
  videoId: string;
}

export const VideoPlayer = (props: IVideoPlayerProps) => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const { history } = useAppSelector((state) => state.userData);

  const addVideoInHistory = async (data: string, ...args: any) => {
    try {
      if (history.length > 0) {
        // @ts-ignore
        const docRef = await updateDoc(doc(db, ...args), {
          [data]: data,
        });
      } else {
        // @ts-ignore
        const setHistoryPath = setDoc(doc(db, ...args), { [data]: data });
      }
      dispatch(historyThunk(user?.providerData[0].uid));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${props.videoId}`}
        controls
        width="100%"
        height="35rem"
        playing={true}
        onStart={() => {
          const AuthCheck = onAuthStateChanged(auth, (user) => {
            addVideoInHistory(
              props.videoId,
              "User",
              `${user?.providerData[0].uid}`,
              "history",
              "history"
            );
            return () => AuthCheck();
          });
        }}
      />
    </>
  );
};
