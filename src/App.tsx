import logo from "./logo.svg";

import "./App.css";

function App() {
  return (
    <div>
      <div className="app-header">
        <img src={logo} alt="logo" /> <span>Drivehub</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div>Car list</div>
        <div>Cart</div>
      </div>
      <div className="app-footer">FOOTER</div>
    </div>
  );
}

export default App;
