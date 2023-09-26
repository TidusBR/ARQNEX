import './css/dashboard.css'
import CardJob from "../components/card-job/CardJob" 
import { useEffect, useState } from 'react'
import { config } from '../config';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function Dashboard({ session }) {
    
    const user = {
        name: "Watson Roberto",
        isUpgrade: false
    }

    // Desabilitar a paginação é temporário, o correto é notificar o usuário de que não há mais nada a ser mostrado
    const [disablePagination, setDisablePagination] = useState(false);
    const [page, setPage] = useState(1)

    const [collections, setCollections] = useState([]);

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

    return (
        <div className="container-dashboard">
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-6 mt-5 mb-5">
                    <h1 className="fw-bold">Olá {user.name}.</h1>
                    <h2 style={{fontSize: "2rem"}} className="mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</h2>
                    <div className="d-flex align-items-center">
                        <button className="rounded border-0 py-2 px-4 text-white fw-bold d-flex align-items-center justify-content-between me-4" style={{background: "#DB752C"}}>
                            <svg className="me-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g id="ic_upload" transform="translate(-5737 43)">
                                    <rect id="Rectangle_27" data-name="Rectangle 27" width="24" height="24" transform="translate(5737 -43)" fill="none"/>
                                    <path id="Path_30" data-name="Path 30" d="M19.35,10.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,20H19a4.986,4.986,0,0,0,.35-9.96ZM14,13v4H10V13H7l5-5,5,5Z" transform="translate(5737 -43)" fill="#fff"/>
                                </g>
                            </svg>
                            <span>Postar um trabalho</span>
                        </button>
                        {!user.isUpgrade && <a href="#" className="upgrade" style={{fontSize: "0.8rem"}}>Fazer um upgrade, torne-se PRO</a>}
                    </div>
                </div>

                <div className="col-sm-12 mt-4 d-flex px-5">
                    <div className="col-sm-1">
                        <select className="form-select d-inline">
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                    <div className="col-sm-9 text-center">
                        <button className="p-2 border-0 fw-bold bg-white rounded me-3">
                            Clássico
                        </button>
                        <button className="p-2 border-0 fw-bold bg-white rounded">
                            Contemporâneo + Moderno
                        </button>
                    </div>
                    <div className="col-sm-2">
                        <input className="form-control icon-search" type="text" placeholder="Buscar"/>
                    </div>
                </div>

                <div className="col-sm-10 m-auto mt-3">
                    <div className="row py-5">
                        {
                            collections.map(
                                (collection, index) => (
                                    <div className="col-md-6 col-lg-6 col-xl-3 mb-3" style={{height: "300px"}}>
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
        </div>
    )
}

Dashboard.propTypes = {
    session: PropTypes.object.isRequired
}