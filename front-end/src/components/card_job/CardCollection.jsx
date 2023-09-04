import './card-collection.css'
import foto from "../../assets/Dashboard/Elizabeth_in_love_with_sky_01__00000.png"
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useState } from 'react';
import IconUser from '../header/icon_user/IconUser';
import imgTest from "../../assets/card-user-test/anna.png"
import { config } from '../../config';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '40rem',
        height: '45rem',
        transform: 'translate(-50%, -50%)',
        border: "none",
        borderRadius: "10px",
        padding: "0"
    },
    overlay: {
        background: 'rgba(58, 64, 69, 0.95)',
    }
};

/**
 * @param {{imgProps: HTMLImageElement}} param0 
 * @returns 
 */
export default function CardCollection({ imgProps, info }) {
    const [open, setOpen] = useState(false);

    if (!imgProps)
        imgProps = {src: foto}

    if (!imgProps.src)
        imgProps.src = foto;

    return(
        <>
            <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            style={customStyles}
            >
                <div style={{width: "auto", height: "5rem", margin: "2rem 2rem"}} className="container">
                    <div className="row">
                        <div className="col-md-auto">
                            <IconUser userImg={imgTest}></IconUser>
                        </div>
                        <div className="col-sm">
                            <span style={{fontWeight: "bold", fontSize: 18}}>{info.title}</span>
                        </div>
                    </div>
                    <div className="row">
                        <img src={`${config.api}/${info.files[0]}`} className='card-job' alt="" style={{width: "100%", height: "20rem"}} />
                    </div>
                    {
                        info.files.length > 1
                        && (
                            <div className="row justify-content-md-center">
                                {
                                    info.files.slice(1).map((url, index) => (
                                        <div className="col-md-auto" key={index}>
                                            <img src={`${config.api}/${url}`} className='card-job' alt="" style={{width: "10rem", height: "10rem"}} />
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                    <div className="row justify-content-md-center" style={{marginTop: "0.2rem"}}>
                        <div className="col-md-auto">
                            <span style={{fontSize: 16}}>{info.description}</span>
                        </div>
                    </div>
                </div>
            </Modal>
            <div style={{width: "16rem", height: "16rem"}} onClick={() => setOpen(true)}>
                <img {...imgProps} className='card-job' alt="" width="100%" height="100%" />
            </div>
            
        </>
    )
}

CardCollection.propTypes = {
    imgProps: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired
}