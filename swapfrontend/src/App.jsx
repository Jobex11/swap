function App() {
  return (
    <div>
      <div>
        {/* add*/}
        <div className="mt-5">
          <button className="rounded-lg bg-custom-teal p-3 text-lg cursor-pointer hover:bg-hover-teal">
            Connect Wallet
          </button>
        </div>
        <div className="my-1">
          <span>Wallet Addr:</span>
          <span>abs...</span>
        </div>
        <div className="my-1">
          <span>Swap token Amount:</span>
          <span>23 optimus</span>
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
          <div className="bg-[#3d3b3b] rounded-lg my-3 p-4 w-full">
            <h4>You Pay</h4>
            <div>
              <input
                placeholder="0"
                className="bg-[#3d3b3b] py-2 text-lg my-1"
              />
            </div>
            <h4>50K 100k 250k 1M Max</h4>
          </div>
          {/* swap  receive*/}
          <div className="bg-[#3d3b3b] rounded-lg my-3 p-4 w-full">
            <h3>you receives</h3>
            <h3 className="py-2 text-lg my-1">0</h3>
            <h3 className="text-end">LiQ: 68.68M</h3>
          </div>
          {/* swap button */}
          <div>View transaction</div>
          <div>
            Price Protection <span>[span]</span>
          </div>
          <div className="swap">
            <button>Swap, swapping, insufficient funds, done</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
