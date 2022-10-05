import { useCallback, useEffect, useMemo, useState, useRef, useContext } from "react";
import { UsuarioLogadoContext } from '../../shared/contexts';
import { ButtonLogin } from "./components/ButtonLogin";
import { InputLogin } from "./components/InputLogin";

 
export const Login = () => {

    // useRef consegue armazenar um valor que pode ser alterado caso o desenvolvedor queira.
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useMemo é usado para evitar que o código com cálculos seja refeito toda vez que um estado dentro da aplicação seja alterada, então só será refeito quando algo dentro desse código for modificado.
    const emailLength = useMemo(() => {
        console.log('Executou')
        return email.length * 1000;
    }, [email.length]);

    useEffect(() => {
        if (window.confirm('Você é homem?')) return console.log('Homem');

        console.log('Mulher')
    }, [])

    useEffect(() => {
        console.log(email);
    }, [email]);

    useEffect(() => {
        console.log(password);
    }, [password]);

    // useCallback evita que função seja reconstruída toda vez que um state do component seja alterado, é parecido com useNemo, porém usado mais para funções.
    const handleEnter = useCallback(() => {
        console.log(email);
        console.log(password);
    }, [email, password]);

    // Usando context
    const { nomeDoUsuario } = useContext(UsuarioLogadoContext);

    return (
        <div>
            <form>

                <p>Quantidade de caracteres no email: {emailLength}</p>
                <p>{nomeDoUsuario}</p>

                <InputLogin
                    label="Email"
                    value={email}
                    onChange={newValue => setEmail(newValue)}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                />

                <InputLogin 
                    label="Senha"
                    type="password"
                    value={password}
                    ref={inputPasswordRef}
                    onChange={newValue => setPassword(newValue)}
                />

                <ButtonLogin type="button" onClick={handleEnter}>
                    Entar
                </ButtonLogin>
                <ButtonLogin type="button" onClick={handleEnter}>
                    Cadastra-se
                </ButtonLogin>
                

            </form>
        </div>
    )
}