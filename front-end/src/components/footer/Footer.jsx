import './footer.css'
import logo from '../../assets/logo-footer.png'

export default function Footer() {
    return (
        <div className="container-footer d-flex flex-row justify-content-between">
            <div className='d-flex flex-column justify-content-between'>
                <div>
                    <img src={logo} alt="" />
                    <p className='title'>Lorem ipsum dolor sit</p>
                </div>
                <p className='title' style={{fontSize: "0.8rem"}}>©‎ 2019 arquinex, todos os direitos reservados.</p>
            </div>
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
            <div className='d-flex flex-column justify-content-between'>
                <div style={{width: "500px", height: "140px", backgroundColor: "#0000001F"}}>

                </div>
                <p className='generic' style={{fontSize: "0.8rem"}}>Desenvolvido por <span style={{color: "#0DB551"}}>Jera</span></p>
            </div>
        </div>
    )
}