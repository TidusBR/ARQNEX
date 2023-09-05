import Modal from 'react-modal';
import './css/upload-details.css'
import PropTypes from 'prop-types'
import UploadDetails from './UploadDetails';
import { useState } from 'react';

export function UploadInput({ onChange }) {
    return (
        <div>
            <label htmlFor="arquivo" className='img-upload rounded mb-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#AAAAAA" className="bi bi-file-earmark-image" viewBox="0 0 16 16">
                    <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"/>
                </svg>
            </label>
            <input type="file" name="arquivo" id="arquivo" multiple="multiple" className="arquivo" accept=".png, .jpg" onChange={onChange} />
        </div>
    )
}

UploadInput.propTypes = {
    onChange: PropTypes.func.isRequired
}

function readFileBuffer(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => resolve(event.target.result));
        reader.readAsArrayBuffer(file);
    });
}


export default function Upload() {
    const [showUploadDetails, setShowUploadDetails] = useState(false);
    const [files, setFiles] = useState([]);

    const OnUpload = async (event) => {
        const files = [];

        for (const file of event.target.files) {
            const buffer = await readFileBuffer(file);

            files.push({
                name: file.name,
                type: file.type,
                sizeInBytes: file.size,
                buffer,

                /**
                 * Formato de Data URI: data:mimetype;base64,encoded buffer
                 * Vai ser utilizado apenas para demonstrar as imagens na hora de enviar os detalhes
                 * da coleção, o backend vai receber apenas buffer como uma array de bytes.
                 */
                uri: `data:${file.type};base64,${btoa(
                    new Uint8Array(buffer)
                      .reduce((data, byte) => data + String.fromCharCode(byte), '')
                  )}`
            });
        }

        // Clear input
        event.target.value = '';

        setFiles(files);
        setShowUploadDetails(true);
    }

    return (
        <>
            <Modal
                isOpen={showUploadDetails}
                onRequestClose={() => setShowUploadDetails(false)}
                contentLabel="Detalhes de Upload"
            >
                <UploadDetails files={files} setShowUploadDetails={setShowUploadDetails}></UploadDetails>
            </Modal>
            <div className="container-upload-details container">
                <div className="row justify-content-md-center">
                    <div className="col-10 col-sm-8 m-auto my-5 ">
                        <div className="col-sm">
                            <h1 className="fw-bold ">Qual seu último trabalho?</h1>
                            <h2 style={{width: "44em", wordBreak: "break-word", wordWrap: "break-word", letterSpacing: "0"}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.</h2>
                        </div>
                        <form action="" className="w-100">
                            <div className="col-md">
                                    <div className="col-sm d-flex align-items-center justify-content-center">
                                        <UploadInput onChange={OnUpload}></UploadInput>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}