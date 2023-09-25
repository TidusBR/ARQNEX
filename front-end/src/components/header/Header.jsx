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
    const [toggleButton, useToggleButton] = useState(false);

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
                                                        <div className="col-lg-6 col-xl-6">
                                                            <Link className="button" onClick={() => setLoginOpen(true)}>
                                                                Entrar
                                                            </Link>
                                                        </div>
                                                        <div className="col-lg-6 col-xl-6">
                                                            <Link className="button" to="/register">
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
            <div className="d-block d-lg-none col-12 h-100 p-0">
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
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="bg-dark p-4">
                        <h5 class="text-white h4">Collapsed content</h5>
                        <span class="text-muted">Toggleable via the navbar brand.</span>
                    </div>
                </div>
                <nav class="navbar navbar-dark bg-dark h-100 w-100 px-2">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
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