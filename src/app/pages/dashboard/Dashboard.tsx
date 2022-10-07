import { useCallback, useRef, useState } from 'react';


interface IlistItem {
    title: string,
    isSelected: boolean,
}

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
    
    const [lista, setLista] = useState<IlistItem[]>([]);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            
            // Função trim remove os espaços de uma string
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            // Forma errada de fazer
            // setLista([...lista, e.currentTarget.value]);
            setLista((oldLista) => {
                // Validação para não adicionar coisas repetidas na lista
                if (oldLista.some((ListItem) => ListItem.title === value)) return oldLista;

                return [
                    ...oldLista, 
                    {
                        title: value,
                        isSelected: false
                    }];
            });
        }
    }, [lista]);
    return (
        <div>
            <p>Contador: {counterRef.current.counter}</p>
            <button onClick={() => counterRef.current.counter++}>Somar</button>
            <p>Lista</p>
            <input 
                onKeyDown={handleInputKeyDown}
            />

            <p>{lista.filter((ListItem) => ListItem.isSelected).length}</p>
            <ul>
                {lista.map((listItem) => {
                    // Calculando a quantidade de checkbox marcados
                    return <li key={listItem.title}>
                        <input 
                            type='checkbox'
                            checked={listItem.isSelected}
                            onChange={() => {
                                setLista(oldLista => {
                                    return oldLista.map(oldListItem => {
                                        const newIsSelected = oldListItem.title === listItem.title 
                                            ? !oldListItem.isSelected
                                            : oldListItem.isSelected
                                        return {
                                            ...oldListItem,
                                            isSelected: newIsSelected
                                        }
                                    })
                                })
                            }} 
                        />
                        {listItem.title}
                    </li>;
                })};
            </ul>
        </div>
    )
}