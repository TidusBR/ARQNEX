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
import ProfileForm from "./components/menu/ProfileForm";
import PasswordForm from "./components/menu/PasswordForm";
import CoursesForm from "./components/menu/CoursesForm";
import ExperiencesForm from "./components/menu/ExperiencesForm";
import InterestsForm from "./components/menu/InterestsForm";
import FormationsForm from "./components/menu/FormationsForm";
import BecomePro from "./components/become_pro/BecomePro";
import Online from "./components/online/Online";
import Courses from "./components/courses/Courses";

Modal.setAppElement("#root");

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [session, setSession] = useState(null); // Inicialize com null

  const updateSession = () => {
    fetch(`${config.api}${config.endpoints.session}`, { method: "POST", credentials: "include" })
      .then(response => response.json())
<<<<<<< Updated upstream
      .then(data => { setSession(data); console.log(data); })
=======
      .then(data => setSession(data));
>>>>>>> Stashed changes
  }

  useEffect(() => {
    updateSession();
  }, []);

  if (session === null)
    return;

  return (
    <BrowserRouter>
      <>
        <Header session={session} setLoginOpen={setLoginOpen} />
        <CenterArea>
          {!session.loggedIn && <Login open={isLoginOpen} setOpen={setLoginOpen}></Login>}
          <Routes>
            {/* {FAZER VALIDAÇÕES PARA RENDERIZAR AS PÁGINAS DE ACORDO COM SUA PERMISSÃO DE SESSÃO} */}
            <Route path="/" element={session.loggedIn ? <Navigate to="/dashboard" /> : <Home session={session} setLoginOpen={setLoginOpen} />} />
            <Route path="/upload" element={session.loggedIn ? <Upload session={session} /> : <Navigate to="/" />} />
            <Route path="/register" element={session.loggedIn ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/profile" element={session.account.username ? <Navigate to={"/profile/" + session.account.username} /> : <Navigate to="/" />}></Route>
            <Route path="/profile/*" element={<ProfileUser session={session} />}></Route>
            <Route path="/become-pro" element={session.loggedIn && !session.account.isPremium ? <BecomePro session={session} /> : <Navigate to="/" />}></Route>

            {/* <Route path="/courses" element={element.loggedIn ? <Courses /> : <Navigate to="/" />} /> */}

            <Route path="/edit-profile" element={session.loggedIn ? <EditProfile /> : <Navigate to="/" />}>
              <Route path="profile" element={<ProfileForm session={session} updateSession={updateSession} />}></Route>
              <Route path="password" element={<PasswordForm updateSession={updateSession} />}></Route>
              <Route path="courses" element={<CoursesForm session={session} updateSession={updateSession} />}></Route>
              <Route path="experiences" element={<ExperiencesForm session={session} updateSession={updateSession} />}></Route>
<<<<<<< Updated upstream
              <Route path="interests" element={<InterestsForm session={session} />}></Route>
              <Route path="formations" element={<FormationsForm session={session} />}></Route>
=======
              <Route path="interests" element={<InterestsForm session={session} updateSession={updateSession} />}></Route>
              <Route path="formations" element={<FormationsForm session={session} updateSession={updateSession} />}></Route>
              <Route path="offices" element={<OfficesForm updateSession={updateSession} />}></Route>
              <Route path="manage-office" element={<ManageOffice />}></Route>
>>>>>>> Stashed changes
            </Route>
            
            <Route path="/dashboard" element={session.loggedIn ? <Dashboard session={session}></Dashboard> : <Navigate to="/" />}></Route>
            <Route path="/Online" element={<Online/>}></Route>
            <Route path="/Courses" element={<Courses/>}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </CenterArea>
        <Footer />
      </>
    </BrowserRouter>
  );
}
