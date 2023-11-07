import PropTypes from 'prop-types';

import { useEffect, useState } from "react"

import "./css/notifications.css"
import { config } from "../config"

import { Favorite, PersonAdd } from '@mui/icons-material';
import { Temporal } from '@js-temporal/polyfill';
import { Typography, Button } from '@mui/material';

/**
 * @param {Temporal.Duration} duration 
 */
function formatDuration(duration) {
    let totalSeconds = duration.total({ unit: 'seconds' });
    let days = Math.floor(totalSeconds / 86400); // 86400 seconds in a day
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600); // 3600 seconds in an hour
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
 
    if (days > 0) {
     return `${days}d`;
    } else if (hours > 0) {
     return `${hours}h`;
    } else if (minutes > 0) {
     return `${minutes}m`;
    } else if (seconds > 0) {
     return `${Math.floor(seconds)}s`;
    }

    return `${duration.milliseconds}ms`;
 }

export default function Notifications({ updateSession }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.notifications}`, { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            setNotifications(data);
        });
    }, [setNotifications]);

    const actions = {
        0: {
            icon: <Favorite htmlColor="red" size="large" />,
            description: "curtiu"
        },

        1: {
            icon: <PersonAdd size="large" />,
            description: "te convidou para o escritório"
        },

        2: {
            icon: <PersonAdd size="large" />,
            description: "te convidou para o escritório"
        },

        3: {
            icon: <PersonAdd size="large" />,
            description: "te convidou para o escritório"
        },

        4: {
            icon: <PersonAdd size="large" />,
            description: "aceitou o convite para o seu escritório."
        }
    }

    const handleOfficeInviteRejected = async function(event, notification) {
        event.preventDefault();
        event.target.disabled = true;

        await fetch(`${config.api}${config.endpoints.office.reject_invite}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                notificationId: notification.id
            })
        });

        const res = await fetch(`${config.api}${config.endpoints.notifications}`, { credentials: "include" })
        setNotifications(await res.json());
    }

    const handleOfficeInviteAccepted = async function(event, notification) {
        event.preventDefault();
        event.target.disabled = true;

        await fetch(`${config.api}${config.endpoints.office.accept_invite}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                notificationId: notification.id
            })
        });

        updateSession();

        const res = await fetch(`${config.api}${config.endpoints.notifications}`, { credentials: "include" })
        setNotifications(await res.json());

        
    }

    return (<div className="row container-notifications">
        <div className="col-12 col-lg-10 m-auto">
            <h1 className="mt-5 mb-5">
                Notificações
            </h1>
            {
            notifications.length === 0
            && <Typography textAlign="center" fontSize={20}>Não há notificações</Typography>
            }
            {notifications.map((notification, index) => {
                return <div className="col-12 col-lg-10" style={(index === notifications.length - 1 ) ? {marginBottom: "3rem"} : {}} key={index}>
                    {index > 0 && <div className="my-3" >
                        <hr />
                    </div>}

                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                            {
                            notification.action_id === 0
                            &&  <img src={`${config.api}/${notification.collection_image_url}`} alt="" className="me-4 img-responsive-job" />
                            }
                            
                            {
                                actions[notification.action_id].icon
                            }

                            <img src={`${config.api}/uploads/${notification.sender_id}/avatar`} style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                            }} className='mb-2 p-1 ms-3 me-2 img-responsive-user' alt="" />

                            <p className="notifications-paragraph" style={{ color: "#00000061", fontWeight: "bold" }}>
                                <span style={{ color: "#DB752C", textDecoration: "underline" }}>
                                    {notification.sender_name}
                                </span>

                                <span style={{ fontWeight: "normal", textDecoration: "none" }} className="mx-1">
                                    {actions[notification.action_id].description}
                                </span>

                                <span style={{ textDecoration: "underline" }}>
                                    {
                                    notification.action_id === 0
                                    ? notification.collection_title
                                    : (notification.action_id >= 1 && notification.action_id <= 3)
                                    ? notification.office_name
                                    : ''
                                    }
                                </span>
                            </p>

                            {
                            notification.action_id === 1
                            && (
                            <div className="mb-2 p-1 ms-3 me-2 d-flex flex-row align-items-center justify-content-between">
                                <Button color="success" variant="outlined" className='mx-2' onClick={(e) => {handleOfficeInviteAccepted(e, notification)}}>Aceitar</Button>
                                <Button color="error" variant="outlined" onClick={(e) => {handleOfficeInviteRejected(e, notification)}}>Recusar</Button>
                            </div>
                            )
                            || notification.action_id === 2
                            && (
                            <div className="mb-2 p-1 ms-3 me-2 d-flex flex-row align-items-center justify-content-between">
                                <Button color="info" variant="outlined" disabled>Recusado</Button>
                            </div>
                            )
                            || notification.action_id === 3
                            && (
                                <div className="mb-2 p-1 ms-3 me-2 d-flex flex-row align-items-center justify-content-between">
                                    <Button color="success" variant="outlined" disabled>Aceito</Button>
                                </div>
                                )
                            }
                        </div>

                        <p className="notifications-paragraph text-end" style={{color: "#1D252C52"}}>Há {formatDuration(Temporal.Now.instant().since(Temporal.Instant.fromEpochMilliseconds(notification.timestamp)))} atrás</p>
                    </div>
                </div>
            })}
        </div>
    </div>)
}


Notifications.propTypes = {
    updateSession: PropTypes.func.isRequired
}