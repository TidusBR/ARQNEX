import PropTypes from 'prop-types';
import Modal from "react-modal";
import { config } from '../config.js';

Modal.setAppElement("#root");

const customStyles = {
    
};

  
export default function Login({ open, setOpen }) {
    console.log(config);

    return (
        <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            style={customStyles}
            contentLabel="Login"
        >
            <form style={{display: "flex", flexDirection: "column"}}>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name"></input>

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password"></input>

                <button onClick={async (e) => {
                    e.preventDefault();
                    e.target.disabled = true;

                    const response = await fetch(`${config.api}${config.endpoints.account.signin}`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            Object.fromEntries(
                                [...e.target.parentElement.elements]
                                .filter(element => element.tagName === 'INPUT')
                                .map(input => [
                                    input.name,
                                    input.value
                                ])
                            )
                        )
                    });

                    const data = await response.json();

                    console.log(data);

                    e.target.disabled = false;
                    
                }}>Entrar</button>
            </form>
        </Modal>
    )
}

Login.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};