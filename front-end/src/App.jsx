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
import BecomePro from "./components/become_pro/BecomePro";

import Perfil from "./components/menuEditPerfil/Perfil/Perfil";
import Senha from "./components/menuEditPerfil/Senha/Senha";
import Interesses from "./components/menuEditPerfil/Interesses/Interesses.jsx";
import Formacoes from "./components/menuEditPerfil/Formacoes/Formacoes.jsx";
import Cursos from "./components/menuEditPerfil/Cursos/Cursos.jsx";
import Experiencias from "./components/menuEditPerfil/Experiencias/Experiencias.jsx";
import EditarPerfil from "./components/menuEditPerfil/editarPerfil"; 
import Upload from "./pages/Upload";

import Modal from 'react-modal';
Modal.setAppElement("#root");

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [session, setSession] = useState({ loggedIn: false, account: {} });

  useEffect(() => {
    fetch(`${config.api}${config.endpoints.session}`, { method: "POST", credentials: "include" })
      .then(response => response.json())
      .then(data => setSession(data));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Header session={session} setLoginOpen={setLoginOpen} />
        <CenterArea>
          {!session.loggedIn && <Login open={isLoginOpen} setOpen={setLoginOpen}></Login>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={session.loggedIn ? <Upload /> : <Navigate to="/" />} />
            <Route path="/register" element={session.loggedIn ? <Navigate to="/" /> : <Register />} />
            {/*POR ENQUANTO A LÓGICA DE SESSÃO ESTÁ INVERTIDA POIS NÃO QUERO FICAR LOGANDO PARA VER PROFILE USER*/}
            <Route path="/profile" element={<ProfileUser/>}></Route>
            <Route path="/edit-profile/*" element={<EditarPerfil />}></Route>
              <Route path="/edit-profile/perfil" element={<Perfil />} />
              <Route path="/edit-profile/senha" element={<Senha />} />
              <Route path="/edit-profile/interesses" element={<Interesses />} />
              <Route path="/edit-profile/formacoes" element={<Formacoes />} />
              <Route path="/edit-profile/cursos" element={<Cursos />} />
              <Route path="/edit-profile/experiencias" element={<Experiencias />} />
            <Route path="/become-pro" element={<BecomePro />}></Route>
          </Routes>
        </CenterArea>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
