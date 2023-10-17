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
// import { useNavigate } from 'react-router-dom';

export default function BecomePro() {

    // const navigate = useNavigate()

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
                                    style={{ fontSize: "3rem" }}>Tenha maior engajamento, se <span className='fst-italic'>destaque</span>!</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <h3 style={{ fontSize: "2rem", color: "#FFFFFF9F" }}
                                    className='mt-4 mb-5 col-8 m-auto'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</h3>
                            </div>
                        </div>
                        <div className='col-12 col-md-8 col-lg-6 col-xxl-4 m-auto'>
                            <div className='row d-flex justify-content-between'>
                                <Button variant='contained'
                                    style={{ background: "rgba(0,0,0,0.3)" }}
                                    className='me-3 col-4'>Saber mais</Button>
                                <Button variant='contained' className='bg-white col-6' style={{ color: "#EE2C09" }}
                                onClick={() => {
                                    console.log("vira pro")
                                }}>Tornar-se PRO</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-10 m-auto mt-5 mb-5">
                    <div className='row d-flex flex-row justify-content-between align-items-center mb-5'>
                        <div className="col-8 col-md-6 col-lg-3 col-xl-2 d-flex justify-content-center mx-auto mx-md-0 mb-5 mb-md-0" style={{
                            position: "relative"
                        }}>
                            <img src={foto_perfil} alt="" className='p-2 rounded-circle w-100' style={{
                                border: "solid #DB752C 1px"
                            }} />
                            <div className='text-center text-white rounded py-2 w-100' style={{
                                position: "absolute",
                                bottom: "0",
                                background: "linear-gradient(to right, #EE2C09, #FF6A00)"
                            }}>PRO</div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-8 col-xl-9 d-flex flex-column justify-content-between mt-3 mt-md-0 text-center text-md-start">
                            <h2 style={{
                                fontSize: "3rem"
                            }} className='text-black mb-5'>Saia na frente, tenha maior visibilidade.</h2>
                            <h3 style={{
                                fontSize: "2rem",
                                color: "#00000061"
                            }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</h3>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-10 m-auto mt-5 mb-5">
                    <div className='row d-flex flex-row justify-content-between align-items-center mb-5'>
                        <div className="col-12 col-lg-5 d-flex flex-column justify-content-between mt-3 mt-md-0 text-center text-md-start">
                            <h2 style={{
                                fontSize: "3rem"
                            }} className='text-black mb-5'>Expanda seu portfólio.</h2>
                            <h3 style={{
                                fontSize: "2rem",
                                color: "#00000061"
                            }}>Ut quis dolor rhoncus, laoreet neque sit amet, dignissim tellus. Donec pharetra ullamcorper tristique. Mauris tincidunt et urna vel rutrum. Integer purus orci, dapibus pretium euismod nec, aliquam sed magna.</h3>
                        </div>
                        <div className="col-12 col-lg-7 mx-auto mx-md-0 mb-5 mb-md-0 mt-4 mt-lg-0">
                            <img src={iphone_arq} alt="" className='w-100' />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-10 m-auto mb-5">
                    <div className='row d-flex flex-row justify-content-between align-items-center mb-5'>
                        <div className="col-12 d-flex flex-column justify-content-between text-center">
                            <h2 style={{
                                fontSize: "3rem"
                            }} className='text-black mb-5'>O plano certo pra sua carreira.</h2>
                            <h3 style={{
                                fontSize: "2rem",
                                color: "#00000061"
                            }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</h3>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-around">
                        <div className='col-lg-5 px-4 py-5 rounded mb-5 mb-lg-0' style={{
                                border: "solid 1.5px #EEEEEE"
                            }}>
                            <div className="card-head text-center mb-5">
                                <h3 style={{
                                    fontSize: "1.5rem",
                                    color: "#00000061"
                                }} className='mb-4'>Plano</h3>
                                <h2 style={{
                                    fontSize: "3.5rem",
                                    fontWeight: "bold",
                                    color: "black"
                                }}>GRÁTIS</h2>
                            </div>
                            <div className="card-body py-4"  style={{
                                borderBottom: "solid 1.5px #EEEEEE",
                                borderTop: "solid 1.5px #EEEEEE"
                            }}>
                                <ul className='m-0 p-0'>
                                    <li><CheckIcon fontSize='large' style={{color: "#DB752C"}}></CheckIcon> <h3>Postar trabalhos</h3></li>
                                    <li><CheckIcon fontSize='large' style={{color: "#DB752C"}}></CheckIcon> <h3>Seguir perfis</h3></li>
                                    <li><CheckIcon fontSize='large' style={{color: "#DB752C"}}></CheckIcon> <h3>Oportunidade de trabalho</h3></li>
                                    <li><ClearIcon fontSize='large'></ClearIcon> <h3>Portfólio ilimitado</h3></li>
                                    <li><ClearIcon fontSize='large'></ClearIcon> <h3>Lorem ipsum</h3></li>
                                    <li><ClearIcon fontSize='large'></ClearIcon> <h3>Lorem ipsum</h3></li>
                                </ul>
                            </div>
                            <h3 style={{
                                fontSize: "1.5rem",
                                color: "#00000061"
                            }} className='mt-4 mb-5 text-center'>Seu plano atual</h3>
                        </div>

                        <div className='col-lg-5 px-4 py-5 rounded' style={{
                                backgroundColor: "#DB752C",
                                color: "white"
                            }}>
                            <div className="card-head text-center mb-5">
                                <div className='d-flex flex-row justify-content-center'>
                                    <img src={logo} style={{
                                        height: "100%"
                                    }} alt="" className='me-3'/>
                                    <h3 style={{
                                        fontSize: "1.5rem",
                                        fontStyle: "italic"
                                    }} className='mb-4'>PRO</h3>
                                </div>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <h4>R$</h4>
                                    <h2 style={{
                                        fontSize: "3.5rem",
                                        fontWeight: "bold",
                                        color: "white"
                                    }} className='mx-3'>20,00</h2>
                                    <h4>/mês</h4>
                                </div>
                                
                            </div>
                            <div className="card-body py-4"  style={{
                                borderBottom: "solid 1.5px #EEEEEE",
                                borderTop: "solid 1.5px #EEEEEE"
                            }}>
                                <ul className='m-0 p-0'>
                                    <li><CheckIcon fontSize='large'></CheckIcon> <h3 className='text-white'>Postar trabalhos</h3></li>
                                    <li><CheckIcon fontSize='large'></CheckIcon> <h3 className='text-white'>Seguir perfis</h3></li>
                                    <li><CheckIcon fontSize='large'></CheckIcon> <h3 className='text-white'>Oportunidade de trabalho</h3></li>
                                    <li><CheckIcon fontSize='large'></CheckIcon> <h3 className='text-white'>Portfólio ilimitado</h3></li>
                                    <li><CheckIcon fontSize='large'></CheckIcon> <h3 className='text-white'>Lorem ipsum</h3></li>
                                    <li><CheckIcon fontSize='large'></CheckIcon> <h3 className='text-white'>Lorem ipsum</h3></li>
                                </ul>
                            </div>
                            <h3 style={{
                                fontSize: "1.5rem"
                            }} className='mt-4 mb-3 text-center'>Fazer um upgrade</h3>
                            <Button variant='contained' className='bg-white col-6 w-100' style={{ color: "#EE2C09", fontSize: "1.5rem" }}
                                onClick={() => {
                                    console.log("vira pro")
                                }}>Tornar-se PRO</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}