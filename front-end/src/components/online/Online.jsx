import React from "react";
import ReactPlayer from "react-player";
import cadernoCaneta from './online-images/escrevendo-caderno-p.png';
import whiteLogo from './online-images/marcadagua.png';
import joao from './online-images/joao.png'

const videoURL = "https://www.youtube.com/watch?v=gAhV48QiVAc";

const fotoJoao = [
    {
        image: joao,
        comment: '15/08: Talk sobre o mercado de trabalho da Arquitetura',
    },
    {
        image: joao,
        comment: '27/08: Curso básico de REVIT',
    },
    {
        image: joao,
        comment: '31/08: Projeto executivo na prática',
    },
];

export default function Online() {
    return (
        <div className="container-online mt-4">
            <div className="row justify-content-center">
                <div className="col-xl-7 col-12">
                    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                        <h1 style={{ fontWeight: "bold" }}>Lorem ipsum dolor sit amet cons.</h1>
                    </div>

                    <div className="videoWrapper" style={{ width: "100%", height: "500px", marginBottom: "20px" }}>
                        <ReactPlayer
                            light={true}
                            controls={true}
                            url={videoURL}
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
                <div className="col-12 col-sm-5">
                    <div className="d-flex flex-column p-4 chat-box" style={{
                        backgroundImage: `url(${cadernoCaneta})`,
                        height: "600px",
                        width: "500px",
                        position: "relative",
                    }}>
                        <div>
                            <h4 style={{ fontSize: "22px", fontWeight: "bold" }}>Agosto - 15 a 31</h4>
                            <h2 className="mb-3" style={{ fontSize: 40, color: "white" }}>
                                Cronograma <br></br>de lives
                            </h2>
                            <div style={{ color: "white" }}>
                                {fotoJoao.map((item, index) => (
                                    <div key={index} className="row">
                                        <div className="col-2">
                                            <img src={item.image} alt="" style={{
                                                border: "solid #DB752C 1px",
                                                width: 56,
                                                height: 56,
                                                borderRadius: "50%",
                                            }} />
                                        </div>
                                        <div className="col-10">
                                            <h5>{item.comment}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end align-items-end" style={{ position: "absolute", bottom: 0, right: 0, margin: "10px" }}>
                            <img src={whiteLogo} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
