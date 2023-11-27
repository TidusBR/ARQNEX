import './css/dashboard.css'
import { useEffect, useState } from 'react'
import { config } from '../config';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import CardJob from '../components/card-job/CardJob';

export default function Offices( {session} ) {
    // Desabilitar a paginação é temporário, o correto é notificar o usuário de que não há mais nada a ser mostrado
    const [disablePagination] = useState(false);
    const [page, setPage] = useState(1)

    const [offices, setOffices] = useState([]);

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.office.list}`, { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            setOffices(data);
        });
    }, []);

    const openCollection = new URLSearchParams(window.location.search)?.get('col');

    return (
        <div className="container-peoples">
            <div className="row">
                <div className="d-none d-md-block col-sm-2"></div>
                <div className="col-10 col-md-6 mt-5 mb-5 mx-auto mx-md-0">
                    <h1 className="fw-bold">Escritórios</h1>
                    <h2 style={{ fontSize: "1.5rem" }} className="mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo.</h2>
                </div>

                <div className="col-sm-10 mt-4 pb-4 d-flex flex-md-row flex-column justify-content-between m-auto" style={{borderBottom: "1px solid #EEEEEE"}}>
                    <div className="col-12 mb-3 col-md-2">
                        <select className="form-select d-inline">
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-2">
                        <input className="form-control icon-search" type="text" placeholder="Buscar" />
                    </div>
                </div>

                <div className="col-12 col-sm-10 m-auto mt-1 px-md-0">
                    <p style={{color: "#00000061"}}>{offices.length} Escritórios</p>
                </div>

                <div className='col-12 col-sm-10 m-auto mt-3 mt-md-5 '>
                    {offices.map((office, index, array) => {
                        return <div className='row' key={index} style={index === array.length - 1 ? {marginBottom: "3rem"} : {}}>
                                    { index > 0 && <div className="col-12 my-3" >
                                        <hr />
                                    </div> }
                                    <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex align-items-center">
                                        <img src={`${config.api}/${office.photo !== '' ? office.photo : 'uploads/-1/office'}`} className="rounded-circle me-2" alt="fotoPerfil" width={100} height={100} />
                                        <div className="d-flex flex-column justify-content-around">
                                            <p style={{color: "#1D252C"}}  className="fw-bold">{office.name}</p>
                                            <p style={{color: "#1D252C52"}}>{office.address.city}</p>
                                        </div>
                                    </div>
                                    {/* {office.collections.map((path,index) => {
                                        return <div className="col-12 col-md-3 mb-3 mb-md-0" key={index}>
                                                <img src={`${config.api}/${path}`} alt="" style={{height: "100%", width: "100%"}}/>
                                            </div>
                                    })} */}
                                    {office.collections.map((collection, index) => {
                                        return <div key={index} className="col-12 col-xl-3 mb-3" style={{ height: "300px" }}>
                                                <CardJob isOpen={openCollection == collection.id} session={session} collection={collection} key={index} name="Lorem Ipsum dolor sit" data="Postado 5 horas atrás"></CardJob>
                                            </div>
                                    })}
                                    {/* {office.hasManyJobs && <div className="col-12 mt-2 d-flex flex-row-reverse">
                                        <a href='#' style={{color: "#DB752C", cursor: "pointer"}} className='text-decoration-none'>Ver mais {'>'}</a>
                                    </div>} */}
                                </div>
                    })}
                </div> 

                
                <div className="col-10 m-auto p-0">
                    <div className='row justify-content-center'>
                        <Button disabled={disablePagination} onClick={() => setPage(page + 1)}
                            style={{ display: "none", backgroundColor: "white", color: "black", border: "1.5px solid #EEEEEE" }} variant="contained" sx={{ marginTop: "5rem", width: "20%", bottom: "3rem" }}>Carregar mais...</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Offices.propTypes = {
    session: PropTypes.object.isRequired
}