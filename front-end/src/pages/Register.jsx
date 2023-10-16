import { useState } from 'react';
import fotoRegister from "../assets/0003 - Cadastro 2/House-Modern-House-3D-Architectural-Rendering.png";
import "./css/register.css";
import { config } from '../config';
import { DoLogin, FacebookProvider, GoogleProvider } from '../firebase';

export default function Register() {
  // Estado que guarda mensagem de erro
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // desativar botão
    event.target.disabled = true;

    /**
     * Não é mais necessário pois o formulário está fazendo a validação usando o atributo required nos campos de input
    if(
      !(
        document.querySelector("#name").value &&
        document.querySelector("#username").value &&
        document.querySelector("#cpf").value &&
        document.querySelector("#email").value &&
        document.querySelector("#password").value
      )
    ) {
      event.target.disabled = false;
      setError("Preencha todos os campos!");
      return;
    }
    **/
    
    // enviar solicitação de cadastro
    const request = await fetch(`${config.api}${config.endpoints.account.signup}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          name: document.querySelector("#name").value,
          username: document.querySelector("#username").value,
          cpf: document.querySelector("#cpf").value,
          email: document.querySelector("#email").value,
          password: document.querySelector("#password").value
        })
    });

    // processar resposta
    const response = await request.json();
    
    if (!response.ok) {
        setError(response.message);
    } else {
        window.location.href = "/";
    }

    // reativar botão
    event.target.disabled = false;
  }

  return (
    <div className='container-register'>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-6 text-black">

              <div className="d-flex align-items-center h-custom-2 px-2 px-sm-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

              <form className='w-100' onSubmit={handleSubmit} action='/'>
                  <p className='span-subtitle mb-2'>Junte-se a Arqnex</p>
                  <h3 className="fw-normal mb-3 pb-3">Cadastro</h3>

                  <div className='d-flex justify-content-between'>
                    <button onClick={async () => {
                        const err = await DoLogin(FacebookProvider);
                        
                        if (err !== undefined) {
                            setError(err);
                        }
                    }} className='button-facebook d-flex justify-content-around align-items-center btn btn-primary border-0'>
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 10.472 10.472">
                          <path id="facebook" d="M9.062,0H1.413A1.411,1.411,0,0,0,0,1.411V9.061a1.411,1.411,0,0,0,1.411,1.411H5.186L5.192,6.73H4.22A.229.229,0,0,1,3.991,6.5l0-1.206a.229.229,0,0,1,.229-.23h.97V3.9A1.9,1.9,0,0,1,7.218,1.81h.99a.229.229,0,0,1,.229.229V3.057a.229.229,0,0,1-.229.229H7.6c-.656,0-.783.312-.783.769V5.065H8.26a.229.229,0,0,1,.228.256L8.344,6.527a.229.229,0,0,1-.228.2H6.824l-.006,3.742H9.063a1.411,1.411,0,0,0,1.411-1.411V1.411A1.411,1.411,0,0,0,9.062,0Z" transform="translate(-0.002 0)" fill="#fff"/>
                        </svg>
                      </i>
                      Cadastrar com o Facebook
                    </button>
                    <button onClick={async () => {
                        const err = await DoLogin(GoogleProvider);
                        
                        if (err !== undefined) {
                            setError(err);
                        }
                    }} className='button-google d-flex justify-content-around align-items-center btn btn-primary border-0'>
                      <i>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path id="ic_google" d="M.953,11.791h0A8,8,0,0,1,13.106,1.842L10.515,3.964A4.757,4.757,0,0,0,3.5,6.455h0a4.774,4.774,0,0,0,.045,3.214h0A4.758,4.758,0,0,0,10.4,12.105h0A4.768,4.768,0,0,0,12.454,9.67H8.176V6.506H15.86a8,8,0,0,1-2.852,7.733h0A8,8,0,0,1,.953,11.791Z" fill="#fff"/>
                      </svg>
                      </i>
                      Cadastrar com o Google
                    </button>
                  </div>

                  <p className='span-subtitle my-4 text-center'>Ou cadastre com email</p>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">Nome</label>
                    <input type="text" id="name" className="form-control form-control-md" required/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">Nome de Usuário</label>
                    <input type="text" id="username" pattern="[^\s]+" title="Não use espaçamentos" className="form-control form-control-md" required/>
                  </div>
                  {/*
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="account-type">Tipo de conta</label>
                    <select className="form-select form-control form-control-md">
                      <option value="architect">Arquiteto</option>
                      <option value="office">Escritório</option>
                    </select>
                  </div>
                  */} 


                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="cpf">CPF</label>
                    <input
                      type="text"
                      id="cpf"
                      pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                      title="Digite um CPF no formato: xxx.xxx.xxx-xx"
                      maxLength="14"
                      className="form-control form-control-md"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g,"").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2");
                      }}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Endereço de email</label>
                    <input type="email" id="email" pattern="/[^\s]+^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" className="form-control form-control-md" required/>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Senha</label>
                    <input type="password" id="password" minLength="6" className="form-control form-control-md" required/>
                  </div>

                  <div className="form-outline mb-4 d-flex align-items-center">
                    <input type="checkbox" id="accept-eula" className="form-control-md checkbox me-3" required/>
                    <label className="form-label m-0" htmlFor="accept-eula">Ao criar minha conta eu aceito os <span style={{color: "#DB752C"}}>Termos de Uso</span> e <span style={{color: "#DB752C"}}>Política de Privacidade</span>.</label>
                  </div>

                  {
                  error &&
                  <div className="alert alert-danger mb-4" role="alert">
                    {error}
                  </div>
                  }

                  <div className="pt-1 mb-4">
                    <button className="btn button-create btn-block text-white border-0" type="submit">Criar conta</button>
                  </div>
                </form>

              </div>

            </div>
            <div className="d-md-none d-lg-block col-lg-6 px-0 d-none">
              <img src={fotoRegister}
                alt="Login image" className="w-100 h-100"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}