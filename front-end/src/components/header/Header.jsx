import './header.css'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { config } from '../../config'
import IconUser from './icon_user/IconUser'
import IconNotification from './icon_notification/IconNotification'
import IconMessage from './icon_notification/IconMessage'
import BecomeUpgrade from './become_upgrade/BecomeUpgrade'
import ButtonUpload from './button_upload/ButtonUpload'
import { useState } from 'react'

export default function Header({ setLoginOpen, session }) {

    const navigate = useNavigate();

    // ESTOU MOCKANDO UM ESCRITÓRIO PRA APARECER NO MENU MOBILE, ESSE DADO VIRÁ NA SESSAO DO USUÁRIO
    const [mockOffice] = useState(true)

    return (
        <div className="container-header row">
            <div className='d-none d-lg-block col-lg-12 h-100'>
                <div className="row d-flex h-100 align-items-center justify-content-between">
                    <div className='col-lg-6 col-xl-5 col-xxl-4'>
                        <div className="row">
                            <div className="col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                                <img src={logo} alt="Logo" />
                            </div>
                            <div className="col-lg-9 col-xl-9 d-flex flex-row align-items-center justify-content-around">
                                <Link className="button" to="/">
                                    Início
                                </Link>

                                <Link className="button" to="/people">
                                    Pessoas
                                </Link>

                                <Link className="button" to="/offices">
                                    Escritórios
                                </Link>

                                <Link className="button" to="/courses">
                                    Cursos
                                </Link>

                                <Link className="button type1" to="/online">
                                    Ao vivo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {
                        !session.loggedIn && (
                            <div className="col-lg-2 col-xl-2">
                                <div className="row d-flex justify-content-end">
                                    <div className="col-lg-6 col-xl-5 d-flex align-items-center justify-content-center">
                                        <Link className="button" onClick={() => setLoginOpen(true)}>
                                            Entrar
                                        </Link>
                                    </div>
                                    <div className="col-lg-6 col-xl-5 d-flex align-items-center justify-content-center">
                                        <Link className="button text-nowrap" to="/register">
                                            Cadastrar-se
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) ||
                        (
                            <div className={session.account?.isPremium ? "col-lg-6 col-xl-3" : "col-lg-6 col-xl-5 col-xxl-4"}>
                                <div className="row d-flex align-items-center justify-content-between">
                                    {
                                        !session.account?.isPremium &&
                                        <div className="col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                                            <Link className="text-decoration-none" to="/become-pro">
                                                <BecomeUpgrade></BecomeUpgrade>
                                            </Link>
                                        </div>
                                    }
                                    <div className="col-lg-1 col-xl-1 d-flex align-items-center justify-content-center">
                                        <Link to="/profile">
                                            <IconUser userImg={`${config.api}/uploads/${session.account.id}/avatar`}></IconUser>
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
                <nav className="navbar" style={{ height: "70px" }}>
                    <div className="container-fluid d-flex justify-content-between">

                        <div></div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"></span>
                        </button>

                        <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header d-flex justify-content-between align-items-basline">
                                <img className="navbar-brand p-0" src={logo} alt="Logo" />
                                <button type="button" id='btn-close-menu' className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            
                            <div className="offcanvas-body">
                                {session.loggedIn && (
                                    <div className='mb-3 d-flex pb-3' style={{ borderBottom: "1.5px solid #EEEEEE" }}>
                                        <Link data-bs-dismiss="offcanvas" style={{ position: "relative" }} className='me-5' onClick={() => {
                                            navigate("/profile")
                                        }}>
                                            <img src={`${config.api}/uploads/${session.account.id}/avatar`} style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                border: "1px solid rgb(219, 117, 44)"
                                            }} className='mb-2 p-1' alt="" />
                                        </Link>
                                        <div>
                                            <p style={{ fontSize: "1.5rem" }} className='fw-bold mb-1'>{session.account.name}</p>
                                            <p style={{ fontSize: "1.2rem", color: "#AAAAAA" }} className='mb-1'>{session.account.username}</p>
                                            {session.account?.isPremium && <p style={{ fontSize: "1rem", color: "rgb(219, 117, 44)", fontStyle: "italic" }}>PRO</p>}
                                        </div>
                                    </div>)}
                                <div className=''>

                                </div>
                                <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    {!session.loggedIn && <>
                                        <div className="nav-item">
                                            <Link className="button nav-link" data-bs-toggle="offcanvas" onClick={() => {
                                                setLoginOpen(true)
                                            }
                                            }>
                                                Entrar
                                            </Link>
                                        </div>
                                        <div className="nav-item">
                                            <Link className="button nav-link" data-bs-dismiss="offcanvas" onClick={() => {
                                                navigate("/register")
                                            }}>
                                                Cadastrar-se
                                            </Link>
                                        </div></>
                                    }
                                    <div className="nav-item">
                                        <Link className="button nav-link" data-bs-dismiss="offcanvas" onClick={() => {
                                            navigate("/")
                                        }}>
                                            Início
                                        </Link>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" data-bs-dismiss="offcanvas" onClick={() => {
                                            navigate("/people")
                                        }}>
                                            Pessoas
                                        </Link>
                                    </div>
                                    {session.loggedIn && <div className="nav-item dropdown d-block d-md-none">
                                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Editar perfil
                                        </Link>
                                        <div className="dropdown-menu border-0">
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/edit-profile/profile")
                                                }}>Perfil</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/edit-profile/password")
                                                }}>Senha</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/edit-profile/interests")
                                                }}>Interesses</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/edit-profile/formations")
                                                }}>Formações</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/edit-profile/courses")
                                                }}>Cursos</Link>
                                            </li>
                                            <li className='pb-2'>
                                                <Link className="dropdown-item" data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/edit-profile/experiences")
                                                }}>Experiências</Link>
                                            </li>
                                            {session.account.isPremium && <li className='pb-2'>
                                                <Link className="dropdown-item" data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/edit-profile/offices")
                                                }}>Escritórios</Link>
                                            </li>}
                                            {mockOffice && <li className='pb-2'>
                                                <Link className="dropdown-item" data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/edit-profile/manage-office")
                                                }}>Gerenciar escritório</Link>
                                            </li>}
                                        </div>
                                    </div>}
                                    <div className="nav-item">
                                        <Link className="button nav-link" data-bs-dismiss="offcanvas" onClick={() => {
                                            navigate("/offices")
                                        }}>
                                            Escritórios
                                        </Link>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" data-bs-dismiss="offcanvas" onClick={() => {
                                            navigate("/courses")
                                        }}>
                                            Cursos
                                        </Link>
                                    </div>
                                    <div className="nav-item">
                                        <Link className="button nav-link" data-bs-dismiss="offcanvas" onClick={() => {
                                            navigate("/online")
                                        }}>
                                            Ao vivo
                                        </Link>
                                    </div>
                                    {session.loggedIn && (<><div className="nav-item">
                                        <div className="nav-item">
                                            <Link className="button nav-link" data-bs-dismiss="offcanvas" to="/upload" onClick={() => {
                                                navigate("/upload")
                                            }}>
                                                Upload
                                            </Link>
                                        </div>
                                        <Link className="button nav-link" data-bs-dismiss="offcanvas" onClick={() => {
                                            navigate("/")
                                        }}>
                                            Mensagens
                                        </Link>
                                    </div>
                                        <div className="nav-item">
                                            <Link className="button nav-link" data-bs-dismiss="offcanvas" onClick={() => {
                                                navigate("/notifications")
                                            }}>
                                                Notificações
                                            </Link>
                                        </div>
                                        {!session.account.isPremium &&
                                            <div className="nav-item">
                                                <Link className="button nav-link" style={{ color: "#EE2C09" }} data-bs-dismiss="offcanvas" onClick={() => {
                                                    navigate("/become-pro")
                                                }}>
                                                    Fazer um upgrade, torne-se PRO
                                                </Link>
                                            </div>}
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