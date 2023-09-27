import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProfileForm from "../components/menu/ProfileForm";
import "./css/edit-profile.css";

export default function EditProfile() {
    const location = useLocation();
    const navigate = useNavigate();

    const [menuOptions, setMenuOptions] = useState([
        {
            id: 1,
            name: "Perfil",
            path: "/edit-profile/profile"
        },
        {
            id: 2,
            name: "Senha",
            path: "/edit-profile/password"
        },
        {
            id: 3,
            name: "Interesses",
            path: "/edit-profile/interests"
        },
        {
            id: 4,
            name: "Formações",
            path: "/edit-profile/formations"
        },
        {
            id: 5,
            name: "Cursos",
            path: "/edit-profile/courses"
        },
        {
            id: 6,
            name: "Experiências",
            path: "/edit-profile/experiences"
        }
    ]);

    const [active, setActive] = useState(null);

    useEffect(() => {
        const activeItem = menuOptions.find((element) => location.pathname === element.path);
        setActive(activeItem ? activeItem.path : null);
    }, [location.pathname, menuOptions]);

    const changeMenu = (e, path) => {
        e.preventDefault();
        navigate(path);
        setActive(path);
    };

    return (
        <div className="container-edit-profile py-5">
            <div className="row">
                <div className="col-10 m-auto mb-5">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h1 className="fw-bold">Configurações de perfil</h1>
                            <h2>Edite suas informações</h2>
                        </div>
                        <button
                            className="rounded border-0 py-3 px-4"
                            style={{ background: "#DB752C", boxShadow: "0px 3px 6px #DB752C29" }}
                        >
                            <span className="d-block text-white fw-bold title-button">Tornar-se PRO</span>
                            <span className="d-block text-white description-button" style={{ fontSize: "0.8rem" }}>
                                Por apenas R$20,00 mensal
                            </span>
                        </button>
                    </div>
                </div>
                <div className="col-10 m-auto">
                    <div className="row d-flex justify-content-between">
                        <div className="col-2">
                            <div style={{ border: "1px solid #1D252C3D", borderRadius: "5px" }}>
                                {menuOptions.map((element) => (
                                    <a
                                        key={element.id}
                                        href={element.path}
                                        className={`${
                                            element.path === active ? "menu-color-active" : ""
                                        } d-block text-decoration-none ps-3 py-3`}
                                        style={{
                                            color: element.path === active ? "#DB752C" : "#1D252C52",
                                            cursor: "pointer",
                                            borderBottom:
                                                element.path === active ? "2px solid #DB752C" : "2px solid #EEEEEE"
                                        }}
                                        onClick={(e) => changeMenu(e, element.path)}
                                    >
                                        {element.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-8">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
