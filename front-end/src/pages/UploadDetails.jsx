import { useState } from "react"
import './css/upload-details.css'
import PropTypes from 'prop-types'
import { config } from '../config'
import { useEffect } from "react";
import { useRef } from "react";

/**
 * 
 * @param {{files: Array<{name: string, type: string, sizeInBytes: number, buffer: ArrayBuffer, uri: string}}>} param[0] 
 */
export default function UploadDetails({ files, setShowUploadDetails, setDialogMessage }) {
    const [title, setTitle] = useState('');
    const [softwares, setSoftwares] = useState([]);
    const [styles, setStyles] = useState(0);
    const [project, setProject] = useState(0);
    const [type, setType] = useState(0);
    const [description, setDescription] = useState('');

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
        softwares: [],
        /**
         * @type {Array<{id: number, name: string}>}
         */
        projects: [],
        /**
         * @type {Array<{id: number, name: string}>}
         */
        types: []
    })

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.collection.upload_details}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => setUploadDetails(JSON.parse(data)));
    }, [setUploadDetails]);

    const onPublish = async (event) => {
        if (!form.current.checkValidity()) {
            return;
        }

        event.target.disabled = true;

        const request = await fetch(`${config.api}${config.endpoints.collection.upload}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                title,
                softwares,
                styles,
                project,
                type,
                description,
                files: files.map(file => ({
                    name: file.name,
                    type: file.type,
                    sizeInBytes: file.sizeInBytes,
                    buffer: [...new Uint8Array(file.buffer)]
                }))
            })
        });

        const response = await request.json();

        if (response.ok) {
            window.location.href = `/?col=${response.collectionID}`;
        } else {
            setDialogMessage(response.message);
        }

        event.target.disabled = false;
    }

    const cancelPublish = (e) => {
        e.preventDefault();

        setTitle('');
        setSoftwares([]);
        setStyles(0);
        setProject(0);
        setDescription('');

        setShowUploadDetails(false);
    }

    return (
        <div className="container-upload-details">
            <div className="row">
                <div className="col-12 col-sm-8  m-auto my-5">
                    <div className="row">
                        <div className="col-sm">
                            <h1 className="fw-bold">Adicionar detalhes</h1>
                            <h2>Fale mais sobre seu trabalho.</h2>
                        </div>
                    </div>
                    <form action="" className="w-100" ref={form}>
                        <div className="row">
                            <div className="col-md">
                                <img src={files[0].uri} alt="" className="w-100" />
                                {
                                files.length > 1 &&
                                <>
                                    <label className="form-label fw-bold">Anexos <span className="pro-style">PRO</span></label>
                                    <div className="row">
                                        {
                                            files.slice(1).map((file, index) =>
                                                <div className="col-sm-3 d-flex align-items-center justify-content-center" key={index}>
                                                    <label className='img-job rounded mb-3 h-auto'>
                                                        <img src={file.uri} alt="" className="w-100 h-100" />
                                                    </label>
                                                </div>
                                            )
                                        }
                                    </div>
                                </>
                                }
                            </div>
                            <div className="col-md">
                                <div className="form-outline mb-3">
                                    <label className="form-label fw-bold" htmlFor="title">Título</label>
                                    <input onChange={(e) => setTitle(e.target.value)} type="text" id="title" className="form-control form-control-md" required/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Softwares</label>
                                    <select
                                    disabled={softwares.length >= 2}
                                    className="form-select"
                                    value="0"
                                    onChange={(e) => !softwares.includes(Number(e.target.selectedOptions[0].value)) && setSoftwares([...softwares, Number(e.target.selectedOptions[0].value)])}>
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
                                            <span key={index} id={software_id} style={{ border: "2px solid #EEEEEE", display: "inline-block" }} className='fw-bold p-2 rounded me-3 mb-3'>
                                                <div className="d-flex align-items-center">
                                                    {
                                                    uploadDetails.softwares.find(s => s.id === software_id)?.iconPath &&
                                                    <img src={uploadDetails.softwares.find(s => s.id === software_id)?.iconPath} width={24} height={24}/> 
                                                    }
                                                    <span style={{paddingLeft: uploadDetails.softwares.find(s => s.id === software_id)?.iconPath ? "0.5em" : ""}}>
                                                        {uploadDetails.softwares.find(s => s.id === software_id)?.name} 
                                                    </span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="ms-1" onClick={(e) => {
                                                        const newSoftwares = [...softwares];
                                                        const index = newSoftwares.indexOf(Number(e.target.parentElement.parentElement.id));

                                                        if (index > -1)
                                                            newSoftwares.splice(index, 1);
                                                        
                                                        setSoftwares(newSoftwares);
                                                    }}>
                                                        <path style={{ pointerEvents: "none" }} d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                                    </svg>
                                                </div>
                                            </span>
                                        ))
                                    }
                                </div>
                                }
                                <div className="mb-3">
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
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Projeto</label>
                                    <select required className="form-select" value={project} onChange={(e) => setProject(e.target.selectedOptions[0].value)}>
                                        <option value="" hidden></option>
                                        {
                                            uploadDetails.projects.map(
                                                (item, index) => (
                                                    <option value={item.id} key={index}>{item.name}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tipo</label>
                                    <select required className="form-select" value={type} onChange={(e) => setType(e.target.selectedOptions[0].value)}>
                                        <option value="" hidden></option>
                                        {
                                            uploadDetails.types.map(
                                                (item, index) => (
                                                    <option value={item.id} key={index}>{item.name}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label fw-bold">Descrição</label>
                                    <textarea required className="form-control" id="descricao" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="">
                                    <button className="rounded fw-bold me-3 border-0 text-white py-2 px-5 button-publicar mb-3" onClick={onPublish}>
                                        Publicar
                                    </button>
                                    <button className="rounded fw-bold p-2 bg-white button-cancelar" onClick={cancelPublish}>
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

UploadDetails.propTypes = {
    files: PropTypes.array.isRequired,
    setShowUploadDetails: PropTypes.func.isRequired,
    setDialogMessage: PropTypes.func.isRequired
}