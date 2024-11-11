import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
function App() {
  return (
    <div>
      <div>
        {/* add */}
        <div className="mt-5">
          <button className="rounded-lg bg-custom-teal p-3 text-base cursor-pointer hover:bg-hover-teal">
            Connect Wallet
          </button>
        </div>
        <div className="my-2 space-x-2">
          <span>Wallet Address:</span>
          <span className="font-semibold ">Not connected</span>
        </div>
        <div className="my-1 space-x-2">
          <span>Token Amount:</span>
          <span className="font-semibold">23 optimus</span>
        </div>
      </div>
      <div className="  my-5">
        <div className="swap-box">
          <div className="title">
            <div>SWAP</div>
            <div className="pro">PRO</div>
          </div>
          <hr className="border-t border-gray-500 w-full my-3" />
          <div className="checker">
            <h5>mark checker</h5>
            <h3>Swapped!</h3>
          </div>
          {/* swap pay*/}
          <div className="bg-[#3d3b3b] rounded-lg mt-3 -mb-3 p-4 w-full">
            <h4>You Pay</h4>
            <div>
              <input
                placeholder="0"
                className="bg-[#3d3b3b] py-2 text-lg my-1"
              />
            </div>
            <h4>50K 100k 250k 1M Max</h4>
          </div>

          <div className="swapicon">
            <SwapVerticalCircleIcon style={{ fontSize: "40px" }} />
          </div>
          {/* swap  receive*/}
          <div className="bg-[#3d3b3b] rounded-lg  -mt-3 mb-3 p-4 w-full">
            <h3>You Receive</h3>
            <h3 className="py-2 text-lg my-1">0</h3>
            <h3 className="text-end">LiQ: 68.68M</h3>
          </div>
          {/* swap button */}
          <div className="hidden">View transaction</div>
          <div className="space-x-2 my-2 font-serif">
            <span>
              <input type="checkbox" className="custom-teal" />
            </span>
            <span>Price Protection</span>
            <span>[?]</span>
          </div>
          <div className="w-full">
            <button className="bg-custom-teal hover:bg-hover-teal p-2 rounded-lg bg-[]  text-base w-1/2">
              Swap
            </button>
            {/*
             swapping, insufficient funds, done
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
