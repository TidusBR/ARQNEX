import './css/dashboard.css'
import { useEffect, useState } from 'react'
import { config } from '../config';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Peoples({ session }) {
    // Desabilitar a paginação é temporário, o correto é notificar o usuário de que não há mais nada a ser mostrado
    const [disablePagination, setDisablePagination] = useState(false);
    const [page, setPage] = useState(1)
    const navigate = useNavigate();

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
        <div className="container-peoples">
            <div className="row">
                <div className="d-none d-md-block col-sm-2"></div>
                <div className="col-10 col-md-6 mt-5 mb-5 mx-auto mx-md-0">
                    <h1 className="fw-bold">Pessoas</h1>
                    <h2 style={{ fontSize: "1.5rem" }} className="mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo.</h2>
                </div>

                <div className="col-sm-12 px-5 d-none d-md-flex pb-4" style={{borderBottom: "1px solid #EEEEEE"}}>
                    <div className="col-4 col-md-2 col-lg-2 col-xxl-1">
                        <select className="form-select d-inline">
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                    <div className="col text-center">
                        <button className="p-2 border-0 fw-bold bg-white rounded me-3">
                            Clássico
                        </button>
                        <button className="p-2 border-0 fw-bold bg-white rounded">
                            Contemporâneo + Moderno
                        </button>
                    </div>
                    <div className="col-sm-2 col-xxl-1">
                        <input className="form-control icon-search" type="text" placeholder="Buscar" />
                    </div>
                </div>

                
                <div className="col-10 m-auto p-0">
                    <div className='row justify-content-center'>
                        <Button disabled={disablePagination} onClick={() => setPage(page + 1)}
                            style={{ display: (collections.length > 16) ? "block" : "none", backgroundColor: "white", color: "black", border: "1.5px solid #EEEEEE" }} variant="contained" sx={{ marginTop: "5rem", width: "20%", bottom: "3rem" }}>Carregar mais...</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Peoples.propTypes = {
    session: PropTypes.object.isRequired
}