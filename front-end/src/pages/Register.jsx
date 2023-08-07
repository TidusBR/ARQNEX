import { config } from "../config";

export default function Register() {
    return (
        <div>
            <form style={{display: "flex", flexDirection: "column"}}>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name"></input>

                <label htmlFor="profileName">Nome do Perfil</label>
                <input type="text" id="profileName" name="profileName"></input>

                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf"></input>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"></input>

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password"></input>

                <button onClick={async (e) => {
                    e.preventDefault();
                    e.target.disabled = true;

                    const response = await fetch(`${config.api}${config.endpoints.account.signup}`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            Object.fromEntries(
                                [...e.target.parentElement.elements]
                                .filter(element => element.tagName === 'INPUT')
                                .map(input => [
                                    input.name,
                                    input.value
                                ])
                            )
                        )
                    });

                    const data = await response.json();

                    console.log(data);

                    e.target.disabled = false;
                    
                }}>Criar conta</button>
            </form>
        </div>
    )
}