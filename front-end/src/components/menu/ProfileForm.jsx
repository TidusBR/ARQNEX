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
                    {/* <div className="col">
                        <button className="col bg-white rounded border-button py-2 px-3" type="button"
                            /* onClick={handleSubmit} 
                            /* disabled={!isButtonEnabled} 
                            >Desconectar</button>
                    </div> */}
                </div>
            </div>

            {/* mudar o class name pra algum baseado no form do perfil
                Os quatro primeiros campos, que vão até o fim da tela
                alterar os primeiros campos de acordo com o que foi feito com a pagina register
                */}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">Nome</label>
                <input type="text" id="name" className="form-control form-control-md" />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="username">Nome de Usuário</label>
                <input type="text" id="username" className="form-control form-control-md" />
                <span className='help-block'>URL: https://arqnex.com/matheusmoura</span>
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="text" id="email" className="form-control form-control-md" />
            </div>




            {/* Os quatro ultimos campos são a seguir, sendo dois deles por linha  
                Adicionar os paramentros de cep como 000000-00
                */}
            <div className='box_form'>
                <div className="form-two_inline">
                    <label className="form-label" htmlFor="cep">Cep</label>
                    <input type="text" id="cep" className="form-control form-control-md" />
                </div>

                <div className="form-two_inline">
                    <label className="form-label" htmlFor="rua">Rua</label>
                    <input type="text" id="rua" className="form-control form-control-md" />
                </div>
                {/* Adicionar paramentro de numero */}
                <div className="form-two_inline">
                    <label className="form-label" htmlFor="numero-casa">Número</label>
                    <input type="text" id="numero-casa" className="form-control form-control-md" />
                </div>

                <div className="form-two_inline">
                    <label className="form-label" htmlFor="cidade">Cidade</label>
                    <input type="text" id="cidade" className="form-control form-control-md" />
                </div>
            </div>

            {/* Adicionar um parametro de telefone, como (55) 00 0 0000-0000  */}
            <div className="form-two_inline">
                <label htmlFor="form-label-txarea">Biografia</label>
                <textarea name="form-label-txarea" id="*"></textarea>
            </div>


            {/* Campo bibliografia, é um   */}

            <div className="button-form pt-1 mb-4">
                <button className="btn button-create btn-block text-white border-0" type="button"
                /* onClick={handleSubmit} */
                >Salvar</button>
            </div>

        </form>
    </>
}