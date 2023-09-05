import EditarPerfil from '../editarPerfil'

function Interesses() {
    return (
        <div>
            <EditarPerfil />
            <div className='center_area'>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="software">Software</label>
                    <input type="text" id="software" className="form-control form-control-md" />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="estilo">Estilo</label>
                    <input type="text" id="estilo" className="form-control form-control-md" />
                </div>
                <br />
                <div className="button-form pt-1 mb-4">
                    <button className="btn_salvar button-create btn-block text-white border-0" type="button"
                    /* onClick={handleSubmit} */
                    >Salvar</button>
                </div>
            </div>
        </div>
    )
}

export default Interesses;