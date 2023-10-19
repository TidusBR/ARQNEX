import "./card-user.css"

import { Link } from 'react-router-dom'
import SoftwareUser from "../software_user/SoftwareUser"
import PropTypes from 'prop-types';
import { config } from "../../config";

export default function CardUser({ info, session }) {
    const isMyProfile = session.account?.id === info.id;
    
    return (
        <div className="container-card-user rounded mb-4">
            {isMyProfile && <Link to="/edit-profile"><button className="edit-profile rounded p-2 px-4 fw-bold">Editar</button></Link>}
            <img src={`${config.api}/uploads/${info.id}/avatar`} className="img-user" alt="" width="396px" height="456px" />
            <div className="text-center p-4 p-xxl-5">
                <div className="mb-4">
                    <p className="name-user">{info.name}</p>
                    <p className="address-user">{info.address.city}</p>
                    {info.premium_level > 0 && <p className="upgrade">PRO</p>}
                </div>
                {session.loggedIn && !isMyProfile && <button className="button-follow bg-white rounded p-2 px-5 mb-4">Seguir</button>}
                <p className="bio-user mb-5">{info.biography}</p>
                <p className="softwares text-start fw-bold mb-2">Softwares</p>
                <div className="container-softwares mb-3 d-flex row">
                    {info.softwares.map((softwareData, index) => (
                        <div key={index} className="col-6 col-sm-3 col-md-2 col-lg-12 col-xxl-6 mb-2">
                            <SoftwareUser iconPath={softwareData.iconPath} name={softwareData.name}/>
                        </div>
                    ))}
                </div>
                {!isMyProfile && <Link className="link-curriculo" to="/">Visualizar currículo</Link>}
            </div>
        </div>
    )
}

CardUser.propTypes = {
    session: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
}