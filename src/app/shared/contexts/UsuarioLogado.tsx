import { createContext } from "react";


interface IUsuarioLogadoContextData {
    nomeDoUsuario: string,
}

// Truque para mascara objeto vazio e não precisar declara-lo
export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

interface IUsuarioLogadoProviderProps {
    children: React.ReactNode;
}

 export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProviderProps> = ({ children }) => {

    return (
        <UsuarioLogadoContext.Provider value={{nomeDoUsuario: 'Walker'}}>
            {children}
        </UsuarioLogadoContext.Provider>
    );
}