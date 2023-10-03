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
        <div className="row mb-4">
            <div className='col-12'>
                {
                    softwares.map((software_id, index) => (
                        <span key={index} style={{border: "2px solid #EEEEEE", display: "inline-block"}} className='fw-bold p-2 rounded me-3 mb-3'>
                            <i className='p-0 m-0 me-2' style={{display: "none"}}>
                                {/*AQUI VC RENDERIZA O SVG QUANDO O SOFTWARE ESTIVER COM ELE*/}
                                {uploadDetails.softwares.find(s => s.id === software_id)?.svg}
                            </i>
                            {uploadDetails.softwares.find(s => s.id === software_id)?.name} 
                        </span>
                    ))
                }
            </div>
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