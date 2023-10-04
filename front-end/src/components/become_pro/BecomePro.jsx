import React from 'react';
import { Button } from '@mui/material';
import bannerImage from './become_pro_images/banner_becomepro.png';
import foto_perfil from './become_pro_images/foto-perfil.png'
import iphone_arq from './become_pro_images/iphone_arq.png'
/* import styles from './BecomePro.css'; */

const bannerImages = {
    width: '1920px',
    height: '600px',
    backgroundColor: '#DB752C',
    opacity: '0.8',
}

const bannerTitulo = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '70px',
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
};

const bannerSubTiulo = {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '40px',
    color: '#FFFFFF',
};

const buttonSB = {
    position: 'absolute',
    top: '75%',
    left: '44%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1D252C3D',
};

const buttonPRO = {
    position: 'absolute',
    top: '75%',
    left: '56%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFFFFF',
    color: '#FF6A00',
    width: '260px',
};

const profileProStyle = {
    marginTop: '40px',
    display: 'flex', // Adicione o display flex
    flexDirection: 'row', // Altere de 'column' para 'row'
    alignItems: 'center', // Alinhe verticalmente ao centro
    justifyContent: 'center', // Centralize horizontalmente
    width: '1430px',
    maxWidth: '100%',
    marginLeft: '15%',
};

const imgProfileStyle = {
    marginRight: '144px', // Espaço entre a imagem e o texto
};

const textoProfile = {
    // Mantenha o estilo do texto como está
}

const iconePro = {
    width: '260px',
    height: '52px',
    background: 'transparent linear- gradient(270deg, #FF6A00 0 %, #EE2C09 100 %) 0 % 0 % no - repeat padding - box',
    borderRadius: '3px',
    opacity: ' 1',
}

 /* ------------- */
/* const imageStyle = {
    backgroundImage: `url(${backgroundOrange})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    
} */

const containerGratis = {
    width: '530px',
    height: '700px',
    marginRight: '8px',
    lineHeight: '40px',

    //  d:'flex',
    // justif: 'content-center',
    // align:'items-center', 
    // text:'center',
}

const containerPago = {
    backgroundColor: '#DB752C',
    width: '530px',
    height: '700px',
    marginLeft: '8px',
    lineHeight: '40px',
}

export default function BecomePro({ }) {
    return (
        <div>
            <div className="banner_container_pro" style={{ textAlign: 'center', position: 'relative' }}>
                <div className='bannerColor'>
                    <img src={bannerImage} alt="Banner" className='bannerImages' style={bannerImages} />
                </div>
                <div>
                    <h3 style={iconePro}>PRO</h3>
                </div>
                <h1 style={bannerTitulo}>
                    Tenha maior engajamento, se destaque!
                </h1>
                <h2 style={bannerSubTiulo}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
                </h2>

                <Button variant="contained" style={buttonSB}>
                    Saber Mais
                </Button>
                <Button variant="contained" style={buttonPRO}>
                    Tornar-se PRO
                </Button>
            </div>

            <div className='profile_pro' style={profileProStyle}>
                <div className='img_profile' style={imgProfileStyle}>
                    <img src={foto_perfil} alt="foto-perfil" />
                </div>
                <div className='textoProfile' style={textoProfile}>
                    <h2>Saia na frente, tenha maior visibilidade.</h2>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
                </div>
            </div>


            <div className='portifolio-container'>
                <div className='portifolio-text'>
                    <h2>Expanda seu portifolio</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, amet. Cumque inventore quo sequi, debitis excepturi autem suscipit optio asperiores, eveniet amet quidem vel dolores enim. Reiciendis facere in alias.</p>
                </div>
                <div className='portifolio-img'>
                    <img src={iphone_arq} alt="" />
                </div>
            </div>
            
        </div>
    );
}
