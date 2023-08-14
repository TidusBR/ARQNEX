import { useState } from 'react';
import fotoRegister from "../assets/foto-register.jpg";
import "./css/register.css";
import { config } from '../config';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // desativar botão
    event.target.disabled = true;

    // enviar solicitação de cadastro
    const request = await fetch(`${config.api}${config.endpoints.account.signup}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(formData)
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

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className='container-register'>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 text-black">

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                <form>

                  <h3 className="fw-normal mb-3 pb-3">Registre-se</h3>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">Nome</label>
                    <input type="text" id="name" className="form-control form-control-md"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="profileName">Nome de perfil</label>
                    <input type="text" id="profileName" className="form-control form-control-md"
                      value={formData.profileName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="account-type">Tipo de conta</label>
                    <select className="form-select form-control form-control-md">
                      <option value="architect">Arquiteto</option>
                      <option value="office">Escritório</option>
                    </select>
                  </div>



                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">CPF</label>
                    <input type="text" id="cpf" className="form-control form-control-md"
                      value={formData.cpf}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Endereço de email</label>
                    <input type="email" id="email" className="form-control form-control-md"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Senha</label>
                    <input type="password" id="password" className="form-control form-control-md"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  {
                  error !== undefined &&
                  <div className="form-outline mb-4">
                    <label style={{color: "red"}}>{error}</label>
                  </div>
                  }
                  <div className="pt-1 mb-4">
                    <button className="btn btn-info btn-lg btn-block text-white bg-warning border-0" type="button"
                      onClick={handleSubmit}
                    >Criar conta</button>
                  </div>

                  <p className="small mb-5 pb-lg-2"><a className="text-decoration-none link-info" href="#!">Esqueceu a senha?</a></p>
                  <p>Não possui conta? <a href="#!" className="text-decoration-none link-info">Inscreva-se aqui</a></p>

                </form>

              </div>

            </div>
            <div className="col-sm-8 px-0 d-none d-sm-block">
              <img src={fotoRegister}
                alt="Login image" className="w-100 h-100"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}