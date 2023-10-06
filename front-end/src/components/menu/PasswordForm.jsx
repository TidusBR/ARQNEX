import { useState } from "react"

export default function PasswordForm() {

  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault( )
    
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;

    if(password === confirmPassword) {
      const request = {
        password: password
      }

      console.log(request);
    }
  }

  return <form className="w-100 row" onSubmit={handleSubmit}>
    <div className="mb-4 col-12">
      <label className="form-label fw-bold" htmlFor="password">Nova Senha</label>
      <input type="password" required id="password" className="form-control form-control-md" />
    </div>
    <div className="mb-4 col-12">
      <label className="form-label fw-bold" htmlFor="confirm-password">Digite novamente a senha</label>
      <input type="password" required id="confirmPassword" className="form-control form-control-md" />
    </div>
    <div className="mb-4 col-12 d-flex flex-row-reverse">
      <button className="btn button-create btn-block text-white border-0 col-6 col-lg-4 " type="submit"
      /* onClick={handleSubmit} */
      >Salvar</button>
    </div>
  </form>
}