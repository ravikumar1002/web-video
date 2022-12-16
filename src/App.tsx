// import "./App.css";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import AuthRoute from "./components/AuthRoute";

import { LoginPage, SignupPage } from "./pages/auth";
import { HistoryPage } from "./pages/history";
import { UploadPage } from "./pages/upload";
import { LikedPage } from "./pages/liked";
import { WatchLaterPage } from "./pages/watch_later";
import { PlaylistsPage } from "./pages/playlists";

import { SideNavDrawer } from "./components/aside-nav/AsideBar";
import firebaseConfigs from "./config/firebase";

initializeApp(firebaseConfigs);

function App() {
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
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
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
      path: "/Playlists",
      element: (
        <AuthRoute>
          <SideNavDrawer>
            <PlaylistsPage />
          </SideNavDrawer>
        </AuthRoute>
      ),
    },
    {
      path: "/watch-later",
      element: (
        <AuthRoute>
          <SideNavDrawer>
            <WatchLaterPage />
          </SideNavDrawer>
        </AuthRoute>
      ),
    },
    {
      path: "/upload",
      element: (
        <AuthRoute>
          <SideNavDrawer>
            <UploadPage />
          </SideNavDrawer>
        </AuthRoute>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
