import React from "react";
import bannerImage from './courses_images/Banner-casa-pavilhao.png';
import vRay from './courses_images/SITE_BANNER_VRAY.png';
import cad from './courses_images/cad.png';
import sketchup from './courses_images/SITE_BANNER_Sketchup.png';
import autoCad from './courses_images/SITE_BANNER_POS.png';
import "./Courses.css";

export default function Courses() {
    return (
        <div className='container-courses'>

            <div className="row text-center align-self-center align-items-center position-relative" style={{
                height: 650,
                backgroundImage: `url(${bannerImage})`, // Imagem de fundo
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: 'unset',
                opacity: 0.5,
                color: "white",
                marginBottom: "80px",
            }}>
                <div className="position-absolute" style={{
                    backgroundColor: "rgba(219, 117, 44, 0.8)",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    color: "white"
                }}>
                </div>
                <div className="banner-texto row text-center align-self-center align-items-center position-relative">
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


            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card-md-4" style={{ backgroundColor: "#EEEEEE", margin: "16px" }}>
                        <img src={cad} alt="AutoCAD" className="card-img-top" />
                        <div className="card-body" style={{ padding: "24px" }}>
                            <h3 className="card-title">Vídeo Aula</h3>
                            <h2 className="card-subtitle" style={{ fontSize: 32 }}>Autodesk AutoCAD</h2>
                            <p style={{fontWeight: "bold", color: "#00000061"}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card-md-4" style={{ backgroundColor: "#EEEEEE", margin: "16px" }}>
                        <img src={vRay} alt="V-Ray 3.4" className="card-img-top" />
                        <div className="card-body" style={{ padding: "24px" }}>
                            <h3 className="card-title">Vídeo Aula</h3>
                            <h2 className="card-subtitle" style={{ fontSize: 32 }}>Fotorealismo V-Ray 3.4</h2>
                            <p style={{fontWeight: "bold", color: "#00000061"}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card-md-4" style={{ backgroundColor: "#EEEEEE", margin: "16px" }}>
                        <img src={sketchup} alt="Sketchup" className="card-img-top" />
                        <div className="card-body" style={{ padding: "24px" }}>
                            <h3 className="card-title">Vídeo Aula</h3>
                            <h2 className="card-subtitle" style={{ fontSize: 32 }}>Sketchup</h2>
                            <p style={{fontWeight: "bold", color: "#00000061"}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card-md-4" style={{ backgroundColor: "#EEEEEE", margin: "16px" }}>
                        <img src={autoCad} alt="Sketchup" className="card-img-top" />
                        <div className="card-body" style={{ padding: "24px" }}>
                            <h3 className="card-title">Vídeo Aula</h3>
                            <h2 className="card-subtitle" style={{ fontSize: 32 }}>Sketchup</h2>
                            <p style={{fontWeight: "bold", color: "#00000061"}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
