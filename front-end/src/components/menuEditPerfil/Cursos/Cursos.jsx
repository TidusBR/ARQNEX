import EditarPerfil from '../editarPerfil';
import '../Senha/Senha.css'
import '../Cursos/Cursos.css'

function Cursos() {
    return (
        <div>
            <EditarPerfil />
            <div className='center_area'>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="curso">Curso</label>
                    <input type="text" id="curso" className="form-control form-control-md" />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="instituicao">Instituição</label>
                    <input type="text" id="instituicao" className="form-control form-control-md" />
                </div>

                <div className='box_form'>
                    <div className="form-two_inline">
                        <label className="form-label" htmlFor="cargaHoraria">Carga horária</label>
                        <input type="text" id="cargaHoraria" className="form-control form-control-md" />
                    </div>
                    <div className="form-two_inline">
                        <label className="form-label" htmlFor="anoConclusao">Ano de conclusão</label>
                        <input type="text" id="anoConclusao" className="form-control form-control-md" />
                    </div>

                    {/* Botão Adicionar Mais e Salvar */}
                    <div className="button_add_mais">
                        <button className="btn_add_mais btn-block text-black border-dashed" type="button"
                        /* onClick={handleSubmit} */
                        >Adicionar mais</button>
                    </div>
                    <div className="button-form pt-1 mb-4">
                        <button className="btn_salvar button-create btn-block text-white border-0" type="button"
                        /* onClick={handleSubmit} */
                        >Salvar</button>
                    </div>
                </div>
            </div>
        </div>

        /* Elementos Inline */

    )
}

export default Cursos;