import './css/home.css'
import background from '../assets/Dashboard/foto-home.png'
import CardHome from '../components/card-home/CardHome'
import { useEffect, useState } from 'react'
import { config } from '../config';

export default function Home() {
    const [collections, setCollections] = useState([]);

    const imageStyle = {
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }

    useEffect(() => {
        fetch(`${config.api}${config.endpoints.collection.list}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => setCollections(data));
    }, []);

    const openCollection = new URLSearchParams(window.location.search)?.get('col');

    return (
        <div className="container-home">
            <section>
                <div className="row">
                    <div className="col-1 d-flex flex-column justify-content-between align-items-center">
                    </div>
                    <div className="col" 
                        style={imageStyle}>
                        <div className="row">
                            <div className="col-8 d-flex flex-column" style={{padding: "130px 50px"}}>
                                <h1 className='text-white bold'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</h1>
                                <span className='text-white pt-5 pb-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur dignissimos beatae aliquam, quas minima quia quidem voluptates </span>
                                <button type="button" className="btn btn-light" style={{color: "orange", width: "40%"}}>Entrar agora</button>
                            </div>
                            <div className="col d-flex flex-column-reverse text-aligm-right">
                                <span>Como Funciona</span>
                                <div className=''>
                                    video
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            <section className='pt-5'>
                <div className='row'>
                    <div className="col-10 m-auto p-0">
                        <h3>
                            Trabalhos de outros arquitetos
                        </h3>
                    </div>
                    <div className="col-10 d-flex flex-row m-auto">
                        <div className='row'>
                            {
                                collections.map(
                                    (collection, index) => (
                                        <CardHome isOpen={openCollection == collection.id} collection={collection} key={index} name="Lorem Ipsum dolor sit" data="Postado 5 horas atrás"></CardHome>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}