import './css/dashboard.css'
import { useEffect, useState } from 'react'
import { config } from '../config';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import CardJob from '../components/card-job/CardJob';
import { useNavigate } from 'react-router-dom';

export default function People({ session }) {
    const navigate = useNavigate();

    const [disablePagination, setDisablePagination] = useState(false);

    const [people, setPeople] = useState([]);

    const [filter, setFilter] = useState({
        page: 1,
        style: 0,
        relevance: 0, // 0 = Popular, 2 = Novo
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
        fetch(`${config.api}${config.endpoints.people.list}`, {
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
            setPeople(people => filter.page === 1 ? data : [...people, ...data]);
        });
    }, [filter, setDisablePagination, setPeople]);

    const openCollection = new URLSearchParams(window.location.search)?.get('col');

    const handlePersonOfficeInvite = async function(event, person) {
        event.preventDefault();
        
        if (!session.loggedIn || !session.account.isPremium || !session.account.hasOffice || person.isAlreadyInvited)
            return;

        person.isAlreadyInvited = true;

        await fetch(`${config.api}${config.endpoints.office.invite}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                personId: person.id
            })
        });

        setPeople(people.map(p => p.id === person.id ? person : p));
    }
    
    const handlePersonFollow = async function(event, person) {
        event.preventDefault();
        
        if (!session.loggedIn)
            return;

        await fetch(`${config.api}${config.endpoints.account.follow}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                followId: person.id
            })
        });

        person.isAlreadyFollowing = !person.isAlreadyFollowing;
        setPeople(people.map(p => p.id === person.id ? person : p));
    }

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
                    <select
                            className="form-select d-inline"
                            value={filter.relevance}
                            onChange={(e) => setFilter(f => ({...f, page: 1, relevance: Number(e.target.value)})) }
                        >
                            <option value="0">Popular</option>
                            <option value="1">Mais recente</option>
                        </select>
                    </div>
                    <div className="col text-center mb-3 d-md-block d-flex justify-content-between">
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

                <div className='col-12 col-sm-10 m-auto mt-5'>
                    {people.map((person, index, array) => {
                        return <div className='row' key={index} style={{marginBottom: index === array.length - 1 ? "3rem" : ""}}>
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
                                            <p style={{color: "#1D252C52"}}>{person.address.city}</p>
                                            {
                                            (session.loggedIn && person.id !== session.account.id) &&
                                            <div className='d-flex'>
                                                <Button
                                                    onClick={(e) => handlePersonFollow(e, person)}
                                                    variant='contained' className='me-2' size='small'
                                                    style={person.isAlreadyFollowing ? {textTransform: "none", backgroundColor: "white", color: "#1D252C", border: "1.5px solid #EEEEEE"}
                                                    : {textTransform: "none", backgroundColor: "#DB752C", color: "white"}}
                                                >
                                                    {person.isAlreadyFollowing ? "Seguindo" : "Seguir"}
                                                </Button>
                                                {
                                                (session.account.hasOffice && !person.isOfficeMember) && 
                                                <Button
                                                    variant='contained'
                                                    size='small'
                                                    disabled={person.isAlreadyInvited}
                                                    style={{
                                                        textTransform: "none",
                                                        backgroundColor: "white",
                                                        color: "#1D252C",
                                                        border: "1.5px solid #EEEEEE",
                                                        "&:disabled": {
                                                            backgroundColor: "gray"
                                                        }
                                                    }}
                                                    onClick={(e) => handlePersonOfficeInvite(e, person)}
                                                >
                                                    Convidar
                                                </Button>
                                                }
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    {person.collections.map((collection, index) => {
                                        // return <div className="col-12 col-md-3 mb-3 mb-md-0" key={index}>
                                        //         <img src={`${config.api}/${collection.files[0]}`} alt="" style={{height: "100%", width: "100%"}}/>
                                        //     </div>
                                        return <div key={index} className="col-12 col-xl-3 mb-3" style={{ height: "300px" }}>
                                                <CardJob isOpen={openCollection == collection.id} session={session} collection={collection} key={index} name="Lorem Ipsum dolor sit" data="Postado 5 horas atrás"></CardJob>
                                            </div>
                                    })}
                                    {person.collectionCount > 3 && <div className="col-12 mt-2 d-flex flex-row-reverse">
                                        <a onClick={() => navigate(`/profile/${person.username}`)} style={{color: "#DB752C", cursor: "pointer"}} className='text-decoration-none'>Ver mais {'>'}</a>
                                    </div>}
                                </div>
                    })}
                </div> 

                
                <div className="col-10 m-auto p-0">
                    <div className='row justify-content-center'>
                        <Button disabled={disablePagination} onClick={() => setFilter(filter => ({...filter, page: filter.page + 1}))}
                            style={{ display: (people.length > 16) ? "block" : "none", backgroundColor: "white", color: "black", border: "1.5px solid #EEEEEE" }} variant="contained" sx={{ marginTop: "5rem", width: "20%", bottom: "3rem" }}>Carregar mais...</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

People.propTypes = {
    session: PropTypes.object.isRequired
}