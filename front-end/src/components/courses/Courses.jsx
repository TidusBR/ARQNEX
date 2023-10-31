import React from "react"


import bannerImage from './courses_images/Banner-casa-pavilhao.png';
import autoCad from './courses_images/cad.png';




export default function Courses() {



    return (
        <div className='container-courses'>
            {/* <div style={{
                backgroundColor: "#DB752C",
                position: "absolute",
                width: 1920,
                height: 680,
            }}>
            </div> */}
            <div className="row text-center align-self-center align-items-center" style={{
                height: 650,
                backgroundImage: `url(${bannerImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: 'unset',
                opacity: 0.5,
                color: "white",
            }}>
                <div className="col">
                    <div>
                        <h1 style={{
                            fontSize: 70,
                        }}>Lorem ipsum dolor sit amet cons.</h1>
                    </div>
                    <div>
                        <h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</h3>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col" style={{
                    backgroundColor: "#EEEEEE",
                    width: 530,
                }}>

                    <div className="row" style={{
                        backgroundImage: `url(${autoCad})`,
                        height: 450,
                        width: 530,
                    }}>

                    </div>
                    <h3>Vídeo Aula</h3>

                    <h2 style={{
                        fontSize: 42
                    }}>Autodesk Autocad</h2>

                    <h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo</h4>

                </div>




                <div className="col" style={{
                    backgroundColor: "#EEEEEE",
                    width: 530,
                }}>

                    <div className="row" style={{
                        backgroundImage: `url(${autoCad})`,
                        height: 450,
                        width: 530,
                    }}>

                    </div>
                    <h3>Vídeo Aula</h3>

                    <h2 style={{
                        fontSize: 42
                    }}>Fotorealismo V-ray 3.4</h2>

                    <h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo</h4>

                </div>

                <div className="col" style={{
                    backgroundColor: "#EEEEEE",
                    width: 530,
                }}>

                    <div className="row" style={{
                        backgroundImage: `url(${autoCad})`,
                        height: 450,
                        width: 530,
                    }}>

                    </div>
                    <h3>Vídeo Aula</h3>

                    <h2 style={{
                        fontSize: 42
                    }}>Sketchup</h2>

                    <h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo</h4>

                </div>
            </div>

        </div>
    )
}