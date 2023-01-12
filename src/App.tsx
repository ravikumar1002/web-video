import "./App.css";
import { initializeApp } from "firebase/app";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import AuthRoute from "./components/AuthRoute";
import { LoginPage, SignupPage } from "./pages/auth";
import { HistoryPage } from "./pages/history";
import { LikedPage } from "./pages/liked";
import { WatchLaterPage } from "./pages/watch_later";
import { PlaylistsPage } from "./pages/playlists";
import { Firestore, getFirestore } from "firebase/firestore";
import { SideNavDrawer } from "./components/aside-nav/AsideBar";
import firebaseConfigs from "./config/firebase";
import { VideoPlayPage } from "./pages/singleVideo/VideoPlayPage";
import { SinglePlayListPage } from "./pages/playlists/SinglePlaylistPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { playlistsThunk } from "./thunk/playliststhunk";
import { useAppDispatch, useAppSelector } from "./store/reduxHook";
import { historyThunk } from "./thunk/historyThunk";
import { addUserData } from "./pages/auth/authSlice";
import { BasicModal } from "./components/modal/Modal";
import { LoadingImage } from "./assets";
import { Box } from "@mui/system";
import { likedThunk } from "./thunk/likedThunk";
import { watchlaterThunk } from "./thunk/watchlaterThunk";
import { ThemeProvider } from "@mui/material";
import baseTheme from "./config/theme";

const app = initializeApp(firebaseConfigs);

export const db = getFirestore(app);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <SideNavDrawer>
          <HomePage />
        </SideNavDrawer>
      ),
    },
    {
      path: "/",
      element: (
        <SideNavDrawer>
          <HomePage />
        </SideNavDrawer>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/:videoid",
      element: (
        <SideNavDrawer>
          <VideoPlayPage />
        </SideNavDrawer>
      ),
    },
    {
      path: "/history",
      element: (
        <AuthRoute>
          <SideNavDrawer>
            <HistoryPage />
          </SideNavDrawer>
        </AuthRoute>
      ),
    },
    {
      path: "/liked",
      element: (
        <AuthRoute>
          <SideNavDrawer>
            <LikedPage />
          </SideNavDrawer>
        </AuthRoute>
      ),
    },
    {
      path: "/playlists",
      element: (
        <AuthRoute>
          <SideNavDrawer>
            <PlaylistsPage />
          </SideNavDrawer>
        </AuthRoute>
      ),
    },
    {
      path: "/playlists/:playlistid",
      element: (
        <AuthRoute>
          <SideNavDrawer>
            <SinglePlayListPage />
          </SideNavDrawer>
        </AuthRoute>
      ),
    },
    {
      path: "/watchlater",
      element: (
        <AuthRoute>
          <SideNavDrawer>
            <WatchLaterPage />
          </SideNavDrawer>
        </AuthRoute>
      ),
    },
  ]);
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const { authStatus } = useAppSelector((state) => state.user);
  const [openModal, setOpenModal] = useState<boolean>(true);

  const openPlaylistModal = () => setOpenModal(true);
  const closePlaylistModal = () => setOpenModal(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUserData(user?.providerData[0]));
        dispatch(playlistsThunk(user?.providerData[0].uid));
        dispatch(historyThunk(user?.providerData[0].uid));
        dispatch(likedThunk(user?.providerData[0].uid));
        dispatch(watchlaterThunk(user?.providerData[0].uid));
      }
    });
    return () => AuthCheck();
  }, [auth]);

  return (
    <ThemeProvider theme={baseTheme}>
      <div className={`App ${authStatus === "pending" && "pos-rel"}`}>
        <RouterProvider router={router} />
        {authStatus === "pending" && (
          <div
            style={{
              margin: "auto",
              background: "#d3d3d333",
              position: "fixed",
              height: "100%",
              width: "100%",
              zIndex: "1400",
              top: " 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{}}>
              <img
                src={LoadingImage}
                alt="loading logo"
                style={{ height: "8rem" }}
              />
            </Box>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
