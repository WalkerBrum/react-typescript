import { Link } from 'react-router-dom';
 
export const Login = () => {

    return (
        <div>
            Login
            <Link to={'/pagina-inicial'}>
                <button >Página inicia</button>
            </Link>
        </div>
    )
}