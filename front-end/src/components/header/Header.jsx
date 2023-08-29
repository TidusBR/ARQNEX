import './header.css'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
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
    const [toggleButton, useToggleButton] = useState(false)
    return (
        <div className="container-header">
            <div className="container-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className='group-links'>
                <div className="container-links">
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
                <div className="container-links">
                {
                    !session.loggedIn && (<>
                        <Link className="button" onClick={() => setLoginOpen(true)}>
                            Entrar
                        </Link>

                        <Link className="button" to="/register">
                            Cadastrar-se
                        </Link>
                    </>) || 
                    (<>
                        <Link className="mx-3 text-decoration-none" to="/become-pro">
                            <BecomeUpgrade></BecomeUpgrade>
                        </Link>
                        <Link className="px-3" to="/my-profile">
                            <IconUser userImg={imgTest}></IconUser>
                        </Link>
                        <Link className="px-3" to="/message">
                            <IconMessage notification={"teste"}></IconMessage>
                        </Link>
                        <Link className="px-3" to="/notifications">
                            <IconNotification notification={"teste"}></IconNotification>
                        </Link>
                        <Link className="px-3" to="/upload">
                            <ButtonUpload></ButtonUpload>
                        </Link>
                        <Link className="px-3 button" onClick={async function() {
                            await fetch(`${config.api}${config.endpoints.account.logout}`, {credentials: "include"});
                            window.location.href = "/";
                        }}>
                            Sair
                        </Link>
                    </>)
                }
                </div>
            </div>
            <div className="group-links-mobile">
                <button className="border-0" type="button" onClick={() => {useToggleButton(!toggleButton)}}>
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </i>
                </button>
                {toggleButton && 
                <div className='sidebar'>
                    <div className='header'>
                        <img src={logo} alt="Logo" />
                        <button className="border-0" type="button" onClick={() => {useToggleButton(!toggleButton)}}>
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                                </svg>
                            </i>
                        </button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

Header.propTypes = {
    setLoginOpen: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
}