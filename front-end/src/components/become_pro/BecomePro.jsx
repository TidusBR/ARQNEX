// import React from 'react';
// import { Button } from '@mui/material';
// import bannerImage from './become_pro_images/banner_becomepro.png';
// import foto_perfil from './become_pro_images/foto-perfil.png'
// import iphone_arq from './become_pro_images/iphone_arq.png'
// <<<<<<< Updated upstream
// /* import styles from './BecomePro.css'; */
// =======
// import styles from './BecomePro.css';
// import { orange } from "@mui/material/colors";
// import logo from './become_pro_images/logo-white.png';
// import CheckIcon from '@mui/icons-material/Check';
// import ClearIcon from '@mui/icons-material/Clear';
// import { light } from "@mui/material/styles/createPalette";


// >>>>>>> Stashed changes

// const bannerImages = {
//     width: '1920px',
//     height: '600px',
// <<<<<<< Updated upstream
//     backgroundColor: '#DB752C',
//     opacity: '0.8',
// =======
//     backgroundColor: 'rgb(219,117,44,0.8)',
// >>>>>>> Stashed changes
// }

// const bannerTitulo = {
//     position: 'absolute',
//     top: '35%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     fontSize: '70px',
//     whiteSpace: 'nowrap',
//     color: '#FFFFFF',
// };

// const bannerSubTiulo = {
//     position: 'absolute',
//     top: '55%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     fontSize: '40px',
//     color: '#FFFFFF',
// };

// const buttonSB = {
//     position: 'absolute',
//     top: '75%',
//     left: '44%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: '#1D252C3D',
// };

// const buttonPRO = {
//     position: 'absolute',
//     top: '75%',
//     left: '56%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: '#FFFFFF',
//     color: '#FF6A00',
//     width: '260px',
// };

// const profileProStyle = {
//     marginTop: '40px',
//     display: 'flex', // Adicione o display flex
//     flexDirection: 'row', // Altere de 'column' para 'row'
//     alignItems: 'center', // Alinhe verticalmente ao centro
//     justifyContent: 'center', // Centralize horizontalmente
//     width: '1430px',
//     maxWidth: '100%',
//     marginLeft: '15%',
// };

// const imgProfileStyle = {
//     marginRight: '144px', // Espaço entre a imagem e o texto
// };

// const textoProfile = {
//     // Mantenha o estilo do texto como está
// }

// <<<<<<< Updated upstream
// const iconePro = {
//     width: '260px',
//     height: '52px',
//     background: 'transparent linear- gradient(270deg, #FF6A00 0 %, #EE2C09 100 %) 0 % 0 % no - repeat padding - box',
//     borderRadius: '3px',
//     opacity: ' 1',
// }

//  /* ------------- */
// /* const imageStyle = {
//     backgroundImage: `url(${backgroundOrange})`,
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
    
// } */

// const containerGratis = {
//     width: '530px',
//     height: '700px',
//     marginRight: '8px',
//     lineHeight: '40px',

//     //  d:'flex',
//     // justif: 'content-center',
//     // align:'items-center', 
//     // text:'center',
// }

// const containerPago = {
//     backgroundColor: '#DB752C',
//     width: '530px',
//     height: '700px',
//     marginLeft: '8px',
//     lineHeight: '40px',
// }

// export default function BecomePro({ }) {
//     return (
//         <div>
//             <div className="banner_container_pro" style={{ textAlign: 'center', position: 'relative' }}>
//                 <div className='bannerColor'>
//                     <img src={bannerImage} alt="Banner" className='bannerImages' style={bannerImages} />
//                 </div>
//                 <div>
//                     <h3 style={iconePro}>PRO</h3>
//                 </div>
// =======
// const containerPago = {
//     backgroundColor: '#DB752C',
//     width: '31.25rem',
//     height: '44rem',
//     marginLeft: '8px',
//     borderRadius: '20px',
//     padding: '20px 20px 20px 20px'
// }
// const containerGratis = {
//     width: '31.25rem',
//     height: '44rem',
//     marginRight: '8px',
//     border: '1.5px solid #EEEEEE',
//     borderRadius: '20px',
//     padding: '20px 20px 20px 20px'
// }

// const textoContainerPago = {
//     display: 'flex', 
//     alignItems: 'center', 
//     justifyContent: 'center', 
// };

// const buttonTornarPRO = {
//     width: '400px',
//     height: '48px',
//     fontSize: '20px',
//     fontWeight: 'bold'
// }

// const containersP = {
//     fontSize: '20px',
//     fontWeight: 'bold'
// }

// export default function BecomePro() {
//     return (
//         <div>
//             <div className="banner_container_pro" style={{ textAlign: 'center', position: 'relative' }}>
//                 <img src={bannerImage} alt="Banner" className='bannerImages' style={bannerImages} />
// >>>>>>> Stashed changes
//                 <h1 style={bannerTitulo}>
//                     Tenha maior engajamento, se destaque!
//                 </h1>
//                 <h2 style={bannerSubTiulo}>
//                     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
//                 </h2>

//                 <Button variant="contained" style={buttonSB}>
//                     Saber Mais
//                 </Button>
//                 <Button variant="contained" style={buttonPRO}>
//                     Tornar-se PRO
//                 </Button>
//             </div>

