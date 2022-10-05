// React.FC quer dizer que o componente é funcional, ou seja precisa ser uma função
interface IButtonLoginProps {
    type?: "button" | "submit" | "reset";
    onClick: () => void;
    children: React.ReactNode;
}
export const ButtonLogin: React.FC<IButtonLoginProps> = ({ type, onClick, children }) => {

    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    )
}