import CardUser from "../components/card_user/CardUser";
import { config } from "../config";
import './css/profile-user.css'
import CardJob from "../components/card-job/CardJob";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfileUser({ session }) {
    const navigate = useNavigate();
    const location = useLocation();

    const username = location.pathname.substring(9).length > 0 ? location.pathname.substring(9) : session.account?.username;

    if (username === undefined || username.length === 0) {
        navigate("/");
    }

    const [profileInfo, setProfileInfo] = useState(null)

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.account.profile}${username}`, { credentials: "include" })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status !== 200) {
                navigate("/");
            }
        })
        .then(data => {
            setProfileInfo(data);
        });
    }, [navigate, username])

    

    if(profileInfo === null) {
        return;
    }

    const openCollection = new URLSearchParams(window.location.search)?.get('col');

    return (
        <div className="container-profile-user my-5">
            <div className="row">
                <div className="col-10 m-auto">
                    <div className="row">
                        <div className="col-lg-3">
                            <CardUser info={profileInfo} session={session}/>
                        </div>
                        <div className="col-lg-9">
                            <div className="row mb-4">
                                <div className="col-4 col-md-3 col-xl-2">
                                    <select className="form-select d-inline select-size">
                                        <option value="popular">Popular</option>
                                    </select>
                                </div>
                                <div className="col-8 col-md-9 col-xl-10 d-flex flex-row-reverse align-items-center flex-start">
                                    <div>
                                        <span  className="followers me-1 fw-bold">{
                                            0
                                        }</span>
                                        <span className="text-job">Seguidores</span>
                                    </div>
                                    <div className="me-4">
                                        <span  className="jobs me-1 fw-bold">{
                                            profileInfo.collections.length
                                        }</span>
                                        <span className="text-job">Trabalhos</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                    {
                                        profileInfo.collections.map(
                                            (collection, index) => (
                                                <div key={index} className="col-12 col-lg-4 mb-3" style={{height: "300px"}}>
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

ProfileUser.propTypes = {
    session: PropTypes.object.isRequired
}