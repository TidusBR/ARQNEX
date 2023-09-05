import './footer.css'
import logo from '../../assets/logo-footer.png'
import jera from '../../assets/jera-logo.png'
export default function Footer() {
    return (
        <div className="container-footer h-100">
            <div className="row">
                <div className='col-11 d-flex flex-column'>
                    <div className="row">
                        <div className="col-8">
                            <div className="row h-100">
                                <div className='col-4'>
                                    <img src={logo} alt="" />
                                    <p className='title pt-3'>Lorem ipsum dolor sit</p>
                                </div>
                                <div className="col">
                                    <p className='fw-bold title'>Redes</p>
                                    <p className='generic pt-4'>Facebook</p>
                                    <p className='generic pt-4'>Instagram</p>
                                    <p className='generic pt-4'>Twitter</p>
                                </div>
                                <div className="col">
                                    <p className='fw-bold title'>Contatos</p>
                                    <p className='generic pt-4'>arqnex@gmail.com</p>
                                    <p className='generic pt-4'>(00) 0 0000 - 0000</p>
                                </div>
                                <div className="col">
                                    <p className='fw-bold title'>Contratando</p>
                                    <p className='generic pt-4'>Postar um trabalho</p>
                                    <p className='generic pt-4'>Procurar por pessoas</p>
                                    <p className='generic pt-4'>Crie seu escritório</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-4">
                            <img src={jera} className='mw-100 mh-100' alt="" />
                        </div>
                    </div>
                    <div className="row pt-5 d-flex flex-row">
                        <p className='col-8' style={{fontSize: "0.8rem"}}>©‎ 2019 arquinex, todos os direitos reservados.</p>
                        <p className='col-4 generic text-left' style={{fontSize: "0.8rem"}}>Desenvolvido por <span style={{color: "#0DB551"}}>Jera</span></p>
                    </div>
                </div>
                <div className='col'>

                </div>
            </div>
            
        </div>
    )
}