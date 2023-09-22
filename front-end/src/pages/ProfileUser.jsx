import CardUser from "../components/card_user/CardUser";
import { config } from "../config";
import './css/profile-user.css'
import CardCollection from "../components/card-collection/CardCollection";
import { useEffect, useState } from "react";

export default function ProfileUser({ session }) {

    let props = {
        followers: 10,
        jobs: 12
    }

    const [collection, setCollections] = useState([])

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.collection.list}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            setCollections(data);
        });
    }, [])

    const openCollection = new URLSearchParams(window.location.search)?.get('col');

    return (
        <div className="container-profile-user my-5">
            <div className="row">
                <div className="col-10 m-auto">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-3">
                            <CardUser/>
                        </div>
                        <div className="col-xxl-9 col-xl-9 d-flex flex-column p-0">
                            <div className="row mb-4">
                                <div className="col">
                                    <button className="btn btn-primary">Popular</button>
                                </div>
                                <div className="col-3 d-flex flex-row align-items-center justify-content-between">
                                    <div>
                                        <span style={{fontSize: "1.2rem" ,color: "#000000DE"}} className="followers me-1 fw-bold">{
                                            props.followers < 10 ? `0${props.followers}` : props.followers
                                        }</span>
                                        <span style={{fontSize: "1.2rem" ,color: "#00000061"}}>Trabalhos</span>
                                    </div>
                                    <div>
                                        <span style={{fontSize: "1.2rem" ,color: "#000000DE"}} className="jobs me-1 fw-bold">{
                                            props.jobs < 10 ? `0${props.jobs}` : props.jobs
                                        }</span>
                                        <span style={{fontSize: "1.2rem" ,color: "#00000061"}}>Trabalhos</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xxl-4 col-xl-3 bg-black">
                                    {/* <CardJob></CardJob> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}