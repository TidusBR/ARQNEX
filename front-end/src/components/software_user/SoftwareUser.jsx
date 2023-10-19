import "./software-user.css"
import PropTypes from 'prop-types';

export default function SoftwareUser({iconPath, name}) {
    return (
        <button className="container-software-user d-flex align-items-center justify-content-center rounded p-1  bg-white">
            {
            iconPath &&
            <img src={"/" + iconPath} width={24} height={24}/> 
            }
            <span style={{paddingLeft: iconPath ? "0.5em" : ""}}>
                {name} 
            </span>
        </button>
    )
}

SoftwareUser.propTypes = {
    iconPath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}