import {
    ClockLogo,
    HeartLogo,
    HomeLogo,
    PlaylistsLogo,
    UploadLogo,
    HistoryLogo,
} from "../../assets";

interface INavigationItem {
    id: number,
    path: string,
    title: string,
    iconSvg: string,
}


export const navigationLinks: INavigationItem[] = [
    {
        id: 1,
        path: "/",
        title: "Home",
        iconSvg: HomeLogo,
    },
    {
        id: 2,
        path: "/liked",
        title: "Liked",
        iconSvg: HeartLogo,
    },
    {
        id: 3,
        path: "/history",
        title: "History",
        iconSvg: HistoryLogo,
    },
    {
        id: 4,
        path: "/playlists",
        title: "Playlists",
        iconSvg: PlaylistsLogo,
    },
    {
        id: 5,
        path: "/watch-later",
        title: "Watch Later",
        iconSvg: ClockLogo,
    },
    {
        id: 6,
        path: "/upload",
        title: "Upload",
        iconSvg: UploadLogo,
    },
]