import { useCallback, useEffect, useMemo, useState, useRef } from "react"

 
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

    return (
        <div>
            <form>

                <p>Quantidade de caracteres no email: {emailLength}</p>

                <label>
                    <span>Email</span>
                    <input 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        // Lógica quando aperta tecla enter
                        onKeyDown={e => e.key === 'Enter' ? inputPasswordRef.current?.focus() : undefined}
                    />
                </label>

                <label>
                    <span>Senha</span>
                    <input 
                        type="password" 
                        value={password} 
                        ref={inputPasswordRef}
                        onChange={e => setPassword(e.target.value)}/>
                </label>

                <button 
                    type="button" 
                    onClick={handleEnter}>
                        Entrar
                </button>

            </form>
        </div>
    )
}