import Menu from './Menu'
import Button from '@mui/material/Button';
import './editarPerfil.css';
import Container from '@mui/material/Container';


function Sobre(){
    return(
        <div>
        <Container maxWidth="lg" disableGutters 
            sx={{
                marginLeft: '16em',
            }}
        >
            <div className='container'>
                <div className='content'>
                    <h1>Configurações de perfil</h1>
                    <h3>Edite suas informações</h3>
                    <Menu className ="menu_component"/>  

                    <div className='button_content'>  
                        <button className="buttonPro">
                            <h2>Tornar-se PRO</h2> <br />
                            <p>Por apenas R$20,00 mensal</p>
                        </button>
                    </div>    
                </div>
            </div>  
      
            </Container>  
        </div>
    )
}

export default Sobre;