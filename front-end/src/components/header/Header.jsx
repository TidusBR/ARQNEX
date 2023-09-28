import './header.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { config } from '../../config'
import IconUser from './icon_user/IconUser'
import IconNotification from './icon_notification/IconNotification'
import imgTest from "../../assets/card-user-test/anna.png"
import IconMessage from './icon_notification/IconMessage'
import BecomeUpgrade from './become_upgrade/BecomeUpgrade'
import ButtonUpload from './button_upload/ButtonUpload'
import { useState } from 'react'

export default function Header({ setLoginOpen, session }) {

    

    return (
        <div className="container-header row">
            <div className='d-none d-lg-block col-lg-12 h-100'>
                <div className="row d-flex h-100 align-items-center justify-content-between">
                    <div className='col-lg-6 col-xl-4'>
                        <div className="row">
                            <div className="col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                                <img src={logo} alt="Logo" />
                            </div>
                            <div className="col-lg-9 col-xl-9 d-flex flex-row align-items-center justify-content-around">
                                <Link className="button" to="/">
                                    Início
                                </Link>

                                <Link className="button" to="/">
                                    Pessoas
                                </Link>

                                <Link className="button" to="/">
                                    Escritórios
                                </Link>

                                <Link className="button" to="/">
                                    Cursos
                                </Link>

                                <Link className="button type1" to="/">
                                    Ao vivo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {
                        !session.loggedIn && (
                            <div className="col-lg-2 col-xl-2">
                                <div className="row">
                                    <div className="col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
                                        <Link className="button" onClick={() => setLoginOpen(true)}>
                                            Entrar
                                        </Link>
                                    </div>
                                    <div className="col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
                                        <Link className="button text-nowrap" to="/register">
                                            Cadastrar-se
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) ||
                        (
                            <div className="col-lg-6 col-xl-5">
                                <div className="row d-flex align-items-center justify-content-between">
                                    <div className="col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                                        <Link className="text-decoration-none" to="/become-pro">
                                            <BecomeUpgrade></BecomeUpgrade>
                                        </Link>
                                    </div>
                                    <div className="col-lg-1 col-xl-1 d-flex align-items-center justify-content-center">
                                        <Link to="/my-profile">
                                            <IconUser userImg={imgTest}></IconUser>
                                        </Link>
                                    </div>
                                    <div className="col-lg-1 col-xl-1 d-flex align-items-center justify-content-center">
                                        <Link to="/message">
                                            <IconMessage notification={"teste"}></IconMessage>
                                        </Link>
                                    </div>
                                    <div className="col-lg-1 col-xl-1 d-flex align-items-center justify-content-center">
                                        <Link to="/notifications">
                                            <IconNotification notification={"teste"}></IconNotification>
                                        </Link>
                                    </div>
                                    <div className="col-lg-2 col-xl-2 d-flex align-items-center justify-content-center">
                                        <Link to="/upload" className='text-decoration-none'>
                                            <ButtonUpload></ButtonUpload>
                                        </Link>
                                    </div>
                                    <div className='col-lg-2 col-xl-2 d-flex align-items-center justify-content-center'>
                                        <Link className="button" onClick={async function () {
                                            await fetch(`${config.api}${config.endpoints.account.logout}`, { credentials: "include" });
                                            window.location.href = "/";
                                        }}>
                                            Sair
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
            <div className="d-block d-lg-none col-12 h-100 p-0 bg-white">
                {/* <button className="border-0" type="button" onClick={() => { useToggleButton(!toggleButton) }}>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                    </i>
                </button>
                {toggleButton &&
                    <div className='sidebar'>
                        <div className='header'>
                            <img src={logo} alt="Logo" />
                            <button className="border-0" type="button" onClick={() => { useToggleButton(!toggleButton) }}>
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                                    </svg>
                                </i>
                            </button>
                        </div>
                    </div>} */}
                <nav className="navbar" style={{ height: "70px" }}>
                    <div className="container-fluid d-flex justify-content-between">
                        {!session.loggedIn && <div className='ps-4'>
                            <Link style={{fontSize: "1rem"}} className="button text-nowrap" to="/register">
                                Cadastrar-se
                            </Link>
                        </div>}
                        <div></div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end"  id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header d-flex justify-content-between align-items-basline">
                                <img className="navbar-brand p-0" src={logo} alt="Logo" />
                                <button type="button" id='btn-close-menu' className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                {session.loggedIn && (
                                <div className='text-center mb-5'>
                                    <Link to="/profile">
                                        <img src={imgTest} style={{width: "120px", height: "120px"}} className='rounded-circle mb-2' alt="" />
                                    </Link>
                                    <p>{session.account.name}</p>
                                </div>)}
                                <div className=''>

                                </div>
                                <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    {!session.loggedIn && <div className="nav-item">
                                        <Link className="button nav-link" onClick={() => {
                                            setLoginOpen(true)
                                        }
                                        }>
                                            Entrar
                                        </Link>
                                    </div>}
                                    <div className="nav-item">
                                        <Link className="button nav-link" to="/">
                                            Início
                                        </Link>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" to="/">
                                            Pessoas
                                        </Link>
                                    </div>
                                    <div className="nav-item dropdown d-block d-md-none">
                                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Editar perfil
                                        </Link>
                                        <div className="dropdown-menu border-0">
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" to="/edit-profile/profile">Perfil</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" to="/edit-profile/password">Senha</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" to="/edit-profile/interests">Interesses</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" to="/edit-profile/formations">Formações</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" to="/edit-profile/courses">Cursos</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/edit-profile/experiences">Experiências</Link>
                                            </li>
                                        </div>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" to="/">
                                            Escritórios
                                        </Link>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" to="/">
                                            Cursos
                                        </Link>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" to="/">
                                            Ao vivo
                                        </Link>
                                    </div>
                                    {session.loggedIn && (<><div className="nav-item">
                                    <div className="nav-item">
                                        <Link className="button nav-link" to="/upload">
                                            Upload
                                        </Link>
                                    </div>
                                        <Link className="button nav-link" to="/">
                                            Mensagens
                                        </Link>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" to="/">
                                            Notificações
                                        </Link>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" onClick={async function () {
                                            await fetch(`${config.api}${config.endpoints.account.logout}`, { credentials: "include" });
                                            window.location.href = "/";
                                        }}>
                                            Sair
                                        </Link>
                                    </div>
                                    </>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

Header.propTypes = {
    setLoginOpen: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
}