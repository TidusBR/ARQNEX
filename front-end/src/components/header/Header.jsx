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

export default function Header({ setLoginOpen, session }) {
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
        </div>
    )
}

Header.propTypes = {
    setLoginOpen: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
}