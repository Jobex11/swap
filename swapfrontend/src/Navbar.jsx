// Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InfoIcon from "@mui/icons-material/Info";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
const Navbar = () => {
  const location = useLocation();

  // Determine if a route is active based on the current path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-row md:flex-col justify-center p-2 md:p-4 w-full md:w-fit bg-[#242424] text-white shadow-lg shadow-black rounded-xl">
      <div className="flex md:flex-col items-center w-full md:w-fit justify-between md:justify-center rounded-xl">
        <Link to="/" className="relative group">
          <div
            className={`rounded-xl my-1 p-3  ${
              isActive("/") ? "bg-custom-teal" : "bg-[#3d3b3b]"
            }`}
          >
            <HomeIcon style={{ fontSize: "40px" }} />
            <div className="md:hidden">Home</div>
          </div>
          <span className="hidden md:block absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </span>
        </Link>

        <Link to="/addliq" className="relative group">
          <div
            className={`rounded-xl my-1 p-3 ${
              isActive("/addliq") ? "bg-custom-teal" : "bg-[#3d3b3b]"
            }`}
          >
            <LocalAtmIcon style={{ fontSize: "40px" }} />
            <div className="md:hidden">Liquidity</div>
          </div>
          <span className="hidden md:block absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Add Liquidity
          </span>
        </Link>

        <Link to="/transaction" className="relative group">
          <div
            className={`rounded-xl my-1 p-3 ${
              isActive("/transaction") ? "bg-custom-teal" : "bg-[#3d3b3b]"
            }`}
          >
            <ReceiptLongIcon style={{ fontSize: "40px" }} />
            <div className="md:hidden">Transaction</div>
          </div>
          <span className="hidden md:block absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Transaction History
          </span>
        </Link>

        <Link to="/learn" className="relative group">
          <div
            className={`rounded-xl my-1 p-3 ${
              isActive("/learn") ? "bg-custom-teal" : "bg-[#3d3b3b]"
            }`}
          >
            <InfoIcon style={{ fontSize: "40px" }} />
            <div className="md:hidden text-sm">About-us</div>
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

/*
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InfoIcon from "@mui/icons-material/Info";

const Navbar = () => {
  return (
    <div className="flex flex-col justify-center p-4 w-fit bg-[#242424] text-white shadow-lg shadow-black rounded-xl">
      <div className="flex flex-col items-center w-fit justify-center rounded-xl">
        <Link to="/" className="relative group">
          <div className="bg-[#3d3b3b] rounded-full my-1 p-3">
            <HomeIcon style={{ fontSize: "40px" }} />
          </div>
          <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </span>
        </Link>

        <Link to="/transaction" className="relative group">
          <div className="p-3 bg-[#3d3b3b] rounded-full my-1">
            <ReceiptLongIcon style={{ fontSize: "40px" }} />
          </div>
          <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Transaction History
          </span>
        </Link>

        <Link to="/profile" className="relative group">
          <div className="bg-[#3d3b3b] rounded-full my-1 p-3">
            <AccountCircleIcon style={{ fontSize: "40px" }} />
          </div>
          <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Profile
          </span>
        </Link>

        <Link to="/learn" className="relative group">
          <div className="bg-[#3d3b3b] rounded-full my-1 p-3">
            <InfoIcon style={{ fontSize: "40px" }} />
          </div>
          <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-base px-2 py-1 rounded-md  opacity-0 group-hover:opacity-100 transition-opacity">
            About Us
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

*/
