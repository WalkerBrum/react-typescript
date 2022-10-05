import { createContext, useCallback, useEffect, useState } from "react";


interface IUsuarioLogadoContextData {
    nomeDoUsuario: string,
    logout: () => void;
}

// Truque para mascara objeto vazio e não precisar declara-lo
export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

interface IUsuarioLogadoProviderProps {
    children: React.ReactNode;
}

 export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProviderProps> = ({ children }) => {

    const [nome, setNome] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setNome('Walker');
        }, 1000);
    })

    const handleLogout = useCallback(() => {
        console.log('Logout executou');
    }, []);

    return (
        <UsuarioLogadoContext.Provider value={{nomeDoUsuario: nome, logout: handleLogout}}>
            {children}
        </UsuarioLogadoContext.Provider>
    );
}