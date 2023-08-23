import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { config } from '../config'
import { useState } from "react"
import './css/login.css'
import './css/register.css'

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '25rem',
        height: '35rem',
        transform: 'translate(-50%, -50%)',
        border: "none",
        borderRadius: "10px",
        padding: "0"
    },
    overlay: {
        background: 'rgba(58, 64, 69, 0.95)',
    }
};

export default function Login({ open, setOpen }) {
  const [error, setError] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // desativar o botão
    event.target.disabled = true;

    // obter dados
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // enviar solicitação de login
    const request = await fetch(`${config.api}${config.endpoints.account.signin}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    });

    // processar resposta
    const response = await request.json();

    if (!response.ok) {
        setError(response.message);
    } else {
        window.location.href = "/";
    }

    // Reabilitar botão em caso de erro
    event.target.disabled = false;
  }

  return (
    <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Login"
    >
        <div className="d-flex flex-column justify-content-between h-100">
            <div className='img'>
                <div className='logo'></div>
            </div>
            <div className='px-2 py-3 form d-flex flex-column justify-content-between'>
                <div className='d-flex justify-content-between'>
                    <button className='button-facebook d-flex align-items-center justify-content-center btn btn-primary border-0'>
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 10.472 10.472">
                            <path id="facebook" d="M9.062,0H1.413A1.411,1.411,0,0,0,0,1.411V9.061a1.411,1.411,0,0,0,1.411,1.411H5.186L5.192,6.73H4.22A.229.229,0,0,1,3.991,6.5l0-1.206a.229.229,0,0,1,.229-.23h.97V3.9A1.9,1.9,0,0,1,7.218,1.81h.99a.229.229,0,0,1,.229.229V3.057a.229.229,0,0,1-.229.229H7.6c-.656,0-.783.312-.783.769V5.065H8.26a.229.229,0,0,1,.228.256L8.344,6.527a.229.229,0,0,1-.228.2H6.824l-.006,3.742H9.063a1.411,1.411,0,0,0,1.411-1.411V1.411A1.411,1.411,0,0,0,9.062,0Z" transform="translate(-0.002 0)" fill="#fff"/>
                        </svg>
                      </i>
                      Facebook
                    </button>
                    <button className='button-google d-flex align-items-center justify-content-center btn btn-primary border-0'>
                        <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path id="ic_google" d="M.953,11.791h0A8,8,0,0,1,13.106,1.842L10.515,3.964A4.757,4.757,0,0,0,3.5,6.455h0a4.774,4.774,0,0,0,.045,3.214h0A4.758,4.758,0,0,0,10.4,12.105h0A4.768,4.768,0,0,0,12.454,9.67H8.176V6.506H15.86a8,8,0,0,1-2.852,7.733h0A8,8,0,0,1,.953,11.791Z" fill="#fff"/>
                        </svg>
                        </i>
                        Google
                    </button>
                </div>


                <div className='mt-3 mb-2'>
                    <form className='w-100' onSubmit={handleSubmit} action='/'>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="username" style={{fontWeight: "bold", fontSize: "1.2rem"}}>Nome de Usuário</label>
                            <input type="text" id="username" pattern="[^\s]+" title="Não use espaçamentos" className="form-control form-control-md" required/>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="password" style={{fontWeight: "bold", fontSize: "1.2rem"}}>Senha</label>
                            <input type="password" id="password" minLength="6" className="form-control form-control-md" required/>
                        </div>

                        {
                        error && <span style={{position: 'absolute', color: 'red'}}>{error}</span>
                        }

                        <p className='link'>
                            <a>Esqueceu a senha?</a>
                        </p>

                        <Button type="submit" style={{backgroundColor: "#DB752C"}} variant="contained" sx={{marginTop: "1rem", width: "100%"}}>Entrar</Button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>
  )
}

Login.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}