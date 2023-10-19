/* eslint-disable no-undef */
import './card-collection.css'
import foto from "../../assets/Dashboard/Elizabeth_in_love_with_sky_01__00000.png"
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import IconUser from '../header/icon_user/IconUser';
import imgTest from "../../assets/card-user-test/anna.png"
import { config } from '../../config';
import { Temporal } from '@js-temporal/polyfill';

/**
 * @param {{imgProps: HTMLImageElement}} param0 
 * @returns 
 */
export default function CardCollection({ imgProps, info, isOpen, session }) {
    const [open, setOpen] = useState(isOpen ?? false);
    const [name, setName] = useState("");
    const [isLiked, setIsLiked] = useState(info.isLiked);
    const [likes, setLikes] = useState(info.likes);
    const [views, setViews] = useState(info.views);

    if (!imgProps)
        imgProps = {src: foto}

    if (!imgProps.src)
        imgProps.src = foto;

    Fancybox.bind("#gallery a", {
        groupAll: true
    });

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.account.name.replace('%1', info.author_id)}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            if (data.ok)
                setName(data.name);
        });
    }, [info.author_id, info.id]);

    const updateViews = () => {
        fetch(`${config.api}${config.endpoints.collection.view.replace('%1', info.id)}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            setViews(data.views);
        });
    }

    const likeCollection = () => {
        fetch(`${config.api}${config.endpoints.collection.like.replace('%1', info.id)}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            setIsLiked(data.isLiked);
            setLikes(data.likes);
        });
    }
    
    return(
        <div className='h-100'>
            <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            onAfterOpen={updateViews}
            className={"Modal"}
            overlayClassName={"Overlay"}
            >
                <div className="container h-100 py-4 d-flex flex-column justify-content-between">
                    <div className="row px-4">
                        <div className="col-12 d-flex flex-row align-items-center justify-content-between mb-3">
                            <div className='d-flex flex-row align-items-center'>
                                <IconUser userImg={imgTest}></IconUser>
                                <div className='ms-3 d-flex flex-column'>
                                    <span style={{fontWeight: "bold", fontSize: "1.3rem"}}>{info.title}</span>
                                    <span style={{color: "#1D252C3D", fontSize: "1rem"}}>Por <span style={{color: "#DB752C", fontWeight: "bold"}}>{name}</span></span>
                                </div>
                            </div>
                            {
                            session.loggedIn &&
                            <button style={{border: "2px solid #EEEEEE", background: "white", color: isLiked ? "red" : "black"}} className='p-2 rounded fw-bold' onClick={likeCollection}>Curtir
                                <i className='m-0 ms-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g id="ic_like" transform="translate(-1819 124)">
                                            <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" transform="translate(1819 -124)" fill="none"/>
                                            <path id="Path_12" data-name="Path 12" d="M10.719,19,9.455,17.849C4.965,13.777,2,11.092,2,7.8A4.749,4.749,0,0,1,6.8,3a5.221,5.221,0,0,1,3.924,1.822A5.221,5.221,0,0,1,14.643,3a4.749,4.749,0,0,1,4.8,4.8c0,3.3-2.965,5.981-7.455,10.062Z" transform="translate(1820 -123)" fill={isLiked ? "red" : "#1d252c"}/>
                                        </g>
                                    </svg>
                                </i>
                            </button>
                            }
                        </div>
                    </div>
                    <div id="gallery" className='mb-2'>
                        <div className="row mb-2">
                            <a href={`${config.api}/${info.files[0]}`}>
                                <img src={`${config.api}/${info.files[0]}`} className='card-job' alt="" style={{width: "100%", height: "30vh" }} />
                            </a>
                        </div>
                        {
                            info.files.length > 1
                            && (
                                <div className="row justify-content-md-center">
                                    {
                                        info.files.slice(1).map((url, index) => (
                                            <div className="col-sm-3" key={index} style={index > 3 ? {display: "none"} : {display: "block"}}>
                                                <a href={`${config.api}/${url}`}>
                                                    <img src={`${config.api}/${url}`} className='card-job' alt="" style={{width: "100%", height: "15vh"}} />
                                                </a>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    
                    <div className='px-4'>
                        <div className="row justify-content-md-center mb-4">
                            <div className="col-md-auto">
                                <span style={{fontSize: "1em", color: "#1D252C"}}>{info.description}</span>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className='col-12'>
                                {
                                    info.softwares.map((software) => (
                                        <span style={{border: "2px solid #EEEEEE"}} key={software.id} className='fw-bold p-2 rounded me-3'>
                                            {
                                            software.iconPath &&
                                            <img src={"/" + software.iconPath} width={24} height={24}/> 
                                            }
                                            <span style={{paddingLeft: software.iconPath ? "0.5em" : ""}}>
                                                {software.name} 
                                            </span>
                                        </span>
                                    ))
                                }
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <div className='d-flex align-itens-center'>
                                    <svg className='p-0 m-0 me-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g id="ic_view" transform="translate(-2897 -1130)">
                                            <rect id="Rectangle_26" data-name="Rectangle 26" width="24" height="24" transform="translate(2897 1130)" fill="none"/>
                                            <path id="Path_14" data-name="Path 14" d="M12,4.5A11.827,11.827,0,0,0,1,12a11.817,11.817,0,0,0,22,0A11.827,11.827,0,0,0,12,4.5ZM12,17a5,5,0,1,1,5-5A5,5,0,0,1,12,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,12,9Z" transform="translate(2897 1130)" fill="rgba(29,37,44,0.24)"/>
                                        </g>
                                    </svg>
                                    <p style={{color: "#1D252C"}}>{views} visualizações</p>
                                </div>
                                <div className='d-flex align-itens-center'>   
                                    <svg className='p-0 m-0 me-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g id="ic_like" transform="translate(-1819 124)">
                                            <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" transform="translate(1819 -124)" fill="none"/>
                                            <path id="Path_12" data-name="Path 12" d="M10.719,19,9.455,17.849C4.965,13.777,2,11.092,2,7.8A4.749,4.749,0,0,1,6.8,3a5.221,5.221,0,0,1,3.924,1.822A5.221,5.221,0,0,1,14.643,3a4.749,4.749,0,0,1,4.8,4.8c0,3.3-2.965,5.981-7.455,10.062Z" transform="translate(1820 -123)" fill="rgba(29,37,44,0.24)"/>
                                        </g>
                                    </svg>
                                    <p style={{color: "#1D252C"}}>{likes} curtidas</p>
                                </div>
                                <div className='d-flex align-itens-center'>
                                    <svg className='p-0 m-0 me-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g id="ic_calendar" transform="translate(-1819 124)">
                                            <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" transform="translate(1819 -124)" fill="none"/>
                                            <path id="Path_15" data-name="Path 15" d="M17,12H12v5h5ZM16,1V3H8V1H6V3H5A1.991,1.991,0,0,0,3.01,5L3,19a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5a2.006,2.006,0,0,0-2-2H18V1Zm3,18H5V8H19Z" transform="translate(1819 -123)" fill="rgba(29,37,44,0.24)"/>
                                        </g>
                                    </svg>
                                    <p style={{color: "#1D252C"}}>{Temporal.ZonedDateTime.from(info.upload_time).withTimeZone(Temporal.Now.timeZoneId()).toPlainDate().toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </Modal>
            <div className='h-100' onClick={() => setOpen(true)}>
                <img {...imgProps} className='card-job'/>
            </div>
        </div>
    )
}

CardCollection.propTypes = {
    imgProps: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    session: PropTypes.object.isRequired
}
