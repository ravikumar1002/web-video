import { Link } from "react-router-dom";
import { VideoCard } from "../../components/video-card/VIdeoCard";

interface SinglePlaylistPage {

}
export const SinglePlayListPage = (props: SinglePlaylistPage) => {
  return (
    <div>
      <Link to="/playlists/12345">
        <div
        //   key={editVideoData.id}
        //   onClick={(e) => {
        //     navigate("/history");
        //   }}
        >
          {/* <VideoCard video={editVideoData} apiVideoData={videoData} /> */}
          <p>Video Card</p>
        </div>
      </Link>
    </div>
  );
};
