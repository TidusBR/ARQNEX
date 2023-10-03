import "./software-user.css"

export default function SoftwareUser({icon, name}) {
    return (
        <button className="container-software-user d-flex align-items-center justify-content-center rounded p-1  bg-white">
            <i dangerouslySetInnerHTML={{ __html: icon }}>
            </i>
            <span>
                {name}
            </span>
        </button>
    )
}