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
import Page404 from './pages/Page404';
import Perfil from "./components/menuEditPerfil/Perfil/Perfil";
import Senha from "./components/menuEditPerfil/Senha/Senha";
import Interesses from "./components/menuEditPerfil/Interesses/Interesses.jsx";
import Formacoes from "./components/menuEditPerfil/Formacoes/Formacoes.jsx";
import Cursos from "./components/menuEditPerfil/Cursos/Cursos.jsx";
import Experiencias from "./components/menuEditPerfil/Experiencias/Experiencias.jsx";

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
            <Route path="/edit-profile" element={session.loggedIn ? <Navigate to="/edit-profile/profile" /> : <Navigate to="/" />}></Route>
            <Route path="/edit-profile/profile" element={session.loggedIn ? <EditProfile /> : <Navigate to="/" />}></Route>
            <Route path="/edit-profile/password" element={session.loggedIn ? <EditProfile /> : <Navigate to="/" />}></Route>
            <Route path="/edit-profile/interests" element={session.loggedIn ? <EditProfile /> : <Navigate to="/" />}></Route>
            <Route path="/edit-profile/formations" element={session.loggedIn ? <EditProfile /> : <Navigate to="/" />}></Route>
            <Route path="/edit-profile/courses" element={session.loggedIn ? <EditProfile /> : <Navigate to="/" />}></Route>
            <Route path="/edit-profile/experiences" element={session.loggedIn ? <EditProfile /> : <Navigate to="/" />}></Route>
            <Route path="/dashboard" element={session.loggedIn ? <Dashboard session={session}></Dashboard> : <Navigate to="/" />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </CenterArea>
        <Footer />
      </>
    </BrowserRouter>
  );
}
