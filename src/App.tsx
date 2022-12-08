// import "./App.css";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import SignupPage from "./pages/auth/SignUp";
import { LoginPage } from "./pages/auth/Login";

initializeApp(config.firebaseConfig);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignupPage />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
