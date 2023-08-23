import { useState } from "react"
import "./card-user.css"
import imgTest from "../../assets/card-user-test/anna.png"
import { Link } from 'react-router-dom'
import SoftwareUser from "../software_user/SoftwareUser"

export default function CardUser() {
    const props = {
        url: imgTest,
        name: "Giovanna Oliveira",
        address: "São Paulo, SP",
        isPro: true,
        bio: "Lorem ipsum dolor sit aconsetetur sadipscing elitr, sedumy eirmod tempor invidunt ut labore et.",
        softwares: [
            {
                icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><g id='ic_like' transform='translate(-1819 124)'>  <rect id='Rectangle_4' data-name='Rectangle 4' width='24' height='24' transform='translate(1819 -124)' fill='none'/>  <g id='Group_107' data-name='Group 107' transform='translate(1482.524 -144.687)'>    <path id='XMLID_9_' d='M346.791,35.467l-.025-.016.02.011.006,0m-3.26,2.167-.012-.013-.024-.026-.047-.053-.094-.106c-.031-.035-.066-.071-.093-.1l-.08-.1c-.053-.067-.109-.127-.161-.2a7.845,7.845,0,0,1-1.573-3.894,7.158,7.158,0,0,1,.692-4.044,6.413,6.413,0,0,1,1.163-1.616c.056-.056.119-.121.17-.168l.191-.168c.093-.082.183-.151.274-.221a2.159,2.159,0,0,0-.121.217,7.133,7.133,0,0,0-.687,1.88c-.011.082-.023.159-.033.248s-.018.149-.025.239c-.016.174-.025.339-.031.514a9.351,9.351,0,0,0,.035,1.075,9.455,9.455,0,0,0,.493,2.268,9.758,9.758,0,0,0,1.1,2.238c.12.18.248.357.387.533a5.235,5.235,0,0,0,.475.528c.047.045.1.091.156.139a1.8,1.8,0,0,0,.223.159,1.241,1.241,0,0,0,.218.1c.035.012.07.022.106.031a.971.971,0,0,0,.157.024c-.012,0,0,0,.029,0l.1,0h.009l.033,0a1.2,1.2,0,0,0,.127-.02l.06-.015.036-.011a1.11,1.11,0,0,0,.13-.05l.057-.027.047-.025c.032-.018.06-.035.084-.051a2.051,2.051,0,0,0,.393-.347c.093-.1.17-.2.241-.295a10.259,10.259,0,0,0,.688-1.1c.2-.36.384-.718.56-1.075L350,32.026c.163-.335.331-.659.493-.977l.061-.119.013-.026h0l.008-.015.1-.186.112-.189c.058-.093.116-.185.185-.278a3.42,3.42,0,0,1,1.125-1.062,1.93,1.93,0,0,1,.915-.242,1.643,1.643,0,0,1,.185.01,1.743,1.743,0,0,1,.8.285,2.218,2.218,0,0,1,.542.605,6.79,6.79,0,0,1,.448,4.8,6.651,6.651,0,0,1-1.6,2.832c-.1.108-.206.208-.314.31l-.04.038-.01.01-.007.006-.013.011-.094.081c-.061.052-.129.114-.185.157a6.5,6.5,0,0,1-1.553.934,7.445,7.445,0,0,1-.9.309,7.609,7.609,0,0,1-1.937.246h-.169c-.035,0-.068,0-.1,0l-.237-.01c-.163-.015-.332-.024-.5-.051a6.881,6.881,0,0,1-.984-.2,6.284,6.284,0,0,1-.95-.345,5.611,5.611,0,0,1-.891-.5,6.077,6.077,0,0,1-.8-.65l-.186-.183h0l0,0,0,0,.006.007m2.857-2.5a.192.192,0,0,1-.152-.074c-.063-.078-.219-.2-.279-.277a9.531,9.531,0,0,1-1.006-1.912,8.982,8.982,0,0,1-.5-1.945,8.009,8.009,0,0,1-.1-.914c-.006-.147-.013-.3-.012-.435,0-.065,0-.146,0-.222s.006-.136.009-.2a5.36,5.36,0,0,1,.273-1.434,3.644,3.644,0,0,1,.512-.976,3.066,3.066,0,0,1,.476-.511,6.244,6.244,0,0,1,.585-.459c.121-.037.242-.072.363-.1a8.248,8.248,0,0,1,1.706-.254q.188-.009.372-.009a8.631,8.631,0,0,1,4.676,1.508c.131.093.256.178.366.27l.164.128c.037.03.071.06.105.09a3.344,3.344,0,0,0-.587-.106c-.092-.009-.187-.013-.283-.013a3.606,3.606,0,0,0-1.754.473,5.019,5.019,0,0,0-1.659,1.559c-.112.155-.218.332-.325.509l-.129.234-.136.254-.515.978c-.349.662-.679,1.461-1.053,2.139-.189.338-.35.713-.542,1.043a3.28,3.28,0,0,1-.385.567.255.255,0,0,1-.19.094M348.575,25q-.163,0-.329.005a8.771,8.771,0,0,0-3.62.911,7.644,7.644,0,0,0-.879.519c-.139.1-.292.208-.421.315l-.2.162c-.076.065-.134.12-.2.182a7,7,0,0,0-1.354,1.7,7.966,7.966,0,0,0-.985,4.421,8.828,8.828,0,0,0,1.535,4.472,8.5,8.5,0,0,0,.762.949,7.282,7.282,0,0,0,.905.833,7.179,7.179,0,0,0,1.031.677c.179.1.367.186.553.274s.379.158.574.221a7.705,7.705,0,0,0,2.377.415q.107,0,.214,0a8.7,8.7,0,0,0,2.126-.274,8.941,8.941,0,0,0,1.1-.369,8.715,8.715,0,0,0,1.021-.512,8.55,8.55,0,0,0,.932-.647c.076-.059.13-.109.2-.164l.095-.08.024-.02.039-.036.05-.047c.133-.124.264-.248.385-.38a8.187,8.187,0,0,0,1.968-3.485,8.257,8.257,0,0,0-.575-5.878,8.343,8.343,0,0,0-.482-.843,7.906,7.906,0,0,0-1.344-1.444h0c-.038-.032-.074-.064-.115-.1-.115-.1-.247-.193-.384-.295a7.617,7.617,0,0,0-2.2-1.075,9.618,9.618,0,0,0-2.8-.412' transform='translate(0)' fill='#91b6e2'/>    <path id='XMLID_10_' d='M533.874,55.365c-1.25,0-2.264.291-2.264.65s1.014.65,2.264.65,2.264-.291,2.264-.65-1.014-.65-2.264-.65' transform='translate(-185.168 -29.432)' fill='#faa74b'/>  </g></g></svg>",
                name: "VRay"
            },
            {
                icon: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'> <defs>   <linearGradient id='linear-gradient' x1='0.5' y1='0.017' x2='0.5' y2='1.012' gradientUnits='objectBoundingBox'>     <stop offset='0' stop-color='#00c7c7'/>     <stop offset='1' stop-color='#00b5b5'/>   </linearGradient>   <linearGradient id='linear-gradient-2' x1='0.378' y1='-0.097' x2='0.535' y2='0.673' gradientUnits='objectBoundingBox'>     <stop offset='0' stop-color='#099'/>     <stop offset='1' stop-color='#005454'/>   </linearGradient>   <linearGradient id='linear-gradient-3' x1='0.024' y1='0.75' x2='0.993' y2='0.088' gradientUnits='objectBoundingBox'>     <stop offset='0' stop-color='#00c7c7'/>     <stop offset='0.354' stop-color='#00c1c1'/>     <stop offset='0.831' stop-color='#00b0b0'/>     <stop offset='1' stop-color='#00a8a8'/>   </linearGradient>   <linearGradient id='linear-gradient-4' x1='0.69' y1='0.446' x2='0.509' y2='0.691' gradientUnits='objectBoundingBox'>     <stop offset='0.85' stop-color='#007878'/>     <stop offset='0.898' stop-color='#007272'/>     <stop offset='0.96' stop-color='#006262'/>     <stop offset='1' stop-color='#005454'/>   </linearGradient>   <linearGradient id='linear-gradient-5' x1='0.5' y1='0.01' x2='0.5' y2='1.032' gradientUnits='objectBoundingBox'>     <stop offset='0' stop-color='#006b6b'/>     <stop offset='1' stop-color='#007878'/>   </linearGradient>   <linearGradient id='linear-gradient-6' x1='0.081' y1='1.161' x2='0.993' y2='0.059' gradientUnits='objectBoundingBox'>     <stop offset='0' stop-color='#007878'/>     <stop offset='1' stop-color='#005454'/>   </linearGradient>   <linearGradient id='linear-gradient-7' x1='0.028' y1='0.08' x2='0.946' y2='1.146' gradientUnits='objectBoundingBox'>     <stop offset='0' stop-color='#00c7c7'/>     <stop offset='0.429' stop-color='#00b8b8'/>     <stop offset='1' stop-color='#00a8a8'/>   </linearGradient>   <linearGradient id='linear-gradient-8' x1='0.842' y1='0.759' x2='0.494' y2='0.289' xlink:href='#linear-gradient-4'/> </defs> <g id='ic_like' transform='translate(-1819 124)'>   <rect id='Rectangle_4' data-name='Rectangle 4' width='24' height='24' transform='translate(1819 -124)' fill='none'/>   <g id='_3ds-max-vector-logo' data-name='3ds-max-vector-logo' transform='translate(1733.434 -132.328)'>     <path id='XMLID_10_' d='M100.457,30.649H90.922l-1.755-4.189,5.1-1.782-4.658-4.346,4.783-4.314L89.167,14.2,90.922,10h9.535l5.173,10.328Z' fill='#00c1c1'/>     <path id='XMLID_9_' d='M105.859,241.543l16.021,0-11.238-4.311Z' transform='translate(-16.25 -221.211)' fill='url(#linear-gradient)'/>     <path id='XMLID_8_' d='M105.63,174.881l-9.425-6.124H89.167l5.225,1.813Z' transform='translate(0 -154.553)' fill='url(#linear-gradient-2)'/>     <path id='XMLID_7_' d='M96.206,14.2H89.167L90.922,10h9.535Z' fill='url(#linear-gradient-3)'/>     <path id='XMLID_6_' d='M354.951,14.2,359.2,10l5.173,10.328Z' transform='translate(-258.745)' fill='url(#linear-gradient-4)'/>     <path id='XMLID_5_' d='M364.376,174.881l-9.425,0v-6.12Z' transform='translate(-258.745 -154.553)' opacity='0.9' fill='url(#linear-gradient-5)'/>     <path id='XMLID_4_' d='M105.63,400l-9.425,6.124H89.167l5.225-1.813Z' transform='translate(0 -379.671)' fill='url(#linear-gradient-6)'/>     <path id='XMLID_3_' d='M96.206,631.241H89.167l1.755,4.2h9.535Z' transform='translate(0 -604.789)' fill='url(#linear-gradient-7)'/>     <path id='XMLID_2_' d='M354.951,406.123l4.252,4.2L364.376,400Z' transform='translate(-258.745 -379.671)' fill='url(#linear-gradient-8)'/>     <path id='XMLID_1_' d='M364.376,400l-9.425,0v6.12Z' transform='translate(-258.745 -379.671)' fill='#007c7c' opacity='0.9'/>   </g> </g></svg>",
                name: "3DS Max"
            }
        ]
    }

    return (<div className="container-card-user">
        <img src={props.url } alt="" />
        <div>
            <div>
                <span className="name-user">{props.name}</span>
                <span className="address-user">{props.address}</span>
                {props.isPro && <span className="upgrade">PRO</span>}
            </div>
            <button className="button-follow">Seguir</button>
            <span className="bio-user">{props.bio}</span>
            <span className="softwares">Softwares</span>
            <div className="container-softwares">
                {props.softwares.map((softwareData, index) => (
                    <SoftwareUser key={index} icon={softwareData.icon} name={softwareData.name}/>
                ))}
            </div>
            <Link className="link-curriculo" to="/">Visualizar currículo</Link>
        </div>
    </div>)
}