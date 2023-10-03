export default function FormationsForm() {
    return <form className="w-100 row">

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="escolaridade">Escolaridade</label>
            <input type="text" id="escolaridade" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="formacao">Formação</label>
            <input type="text" id="formacao" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="escola">Instituição de Ensino</label>
            <input type="text" id="escola" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label htmlFor="situacao" className="fw-bold">Situação</label>
            <select required className="form-select" id="situacao">
                <option value="" hidden></option>
                <option value="Incompleto">Incompleto</option>
                <option value="Cursando">Cursando</option>
                <option value="Completo">Completo</option>
            </select>
        </div>
        
        {/* <div className="col-12 mb-4">
            <div className="row mb-4">
                <div className="col-12 col-sm-6 mb-4 mb-sm-0">
                    <label className="form-label" htmlFor="anoInicio">Ano de ínicio</label>
                    <input type="number" id="anoInicio" className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6">
                    <label className="form-label" htmlFor="anoTermino">Ano de Término</label>
                    <input type="number" id="anoTermino" className="form-control form-control-md" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 mb-4 mb-sm-0">
                    <label className="form-label" htmlFor="turno">Turno</label>
                    <input type="text" id="turno" className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6">
                    <label className="form-label" htmlFor="semestre">Semestre</label>
                    <input type="text" id="semestre" className="form-control form-control-md" />
                </div>
            </div>
        </div> */}

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor="anoInicio">Ano de ínicio</label>
                <input type="number" id="anoInicio" className="form-control form-control-md" />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor="anoTermino">Ano de Término</label>
                <input type="number" id="anoTermino" className="form-control form-control-md" />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor="turno">Turno</label>
                <input type="text" id="turno" className="form-control form-control-md" />
            </div>

            <div className="col-12 col-sm-6 mb-4">
                <label className="form-label fw-bold" htmlFor="semestre">Semestre</label>
                <input type="text" id="semestre" className="form-control form-control-md" />
            </div>

        <div className="d-flex justify-content-between flex-column flex-md-row">
            <button className="btn btn-block col-12 col-md-4 mb-3 mb-md-0" style={{border: "dashed 1px #dee2e6"}} type="button">Adicionar mais</button>
            <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="button">Salvar</button>
        </div>
    </form>
}