import logo from "./logo.svg";
import Layout from "./components/Layout";

function App() {
  return (
    // <div>
    //   <div >
    //     <img src={logo} alt="logo" /> <span>Drivehub</span>
    //   </div>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-evenly",
    //     }}
    //   >
    //     <div>Car list</div>
    //     <div>Cart</div>
    //   </div>
    //   <div >FOOTER</div>
    // </div>
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
