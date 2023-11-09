import { useEffect, useRef, useState } from "react";
import "../../pages/css/edit-profile.css"
import PropTypes from 'prop-types';
import { config } from "../../config";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Alert, Snackbar } from "@mui/material";

export default function ProfileForm({ session, updateSession }) {
    const [name, setName] = useState(session.account.name);
    const [username, setUsername] = useState(session.account.username);
    const [email, setEmail] = useState("");
    const [cep, setCep] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [street, setStreet] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [biography, setBiography] = useState("");
    const [avatar, setAvatar] = useState(`${config.api}/uploads/${session.account.id}/avatar`);

    const [isSnackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");

    const inputFileRef = useRef();

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.account.editInfo.profile}`, { method: "POST", credentials: "include" })
        .then(response => response.json())
        .then(data => {
            setEmail(data.email);
            setCep(data.cep);
            setHouseNumber(data.houseNumber);
            setStreet(data.street);
            setNeighborhood(data.neighborhood);
            setCity(data.city);
            setPhoneNumber(data.phoneNumber);
            setBiography(data.biography);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        event.target.querySelector("button[type='submit']").disabled = true;

        const request = await fetch(`${config.api}${config.endpoints.account.update.profile}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name,
                username,
                email,
                cep,
                houseNumber,
                street,
                neighborhood,
                city,
                biography,
                phoneNumber
            })
        });

        const response = await request.json();

        if (!response.ok) {
            const input = document.querySelector(`#${response.field}`);
            input?.setCustomValidity(response.message);
            input?.checkValidity();
            input?.reportValidity();

            setSnackMessage("Falha ao validar informações!");
            setSnackSeverity("error");
            setSnackOpen(true);
        } else {
            setSnackMessage("Informações salvas com sucesso!");
            setSnackSeverity("success");
            setSnackOpen(true);

            updateSession();
        }

        event.target.querySelector("button[type='submit']").disabled = false;
    }

    const cepConsulta = () => {
        const cep = document.querySelector("#cep");

        const value = cep.value.replace(/[^0-9]+/, '');
        const url = `https://viacep.com.br/ws/${value}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (json.erro) {
                    console.log("CEP inválido!");
                    setCep("");
                } else {
                    setCity(json.localidade);

                    if (json.logradouro) {
                        setStreet(json.logradouro);
                        setNeighborhood(json.bairro);
                    }
                }
            });
    }

    const handleAvatarChange = async (event) => {
        const avatar = event.target.files[0];
        setAvatar(URL.createObjectURL(avatar));

        await fetch(`${config.api}${config.endpoints.account.uploadAvatar}`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                file: [...new Uint8Array(await avatar.arrayBuffer())],
                type: avatar.type
            })
        });

        updateSession();
        location.reload();
    }

    const handleDeleteAvatar = async () => {
        await fetch(`${config.api}${config.endpoints.account.deleteAvatar}`, {
            credentials: "include",
            method: "POST"
        });

        updateSession();
        setAvatar(`${config.api}/uploads/${session.account.id}/avatar`);
        location.reload();
    }

    return <>
        <form className="row w-100" onSubmit={handleSubmit}>
            <div className="detalhes-foto col-12">
                {/* Foto de Perfil */}
                <div className="row d-flex flex-sm-row flex-column align-items-center">
                    <div className="col-lg-1 col-xl-1 mb-4 d-flex align-items-center justify-content-center">
                        <img src={avatar} className="rounded-circle" alt="fotoPerfil" width={100} height={100} style={{boxShadow: "0px 3px 6px #00000029"}}/>
                    </div>
                    
                    <div className="col mb-4">
                        <div className="row d-flex align-items-center justify-content-around">
                            <input ref={inputFileRef} type="file" accept=".jpeg, .png, .jpg" onChange={handleAvatarChange} hidden />

                            <button className="col-5 col-sm-4 rounded orange-background text-white border-0 px-1 py-1 px-sm-2 py-sm-1" type="button"
                            onClick={() => inputFileRef?.current?.click()}
                            >Alterar foto de perfil</button>
                            <button className="col-5 col-sm-4 bg-white rounded border-button px-1 py-1 px-sm-2 py-sm-1" type="button"
                            onClick={handleDeleteAvatar}
                            /* disabled={!isButtonEnabled} */
                            >Deletar</button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="name">Nome</label>
                <input required type="text" id="name" className="form-control form-control-md" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="username">Nome de Usuário</label>
                <input required type="text" id="username" className="form-control form-control-md" value={username} onChange={(e) => {e.target.setCustomValidity(''); setUsername(e.target.value)}} />
                <span className='help-block' style={{ fontSize: "0.8rem", color: "#1d252c52" }}>URL: {location.origin}/profile/{username}</span>
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="email">Email</label>
                <input required type="email" id="email" className="form-control form-control-md" value={email} onChange={(e) => {e.target.setCustomValidity(''); setEmail(e.target.value)}} />
            </div>

            <div className="mb-4 col-6">
                <label className="form-label fw-bold" htmlFor="cep">Cep</label>
                <input required type="text" id="cep" className="form-control form-control-md" onBlur={cepConsulta} value={cep} onChange={(e) => setCep(e.target.value)}/>
            </div>
            <div className="mb-4 col-6">
                <label className="form-label fw-bold" htmlFor="street">Rua</label>
                <input required type="text" id="street" className="form-control form-control-md" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div className="mb-4 col-6">
                <label className="form-label fw-bold" htmlFor="number">Número</label>
                <input required type="text" id="number" className="form-control form-control-md" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
            </div>
            <div className="mb-4 col-6">
                <label className="form-label fw-bold" htmlFor="city">Cidade</label>
                <input required type="text" id="city" className="form-control form-control-md" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="phonenumber">Telefone</label>
                <PhoneInput
                    id="phonenumber"
                    className="form-control form-control-md"
                    country="BR"
                    defaultCountry="BR"
                    countries={["BR"]}
                    addInternationalOption={false}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    limitMaxLength={true}
                    smartCaret={true}
                    countryCallingCodeEditable={false}
                    required
                />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="bio">Biografia</label>
                <textarea required className="form-control" id="bio" rows="3" value={biography} onChange={(e) => setBiography(e.target.value)}></textarea>
            </div>

            {/* Campo bibliografia, é um   */}

            <div className="mb-4 col-12 d-flex flex-row-reverse">
                <button className="btn button-create btn-block text-white border-0 col-6 col-lg-4" type="submit">Salvar</button>
            </div>

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
        </form>
    </>
}

ProfileForm.propTypes = {
    session: PropTypes.object.isRequired,
    updateSession: PropTypes.func.isRequired
}