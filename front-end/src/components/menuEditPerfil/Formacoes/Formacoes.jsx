import EditarPerfil from '../editarPerfil';
import './Formacoes.css'

function Formacoes() {
    return (
        <div>
            <EditarPerfil />
            <div className='center_area'>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="escolaridade">Escolaridade</label>
                    <input type="text" id="escolaridade" className="form-control form-control-md" />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="formacao">Formação</label>
                    <input type="text" id="formacao" className="form-control form-control-md" />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="escola">Instituição de Ensino</label>
                    <input type="text" id="escola" className="form-control form-control-md" />
                </div>

                {/* Form Select */}
                <div className='select_form'>
                    <label htmlFor="situacao">Situação</label>
                    <br />
                    <select className="situacao" id="situacao">
                        <option value="completo">Completo</option>
                        <option value="incompleto">Incompleto</option>
                        <option value="cursando">Cursando</option>
                    </select>
                </div>
                <div className='box_form'>
                    <div className="form-two_inline">
                        <label className="form-label" htmlFor="anoInicio">Ano de ínicio</label>
                        <input type="text" id="anoInicio" className="form-control form-control-md" />
                    </div>
                    <div className="form-two_inline">
                        <label className="form-label" htmlFor="anoTermino">Ano de Término</label>
                        <input type="text" id="anoTermino" className="form-control form-control-md" />
                    </div>
                    <div className="form-two_inline">
                        <label className="form-label" htmlFor="turno">Turno</label>
                        <input type="text" id="turno" className="form-control form-control-md" />
                    </div>
                    <div className="form-two_inline">
                        <label className="form-label" htmlFor="semestre">Semestre</label>
                        <input type="text" id="semestre" className="form-control form-control-md" />
                    </div>
                </div>
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
    )
}

export default Formacoes;