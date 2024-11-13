// Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InfoIcon from "@mui/icons-material/Info";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const location = useLocation();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  // Determine if a route is active based on the current path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-row  md:flex-col justify-center p-2 md:p-4 w-full md:w-fit bg-[#242424] text-white shadow-lg shadow-black rounded-xl">
      <div className="flex xs:space-x-0 space-x-1s md:flex-col items-center w-full md:w-fit justify-between md:justify-center rounded-xl">
        <Link to="/" className="relative group">
          <div
            className={`rounded-xl my-1 p-3 xs:w-fit w-1/4 xs:block flex flex-col justify-center items-center  ${
              isActive("/") ? "bg-custom-teal" : "bg-[#3d3b3b]"
            }`}
          >
            <HomeIcon style={{ fontSize: isSmallScreen ? "30px" : "40px" }} />
            <div className="md:hidden xs:text-base text-xs">Home</div>
          </div>
          <span className="hidden md:block absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </span>
        </Link>

        <Link to="/addliq" className="relative group">
          <div
            className={`rounded-xl my-1 p-3 xs:w-fit w-1/4 xs:block flex flex-col justify-center items-center ${
              isActive("/addliq") ? "bg-custom-teal" : "bg-[#3d3b3b]"
            }`}
          >
            <LocalAtmIcon
              style={{ fontSize: isSmallScreen ? "30px" : "40px" }}
            />
            <div className="md:hidden xs:text-base text-xs ">Liquidity</div>
          </div>
          <span className="hidden md:block absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Add Liquidity
          </span>
        </Link>

        <Link to="/transaction" className="relative group">
          <div
            className={`rounded-xl my-1 p-3 xs:w-fit w-1/4  xs:block flex flex-col justify-center items-center ${
              isActive("/transaction") ? "bg-custom-teal" : "bg-[#3d3b3b]"
            }`}
          >
            <ReceiptLongIcon
              style={{ fontSize: isSmallScreen ? "30px" : "40px" }}
            />
            <div className="md:hidden xs:text-base text-xs">Records</div>
          </div>
          <span className="hidden md:block absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Transaction History
          </span>
        </Link>

        <Link to="/learn" className="relative group">
          <div
            className={`rounded-xl my-1 p-3 xs:w-fit w-1/4 xs:block flex flex-col justify-center items-center ${
              isActive("/learn") ? "bg-custom-teal" : "bg-[#3d3b3b]"
            }`}
          >
            <InfoIcon style={{ fontSize: isSmallScreen ? "30px" : "40px" }} />
            <div className="md:hidden xs:text-base text-xs">About</div>
          </div>
          <span className="hidden md:block absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            About Us
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
