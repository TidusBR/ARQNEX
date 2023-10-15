import { useEffect, useState } from "react";

export default function ExperiencesForm() {

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
                cargo: document.querySelector("#cargo-" + index).value,
                empresa: document.querySelector("#empresa-" + index).value,
                telEmpresa: document.querySelector("#telEmpresa-" + index).value,
                remuneracao: document.querySelector("#remuneracao-" + index).value,
                dataAdmissao: document.querySelector("#dataAdmissao-" + index).value,
                dataSaida: document.querySelector("#dataSaida-" + index).value
            }
        })


        console.log(request);
    }


    return <form className="w-100" onSubmit={handleSubmit}>
        {listForm.map((form, index) => (
            <div key={index} className="row">
                <div className="mb-4 col-12">
                    <label className="form-label fw-bold" htmlFor={"cargo-"+index}>Cargo</label>
                    <input required type="text" id={"cargo-"+index} className="form-control form-control-md" />
                </div>

                <div className="mb-4 col-12">
                    <label className="form-label fw-bold" htmlFor={"empresa-"+index}>Empresa</label>
                    <input required type="text" id={"empresa-"+index} className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"telEmpresa-"+index}>Telefone da empresa</label>
                    <input required type="text" id={"telEmpresa-"+index} className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"remuneracao-"+index}>Remuneração</label>
                    <input required type="text" id={"remuneracao-"+index} className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"dataAdmissao-"+index}>Data de Admissão</label>
                    <input required type="date" id={"dataAdmissao-"+index} className="form-control form-control-md" />
                </div>

                <div className="col-12 col-sm-6 mb-4">
                    <label className="form-label fw-bold" htmlFor={"dataSaida-"+index}>Data de saída</label>
                    <input required type="date" id={"dataSaida-"+index} className="form-control form-control-md" />
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