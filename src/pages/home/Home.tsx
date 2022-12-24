import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { VideoCard } from "../../components/video-card/VIdeoCard";
import { VideoMenu } from "../../components/video-card/VideoMenu";
import { useEffect, useState } from "react";
import appConfigs from "../../config/appConfigs";
import { GetYoutubeDataAsJSON } from "../../services/GetAsJSON";
import { IVideosDto } from "../../dto/videos";
import { useAppDispatch, useAppSelector } from "../../store/reduxHook";
import { videosThunk } from "../../thunk/VideosThunk";
import { string } from "zod";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../App";
import { PlaylistsPage } from "../playlists";

export interface IVideoData {
  id: string;
  title: string;
  category: string;
  description: string;
  creator: string;
  uploadDate: string;
  viewCount: number;
  url: string;
}

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { videos } = useAppSelector((state) => state.videos);
  const auth = getAuth();
  const navigate = useNavigate();

  const docRef = doc(db, "User", "Liked");
  const docSnap = async () => {
    const res = await getDoc(docRef);
    console.log(res.data(), "res");
    return res.data();
  };
  console.log(docSnap());

  useEffect(() => {
    dispatch(videosThunk());
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <button
        onClick={() => {
          signOut(auth)
            .then(() => {})
            .catch((error) => {});
        }}
      >
        Logout
      </button>

      <button
        onClick={() => {
          navigate("/history");
        }}
      >
        Go to History
      </button>
      
      <PlaylistsPage />

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {videos.map((videoData) => {
          const editVideoData = {
            id: videoData.id,
            title: videoData.snippet.title,
            category: videoData.snippet.categoryId,
            description: videoData.snippet.description,
            creator: videoData.snippet.channelTitle,
            uploadDate: videoData.snippet.publishedAt,
            viewCount: 123,
            url: `https://youtu.be/${videoData.id}`,
          } as IVideoData;

          return (
            <div
              key={editVideoData.id}
              onClick={(e) => {
                navigate("/history");
              }}
            >
              <VideoCard video={editVideoData} apiVideoData={videoData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
