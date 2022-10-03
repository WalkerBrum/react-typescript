import { forwardRef} from 'react';

interface IInputLoginProps {
    //Não será obrigatório por causa da interrogação
    type?: string;
    label: string;
    value: string;
    onPressEnter?: () => void;
    onChange: (newValue: string) => void;
}
export const InputLogin = forwardRef<HTMLInputElement, IInputLoginProps>((props, ref) => {
    return (
        <label>
            <span>{props.label}</span>
            <input
                ref={ref}
                type={props.type}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                // Lógica quando aperta tecla enter
                onKeyDown={e => e.key === 'Enter'
                    ? props.onPressEnter && props.onPressEnter()
                    : undefined
                }
            />
        </label>
    );
});
    

     