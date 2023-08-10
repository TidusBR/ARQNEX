import React, {useState} from 'react';
import fotoRegister from "../assets/foto-register.jpg";
import "./css/register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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
              <div className="col-sm-6 text-black">

                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                  <form>

                    <h3 className="fw-normal mb-3 pb-3">Registre-se</h3>

                    <div className="form-outline mb-4">
                      <input type="text" id="username" className="form-control form-control-lg" 
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                      <label className="form-label" htmlFor="username">Nome</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="text" id="nickname" className="form-control form-control-lg" 
                        value={formData.nickname}
                        onChange={handleInputChange}
                      />
                      <label className="form-label" htmlFor="nickname">Nome de perfil</label>
                    </div>

                    <div className="form-outline mb-4">
                        <select className="form-select form-control form-control-lg" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                      <label className="form-label" htmlFor="nickname">Nome de perfil</label>
                    </div>

                    

                    <div className="form-outline mb-4">
                      <input type="text" id="cpf" className="form-control form-control-lg" 
                        value={formData.cpf}
                        onChange={handleInputChange}
                      />
                      <label className="form-label" htmlFor="name">CPF</label>
                    </div>
                    
                    <div className="form-outline mb-4">
                      <input type="email" id="email" className="form-control form-control-lg" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <label className="form-label" htmlFor="email">Endereço de email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" id="password" className="form-control form-control-lg" 
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <label className="form-label" htmlFor="password">Senha</label>
                    </div>

                    <div className="pt-1 mb-4">
                      <button className="btn btn-info btn-lg btn-block text-white bg-warning border-0" type="button"
                        onClick={handleSubmit}
                      >Entrar</button>
                    </div>

                    <p className="small mb-5 pb-lg-2"><a className="text-decoration-none link-info" href="#!">Esqueceu a senha?</a></p>
                    <p>Não possui conta? <a href="#!" className="text-decoration-none link-info">Inscreva-se aqui</a></p>

                  </form>

                </div>

              </div>
              <div className="col-sm-6 px-0 d-none d-sm-block">
                <img src={fotoRegister}
                  alt="Login image" className="w-100 h-100"/>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}