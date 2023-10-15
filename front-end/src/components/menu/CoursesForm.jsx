import { useEffect, useState } from "react";

export default function CoursesForm() {

    const [listForm, setListForm] = useState([{}])

    useEffect(() => {
    }, [])

    const handleAddMore = () => {
        setListForm([...listForm, {}]);

        if (listForm.length > 1) {
            document.querySelector("#addMore").disabled = true
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        e.target.disabled = true;

        const request = listForm.map((form, index) => {
            return {
                curso: document.querySelector("#curso-" + index).value,
                instituicao: document.querySelector("#instituicao-" + index).value,
                cargaHoraria: document.querySelector("#cargaHoraria-" + index).value,
                anoConclusao: document.querySelector("#anoConclusao-" + index).value
            }
        })

        console.log(request);
    }

    return <form className="w-100" onSubmit={handleSubmit}>
        {listForm.map((form, index) => (
            <div key={index} className="row">
                <div className="mb-4 col-12">
                    <label className="form-label fw-bold" htmlFor={"curso-" + index}>Curso</label>
                    <input required type="text" id={"curso-" + index} className="form-control form-control-md" />
                </div>

                <div className="mb-4 col-12">
                    <label className="form-label fw-bold" htmlFor={"instituicao-" + index}>Instituição</label>
                    <input required type="text" id={"instituicao-" + index} className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"cargaHoraria-" + index}>Carga horária</label>
                    <input required type="number" id={"cargaHoraria-" + index} className="form-control form-control-md" placeholder="Quantidade de horas" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"anoConclusao-" + index}>Ano de conclusão</label>
                    <input required type="number" id={"anoConclusao-" + index} className="form-control form-control-md" />
                </div>
            </div>
        ))}

        <div className="row">
            <div className="col">
                <div className="d-flex justify-content-between flex-column flex-md-row">
                    <button className="btn btn-block col-12 col-md-4 mb-3 mb-md-0" style={{ border: "dashed 1px #dee2e6" }}
                        id="addMore" type="button" onClick={handleAddMore}>Adicionar mais</button>
                    <button className="btn button-create btn-block text-white border-0 col-12 col-md-4 " type="submit">Salvar</button>
                </div>
            </div>
        </div>

    </form>
}