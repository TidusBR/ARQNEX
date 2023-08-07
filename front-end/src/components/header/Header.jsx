import './header.css'
import '../../css/button_effects.css'
import logo from '../../assets/logo.png'
import PropTypes from 'prop-types';

/*
export default function Header() {
    return (
        <div className="container-header">
            <div className="container-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className='group-links'>
                <nav>
                    <ul className="container-links">
                        <li><a href="/Dashboard">Início</a></li>
                        <li><a href="">Pessoas</a></li>
                        <li><a href="">Escritórios</a></li>
                        <li><a href="">Cursos</a></li>
                        <li><a href="">Ao vivo</a></li>
                    </ul>
                </nav>
                <nav>
                    <ul className="container-links border">
                        <li><a href="/login">Entrar</a></li>
                        <li><a href="">Cadastrar</a></li> 
                    </ul>
                </nav>
            </div>
        </div>
    )
}*/

export default function Header({ setRenderLogin }) {
    return (
        <div className="container-header">
            <div className="container-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className='group-links'>
                <div className="container">
                    <a className="button type1" href="/dashboard">
                        Início
                    </a>

                    <a className="button type1" href="/">
                        Pessoas
                    </a>

                    <a className="button type1" href="/">
                        Escritórios
                    </a>

                    <a className="button type1" href="/">
                        Cursos
                    </a>

                    <a className="button type1" href="/">
                        Ao vivo
                    </a>
                </div>
                <div className="container">
                    <a className="button type3" onClick={() => setRenderLogin(true)}>
                        Entrar
                    </a>

                    <a className="button type3" href="/register">
                        Cadastrar-se
                    </a>
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {
    setRenderLogin: PropTypes.func.isRequired
};