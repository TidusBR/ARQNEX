import foto from "../assets/Dashboard/Elizabeth_in_love_with_sky_01__00000.png"
import InputFileJob from "../components/input_file_job/InputFileJob"
import './css/upload-details.css'

export default function UploadDetails() {
    return (
        <div className="container-upload-details">
            <div className="row">
                <div className="col-10 col-sm-8  m-auto my-5">
                    <div className="row">
                        <div className="col-sm">
                            <h1 className="fw-bold">Adicionar detalhes</h1>
                            <h2>Fale mais sobre seu trabalho.</h2>
                        </div>
                    </div>
                    <form action="" className="w-100">
                        <div className="row">
                            <div className="col-md">
                                <img src={foto} alt="" className="w-100"/>
                                <label className="form-label fw-bold">Anexos <span className="pro-style">PRO</span></label>
                                <div className="row">
                                    <div className="col-sm d-flex align-items-center justify-content-center">
                                        <InputFileJob></InputFileJob>
                                    </div>
                                    <div className="col-sm d-flex align-items-center justify-content-center">
                                        <InputFileJob></InputFileJob>
                                    </div>
                                    <div className="col-sm d-flex align-items-center justify-content-center">
                                        <InputFileJob></InputFileJob>
                                    </div>
                                    <div className="col-sm d-flex align-items-center justify-content-center">
                                        <InputFileJob></InputFileJob>
                                    </div>
                                    <div className="col-sm d-flex align-items-center justify-content-center">
                                        <InputFileJob></InputFileJob>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="form-outline mb-3">
                                    <label className="form-label fw-bold" htmlFor="username">Título</label>
                                    <input type="text" id="username" pattern="[^\s]+" title="Não use espaçamentos" className="form-control form-control-md" required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Softwares</label>
                                    <select class="form-select">
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <div className="col-sm">
                                        
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Estilos</label>
                                    <select className="form-select">
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Projeto</label>
                                    <select className="form-select">
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tipo</label>
                                    <select className="form-select">
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label for="descricao" className="form-label fw-bold">Descrição</label>
                                    <textarea className="form-control" id="descricao" rows="3"></textarea>
                                </div>
                                <div className="">
                                    <button className="rounded fw-bold me-3 border-0 text-white py-2 px-5 button-publicar mb-3">
                                        Publicar
                                    </button>
                                    <button className="rounded fw-bold p-2 bg-white button-cancelar">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}