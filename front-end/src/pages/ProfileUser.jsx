import CardUser from "../components/card_user/CardUser";
import { config } from "../config";
import './css/profile-user.css'
import CardJob from "../components/card-job/CardJob";
import { useEffect, useState } from "react";

export default function ProfileUser({ session }) {

    let props = {
        followers: 10,
        jobs: 12
    }

    const [collections, setCollections] = useState(null)

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.collection.list}/${session.account.id}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            setCollections(data);
        });
    }, [])

    if(collections === null) {
        return;
    }

    const openCollection = new URLSearchParams(window.location.search)?.get('col');

    return (
        <div className="container-profile-user my-5">
            <div className="row">
                <div className="col-10 m-auto">
                    <div className="row">
                        <div className="col-lg-3">
                            <CardUser/>
                        </div>
                        <div className="col-lg-9">
                            <div className="row mb-4">
                                <div className="col-2">
                                    <select className="form-select d-inline">
                                        <option value="popular">Popular</option>
                                    </select>
                                </div>
                                <div className="col-10 d-flex flex-row-reverse align-items-center flex-start">
                                    <div>
                                        <span style={{fontSize: "1.2rem" ,color: "#000000DE"}} className="followers me-1 fw-bold">{
                                            props.followers < 10 ? `0${props.followers}` : props.followers
                                        }</span>
                                        <span style={{fontSize: "1.2rem" ,color: "#00000061"}}>Trabalhos</span>
                                    </div>
                                    <div className="me-4">
                                        <span style={{fontSize: "1.2rem" ,color: "#000000DE"}} className="jobs me-1 fw-bold">{
                                            props.jobs < 10 ? `0${props.jobs}` : props.jobs
                                        }</span>
                                        <span style={{fontSize: "1.2rem" ,color: "#00000061"}}>Trabalhos</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                    {
                                        collections.map(
                                            (collection, index) => (
                                                <div className="col-12 col-lg-4 mb-3" style={{height: "300px"}}>
                                                    <CardJob isOpen={openCollection == collection.id} session={session} collection={collection} key={index} name="Lorem Ipsum dolor sit" data="Postado 5 horas atrás"></CardJob>
                                                </div>
                                            )
                                        )
                                    }                                   
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}