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
import ProfileUser from "./pages/ProfileUser";
import UploadDetails from "./pages/UploadDetails";


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
            <Route path="/register" element={session.loggedIn ? <Navigate to="/" /> : <Register />} />
            {/*POR ENQUANTO A LÓGICA DE SESSÃO ESTÁ INVERTIDA POIS NÃO QUERO FICAR LOGANDO PARA VER PROFILE USER*/}
            <Route path="/profile-user" element={<ProfileUser/>}></Route>
            <Route path="/upload-details" element={<UploadDetails/>}></Route>
          </Routes>
        </CenterArea>
        <Footer />
      </div>
    </BrowserRouter>
  );
}