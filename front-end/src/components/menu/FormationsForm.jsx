import { useState } from "react";

export default function FormationsForm() {

    const [situacao, setSituacao] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault()
        
        event.target.disabled = true;

        

        const request = 
        // JSON.stringify(
            {
            escolaridade: document.querySelector("#escolaridade").value,
            formacao: document.querySelector("#formacao").value,
            escola: document.querySelector("#escola").value,
            anoInicio: document.querySelector("#anoInicio").value,
            anoTermino: document.querySelector("#anoTermino").value,
            turno: document.querySelector("#turno").value,
            semestre: document.querySelector("#semestre").value,
            situacao: situacao
        }

        console.log(request);
        // )
    }

    return <form className="w-100 row" onSubmit={handleSubmit}>

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="escolaridade">Escolaridade</label>
            <input required type="text" id="escolaridade" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="formacao">Formação</label>
            <input required type="text" id="formacao" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label className="form-label fw-bold" htmlFor="escola">Instituição de Ensino</label>
            <input required type="text" id="escola" className="form-control form-control-md" />
        </div>

        <div className="mb-4 col-12">
            <label htmlFor="situacao" className="fw-bold">Situação</label>
            <select required className="form-select" id="situacao" onChange={
                (e) => {
                    console.log(e.target.value)
                    setSituacao(e.target.value)
                }
            }>
                <option value="" hidden></option>
                <option value="Incompleto">Incompleto</option>
                <option value="Cursando">Cursando</option>
                <option value="Completo">Completo</option>
            </select>
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="anoInicio">Ano de ínicio</label>
            <input required type="number" id="anoInicio" className="form-control form-control-md" />
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="anoTermino">Ano de Término</label>
            <input required type="number" id="anoTermino" className="form-control form-control-md" />
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="turno">Turno</label>
            <input required type="text" id="turno" className="form-control form-control-md" />
        </div>

        <div className="col-12 col-sm-6 mb-4">
            <label className="form-label fw-bold" htmlFor="semestre">Semestre</label>
            <input required type="text" id="semestre" className="form-control form-control-md" />
        </div>

        <div className="d-flex justify-content-between flex-column flex-md-row">
            <button className="btn btn-block col-12 col-md-4 mb-3 mb-md-0" style={{border: "dashed 1px #dee2e6"}} type="button">Adicionar mais</button>
            <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="submit">Salvar</button>
        </div>
    </form>
}