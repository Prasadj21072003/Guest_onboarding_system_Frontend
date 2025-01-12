import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router";
import "./App.css";
import Mainadmin from "./Pages/Mainadmin";
import Guestadmin from "./Pages/Guestadmin";
import Guestform from "./Pages/Guestform";
import Edithotelform from "./Pages/Edithotelform";
import Editguestform from "./Pages/Editguestform";
import Thankyou from "./Pages/Thankyou";
import Infolist from "./Pages/Infolist";
import Usezustand from "./components/Usezustand";
import Login from "./Pages/Login";
import Guestpanellogin from "./Pages/Guestpanellogin";
import { Conditionalnav } from "./components/Conditionalnav";
import { useEffect } from "react";

function App() {
  const { user, setuser, guestlogin, setguestlogin } = Usezustand();
  useEffect(() => {
    const userdata = window.localStorage.getItem("user");
    const guestdata = window.localStorage.getItem("guestlogin");
    console.log(typeof userdata);
    console.log(typeof guestdata);

    if (typeof userdata === "string" && Object.keys(userdata).length > 0) {
      setuser(JSON.parse(userdata));
    }
    if (typeof guestdata === "string" && Object.keys(guestdata).length > 0) {
      setguestlogin(JSON.parse(guestdata));
    }
  }, []);

  return (
    <Router>
      <Conditionalnav>
        <Routes>
          <Route
            path="/"
            element={!user?.hasOwnProperty("email") ? <Login /> : <Mainadmin />}
          />
          <Route path="/login" element={<Login />} />

          <Route
            path="/edithotelform/:id"
            element={
              !user?.hasOwnProperty("email") ? <Login /> : <Edithotelform />
            }
          />
          <Route
            path="/editguestinfo/:id"
            element={
              !guestlogin?.hasOwnProperty("email") ? (
                <Guestpanellogin />
              ) : (
                <Editguestform />
              )
            }
          />
          <Route
            path="/guestadmin/:id"
            element={
              !guestlogin?.hasOwnProperty("email") ? (
                <Guestpanellogin />
              ) : (
                <Guestadmin />
              )
            }
          />
          <Route path="/guestform/:id" element={<Guestform />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route
            path="/infolist/:id"
            element={
              !guestlogin?.hasOwnProperty("email") ? (
                <Guestpanellogin />
              ) : (
                <Infolist />
              )
            }
          />
        </Routes>
      </Conditionalnav>
    </Router>
  );
}

export default App;
