import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./css/edit-profile.css";
import { Button } from "@mui/material";

export default function EditProfile({ session }) {
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

    const [mockHasOffice] = useState(false)

    useEffect(() => {
        const activeItem = menuOptions.find((element) => location.pathname === element.path) ?? menuOptions[0];
        setActive(activeItem.path);
        navigate(activeItem.path);
    }, [location.pathname, menuOptions, navigate]);

    useEffect(() => {
        if(!session.account.isPremium) {
            const newMenu = menuOptions;
            newMenu.push({
                id: 7,
                name: "Escritórios",
                path: "/edit-profile/offices"
            })
            setMenuOptions(newMenu)
        } else {
            console.log("Não é premium");
        }
        if(!mockHasOffice) {
            const newMenu = menuOptions;
            newMenu.push({
                id: 8,
                name: "Gerenciar escritório",
                path: "/edit-profile/manage-office"
            })
            setMenuOptions(newMenu)
        }
    }, [menuOptions]);

    const changeMenu = (e, path) => {
        e.preventDefault();
        navigate(path);
        setActive(path);
    };

    return (
        <div className="container-edit-profile py-5">
            <div className="row">
                <div className="col-10 m-auto mb-3 mb-sm-5">
                    <div className="d-flex flex-sm-row flex-column justify-content-between">
                        <div className="mb-3 mb-sm-0">
                            <h1 className="fw-bold">Configurações de perfil</h1>
                            <h2>Edite suas informações</h2>
                        </div>
                        <Button
                            variant="contained"
                            className="rounded border-0 d-none d-sm-block py-sm-3 px-sm-4"
                            style={{ background: "#DB752C", boxShadow: "0px 3px 6px #DB752C29" }}
                            onClick={() => {navigate("/become-pro")}}
                        >
                            <span className="d-block text-white fw-bold title-button">Tornar-se PRO</span>
                            <span className="d-block text-white description-button" style={{ fontSize: "0.8rem" }}>
                                Por apenas R$20,00 mensal
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="col-10 m-auto">
                    <div className="row d-flex flex-md-row justify-content-between">
                        <div className="d-none d-md-block col-md-4 col-lg-3 col-xxl-2">
                            <div className="menu-options d-flex justify-content-around d-md-block mb-4 mb-md-0">
                                {menuOptions.map((element, index, array) => (
                                    <a
                                        key={element.id}
                                        href={element.path}
                                        className={`${
                                            element.path === active ? "menu-color-active" : ""
                                        } d-md-block text-decoration-none ps-3 py-3`}
                                        style={{
                                            color: element.path === active ? "#DB752C" : "#1D252C52",
                                            cursor: "pointer",
                                            borderBottom:
                                                element.path === active  ? "2px solid #DB752C" : !(index === array.length - 1) ? "2px solid #EEEEEE" : "none"
                                        }}
                                        onClick={(e) => changeMenu(e, element.path)}
                                    >
                                        {element.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-12 col-md-8 col-xxl-9">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
