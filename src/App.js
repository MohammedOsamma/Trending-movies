import "./App.css";
import Navbar from "./Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import Tv from "./Tv";
import Movies from "./Movies";
import NotFound from "./NotFound";
import People from "./People";
import Login from "./Login";
import Signup from "./Signup";
import MovieDetils from "./MovieDetils";
import { useEffect, useState } from "react";
import TvDetils from "./TvDetils";

function App() {
  let navigate = useNavigate();
  let [isLogin, setIsLogin] = useState(null);
  const isLodaingHandler = () => {
    let userToken = localStorage.getItem("userToken");
    setIsLogin(userToken);
  };

  function logOut() {
    setIsLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      isLodaingHandler();
    }
  }, []);
  function ProtectRoute({ children }) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }

  return (
    <div>
      <Navbar isLogin={isLogin} logOut={logOut} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="home"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="movies"
            element={
              <ProtectRoute>
                <Movies />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path={"moviedetils"}
            element={
              <ProtectRoute>
                <MovieDetils />
              </ProtectRoute>
            }
          >
            <Route
              path={":id"}
              element={
                <ProtectRoute>
                  <MovieDetils />
                </ProtectRoute>
              }
            ></Route>
          </Route>
          <Route
            path="tv"
            element={
              <ProtectRoute>
                <Tv />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path={"tvdetils"}
            element={
              <ProtectRoute>
                <TvDetils />
              </ProtectRoute>
            }
          >
            <Route
              path={":id"}
              element={
                <ProtectRoute>
                  <TvDetils />
                </ProtectRoute>
              }
            ></Route>
          </Route>
          <Route
            path="people"
            element={
              <ProtectRoute>
                <People />
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="login"
            element={<Login isLodaingHandler={isLodaingHandler} />}
          ></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
