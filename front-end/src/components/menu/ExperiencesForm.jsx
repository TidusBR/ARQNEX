export default function ExperiencesForm() {
    return <form className="w-100 row">

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="cargo">Cargo</label>
            <input type="text" id="cargo" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="empresa">Empresa</label>
            <input type="text" id="empresa" className="form-control form-control-md" />
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="telEmpresa">Telefone da empresa</label>
            <input type="text" id="telEmpresa" className="form-control form-control-md" />
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="remuneracao">Remuneração</label>
            <input type="text" id="remuneracao" className="form-control form-control-md" /> 
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="dataAdmissao">Data de Admissão</label>
            <input type="text" id="dataAdmissao" className="form-control form-control-md" />
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="dataSaida">Data de saída</label>
            <input type="text" id="dataSaida" className="form-control form-control-md" />   
        </div>

        <div className="d-flex justify-content-between flex-column flex-md-row">
            <button className="btn btn-block col-12 col-md-4 mb-3 mb-md-0" style={{border: "dashed 1px #dee2e6"}} type="button">Adicionar mais</button>
            <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="button">Salvar</button>
        </div>
    </form>
}