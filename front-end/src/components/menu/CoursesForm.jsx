export default function CoursesForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const request = {
            curso: document.querySelector("#curso").value,
            instituicao: document.querySelector("#instituicao").value,
            cargaHoraria: document.querySelector("#cargaHoraria").value,
            anoConclusao: document.querySelector("#anoConclusao").value
        }

        console.log(request);
    }

    return <form className="w-100 row" onSubmit={handleSubmit}>

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="curso">Curso</label>
            <input required type="text" id="curso" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="instituicao">Instituição</label>
            <input required type="text" id="instituicao" className="form-control form-control-md" />
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="cargaHoraria">Carga horária</label>
            <input required type="number" id="cargaHoraria" className="form-control form-control-md" placeholder="Quantidade de horas"/>
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="anoConclusao">Ano de conclusão</label>
            <input required type="number" id="anoConclusao" className="form-control form-control-md" />
        </div>

        <div className="d-flex justify-content-between flex-column flex-md-row">
            <button className="btn btn-block col-12 col-md-4 mb-3 mb-md-0" style={{border: "dashed 1px #dee2e6"}} type="button">Adicionar mais</button>
            <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="submit">Salvar</button>
        </div>
    </form>
}