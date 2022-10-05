import { UsuarioLogadoContext } from './../contexts/UsuarioLogado';
import { useContext  } from 'react';
export const useUsuarioLogado = () => {
    // O React Hook customizado é uma função qualquer que dentro dela é utilizado um react hook padrão do react. A vantagem de usar é que para usar esse contexto precisará importar menos coisas
    const context = useContext(UsuarioLogadoContext)

    return context;
}