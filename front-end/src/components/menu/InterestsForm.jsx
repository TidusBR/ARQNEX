import { useState } from "react"
import { config } from '../../config'
import { useEffect } from "react";
import { useRef } from "react";


export default function InterestsForm() {

    const [softwares, setSoftwares] = useState([]);
    
    const [styles, setStyles] = useState(0);

    /**
     * @type {{current: HTMLFormElement}}
     */
    const form = useRef();

    const [uploadDetails, setUploadDetails] = useState({
        /**
         * @type {Array<{id: number, name: string}>}
         */
        styles: [],
        /**
         * @type {Array<{id: number, name: string}>}
         */
        softwares: []
    })

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.collection.upload_details}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => setUploadDetails(JSON.parse(data)));
    }, [setUploadDetails]);

    // console.log(softwares);
    // console.log(styles);

    return <form className="row w-100">
        <div className="mb-4 col-12">
            <label className="form-label fw-bold">Softwares</label>
            <select className="form-select" value="0" onChange={(e) => !softwares.includes(Number(e.target.selectedOptions[0].value)) && setSoftwares([...softwares, Number(e.target.selectedOptions[0].value)])}>
                <option value="" hidden></option>
                {
                    uploadDetails.softwares.map(
                        (item, index) => (
                            <option value={item.id} key={index}>{item.name}</option>
                        )
                    )
                }
            </select>
        </div>
        {
        softwares.length > 0 &&
            <div className='col-12'>
                {
                    softwares.map((software_id, index) => (
                        <span key={index} style={{border: "2px solid #EEEEEE", display: "inline-block"}} className='fw-bold p-2 rounded me-3 mb-3'>
                            <div className="d-flex align-items-center">
                                <i className='p-0 me-1' style={{display: "none"}}>
                                    {/*AQUI VC RENDERIZA O SVG QUANDO O SOFTWARE ESTIVER COM ELE*/}
                                    {uploadDetails.softwares.find(s => s.id === software_id)?.svg}
                                </i>
                                {uploadDetails.softwares.find(s => s.id === software_id)?.name} 
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="ms-1" onClick={(e) => {
                                    console.log(e.target.parentElement.parentElement);
                                }}>
                                    <path style={{pointerEvents: "none"}} d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                </svg>
                            </div>
                        </span>
                    ))
                }
            </div>
        }
        <div className="mb-4">
            <label className="form-label fw-bold">Estilos</label>
            <select required className="form-select" value={styles} onChange={(e) => setStyles(e.target.selectedOptions[0].value)}>
                <option value="" hidden></option>
                {
                    uploadDetails.styles.map(
                        (item, index) => (
                            <option value={item.id} key={index}>{item.name}</option>
                        )
                    )
                }
            </select>
        </div>
        <div className="mb-4 col-12 d-flex flex-row-reverse">
            <button className="btn button-create btn-block text-white border-0 col-6 col-lg-4 " type="button"
            /* onClick={handleSubmit} */
            >Salvar</button>
        </div>
    </form>
}