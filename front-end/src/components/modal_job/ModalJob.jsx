import Modal from 'react-modal'
import { config } from '../config'
import { useState } from "react"

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

export default function ModalJob({open, setOpen}) {

    return (
        <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Login"
    >
        <div className="d-flex flex-column justify-content-between h-100">
            TESTE
        </div>
    </Modal>
    )
}