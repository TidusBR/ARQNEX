import CardUser from "../components/card_user/CardUser";
import './css/profile-user.css'
import CardJob from "../components/card_job/CardJob";

export default function ProfileUser() {
    const props = {
        jobs: 7,
        followers: 130
    }
    return (
        <div className="container-profile-user my-5">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-3">
                            <CardUser/>
                        </div>
                        <div className="col-9 d-flex flex-column p-0">
                            <div className="row mb-4">
                                <div className="col">
                                    <button className="btn btn-primary">Popular</button>
                                </div>
                                <div className="col-3 d-flex flex-row align-items-center justify-content-between">
                                    <div>
                                        <span style={{fontSize: "1.2rem" ,color: "#000000DE"}} className="followers me-1 fw-bold">{
                                            props.followers < 10 ? `0${props.followers}` : props.followers
                                        }</span>
                                        <span style={{fontSize: "1.2rem" ,color: "#00000061"}}>Trabalhos</span>
                                    </div>
                                    <div>
                                        <span style={{fontSize: "1.2rem" ,color: "#000000DE"}} className="jobs me-1 fw-bold">{
                                            props.jobs < 10 ? `0${props.jobs}` : props.jobs
                                        }</span>
                                        <span style={{fontSize: "1.2rem" ,color: "#00000061"}}>Trabalhos</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 p-1">
                                    <CardJob></CardJob>
                                </div>
                                <div className="col-4 p-1">
                                    <CardJob></CardJob>
                                </div>
                                <div className="col-4 p-1">
                                    <CardJob></CardJob>
                                </div>
                                <div className="col-4 p-1">
                                    <CardJob></CardJob>
                                </div>
                                <div className="col-4 p-1">
                                    <CardJob></CardJob>
                                </div>
                                <div className="col-4 p-1">
                                    <CardJob></CardJob>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}