import './header.css'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'

export default function Header() {
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
                    <Link className="button" to="/login">
                        Entrar
                    </Link>

                    <Link className="button" to="/register">
                        Cadastrar-se
                    </Link>
                </div>
            </div>
        </div>
    )
}