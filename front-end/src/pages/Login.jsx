
import "./css/login.css"
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import FotoLogin from '../assets/foto-login.jpg'
import { Button, TextField } from '@mui/material'
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { config } from '../config'
import { useState } from "react"

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        width: '25rem',
        height: '35rem',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        background: 'rgba(58, 64, 69, 0.95)',
    }
};

/**
 * @param {object} props
 * @param {React.CSSProperties | undefined} props.style 
 * @returns 
 */
function InputField({id, label, style, type}) {
    return (
        <div style={{display: "flex", flexDirection: "column", ...(style??{})}}>
            <label style={{fontWeight: "bold", fontSize: "1.2rem"}}>{label}</label>
            <TextField type={type ?? 'text'} id={id} inputProps={{style: {height: "1rem"}}}></TextField>
        </div>
    )
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    id: PropTypes.string,
    ref: PropTypes.object,
    type: PropTypes.string
}

export default function Login({ open, setOpen }) {
  const [error, setError] = useState(undefined);

  const handleLoginSubmit = async (event) => {
    // desativar o botão
    event.target.disabled = true;

    // obter dados
    const name = document.querySelector("input#name").value;
    const password = document.querySelector("input#password").value;

    // enviar solicitação de login
    const request = await fetch(`${config.api}${config.endpoints.account.signin}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            name,
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
        <img src={FotoLogin} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "15rem"}}></img>
        <div style={{marginTop: "15rem"}}>
            <InputField id="name" label="Nome"></InputField>
            <InputField id="password" label="Senha" type="password" style={{marginTop: "1rem"}}></InputField>
            {error !== undefined && <label style={{color: "red"}}>{error}</label>}
            <Button variant="contained" sx={{marginTop: "1rem", width: "100%"}} onClick={handleLoginSubmit}>Entrar</Button>
        </div>
    </Modal>
  )
}

Login.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}