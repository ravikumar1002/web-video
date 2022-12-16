import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { VideoCard } from "../../components/video-card/VIdeoCard";
import { VideoMenu } from "../../components/video-card/VideoMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import appConfigs from "../../config/appConfigs";
import { GetYoutubeDataAsJSON } from "../../services/GetAsJSON";
import { IVideosDto } from "../../dto/videos";

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
  _id: string;
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
  const videosFromServerr = async () =>
    GetYoutubeDataAsJSON<IVideosDto>("/videos", {
      params: {
        part: "snippet",
        contentDetails: "statistics",
        chart: "mostPopular",
        maxResults: 20,
      },
    });
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    videosFromServerr();
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
        {videoData1.map((video) => {
          return (
            <div
              key={video._id}
              onClick={(e) => {
                navigate("/history");
              }}
            >
              <VideoCard video={video} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
