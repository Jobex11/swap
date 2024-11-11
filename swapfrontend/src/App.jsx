function App() {
  return (
    <>
      <div>
        <div className="content-box">
          <div className="swap-box">
            <div className="title">
              <div>SWAP</div>
              <div className="pro">PRO</div>
            </div>
            <div className="checker">
              <h3>mark checker</h3>
              <h3>Swapped!</h3>
            </div>
            {/* swap pay*/}
            <div className="pay">
              <h3>you pay</h3>
              <input></input>
              <div>image here</div>
            </div>
            {/* swap  receive*/}
            <div className="receive">
              <h3>you receives</h3>
              <h3>0.069451</h3>

              <div>image here</div>
            </div>
            {/* swap button */}
            <div>View transaction</div>
            <div className="swap">
              <button>Swap, swapping, insufficient funds, done</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
