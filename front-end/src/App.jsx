import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/header/Header";
import CenterArea from "./components/center_area/CenterArea";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useEffect, useState } from "react";
import { config } from './config'
import ProfileUser from "./pages/ProfileUser";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import Modal from 'react-modal';

Modal.setAppElement("#root");

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [session, setSession] = useState(null); // Inicialize com null

  useEffect(() => {
    fetch(`${config.api}${config.endpoints.session}`, { method: "POST", credentials: "include" })
      .then(response => response.json())
      .then(data => {
        setSession(data);
      });
  }, []);

  // Renderize o componente apenas quando session não for null
  if (session === null) {
    return null; 
  }

  return (
    <BrowserRouter>
      <>
        <Header session={session} setLoginOpen={setLoginOpen} />
        <CenterArea>
          {!session.loggedIn && <Login open={isLoginOpen} setOpen={setLoginOpen}></Login>}
          <Routes>
            {/* {FAZER VALIDAÇÕES PARA RENDERIZAR AS PÁGINAS DE ACORDO COM SUA PERMISSÃO DE SESSÃO} */}
            <Route path="/" element={<Home session={session} />} />
            <Route path="/upload" element={session.loggedIn ? <Upload /> : <Navigate to="/" />} />
            <Route path="/register" element={session.loggedIn ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/profile" element={session.loggedIn ? <ProfileUser session={session} /> : <Navigate to="/" />}></Route>
            <Route path="/edit-profile" element={session.loggedIn ? <EditProfile /> : <Navigate to="/" />}></Route>
            <Route path="/dashboard" element={session.loggedIn ? <Dashboard session={session}></Dashboard> : <Navigate to="/" />}></Route>
          </Routes>
        </CenterArea>
        <Footer />
      </>
    </BrowserRouter>
  );
}
