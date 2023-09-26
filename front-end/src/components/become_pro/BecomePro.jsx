import React from 'react';
import { Button } from '@mui/material';
import bannerImage from './become_pro_images/banner_becomepro.png';
import foto_perfil from './become_pro_images/foto-perfil.png'

const bannerImages = {
    width: '1920px',
    height: '600px',
    backgroundColor: 'rgb(219,117,44,0.8)',
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
    marginLeft: '260px',
  };

const textoProfile = {
    transform: 'translate(-50%, -50%)',
    position: 'absolute', 
    left: '80%',
}

export default function BecomePro({ }) {
    return (
        <div>
            <div className="banner_container_pro" style={{ textAlign: 'center', position: 'relative' }}>
                <img src={bannerImage} alt="Banner" style={bannerImages} />
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
                <img src={foto_perfil} alt="foto-perfil" />
                <div className='textoProfile'>
                <h2>Saia na frente, tenha maior visibilidade.</h2>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
                </div>
            </div>
        </div>
    );
}
