import { useEffect, useState } from "react";

export default function FormationsForm() {

    const [listForm, setListForm] = useState([{}])

    useEffect(() => {
    }, [])

    const handleAddMore = () => {
        setListForm([...listForm, {}]);
        
        if(listForm.length > 1) {
            document.querySelector("#addMore").disabled = true
        }
    } 

    const handleSubmit = (event) => {

        event.preventDefault()
        
        event.target.disabled = true;

        const request = listForm.map((form, index) => {
            return {
                escolaridade: document.querySelector("#escolaridade-"+index).value,
                formacao: document.querySelector("#formacao-"+index).value,
                escola: document.querySelector("#escola-"+index).value,
                anoInicio: document.querySelector("#anoInicio-"+index).value,
                anoTermino: document.querySelector("#anoTermino-"+index).value,
                turno: document.querySelector("#turno-"+index).value,
                semestre: document.querySelector("#semestre-"+index).value,
                situacao: document.querySelector("#situacao-"+index).value
            }
        })

        console.log(request);

        // const request = 
        // // JSON.stringify(
        //     {
            // escolaridade: document.querySelector("#escolaridade").value,
            // formacao: document.querySelector("#formacao").value,
            // escola: document.querySelector("#escola").value,
            // anoInicio: document.querySelector("#anoInicio").value,
            // anoTermino: document.querySelector("#anoTermino").value,
            // turno: document.querySelector("#turno").value,
            // semestre: document.querySelector("#semestre").value,
            // situacao: situacao
        // }

        // console.log(request);
        // )
    }

    return <form className="w-100" onSubmit={handleSubmit}>
        {listForm.map((form, index) => (
            <div key={index} className="row">
                <div className="mb-4 col-12">
                    <label className="form-label fw-bold" htmlFor={"escolaridade-"+index}>Escolaridade</label>
                    <input required type="text" id={"escolaridade-"+index} className="form-control form-control-md" />
                </div>

                <div className="mb-4 col-12">
                    <label className="form-label fw-bold" htmlFor={"formacao-"+index}>Formação</label>
                    <input required type="text" id={"formacao-"+index} className="form-control form-control-md" />
                </div>

                <div className="mb-4 col-12">
                    <label className="form-label fw-bold" htmlFor={"escola-"+index}>Instituição de Ensino</label>
                    <input required type="text" id={"escola-"+index} className="form-control form-control-md" />
                </div>

                <div className="mb-4 col-12">
                    <label htmlFor={"situacao-"+index} className="fw-bold">Situação</label>
                    <select required className="form-select" id={"situacao-"+index}>
                        <option value="" hidden></option>
                        <option value="Incompleto">Incompleto</option>
                        <option value="Cursando">Cursando</option>
                        <option value="Completo">Completo</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"anoInicio-"+index}>Ano de ínicio</label>
                    <input required type="number" id={"anoInicio-"+index} className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"anoTermino-"+index}>Ano de Término</label>
                    <input required type="number" id={"anoTermino-"+index} className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"turno-"+index}>Turno</label>
                    <input required type="text" id={"turno-"+index} className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"semestre-"+index}>Semestre</label>
                    <input required type="text" id={"semestre-"+index} className="form-control form-control-md" />
                </div>
            </div>
        ))}

        
        <div className="row">
            <div className="col">
                <div className="d-flex justify-content-between flex-column flex-md-row">
                    <button className="btn btn-block col-12 col-md-4 mb-3 mb-md-0" style={{border: "dashed 1px #dee2e6"}} type="button"
                    onClick={handleAddMore} id="addMore"
                    >Adicionar mais</button>
                    <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="submit">Salvar</button>
                </div>
            </div>
        </div>
        
    </form>
}