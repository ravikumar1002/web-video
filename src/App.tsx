// import "./App.css";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import SignupPage from "./pages/auth/SignUp";
import { LoginPage } from "./pages/auth/Login";
import AuthRoute from "./components/AuthRoute";
import { HistoryPage } from "./pages/history/History";
import { MiniDrawer } from "./components/AsideBar";

initializeApp(config.firebaseConfig);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MiniDrawer>
          <HomePage />
        </MiniDrawer>
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
          <HistoryPage />
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
