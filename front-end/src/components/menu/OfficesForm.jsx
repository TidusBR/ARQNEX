import avatarDefault from "../../assets/fotoPerfil.png";
import { useEffect, useRef, useState } from "react";
import { config } from "../../config";

export default function OfficesForm({ session }) {

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState(`${config.api}/uploads/${session.account.id}/avatar`);
    const [cnpj, setCnpj] = useState("");

    const inputFileRef = useRef();

    const handleSubmit = () => {}

    const handleAvatarChange = () => {}

    const handleDeleteAvatar = () => {}

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
                <input required type="text" id="name" className="form-control form-control-md" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="cnpj">CNPJ</label>
                {/*Se o usuário já tiver cadastrado o cnpj ele precisa estar disabled ou nem deve aparecer */}
                <input required type="text" id="cnpj" className="form-control form-control-md" value={cnpj} onChange={(e) => setCep(e.target.value)} />
            </div>

            {/* Campo bibliografia, é um   */}

            <div className="mb-4 col-12 d-flex flex-row-reverse">
                <button className="btn button-create btn-block text-white border-0 col-6 col-lg-4" type="submit">Salvar</button>
            </div>

        </form>
    </>
}