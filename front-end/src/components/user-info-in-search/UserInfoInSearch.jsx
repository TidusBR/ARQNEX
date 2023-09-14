import userImg from "../../assets/fotoPerfil.png"
export default function UserInfoInSearch() {
    const props = {
        img: userImg,
        name: "Letícia Lima",
        isPro: true,
        address: "Campo Grande, MS",
        semestre: "7º Semestre",
        follow: true
    }
    return (
        <div className="d-flex align-item-center">
            <img src={props.img} alt="" width={"130px"} height={"130px"}/>
            <div className="d-flex flex-column justify-content-between">
                <div>
                    <div className="d-flex">
                        <p className="fw-bold me-2">{props.name}</p>
                        {props.isPro && <p className="pro-style fw-bold">PRO</p>}
                    </div>
                    <p style={{color: "#1D252C52"}}>{props.semestre}</p>
                    <p style={{color: "#1D252C52"}}>{props.address}</p>
                </div>
                
                {props.follow ? 
                <button className="rounded border-0 fw-bold py-1 px-3 text-white" style={{fontSize: "0.8rem", background: "#DB752C"}}>Seguindo</button> 
                : <button className="rounded fw-bold"style={{fontSize: "0.8rem"}}>Seguido</button>}
            </div>
            
        </div>
    )
}