import { useState } from "react"
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import { Snackbar, Alert } from "@mui/material";

export default function PasswordForm({ updateSession }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [isSnackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    e.target.querySelector("button[type='submit']").disabled = true;

    await fetch(`${config.api}${config.endpoints.account.update.password}`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password,
            confirmPassword
        })
    });

    setSnackMessage("Informações salvas com sucesso!");
    setSnackSeverity("success");
    setSnackOpen(true);

    updateSession();
    navigate("/");

    e.target.querySelector("button[type='submit']").disabled = false;
  }

  return <form className="w-100 row" onSubmit={handleSubmit}>
    <div className="mb-4 col-12">
      <label className="form-label fw-bold" htmlFor="password">Nova Senha</label>
      <input type="password" required id="password" autoComplete="off" className="form-control form-control-md" value={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div className="mb-4 col-12">
      <label className="form-label fw-bold" htmlFor="confirm-password">Digite novamente a senha</label>
      <input type="password" required id="confirmPassword" autoComplete="off" className="form-control form-control-md" value={confirmPassword} onChange={(e) => {
        setConfirmPassword(e.target.value);

        if (e.target.value !== 'password') {
          e.target.setCustomValidity('As senhas não coincidem');
        } else {
          e.target.setCustomValidity('');
        }

        e.target.reportValidity();
      }} />
    </div>
    <div className="mb-4 col-12 d-flex flex-row-reverse">
      <button
        className="btn button-create btn-block text-white border-0 col-6 col-lg-4 "
        type="submit"
        disabled={password !== confirmPassword}
      >
        Salvar
      </button>
      <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        open={isSnackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
    >
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '90%' }}>
            {snackMessage}
        </Alert>
    </Snackbar>
    </div>
  </form>
}

PasswordForm.propTypes = {
  updateSession: PropTypes.func.isRequired
}