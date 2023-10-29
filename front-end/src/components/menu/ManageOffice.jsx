import avatarDefault from "../../assets/fotoPerfil.png";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "../../components/header/become_upgrade/become-upgrade.css"

export default function ManageOffice() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const seeds = [
            {
                id: 1,
                avatar: avatarDefault,
                name: "Watson Roberto",
                address: "Rua São Mattheus",
                isPro: true
            },{
                id: 2,
                avatar: avatarDefault,
                name: "Jeferson Rodrigo",
                address: "Avenida Afonso Pena",
                isPro: true
            },{
                id: 3,
                avatar: avatarDefault,
                name: "Diogo Soares",
                address: "Rua Desembargador José Nunes da Cunha",
                isPro: false
            }
        ]
        setUsers(seeds)
    }, [])

    return <div className="row">
        {users.map((user, index) => {
            return <div key={user.id} className="col-12" >
                        { index > 0 && <div className="col-12 mt-1 mb-4" >
                            <hr />
                        </div> }
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex">
                                <img src={user.avatar} className="rounded-circle me-4" alt="fotoPerfil" width={100} height={100} />
                                <div className="d-flex flex-column justify-content-around">
                                    <p style={{color: "#1D252C", fontSize: "1.2rem"}}  className="fw-bold">{user.name}</p>
                                    <p style={{color: "#1D252C52"}}>{user.address}</p>
                                    {user.isPro && <p className="become-upgrade">PRO</p>}
                                </div>
                            </div>
                            
                            <Button variant="outlined" color="error" size="medium">
                                Delete User
                            </Button>
                        </div>
                    </div>   
        })}
             
    </div>
}