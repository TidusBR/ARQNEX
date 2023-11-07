import './css/home.css'
import background from '../assets/Dashboard/foto-home.png'
import CardJob from '../components/card-job/CardJob'
import { useEffect, useState } from 'react'
import { config } from '../config';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export default function Home({ session, setLoginOpen }) {
    // Desabilitar a paginação é temporário, o correto é notificar o usuário de que não há mais nada a ser mostrado
    const [disablePagination, setDisablePagination] = useState(false);
    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState(1);


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
                    <div className="d-none col-1 d-lg-flex flex-column justify-content-between align-items-center py-5">
                        <a href="https://www.facebook.com" className="vertical-text" target='_blank'>Facebook</a>
                        <a href="https://www.instagram.com" className="vertical-text" target='_blank'>Instagram</a>
                        <a href="https://www.twitter.com" className="vertical-text" target='_blank'>Twitter</a>
                    </div>
                    <div className="col imageStyleHome">
                        <div className="row">
                            <div className="col-10 col-md-6" style={{ padding: "80px 50px" }}>
                                <h1 className='text-white bold mb-4' style={{ fontSize: "2.5rem" }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</h1>
                                <p className='text-white mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur dignissimos beatae aliquam, quas minima quia quidem voluptates </p>
                                <Button variant='contained' className="px-5" style={{ color: "orange", background: "white"}} onClick={() => setLoginOpen(true)}>Entrar agora</Button>
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
                    {/* <div className="col-10 m-auto mb-4">
                        <div className='row justify-content-md-left'>
                            {
                                collections.map(
                                    (collection, index) => (
                                        <div className='col-12 col-sm-8 col-md-3 mb-3' key={index}>
                                            <CardJob isOpen={openCollection == collection.id} session={session} collection={collection} key={index} name="Lorem Ipsum dolor sit" data="Postado 5 horas atrás"></CardJob>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div> */}

                    <div className="col-sm-10 m-auto">
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
                        <div className='row justify-content-md-center'>
                            <Button disabled={disablePagination} onClick={() => setPage(page + 1)}
                                style={{ backgroundColor: "white", color: "black", border: "1.5px solid #EEEEEE", display: collections.length > 16 ? "block" : "none" }} variant="contained" sx={{ marginTop: "3rem", width: "20%", bottom: "3rem" }}>Carregar mais...</Button>
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