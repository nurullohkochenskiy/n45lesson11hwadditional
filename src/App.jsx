import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Main from "./pages/Dashboard/Main";
import RequireAuth from "./components/RequireAuth";
import Profile from "./pages/Profile";
import Students from "./pages/Dashboard/Students";
import Teachers from "./pages/Dashboard/Teachers";
const App = () => {
  return (
    <>
      <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/students"
            element={
              <RequireAuth>
                <Students />
              </RequireAuth>
            }
          />
          <Route
            path="/teachers"
            element={
              <RequireAuth>
                <Teachers />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
