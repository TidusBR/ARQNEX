import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/header/Header";
import CenterArea from "./components/center_area/CenterArea";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import {config} from './config'


export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [session, setSession] = useState({loggedIn: false, account:{}});

  useEffect(() => {
    fetch(`${config.api}${config.endpoints.session}`, { method: "POST", credentials: "include"})
    .then(response => response.json())
    .then(data => setSession(data));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Header session={session} setLoginOpen={setLoginOpen} />
        <CenterArea>
          { !session.loggedIn && <Login open={isLoginOpen} setOpen={setLoginOpen}></Login> }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={session.loggedIn ? <Navigate to="/" />: <Register />} />
          </Routes>
        </CenterArea>
        <Footer />
      </div>
    </BrowserRouter>
  );
}