import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { VideoCard } from "../../components/video-card/VIdeoCard";

export const videoData = [
  {
    _id: "yQEondeGvKo",
    title: "STRANGER THINGS Season 4",
    category: "Trailer",
    description: "STRANGER THINGS Season 4 Trailer (NEW, 2022)",
    creator: "Netflix",
    uploadDate: "12-04-2022",
    viewCount: 0,
    url: "https://youtu.be/yQEondeGvKo",
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
];

export const HomePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

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
        {" "}
        Go to History
      </button>

      <div style={{display: "flex", gap: "2rem",}}>
        {videoData.map((video) => {
          console.log(video)
          return(
            <VideoCard key={video._id} video={video}/>
          )
        })}
      </div>
    </div>
  );
};
