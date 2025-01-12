import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Usezustand from "./Usezustand";
import Nav from "./Nav";

export const Conditionalnav = ({ children }) => {
  const { user, guestlogin } = Usezustand();
  const location = useLocation();
  const [navon, setnavon] = useState(true);

  /* Conditionally render Nav based on the current path */
  useEffect(() => {
    if (location.pathname.includes("guestadmin")) {
      if (guestlogin.hasOwnProperty("email")) {
        setnavon(true);
      } else {
        setnavon(false);
      }
    } else {
      if (
        location.pathname.includes("thankyou") === false &&
        location.pathname.includes("guestform") === false &&
        location.pathname.includes("infolist") === false &&
        user.hasOwnProperty("email")
      ) {
        setnavon(true);
      } else {
        setnavon(false);
      }
    }
  }, [location, user]);

  return (
    <>
      {navon && (
        <div className="mb-[2rem]">
          <Nav />
        </div>
      )}
      {children}
    </>
  );
};
