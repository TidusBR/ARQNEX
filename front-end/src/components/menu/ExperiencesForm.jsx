export default function ExperiencesForm() {
    return <>
        <div className="form-outline mb-4">
            <label className="form-label" htmlFor="cargo">Cargo</label>
            <input type="text" id="cargo" className="form-control form-control-md" />
        </div>

        <div className="form-outline mb-4">
            <label className="form-label" htmlFor="empresa">Empresa</label>
            <input type="text" id="empresa" className="form-control form-control-md" />
        </div>

        <div className='box_form'>
            <div className="form-two_inline">
                <label className="form-label" htmlFor="telEmpresa">Telefone da empresa</label>
                <input type="text" id="telEmpresa" className="form-control form-control-md" />
            </div>
            <div className="form-two_inline">
                <label className="form-label" htmlFor="remuneracao">Remuneração</label>
                <input type="text" id="remuneracao" className="form-control form-control-md" />
            </div>
            <div className="form-two_inline">
                <label className="form-label" htmlFor="dataAdmissao">Data de Admissão</label>
                <input type="text" id="dataAdmissao" className="form-control form-control-md" />
            </div>
            <div className="form-two_inline">
                <label className="form-label" htmlFor="dataSaida">Data de saída</label>
                <input type="text" id="dataSaida" className="form-control form-control-md" />
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
    </>
}