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
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";

import Upload from "./pages/Upload";

import Modal from 'react-modal';
Modal.setAppElement("#root");

//É SÓ VOCÊ PEGAR O OJBETO SESSION E PASSAR PARA OS OUTROS COMPONENTES COMO PROPRIEDADE, POR EXEMPLO
//O PERFIL DO USUÁRIO, PRECISA SABER SE O USUÁRIO ESTÁ LOGADO, ENTÃO BASTA, PASSAR SESSION COMO UMA PROPRIEDADE PARA O COMPONENTE "ProfileUser", ler linha 48.
export default function App() {
  
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [session, setSession] = useState({ loggedIn: false, account: {} });

  useEffect(() => {
    fetch(`${config.api}${config.endpoints.session}`, { method: "POST", credentials: "include" })
      .then(response => response.json())
      .then(data => {
        setSession(data)
        console.log("oioi");
      });
    }, []
  );

  

  return (
    <BrowserRouter>
      <>
        <Header session={session} setLoginOpen={setLoginOpen} />
        <CenterArea>
          {!session.loggedIn && <Login open={isLoginOpen} setOpen={setLoginOpen}></Login>}
          <Routes>
            <Route path="/" element={<Home session={session} />} />
            <Route path="/upload" element={session.loggedIn ? <Upload /> : <Navigate to="/" />} />
            <Route path="/register" element={session.loggedIn ? <Navigate to="/" /> : <Register />} />
            {/*POR ENQUANTO A LÓGICA DE SESSÃO ESTÁ INVERTIDA POIS NÃO QUERO FICAR LOGANDO PARA VER PROFILE USER*/}
            <Route path="/profile" element={<ProfileUser/>}></Route>
            <Route path="/edit-profile" element={<EditProfile />}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          </Routes>
        </CenterArea>
        <Footer />
      </>
    </BrowserRouter>
  );
}
