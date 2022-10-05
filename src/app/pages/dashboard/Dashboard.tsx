import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { UsuarioLogadoContext } from '../../shared/contexts';

export const Dashboard = () => {
    // useRef pode ser usado para alterar algum valor por um tipo de ação do usuário, mas não quer fazer um re-render
    const counterRef = useRef({
        counter: 0
    });

    /*ou
      const counterRef = useRef(0);
      usar assim
      counterRef.current
    */
    const usuarioLogadoContext = useContext(UsuarioLogadoContext);
    

    return (
        <div>
            <p>Dashboard</p>
            <p>{usuarioLogadoContext.nomeDoUsuario}</p>
            <p>Contador: {counterRef.current.counter}</p>
            <button onClick={() => counterRef.current.counter++}>Somar</button>
            <button onClick={() => console.log(counterRef.current.counter)}>Logar</button>
            <Link to="/entrar">Login</Link>
        </div>
    )
}