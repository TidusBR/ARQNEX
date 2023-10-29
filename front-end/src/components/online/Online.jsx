import React from "react";

import ReactPlayer from "react-player";

import cadernoCaneta from './online-images/escrevendo-caderno-p.png';



const videoURL = "https://www.youtube.com/watch?v=gAhV48QiVAc";

export default function Online() {

    return (
        <div className="container-online">
            <div className="row justify-content-center">
                <div className="col-7 ">
                    <div className="">
                        <h1>Lorem ipsum dolor sit amet cons.</h1>
                    </div>

                    <div className="videoWrapper" style={{
                        height: 500,
                        width: 900,
                    }}>
                        <ReactPlayer
                            light={true}
                            controls={true}
                            url={videoURL}
                            height="" />
                    </div>
                </div>
                <div style={{
                    backgroundImage: `url(${cadernoCaneta})`,
                    backgroundColor: "rgba(219, 117, 44, 0.8)",
                    backgroundRepeat: "no-repeat",
                    height: 600,
                    width: 500,

                }}>

                    <div className="col-5">
                        <h4 style={{

                        }}>Agosto - 15 a 31</h4>

                        <h2 style={{
                            // fontSize: 2.5rem/ 40px
                        }}>Cronograma de lives</h2>

                        <div>
                            {/* foto */}
                            <h5>15/08: Talk sobre o mercado de trabalho da Arquitetura</h5>
                        </div>
                        <div>
                            {/* foto */}
                            <h5>27/08: Curso básico de REVIT</h5>
                        </div>

                        <div>
                            {/* foto */}
                            <h5>31/08: Projeto executivo na prática</h5>
                        </div>

                        <div>
                            {/* logo */}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}