import EditarPerfil from './editarPerfil';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function Senha(){
    return(
        <div>
        <EditarPerfil />
            <div className='center_area'>
                {/* <div className='input_senha'>
                <label htmlFor="fullWidth">Nova senha</label>
                <TextField fullWidth id="newPassword" className='senha_label_input' />
                
                <label htmlFor="fullWidth">Digite novamente a nova senha</label>
                <TextField fullWidth id="confirmNewPassword" className='senha_label_input' />

                <Button variant="contained" className='senha_button'>Salvar</Button>
                </div> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">Nova Senha</label>
                    <input type="text" id="name" className="form-control form-control-md"/>
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">Digite novamente a senha</label>
                    <input type="text" id="name" className="form-control form-control-md"/>
                  </div>  
                  <div className="pt-1 mb-4">
                    <button className="btn button-create btn-block text-white border-0" type="button"
                      /* onClick={handleSubmit} */
                    >Salvar</button>
                  </div>
            </div>
        </div>
    )
}

export default Senha;