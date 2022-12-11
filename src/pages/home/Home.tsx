import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

      <button onClick={() => {
        navigate("/history")
      }}>  Go to History</button>
    </div>
  );
};
