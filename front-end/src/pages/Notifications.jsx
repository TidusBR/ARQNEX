import { useState } from "react"
import likeSvg from "../assets/svg-notifications/ic_like.svg"
import followSvg from "../assets/svg-notifications/ic_follow.svg"
import mailSvg from "../assets/svg-notifications/ic_mail.svg"
import defaultImgUser from "../assets/fotoPerfil.png"
import defaultImgJob from "../assets/fotoRegister.jpeg"
import "./css/notifications.css"

export default function Notifications() {

    const [mockAction] = useState([{
        id: 1,
        svg: <svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
            <defs>
                <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#ff6a00" />
                    <stop offset="1" stop-color="#ee2c09" />
                </linearGradient>
            </defs>
            <g id="ic_like" transform="translate(-1819 124)">
                <rect id="Rectangle_4" data-name="Rectangle 4" width="40" height="40" transform="translate(1819 -124)" fill="none" />
                <path id="Path_12" data-name="Path 12" d="M18.719,33.68,16.3,31.473C7.685,23.665,2,18.516,2,12.2A9.106,9.106,0,0,1,11.2,3a10.012,10.012,0,0,1,7.524,3.494A10.012,10.012,0,0,1,26.243,3a9.106,9.106,0,0,1,9.2,9.2c0,6.32-5.685,11.469-14.3,19.294Z" transform="translate(1820 -123)" fill="url(#linear-gradient)" />
            </g>
        </svg>,
        descriptionAction: "curtiu",
        nameJob: "Lorem ipsum dolor"
    }, {
        id: 2,
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <g id="ic_follow" transform="translate(-1819 124)">
                <rect id="Rectangle_4" data-name="Rectangle 4" width="40" height="40" transform="translate(1819 -124)" fill="none" />
                <path id="checked_1_" data-name="checked (1)" d="M.3,14a.967.967,0,0,1,0-1.4l1.4-1.4a.967.967,0,0,1,1.4,0l.1.1,5.5,5.9a.483.483,0,0,0,.7,0L22.8,3.3h.1a.967.967,0,0,1,1.4,0l1.4,1.4a.967.967,0,0,1,0,1.4h0L9.7,22.7a.967.967,0,0,1-1.4,0L.5,14.3.3,14Z" transform="translate(1826 -117)" fill="#1d252c" />
            </g>
        </svg>,
        descriptionAction: "começou a te seguir",
        nameJob: ""
    }, {
        id: 3,
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <g id="ic_mail" transform="translate(-5737 43)">
                <rect id="Rectangle_27" data-name="Rectangle 27" width="40" height="40" transform="translate(5737 -43)" fill="none" />
                <path id="Path_33" data-name="Path 33" d="M23.6,4H4.4A2.4,2.4,0,0,0,2.012,6.4L2,20.8a2.407,2.407,0,0,0,2.4,2.4H23.6A2.407,2.407,0,0,0,26,20.8V6.4A2.407,2.407,0,0,0,23.6,4Zm0,4.8-9.6,6-9.6-6V6.4l9.6,6,9.6-6Z" transform="translate(5743.423 -36.577)" fill="#1d252c" />
            </g>
        </svg>,
        descriptionAction: "te convidou para seu escritório",
        nameJob: ""
    }])

    const [mockUserNotification] = useState([{
        imgJob: defaultImgJob,
        imgUser: defaultImgUser,
        nameUser: "Thomas Silva",
        idAction: 1,
        timeAction: "12 horas atrás"
    }, {
        imgJob: defaultImgJob,
        imgUser: defaultImgUser,
        nameUser: "Anna Lima",
        idAction: 1,
        timeAction: "12 horas atrás"
    }, {
        imgJob: defaultImgJob,
        imgUser: defaultImgUser,
        nameUser: "Camila Astro",
        idAction: 2,
        timeAction: "12 horas atrás"
    }, {
        imgJob: defaultImgJob,
        imgUser: defaultImgUser,
        nameUser: "Escritório 1",
        idAction: 3,
        timeAction: "12 horas atrás"
    }])

    console.log(likeSvg);

    return (<div className="row container-notifications">
        <div className="col-12 col-lg-10 m-auto">
            <h1 className="mt-5 mb-5">
                Notificações
            </h1>
            {mockUserNotification.map((element, index) => {
                return <div className="col-12 col-lg-10" style={(index === mockUserNotification.length - 1 ) ? {marginBottom: "3rem"} : {}} key={index}>
                    {index > 0 && <div className="my-3" >
                        <hr />
                    </div>}

                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                            <img src={element.imgJob} alt="" className="me-4 img-responsive-job" />

                            {mockAction.map((elementAction) => {
                                if (elementAction.id === element.idAction)
                                    return elementAction.svg
                            })}

                            <img src={element.imgUser} alt="" className="ms-3 me-2 img-responsive-user" />

                            <p className="notifications-paragraph" style={{ color: "#00000061", fontWeight: "bold" }}>
                                <span style={{ color: "#DB752C", textDecoration: "underline" }}>
                                    {element.nameUser}
                                </span>

                                <span style={{ fontWeight: "normal", textDecoration: "none" }} className="mx-1">
                                    {mockAction.map((elementAction) => {
                                        if (elementAction.id === element.idAction)
                                            return elementAction.descriptionAction
                                    })}
                                </span>

                                <span style={{ textDecoration: "underline" }}>
                                    {mockAction.map((elementAction) => {
                                        if (elementAction.id === element.idAction)
                                            return elementAction.nameJob
                                    })}
                                </span>
                            </p>
                        </div>


                        <p className="notifications-paragraph text-end" style={{color: "#1D252C52"}}>{element.timeAction}</p>
                    </div>



                </div>
            })}
        </div>



    </div>)
}