import PropTypes from 'prop-types';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalPayment } from '../components/PaypalPayment';
import { orange } from "@mui/material/colors";
// import backgroundOrange from "../assets/background-orange.svg";
import logo from '../assets/logo-white.png';
// import "./css/Become-pro.css";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { light } from "@mui/material/styles/createPalette";

export default function BecomePro() {
    const paypalOptions = {
        clientId: "AQpA-hhfzocEfg3jkMyuziheekP0vE8aV0qUYvImjibDqvfrmZcH0-sEq0QGaITen2_ZlxoXvzO6-_Tg",
        currency: "BRL"
    }
    // const imageStyle = {
    //     backgroundImage: `url(${backgroundOrange})`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",

    // }

    const containerGratis = {
        width: '530px',
        height: '50rem',
        marginRight: '8px',
        lineHeight: '40px',
        border: '1.5px solid #EEEEEE',



        //  d:'flex',
        // justif: 'content-center',
        // align:'items-center', 
        // text:'center',
    }

    const containerPago = {
        backgroundColor: '#DB752C',
        width: '530px',
        height: '50rem',
        marginLeft: '8px',
        lineHeight: '40px',
    }


    return (

        <div className="container-become-pro ">
            <section>

                {/* <PayPalScriptProvider options={paypalOptions}>
                    <PayPalPayment />
                </PayPalScriptProvider> */}


                <div className="d-flex flex-column container-fluid text-black d-flex  width:100%">
                    <div className="justify-content-center width:100vh" >

                        <h1 className="">Tenha maior engajamento, se destaque!</h1>
                        <h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</h3>
                        <form action="">
                            <button>Saber mais</button>
                            <button>Torna-se PRO</button>
                        </form>
                    </div>

                    <div className="justify-content-center">
                        <label htmlFor="">
                            <div className=""></div>
                            <div className=""></div>
                        </label>
                        <h2>Saia na frente, tenha maior visibilidade.</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
                    </div>

                    <div className="justify-content-center">
                        <h2>Expanda seu portifólio</h2>
                        <p></p>
                    </div>

                    <div className="justify-content-center ">
                        <div className="d-flex row text-center ">
                            <h2 className="fs-1 text-dark ">O plano certo pra sua carreira.</h2>
                            <p className="text-secondary fs-4 text-center">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
                        </div>

                        <div className="container-pay d-flex row justify-content-center align-items-center text-center">
                            {/* <div className="free-pay h-100 w-50 text-center justify-content-center" style={{ border: '1.5px solid #EEEEEE' }}> */}
                            <div style={containerGratis}>

                                <p className="text-secondary">Plano</p>
                                <h1 className="fs-1" style={{ borderBottom: '1.5px solid #EEEEEE' }}>Grátis</h1>
                                <div className="align-itens-center">
                                    <div className="d-flex justify-content-start align-items-center " >
                                        <CheckIcon sx={{ color: orange[500] }}></CheckIcon>
                                        <p className="fs-5">Postar Trabalho</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center " >
                                        <CheckIcon sx={{ color: orange[500] }}></CheckIcon>
                                        <p className="fs-5">Seguir perfis</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center " >
                                        <CheckIcon sx={{ color: orange[500] }}></CheckIcon>
                                        <p className="fs-5">Oportunidade de trabalho</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center " >
                                        <ClearIcon></ClearIcon>
                                        <p className="fs-5">Portifólio ilimitadi</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center " >
                                        <ClearIcon></ClearIcon>
                                        <p className="fs-5">Lorem ipsun</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center " >                                    <ClearIcon></ClearIcon>
                                        <p className="fs-5">Lorem ipsun</p>
                                    </div>
                                    <div className="d-flex justify-content-center " style={{ borderTop: '1.5px solid #EEEEEE' }}>
                                        <p className="fs-5 text-secondary">Seu plano atual</p>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                            <div className="pro-pay w-50">
                                <div style={containerPago}>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src={logo} alt="" />
                                        <h1 className="text-light">PRO</h1>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center" style={{ borderBottom: '1.5px solid #EEEEEE' }}>
                                        <p className="text-secondary">R$</p>
                                        <h1 className="text-light">20,00</h1>
                                        <p className="text-secondary">/mês</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center text-light" >
                                        <CheckIcon sx={{ color: light[500] }}></CheckIcon>
                                        <p>Postar Trabalho</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center text-light" >
                                        <CheckIcon sx={{ color: light[500] }}></CheckIcon>
                                        <p>Seguir perfis</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center text-light" >
                                        <CheckIcon sx={{ color: light[500] }}></CheckIcon>
                                        <p>Oportunidade de trabalho</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center text-light" >
                                        <CheckIcon sx={{ color: light[500] }}></CheckIcon>
                                        <p>Portifólio ilimitadi</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center text-light" >
                                        <CheckIcon sx={{ color: light[500] }}></CheckIcon>
                                        <p>Lorem ipsun</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center text-light" >
                                        <CheckIcon sx={{ color: light[500] }}></CheckIcon>
                                        <p>Lorem ipsun</p>
                                    </div>


                                    <div className="" style={{ borderTop: '1.5px solid #EEEEEE' }}>
                                        <p className="text-light">Fazer um upgrade</p>
                                        <button type="button" class="btn btn-light btn btn-outline-danger">Tornar-se PRO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>

            </section>
        </div>
    )
}


BecomePro.propTypes = {
    session: PropTypes.object.isRequired
}