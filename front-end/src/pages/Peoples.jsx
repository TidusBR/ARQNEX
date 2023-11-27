import './css/dashboard.css'
import { useEffect, useState } from 'react'
import { config } from '../config';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import avatarDefault from "../assets/fotoPerfil.png";
import jobDefault from "../assets/fotoRegister.jpeg";

export default function Peoples({ session }) {
    const navigate = useNavigate();

    const [disablePagination, setDisablePagination] = useState(false);
    const [page, setPage] = useState(1)

    const [collections, setCollections] = useState([]);

    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.people.list}`, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(people => {
            setPeople(people);
        });
    }, []);

    //USUARIOS MOCKADOS
    const [users, setUsers] = useState([{
        name: "Watson Roberto",
        avatar: avatarDefault,
        isPremium: true,
        address: "Campo Grande, MS",
        semester: "6° Semestre",
        following: true,
        jobs: [jobDefault,jobDefault,jobDefault],
        hasManyJobs: true,
        hasOffice: true
    },{
        name: "Jeferson Gimenes",
        avatar: avatarDefault,
        isPremium: true,
        address: "Campo Grande, MS",
        semester: "6° Semestre",
        following: false,
        jobs: [jobDefault,jobDefault],
        hasManyJobs: false,
        hasOffice: true
    },{
        name: "Diogo Soares",
        avatar: avatarDefault,
        isPremium: false,
        address: "São Paulo, SP",
        semester: "",
        following: false,
        jobs: [jobDefault,jobDefault,jobDefault],
        hasManyJobs: true,
        hasOffice: false
    }])

    return (
        <div className="container-peoples">
            <div className="row">
                <div className="d-none d-md-block col-sm-2"></div>
                <div className="col-10 col-md-6 mt-5 mb-5 mx-auto mx-md-0">
                    <h1 className="fw-bold">Pessoas</h1>
                    <h2 style={{ fontSize: "1.5rem" }} className="mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo.</h2>
                </div>

                <div className="col-sm-12 mt-4 px-5 d-md-flex pb-4" style={{borderBottom: "1px solid #EEEEEE"}}>
                    <div className="col-12 mb-3 col-md-2 col-lg-2 col-xxl-1">
                        <select className="form-select d-inline">
                            <option value="popular">Popular</option>
                        </select>
                    </div>
                    <div className="col text-center mb-3">
                        <button className="p-2 border-0 fw-bold bg-white rounded me-3">
                            Clássico
                        </button>
                        <button className="p-2 border-0 fw-bold bg-white rounded">
                            Contemporâneo + Moderno
                        </button>
                    </div>
                    <div className="col-12 col-md-2 col-xxl-1">
                        <input className="form-control icon-search" type="text" placeholder="Buscar" />
                    </div>
                </div>

                <div className='col-12 col-sm-10 m-auto mt-5'>
                    {people.map((person, index) => {
                        return <div className='row' key={index}>
                                    { index > 0 && <div className="col-12 my-3" >
                                        <hr />
                                    </div> }
                                    <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex align-items-center">
                                        <img src={`${config.api}/uploads/${person.id}/avatar`} className="rounded-circle me-2" alt="fotoPerfil" width={100} height={100} />
                                        <div className="d-flex flex-column justify-content-around">
                                            <p style={{color: "#1D252C"}}  className="fw-bold">{person.name}
                                                {person.isPremium && <span className="become-upgrade px-1">PRO</span>}
                                            </p>
                                            {
                                            person.semester && person.semester !== "" &&
                                            <p style={{color: "#1D252C52"}}>{person.semester}° Semestre</p>
                                            }
                                            <p style={{color: "#1D252C52"}}>{person.city}</p>
                                            {
                                            session.loggedIn &&
                                            <div className='d-flex'>
                                                <Button variant='contained' className='me-2' size='small'
                                                    style={person.following ? {textTransform: "none", backgroundColor: "white", color: "#1D252C", border: "1.5px solid #EEEEEE"}
                                                    : {textTransform: "none", backgroundColor: "#DB752C", color: "white"}}
                                                >
                                                    {person.following ? "Seguindo" : "Seguir"}
                                                </Button>
                                                {false /* verificar se user logado tem escritório */ && <Button variant='contained' size='small'
                                                style={{textTransform: "none", backgroundColor: "white", color: "#1D252C", border: "1.5px solid #EEEEEE"}}>Convidar</Button>}
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    {person.collections.map((collection, index) => {
                                        return <div className="col-12 col-md-3 mb-3 mb-md-0" key={index}>
                                                <img src={`${config.api}/${collection.files[0]}`} alt="" style={{height: "100%", width: "100%"}}/>
                                            </div>
                                    })}
                                    {person.collectionCount > 3 && <div className="col-12 mt-2 d-flex flex-row-reverse">
                                        <a onClick={() => navigate(`/profile/${person.username}`)} style={{color: "#DB752C"}} className='text-decoration-none'>Ver mais {'>'}</a>
                                    </div>}
                                </div>
                    })}
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