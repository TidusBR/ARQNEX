export default function PasswordForm() {
    
    
    return <form className="w-100 row">
        <div className="mb-4 col-12">
          <label className="form-label" htmlFor="password">Nova Senha</label>
          <input type="text" id="password" className="form-control form-control-md" />
        </div>
        <div className="mb-4 col-12">
          <label className="form-label" htmlFor="confirm-password">Digite novamente a senha</label>
          <input type="text" id="confirm-passowrd" className="form-control form-control-md" />
        </div>
        <div className="mb-4 col-12 d-flex flex-row-reverse">
            <button className="btn button-create btn-block text-white border-0 col-6 col-lg-4 " type="button"
            /* onClick={handleSubmit} */
            >Salvar</button>
        </div>
    </form>
}