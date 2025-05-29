import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../Public";

const Header = () => {
  return (
    <div className="grid grid-cols-12 fixed left-0 right-0">
      <div className="col-span-2 flex items-center justify-center font-bold text-white bg-secondary1 ">
        <Link to={"/"}>F3-HUTECH</Link>
      </div>
      <div className="col-span-10">
        <Navigation isAdmin={true} />
      </div>
    </div>
  );
};

export default Header;
