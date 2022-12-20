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

export const videoData1 = [
  {
    _id: "NO_ZdJjMtdI",
    title: "STRANGER THINGS Season 4",
    category: "Trailer",
    description: "STRANGER THINGS Season 4 Trailer (NEW, 2022)",
    creator: "Netflix",
    uploadDate: "12-04-2022",
    viewCount: 0,
    url: "https://youtu.be/NO_ZdJjMtdI",
  },
  {
    _id: "-FrqlHlUgz4",
    title: "Dasvi ",
    category: "Trailer",
    description:
      "From counting votes to counting the days left for his 10th grade exams. Will Gangaram pass with flying colours?",
    creator: "Netflix India",
    uploadDate: "23-03-2022",
    viewCount: 0,
    url: "https://youtu.be/-FrqlHlUgz4",
  },
  {
    _id: "IU2ttJ73h2Y",
    title: "Lift Karadey - Adnan Sami",
    category: "Song",
    description:
      "Presenting ‘Lift Karade’ music video sung & composed by Adnan Sami.",
    creator: "SonyMusicIndiaVEVO",
    uploadDate: "19-03-2022",
    viewCount: 0,
    url: "https://youtu.be/IU2ttJ73h2Y",
  },
  {
    _id: "IU2ttJ73h2Y2",
    title: "Lift Karadey - Adnan Sami",
    category: "Song",
    description:
      "Presenting ‘Lift Karade’ music video sung & composed by Adnan Sami.",
    creator: "SonyMusicIndiaVEVO",
    uploadDate: "19-03-2022",
    viewCount: 0,
    url: "https://youtu.be/IU2ttJ73h2Y",
  },
  {
    _id: "IU2ttJ73h2Y3",
    title: "Lift Karadey - Adnan Sami",
    category: "Song",
    description:
      "Presenting ‘Lift Karade’ music video sung & composed by Adnan Sami.",
    creator: "SonyMusicIndiaVEVO",
    uploadDate: "19-03-2022",
    viewCount: 0,
    url: "https://youtu.be/IU2ttJ73h2Y",
  },
];

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
  const [videoData2, setVideoData] = useState<IVideoData[] | undefined>([]);
  const dispatch = useAppDispatch();
  const { videos } = useAppSelector((state) => state.videos);
  const auth = getAuth();
  const navigate = useNavigate();
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
          };
          console.log(videoData, "videoData", editVideoData);
          return (
            <div
              key={editVideoData.id}
              onClick={(e) => {
                navigate("/history");
              }}
            >
              <VideoCard video={editVideoData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
