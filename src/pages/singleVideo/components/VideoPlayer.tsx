import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import ReactPlayer from "react-player/youtube";
import { db } from "../../../App";
import { useAppDispatch } from "../../../store/reduxHook";
import { historyThunk } from "../../../thunk/historyThunk";

interface IVideoPlayerProps {
  videoId: string;
}

export const VideoPlayer = (props: IVideoPlayerProps) => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const addVideoInHistory = async (data: string, ...args: any) => {
    try {
      const docRef = await setDoc(doc(db, ...args), {
        [data]: data,
      });
      console.log(docRef);
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
              props.videoId
            );
            return () => AuthCheck();
          });
        }}
      />
    </>
  );
};
