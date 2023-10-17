import React from 'react';
import { Button } from '@mui/material';
import bannerImage from './become_pro_images/banner_becomepro.png';
import foto_perfil from './become_pro_images/foto-perfil.png';
import iphone_arq from './become_pro_images/iphone_arq.png';
import { orange } from "@mui/material/colors";
import logo from './become_pro_images/logo-white.png';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { light } from "@mui/material/styles/createPalette";
import "./BecomePro.css"

export default function BecomePro() {
    return (
        <div className='container-become-pro'>
            <div className="row text-center" style={{
                padding: "100px 0",
                backgroundImage: `url(${bannerImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(219, 117, 44, 0.8)"
            }}>
                <div className="col-md-10 m-auto">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <h1 className='text-white fw-bold'
                                    style={{ fontSize: "2.5rem" }}>Tenha maior engajamento, se <span className='fst-italic'>destaque</span>!</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <h3 style={{ fontSize: "1.5rem", color: "#FFFFFF9F" }}
                                    className='mt-4 mb-5 col-8 m-auto'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</h3>
                            </div>
                        </div>
                        <div className='col-12 col-md-8 col-lg-6 col-xxl-4 m-auto'>
                            <div className='row d-flex justify-content-between'>
                                <Button variant='contained'
                                    style={{ background: "rgba(0,0,0,0.3)" }}
                                    className='me-3 col-4'>Saber mais</Button>
                                <Button variant='contained' className='bg-white col-6' style={{ color: "#EE2C09" }}
                                >Tornar-se PRO</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-10 m-auto mt-5">
                    <div className='row d-flex flex-row'>
                        <div className="col-3 d-flex justify-content-center me-5" style={{
                            position: "relative"
                        }}>
                            <img src={foto_perfil} alt="" width={180} height={180} className='p-2 rounded-circle' style={{
                                border: "solid #DB752C 1px"
                            }} />
                            <div className='text-center text-white rounded py-1 py-xxl-2 w-50' style={{
                                position: "absolute",
                                bottom: "0",
                                background: "linear-gradient(to right, #EE2C09, #FF6A00)"
                            }}>PRO</div>
                        </div>
                        <div className="col d-flex flex-column justify-content-between">
                            <h2 style={{
                                fontSize: "2.2rem"
                            }} className='text-black mb-4'>Saia na frente, tenha maior visibilidade.</h2>
                            <h3 style={{
                                fontSize: "1.5rem", 
                                color: "#00000061" 
                            }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}