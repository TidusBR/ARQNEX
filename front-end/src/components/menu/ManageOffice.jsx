import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "../../components/header/become_upgrade/become-upgrade.css"
import { config } from "../../config";

export default function ManageOffice() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.office.members}`, { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            setUsers(data);
        });
    }, []);

    const handleDeleteUser = async (event, memberId) => {
        event.preventDefault();
        event.target.disabled = true;

        await fetch(`${config.api}${config.endpoints.office.remove_member}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                memberId
            })
        });

        const res = await fetch(`${config.api}${config.endpoints.office.members}`, { credentials: "include" })
        setUsers(await res.json());
    }

    return <div className="row">
        {users.map((user, index) => {
            return <div key={user.id} className="col-12" >
                        { index > 0 && <div className="col-12 mt-1 mb-4" >
                            <hr />
                        </div> }
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex">
                                <img src={`${config.api}/uploads/${user.id}/avatar`} className="rounded-circle me-4" alt="fotoPerfil" width={100} height={100} />
                                <div className="d-flex flex-column justify-content-around">
                                    <p style={{color: "#1D252C", fontSize: "1.2rem"}}  className="fw-bold">{user.name}</p>
                                    <p style={{color: "#1D252C52"}}>{user.address.city}</p>
                                    {user.isPremium && <p className="become-upgrade">PRO</p>}
                                </div>
                            </div>
                            
                            {
                            !user.isOwner &&
                            <Button
                                variant="outlined"
                                color="error"
                                size="medium"
                                onClick={(event) => handleDeleteUser(event, user.id)}
                            >
                                Delete User
                            </Button>
                            }
                        </div>
                    </div>   
        })}
             
    </div>
}