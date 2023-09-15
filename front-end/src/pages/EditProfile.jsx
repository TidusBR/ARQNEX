import { useEffect, useState } from "react"

export default function EditProfile() {

    const menuOptions = [
        {
            id: 1,
            name: "Perfil",
            active: true
        },
        {
            id: 2,
            name: "Senha",
            active: false
        },
        {
            id: 3,
            name: "Interesses",
            active: false
        },
        {
            id: 4,
            name: "Formações",
            active: false
        },
        {
            id: 5,
            name: "Cursos",
            active: false
        },
        {
            id: 6,
            name: "Experiências",
            active: false
        },
    ]

    const [selectedSection, setSelectedSection] = useState(1)

    const onChangeColor = (e) => {
        console.log(e.target.style.color = "#DB752C");
    }

    return(
        <div className="container-edit-profile py-5">
            <div className="row">
                <div className="col-10 m-auto mb-5">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h1 className="fw-bold">Configurações de perfil</h1>
                            <h2>Edite suas informações</h2>
                        </div>
                        <button className="rounded border-0 py-3 px-4" style={{background: "#DB752C", boxShadow: "0px 3px 6px #DB752C29"}}>
                            <span className="d-block text-white fw-bold title-button">Tornar-se PRO</span>
                            <span className="d-block text-white description-button" style={{fontSize: "0.8rem"}}>Por apenas R$20,00 mensal</span>
                        </button>
                    </div>
                </div>
                <div className="col-10 m-auto">
                    <div className="row">
                        <div className="col-2">
                            <div style={{border: "1px solid #1D252C3D", borderRadius: "5px"}}>
                                {
                                    menuOptions.map(
                                        (element, index, array) => (
                                            <a key={element.id} className="d-block text-decoration-none ps-3 py-3" 
                                            style={{color: element.active ? "#DB752C" : "#1D252C52", cursor: "pointer", 
                                            borderBottom: index === array.length - 1 ? "none" : "2px solid #EEEEEE"}}
                                            onClick={onChangeColor}>{element.name}</a>
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