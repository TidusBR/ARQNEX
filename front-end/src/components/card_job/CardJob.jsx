import './card-job.css'
import foto from "../../assets/Dashboard/Elizabeth_in_love_with_sky_01__00000.png"

export default function CardJob() {
    const props = {
        src: foto
    }
    return(
        <img src={props.src} className='card-job' alt="" />
    )
}