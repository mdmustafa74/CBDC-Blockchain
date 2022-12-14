import SideNav from "./components/SideNavigation/SideNav";
import Dashboard from "./components/Pages/Dashboard";
import AccountDetails from "./components/Pages/AccountDetails";
import Payment from "./components/Pages/Payment";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SelfService from "./components/Pages/SelfService";
import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState(
    localStorage.getItem("title") || undefined
  );
  useEffect(() => {
    localStorage.clear();
    setTitle("Dashboard");
  }, []);
  function handleClick(data) {
    if (data) {
      setTitle(data);
      localStorage.setItem("title", data);
    }
  }
  return (
    <>
      <div className="app">
        <Router>
          <div className="row">
            <div className="col col-md-2">
              <SideNav getData={handleClick} />
            </div>
            <div className="col col-md-9">
              <div className="p-2 bg-info mt-1 mb-2 top-header text-center text-white">
                {title}
              </div>
              <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route
                  path="/accountDetails"
                  element={<AccountDetails />}
                ></Route>
                <Route path="/payment" element={<Payment />}></Route>
                <Route path="/selfservice" element={<SelfService />}></Route>
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  );
}
export default App;
