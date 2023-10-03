export default function CoursesForm() {
    return <form className="w-100 row">
        <div className="mb-4 col-12">
            <label className="form-label" htmlFor="curso">Curso</label>
            <input type="text" id="curso" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label className="form-label" htmlFor="instituicao">Instituição</label>
            <input type="text" id="instituicao" className="form-control form-control-md" />
        </div>

        <div className='mb-4 col-12'>
            <div className="row">
                <div className="col-12 col-sm-6  mb-4 mb-sm-0">
                    <label className="form-label" htmlFor="cargaHoraria">Carga horária</label>
                    <input type="text" id="cargaHoraria" className="form-control form-control-md" />
                </div>
                <div className="col-12 col-sm-6">
                    <label className="form-label" htmlFor="anoConclusao">Ano de conclusão</label>
                    <input type="number" id="anoConclusao" className="form-control form-control-md" />
                </div>
            </div>
        </div>

        <div className="d-flex justify-content-between flex-column flex-md-row">
            <button className="btn btn-block col-12 col-md-4 mb-3 mb-md-0" style={{border: "dashed 1px #dee2e6"}} type="button">Adicionar mais</button>
            <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="button">Salvar</button>
        </div>
    </form>
}