//             <div className='profile_pro' style={profileProStyle}>
//                 <div className='img_profile' style={imgProfileStyle}>
//                     <img src={foto_perfil} alt="foto-perfil" />
//                 </div>
//                 <div className='textoProfile' style={textoProfile}>
//                     <h2>Saia na frente, tenha maior visibilidade.</h2>
//                     <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
//                 </div>
//             </div>


//             <div className='portifolio-container'>
//                 <div className='portifolio-text'>
//                     <h2>Expanda seu portifolio</h2>
//                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, amet. Cumque inventore quo sequi, debitis excepturi autem suscipit optio asperiores, eveniet amet quidem vel dolores enim. Reiciendis facere in alias.</p>
//                 </div>
//                 <div className='portifolio-img'>
//                     <img src={iphone_arq} alt="" />
//                 </div>
//             </div>
// <<<<<<< Updated upstream
            
// =======


//             <div className="justify-content-center ">
//                 <div className="d-flex row text-center ">
//                     <h2 className="fs-1 text-dark ">O plano certo pra sua carreira.</h2>
//                     <p className="text-secondary fs-4 text-center">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</p>
//                 </div>

//                 <div className='containers'>
//                     <div className="container-pay d-flex row justify-content-center align-items-center text-center">
//                         {/* <div className="free-pay h-100 w-50 text-center justify-content-center" style={{ border: '1.5px solid #EEEEEE' }}> */}
//                         <div style={containerGratis} className='containerGratis'>

//                             <p className="text-secondary" style={{fontSize:'20px'}}>Plano</p>
//                             <h1 className="fs-1" style={{ borderBottom: '1.5px solid #EEEEEE', fontWeight:'bold' }}>GRÁTIS</h1>
//                             <div className="align-itens-center">
//                                 <div className="d-flex justify-content-start align-items-center " >
//                                     <CheckIcon sx={{ color: orange[500] }}></CheckIcon>
//                                     <p className="fs-5">Postar Trabalho</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center " >
//                                     <CheckIcon sx={{ color: orange[500] }}></CheckIcon>
//                                     <p className="fs-5">Seguir perfis</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center " >
//                                     <CheckIcon sx={{ color: orange[500] }}></CheckIcon>
//                                     <p className="fs-5">Oportunidade de trabalho</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center " >
//                                     <ClearIcon></ClearIcon>
//                                     <p className="fs-5">Portifólio ilimitadi</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center " >
//                                     <ClearIcon></ClearIcon>
//                                     <p className="fs-5">Lorem ipsun</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center " >                                    <ClearIcon></ClearIcon>
//                                     <p className="fs-5">Lorem ipsun</p>
//                                 </div>
//                                 <div className="d-flex justify-content-center " style={{ borderTop: '1.5px solid #EEEEEE' }}>
//                                     <p className="fs-5">Seu plano atual</p>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* </div> */}
//                         <div className="pro-pay w-50">
//                             <div style={containerPago} className='containerPago'>
//                                 <div className="d-flex justify-content-center align-items-center">
//                                     <img src={logo} alt="" />
//                                     <h1 className="text-light">PRO</h1>
//                                 </div>
//                                 <div className="d-flex justify-content-center align-items-center" style={{ borderBottom: '1.5px solid #EEEEEE' }}>
//                                     <div className='texto_containerPago' style={textoContainerPago}>
//                                         <p className="text-secondary" style={{ fontSize: '26px' }}>R$</p>
//                                         <h1 className="text-light" style={{ fontSize: '46px' }}>20,00</h1>
//                                         <p className="text-secondary" style={{ fontSize: '26px' }}>/mês</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center text-light" >
//                                     <CheckIcon sx={{ color: light[500] }}></CheckIcon>
//                                     <p className="fs-5">Postar Trabalho</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center text-light" >
//                                     <CheckIcon sx={{ color: light[500] }}></CheckIcon>
//                                     <p className="fs-5">Seguir perfis</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center text-light" >
//                                     <CheckIcon sx={{ color: light[500] }}></CheckIcon>
//                                     <p className="fs-5">Oportunidade de trabalho</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center text-light" >
//                                     <CheckIcon sx={{ color: light[500] }}></CheckIcon>
//                                     <p className="fs-5">Portifólio ilimitadi</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center text-light" >
//                                     <CheckIcon sx={{ color: light[500] }}></CheckIcon>
//                                     <p className="fs-5">Lorem ipsun</p>
//                                 </div>
//                                 <div className="d-flex justify-content-start align-items-center text-light" >
//                                     <CheckIcon sx={{ color: light[500] }}></CheckIcon>
//                                     <p className="fs-5">Lorem ipsun</p>
//                                 </div>


//                                 <div className="" style={{ borderTop: '1.5px solid #EEEEEE' }}>
//                                     <p className="text-light" style={containersP}>Fazer um upgrade</p>
//                                     <button class="btn btn-light btn btn-outline-danger" style={buttonTornarPRO}>Tornar-se PRO</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
// >>>>>>> Stashed changes
//         </div>
//     );
// }