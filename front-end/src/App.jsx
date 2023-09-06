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

//É SÓ VOCÊ PEGAR O OJBETO SESSION E PASSAR PARA OS OUTROS COMPONENTES COMO PROPRIEDADE, POR EXEMPLO
//O PERFIL DO USUÁRIO, PRECISA SABER SE O USUÁRIO ESTÁ LOGADO, ENTÃO BASTA PASSAR SESSION COMO UMA PROPRIEDADE PARA O COMPONENTE "ProfileUser", ler linha 49.
export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [session, setSession] = useState({ loggedIn: false, account: {} });

//TODA VEZ QUE O COMPONENTE FOR RENDERIZADO DE NOVO, O CALLBACK VAI SER CHAMADO.  
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
              <Route path="perfil" element={<Perfil />} />
              <Route path="senha" element={<Senha />} />
              <Route path="interesses" element={<Interesses />} />
              <Route path="formacoes" element={<Formacoes />} />
              <Route path="cursos" element={<Cursos />} />
              <Route path="experiencias" element={<Experiencias />} />
          </Routes>
        </CenterArea>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
