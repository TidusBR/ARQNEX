import './css/home.css'
import background from '../assets/Dashboard/foto-home.png'
import CardJob from "../components/card-job/CardJob" 
import { useEffect, useState } from 'react'
import { config } from '../config';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export default function Home({ session }) {
    // Desabilitar a paginação é temporário, o correto é notificar o usuário de que não há mais nada a ser mostrado
    const [disablePagination, setDisablePagination] = useState(false);
    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState(1);

    const imageStyle = {
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.collection.list}?page=${page}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                setDisablePagination(true);
                return;
            }
            setCollections(collections => [...collections, ...data])
        });
    }, [page]);

    const openCollection = new URLSearchParams(window.location.search)?.get('col');
    //window.history.replaceState(null, '', window.location.pathname);

    return (
        <div className="container-home">
            <section>
                <div className="row">
                    <div className="col-1 d-flex flex-column justify-content-between align-items-center">
                    </div>
                    <div className="col" 
                        style={imageStyle}>
                        <div className="row">
                            <div className="col-8 d-flex flex-column" style={{padding: "130px 50px"}}>
                                <h1 className='text-white bold'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</h1>
                                <span className='text-white pt-5 pb-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur dignissimos beatae aliquam, quas minima quia quidem voluptates </span>
                                <button type="button" className="btn btn-light" style={{color: "orange", width: "40%"}}>Entrar agora</button>
                            </div>
                            <div className="col d-flex flex-column-reverse text-aligm-right">
                                <span>Como Funciona</span>
                                <div className=''>
                                    video
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            <section className='pt-5'>
                <div className='row'>
                    <div className="col-10 m-auto p-0 mb-3">
                        <h3>
                            Trabalhos de outros arquitetos
                        </h3>
                    </div>
                    <div className="col-sm-10 m-auto mt-3">
                        <div className="row py-5">
                            {
                                collections.map(
                                    (collection, index) => (
                                        <div key={index} className="col-md-6 col-lg-6 col-xl-3 mb-3" style={{height: "300px"}}>
                                            <CardJob isOpen={openCollection == collection.id} session={session} collection={collection} key={index} name="Lorem Ipsum dolor sit" data="Postado 5 horas atrás"></CardJob>
                                        </div>
                                    )
                                )
                            }
                        </div>               
                    </div>
                    <div className="col-10 m-auto p-0">
                        <div className='row justify-content-center'>
                            <Button disabled={disablePagination} onClick={() => setPage(page + 1)} 
                            style={{display: (collections.length > 16) ? "block" : "none", backgroundColor: "white", color: "black", border: "1.5px solid #EEEEEE"}} variant="contained" sx={{marginTop: "5rem", width: "20%", bottom: "3rem"}}>Carregar mais...</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

Home.propTypes = {
    session: PropTypes.object.isRequired
}