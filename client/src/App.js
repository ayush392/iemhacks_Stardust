import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
import "./mycss.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Navbar from "./components/Navbar";
import EditProfile from "./pages/EditProfile";
import UserProfile from "./pages/UserProfile";
import SearchPage from "./pages/SearchPage";
import Pending from "./pages/Pending";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="min-h-[100vh] bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <Navbar />
                  <Home />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/search/:query"
            element={
              <>
                <Navbar />
                <SearchPage />
              </>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <>
                <Navbar />
                <EditProfile />
              </>
            }
          />
          <Route path="/user/:id/pending" element={<Pending />} />
          <Route
            path="/user/:id"
            element={
              <>
                <Navbar />
                <UserProfile />
              </>
            }
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
