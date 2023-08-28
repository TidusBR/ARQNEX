import './footer.css'
import logo from '../../assets/logo-footer.png'

export default function Footer() {
    return (
        <div className="container-footer d-flex flex-column justify-content-between">
            <div className='d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row justify-content-between w-75'>
                    <div>
                        <img src={logo} alt="" />
                        <p className='title'>Lorem ipsum dolor sit</p>
                    </div>
                    <div className='d-flex flex-row justify-content-between'>
                        <div className='d-flex flex-column'>
                            <p className='fw-bold title'>Redes</p>
                            <p className='generic'>Facebook</p>
                            <p className='generic'>Instagram</p>
                            <p className='generic'>Twitter</p>
                        </div>
                        <div className='d-flex flex-column'>
                            <p className='fw-bold title'>Contatos</p>
                            <p className='generic'>arqnex@gmail.com</p>
                            <p className='generic'>(00) 0 0000 - 0000</p>
                        </div>
                        <div className='d-flex flex-column'>
                            <p className='fw-bold title'>Contratando</p>
                            <p className='generic'>Postar um trabalho</p>
                            <p className='generic'>Procurar por pessoas</p>
                            <p className='generic'>Crie seu escritório</p>
                        </div>
                    </div>
                </div>
                <div style={{width: "25%", height: "100%", backgroundColor: "#0000001F"}}></div>
            </div>
            <div className='d-flex flex-row justify-content-between pt-3'> 
                <p className='title w-75' style={{fontSize: "0.8rem"}}>©‎ 2019 arquinex, todos os direitos reservados.</p>
                <p className='generic text-left' style={{fontSize: "0.8rem"}}>Desenvolvido por <span style={{color: "#0DB551"}}>Jera</span></p>
            </div>
        </div>
    )
}