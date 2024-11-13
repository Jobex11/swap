// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addliq from "./Addliq";
import Navbar from "./Navbar";
import Learn from "./Learn";
import Transaction from "./Transaction";
import Home from "./Home";
import Tokens from "./Tokens";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <Router>
      <div className=" flex flex-col-reverse md:flex-row w-full  overflow-hidden md:h-[100vh]">
        <div className=" flex flex-col items-center justify-center border-t border-gray-600 w-full md:w-2/12 py-4 px-5  md:p-5 h-full">
          <ThemeProvider theme={theme}>
            <Navbar />
          </ThemeProvider>
        </div>
        <div className="  w-full md:w-10/12 p-2 flex flex-col  items-center  md:overflow-y-scroll h-auto md:overflow-x-hidden">
          <Routes>
            <Route path="/addliq" element={<Addliq />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/" element={<Home />} />
            <Route path="/tokens" element={<Tokens />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
