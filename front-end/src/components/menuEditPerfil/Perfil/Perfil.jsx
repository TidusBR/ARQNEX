import EditarPerfil from '../editarPerfil';
import './Perfil.css';


function Perfil() {
    return (
        <div>
            <EditarPerfil />
            <div className='center_area'>
                {/* Você está na página Perfil
                <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iste reprehenderit iusto est eveniet nisi molestias provident dignissimos obcaecati id? Deleniti assumenda quasi officiis id facilis, modi ipsum tempora praesentium. */}
                <section>
                    <form action="form_perfil">
                        <div className="detalhes-foto">
                            {/* Upload foto perfil */}
                            <button className="button-save-interest bg-white rounded p-2 px-5 mb-4" type="button"
                            /* onClick={handleSubmit} */
                            /* disabled={!isButtonEnabled} */
                            >Alterar foto de perfil</button>

                            {/* Ambos a seguir possuem o mesmo tamanho */}
                            <button className="button-save-interest bg-white rounded p-2 px-5 mb-4" type="button"
                            /* onClick={handleSubmit} */
                            /* disabled={!isButtonEnabled} */
                            >Deletar</button>
                            <button className="button-save-interest bg-white rounded p-2 px-5 mb-4" type="button"
                            /* onClick={handleSubmit} */
                            /* disabled={!isButtonEnabled} */
                            >Desconectar</button>
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

                        <button className="button-save-interest bg-white rounded p-2 px-5 mb-4" type="button"
                        /* onClick={handleSubmit} */
                        /* disabled={!isButtonEnabled} */
                        >Salvar</button>

                    </form>
                </section>
            </div>
        </div>
    )
}

export default Perfil;