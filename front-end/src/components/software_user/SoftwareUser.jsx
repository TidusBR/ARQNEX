export default function SoftwareUser({icon, name}) {
    console.log(icon, name);
    return (
        <div className="container-software-user d-flex aligm-itens-center justify-content-center" style={{border: "1.5px solid #EEEEEE"}}>
            <i dangerouslySetInnerHTML={{ __html: icon }}>
            </i>
            <span>
                {name}
            </span>
        </div>
    )
}