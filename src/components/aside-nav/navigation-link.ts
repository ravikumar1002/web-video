
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { SvgIconProps } from "@mui/material";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import HistoryIcon from '@mui/icons-material/History';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

interface INavigationItem {
    id: number,
    path: string,
    title: string,
    icon: (props: SvgIconProps) => JSX.Element,
    activeIcon: (props: SvgIconProps) => JSX.Element,
}


export const navigationLinks: INavigationItem[] = [
    {
        id: 1,
        path: "/",
        title: "Home",
        icon: HomeOutlinedIcon,
        activeIcon: HomeIcon,
    },
    {
        id: 2,
        path: "/liked",
        title: "Liked",
        icon: FavoriteBorderOutlinedIcon,
        activeIcon: FavoriteIcon,
    },
    {
        id: 3,
        path: "/history",
        title: "History",
        icon: HistoryOutlinedIcon,
        activeIcon: HistoryIcon,
    },
    {
        id: 4,
        path: "/playlists",
        title: "Playlists",
        icon: PlaylistPlayOutlinedIcon,
        activeIcon: PlaylistPlayIcon,
    },
    {
        id: 5,
        path: "/watchlater",
        title: "Watch Later",
        icon: WatchLaterOutlinedIcon,
        activeIcon: WatchLaterIcon,
    },
]