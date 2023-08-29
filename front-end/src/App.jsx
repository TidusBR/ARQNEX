import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/header/Header";
import CenterArea from "./components/center_area/CenterArea";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { config } from './config'
import Menu from './components/menuEditPerfil/Menu'
import Perfil from "./components/menuEditPerfil/Perfil/Perfil";
import Senha from "./components/menuEditPerfil/Senha/Senha";
import Interesses from "./components/menuEditPerfil/Interesses";
import Formacoes from "./components/menuEditPerfil/Formacoes";
import Cursos from "./components/menuEditPerfil/Cursos/Cursos.jsx";
import Experiencias from "./components/menuEditPerfil/Experiencias/Experiencias.jsx";
import EditarPerfil from "./components/menuEditPerfil/editarPerfil"; 

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
            <Route path="/register" element={session.loggedIn ? <Navigate to="/" /> : <Register />} />
            <Route path="/editarPerfil/*" element={<EditarPerfil />}></Route>
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
