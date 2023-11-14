import './css/dashboard.css'
import CardJob from "../components/card-job/CardJob"
import { useEffect, useState } from 'react'
import { config } from '../config';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ session }) {
    // Desabilitar a paginação é temporário, o correto é notificar o usuário de que não há mais nada a ser mostrado
    const [disablePagination, setDisablePagination] = useState(false);
    const navigate = useNavigate();

    const [collections, setCollections] = useState([]);

    const [filter, setFilter] = useState({
        page: 1,
        style: 0,
        relevance: 0, // 0 = Popular, 1 = Mais curtido, 2 = Novo
        search: ""
    });

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilter(filter => ({...filter, page: 1, search: searchTerm}));
        }, 500);
    
        return () => clearTimeout(delayDebounceFn)
      }, [searchTerm]);

    useEffect(() => {
        if (filter.page === 1) {
            setCollections([]);
        }

        fetch(`${config.api}${config.endpoints.collection.newlist}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(filter)
        })
        .then(response => response.json())
        .then(data => {
            setDisablePagination(!data.hasNextPage);
            setCollections(collections => [...collections, ...data.collections]);
        });
    }, [filter, setDisablePagination, setCollections]);

    const openCollection = new URLSearchParams(window.location.search)?.get('col');

    return (
        <div className="container-dashboard">
            <div className="row">
                <div className="d-none d-md-block col-sm-2"></div>
                <div className="col-10 col-md-6 mt-5 mb-5 mx-auto mx-md-0">
                    <h1 className="fw-bold">Olá {session.account.name}.</h1>
                    <h2 style={{ fontSize: "2rem" }} className="mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</h2>
                    <div className="d-flex align-items-center">
                        <button onClick={() => navigate("/upload")} className="rounded border-0 py-2 px-4 text-white fw-bold d-flex align-items-center justify-content-between me-4" style={{ background: "#DB752C" }}>
                            <svg className="me-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g id="ic_upload" transform="translate(-5737 43)">
                                    <rect id="Rectangle_27" data-name="Rectangle 27" width="24" height="24" transform="translate(5737 -43)" fill="none" />
                                    <path id="Path_30" data-name="Path 30" d="M19.35,10.04a7.492,7.492,0,0,0-14-2A6,6,0,0,0,6,20H19a4.986,4.986,0,0,0,.35-9.96ZM14,13v4H10V13H7l5-5,5,5Z" transform="translate(5737 -43)" fill="#fff" />
                                </g>
                            </svg>
                            <span>Postar um trabalho</span>
                        </button>
                        {!session.account.isPremium && <a href="/become-pro" className="upgrade" style={{ fontSize: "0.8rem" }}>Fazer um upgrade, torne-se PRO</a>}
                    </div>
                </div>

                <div className="col-sm-12 mt-4 px-5 d-md-flex">
                    <div className="col-12 mb-3 col-md-2 col-lg-2 col-xxl-1">
                        <select
                            className="form-select d-inline"
                            value={filter.relevance}
                            onChange={(e) => setFilter(f => ({...f, page: 1, relevance: Number(e.target.value)})) }
                        >
                            <option value="0">Popular</option>
                            <option value="1">Mais curtido</option>
                            <option value="2">Mais recente</option>
                        </select>
                    </div>
                    <div className="col text-center mb-3">
                        <button
                            className="p-2 border-0 fw-bold rounded me-3"
                            style={{ backgroundColor: filter.style === 0 ? "#DB752C52" : "white" }}
                            onClick={() => setFilter(f => ({...f, page: 1, style: 0})) }
                        >
                            Clássico
                        </button>
                        <button
                            className="p-2 border-0 fw-bold rounded"
                            style={{ backgroundColor: filter.style === 1 ? "#DB752C52" : "white" }}
                            onClick={() => setFilter(f => ({...f, page: 1, style: 1})) }
                        >
                            Contemporâneo + Moderno
                        </button>
                    </div>
                    <div className="col-12 col-md-2 col-xxl-1">
                        <input className="form-control icon-search" type="text" placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <div className="col-sm-10 m-auto mt-3">
                    <div className="row py-5">
                        {
                            collections.map(
                                (collection, index) => (
                                    <div key={index} className="col-md-6 col-lg-6 col-xl-3 mb-3" style={{ height: "300px" }}>
                                        <CardJob isOpen={openCollection == collection.id} session={session} collection={collection} key={index} name="Lorem Ipsum dolor sit" data="Postado 5 horas atrás"></CardJob>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className="col-10 m-auto p-0">
                    <div className='row justify-content-center'>
                        <Button disabled={disablePagination} onClick={() => setFilter(filter => ({...filter, page: filter.page + 1}))}
                            style={{ display: (collections.length > 16) ? "block" : "none", backgroundColor: "white", color: "black", border: "1.5px solid #EEEEEE" }} variant="contained" sx={{ marginTop: "5rem", width: "20%", bottom: "3rem" }}>Carregar mais...</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    session: PropTypes.object.isRequired
}