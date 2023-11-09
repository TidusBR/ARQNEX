import { useEffect, useRef, useState } from "react";
import { config } from "../../config";

import PropTypes from 'prop-types';

import { Snackbar, Alert } from "@mui/material";

export default function OfficesForm({ updateSession }) {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState(`${config.api}/uploads/-1/office`);
    const [cnpj, setCnpj] = useState("");
    const [cep, setCep] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [street, setStreet] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");

    const [isSnackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.office.info}`, { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            setName(data.name);
            setCnpj(data.cnpj);

            console.log(data.photo)

            if (data.photo.length > 0)
                setAvatar(`${config.api}/${data.photo}`);

            setCep(data.address.cep);
            setHouseNumber(data.address.house_number);
            setStreet(data.address.street);
            setNeighborhood(data.address.neighborhood);
            setCity(data.address.city);
        });
    }, []);

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

    const inputFileRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        event.target.querySelector("button[type='submit']").disabled = true;

        const request = await fetch(`${config.api}${config.endpoints.office.update}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name,
                cep,
                houseNumber,
                street,
                neighborhood,
                city,
                cnpj
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

        if (inputFileRef.current.files[0] !== undefined) {
            const avatar = inputFileRef.current.files[0];

            await fetch(`${config.api}${config.endpoints.office.update_avatar}`, {
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
        }

        event.target.querySelector("button[type='submit']").disabled = false;
        location.reload();
    }

    const handleAvatarChange = async (event) => {
        setAvatar(URL.createObjectURL(event.target.files[0]));
    }

    const handleDeleteAvatar = async () => {
        await fetch(`${config.api}${config.endpoints.office.delete_avatar}`, {
            credentials: "include",
            method: "POST"
        });

        setAvatar(`${config.api}/uploads/-1/office`);

        updateSession();
        location.reload();
    }

    return <>
        <form className="row w-100" onSubmit={handleSubmit}>
            <div className="detalhes-foto col-12">
                {/* Foto de Perfil */}
                <div className="row d-flex flex-sm-row flex-column align-items-center">
                    <div className="col-lg-1 col-xl-1 mb-4 d-flex align-items-center justify-content-center">
                        <img src={avatar} className="rounded-circle" alt="fotoPerfil" width={100} height={100} style={{ boxShadow: "0px 3px 6px #00000029" }} />
                    </div>

                    <div className="col mb-4">
                        <div className="row d-flex align-items-center justify-content-around">
                            <input ref={inputFileRef} type="file" accept=".jpeg, .png, .jpg" onChange={handleAvatarChange} hidden />

                            <button className="col-5 col-sm-4 rounded orange-background text-white border-0 px-1 py-1 px-sm-2 py-sm-1" type="button"
                                onClick={() => inputFileRef?.current?.click()}
                            >Alterar foto do escritório</button>
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
                <input required type="text" id="name" className="form-control form-control-md" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="cnpj">CNPJ</label>
                {/*Se o usuário já tiver cadastrado o cnpj ele precisa estar disabled ou nem deve aparecer */}
                <input required type="text" id="cnpj" className="form-control form-control-md" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
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

OfficesForm.propTypes = {
    updateSession: PropTypes.func.isRequired
}