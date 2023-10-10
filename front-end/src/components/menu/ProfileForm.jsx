import { useEffect, useState } from "react"
import foto from "../../assets/fotoPerfil.png"
import "../../pages/css/edit-profile.css"

export default function ProfileForm() {

    // useEffect(() => {
    //     fetch(`${config.api}${config.endpoints.session}`, { method: "POST", credentials: "include" })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             setSession(data);
    //         });
    // }, []);

    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        event.target.disabled = true;

        // const request = await fetch(`${config.api}${config.endpoints.account.signup}`, {
        //     credentials: "include",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     method: "POST",
        //     body: JSON.stringify({
        //         name: document.querySelector("#name").value,
        //         username: document.querySelector("#username").value,
        //         cpf: document.querySelector("#cpf").value,
        //         email: document.querySelector("#email").value,
        //         password: document.querySelector("#password").value
        //     })
        // });

        const request = 
        // JSON.stringify(
            {
            name: document.querySelector("#name").value,
            username: document.querySelector("#username").value,
            email: document.querySelector("#email").value,
            cep: document.querySelector("#cep").value,
            street: document.querySelector("#street").value,
            number: document.querySelector("#number").value,
            city: document.querySelector("#city").value,
            bio: document.querySelector("#bio").value
        }
        // )

        console.log(request);   

        // processar resposta
        // const response = await request.json();

        // if (!response.ok) {
        //     setError(response.message);
        // } else {
        //     window.location.href = "/";
        // }

        // reativar botão
        event.target.disabled = false;
    }

    const cepConsulta = (e) => {

        const cep = document.querySelector("#cep");

        console.log(e)

        const value = cep.value.replace(/[^0-9]+/, '');
        const url = `https://viacep.com.br/ws/${value}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.logradouro) {
                    document.querySelector('#street').value = json.logradouro;
                    document.querySelector('#city').value = json.localidade;
                    document.querySelector('#neighborhood').value = json.bairro;
                } else {
                    console.log("nao acessou");
                }
            });
    }

    return <>
        <form className="row w-100" onSubmit={handleSubmit}>
            <div className="detalhes-foto col-12">
                {/* Foto de Perfil */}
                <div className="row d-flex flex-sm-row flex-column align-items-center">
                    <img src={foto} className="col-6 col-sm-3 col-lg-2 mb-3 mb-sm-0" alt="fotoPerfil" />
                    <div className="col mb-4 mb-sm-0">
                        <div className="row d-flex align-items-center justify-content-around">
                            <button className="col-5 col-sm-4 rounded orange-background text-white border-0 px-1 py-1 px-sm-2 py-sm-1" type="button"
                            /* onClick={handleSubmit} */
                            >Alterar foto de perfil</button>
                            <button className="col-5 col-sm-4 bg-white rounded border-button px-1 py-1 px-sm-2 py-sm-1" type="button"
                            /* onClick={handleSubmit} */
                            /* disabled={!isButtonEnabled} */
                            >Deletar</button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="name">Nome</label>
                <input required type="text" id="name" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="username">Nome de Usuário</label>
                <input required type="text" id="username" className="form-control form-control-md" />
                <span className='help-block' style={{ fontSize: "0.8rem", color: "#1d252c52" }}>URL: https://arqnex.com/matheusmoura</span>
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="email">Email</label>
                <input required type="email" id="email" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="cep">Cep</label>
                <input required type="text" id="cep" className="form-control form-control-md" onBlur={cepConsulta}/>
            </div>

            {/* Adicionar paramentro de numero */}
            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="number">Número</label>
                <input required type="text" id="number" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="street">Rua</label>
                <input required type="text" id="street" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="neighborhood">Bairro</label>
                <input required type="text" id="neighborhood" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="city">Cidade</label>
                <input required type="text" id="city" className="form-control form-control-md" />
            </div>

            {/* Adicionar um parametro de telefone, como (55) 00 0 0000-0000  */}
            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="bio">Biografia</label>
                <textarea required className="form-control" id="bio" rows="3"></textarea>
            </div>

            {/* Campo bibliografia, é um   */}

            <div className="mb-4 col-12 d-flex flex-row-reverse">
                <button className="btn button-create btn-block text-white border-0 col-6 col-lg-4" >Salvar</button>
            </div>

        </form>
    </>
}