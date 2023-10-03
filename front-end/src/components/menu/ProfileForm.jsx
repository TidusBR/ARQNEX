import foto from "../../assets/fotoPerfil.png"
import "../../pages/css/edit-profile.css"

export default function ProfileForm() {
    console.log(foto);
    return <>
        <form className="row w-100">
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
                <input type="text" id="name" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="username">Nome de Usuário</label>
                <input type="text" id="username" className="form-control form-control-md" />
                <span className='help-block' style={{fontSize: "0.8rem", color: "#1d252c52"}}>URL: https://arqnex.com/matheusmoura</span>
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="cep">Cep</label>
                <input type="text" id="cep" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="rua">Rua</label>
                <input type="text" id="rua" className="form-control form-control-md" />
            </div>
            {/* Adicionar paramentro de numero */}
            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="numero-casa">Número</label>
                <input type="text" id="numero-casa" className="form-control form-control-md" />
            </div>

            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="cidade">Cidade</label>
                <input type="text" id="cidade" className="form-control form-control-md" />
            </div>

            {/* Adicionar um parametro de telefone, como (55) 00 0 0000-0000  */}
            <div className="mb-4 col-12">
                <label className="form-label fw-bold" htmlFor="bio">Biografia</label>
                <textarea className="form-control" id="bio" rows="3"></textarea>
            </div>

            {/* Campo bibliografia, é um   */}

            <div className="mb-4 col-12 d-flex flex-row-reverse">
                <button className="btn button-create btn-block text-white border-0 col-6 col-lg-4" type="button"
                /* onClick={handleSubmit} */
                >Salvar</button>
            </div>

        </form>
    </>
}