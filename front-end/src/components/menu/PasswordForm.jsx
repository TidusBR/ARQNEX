export default function PasswordForm() {
    return <>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name">Nova Senha</label>
          <input type="text" id="name" className="form-control form-control-md" />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name">Digite novamente a senha</label>
          <input type="text" id="name" className="form-control form-control-md" />
        </div>
        <div className="button-form pt-1 mb-4">
          <button className="btn button-create btn-block text-white border-0" type="button"
          /* onClick={handleSubmit} */
          >Salvar</button>
        </div>
    </>
}