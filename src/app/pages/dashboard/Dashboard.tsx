import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiException } from '../../shared/services/api/ErrorException';
import { ITarefa, TarefasService } from '../../shared/services/api/tarefas/TarefasService';


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
    
    const [lista, setLista] = useState<ITarefa[]>([]);

    // Buscando tarefas no mock db.jason
    useEffect(() => {
        TarefasService.getAll()
        //Deve usar o then para tratar promisso com useEffect por precisar escrever menos código
        .then((result) => {
            if (result instanceof ApiException) {

                alert(result.message);
                
            } else {

                setLista(result);
            }
        });
    }, []);
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
                        id: oldLista.length,
                        title: value,
                        isCompleted: false
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

            <p>{lista.filter((ListItem) => ListItem.isCompleted).length}</p>
            <ul>
                {lista.map((listItem) => {
                    // Calculando a quantidade de checkbox marcados
                    return <li key={listItem.id}>
                        <input 
                            type='checkbox'
                            checked={listItem.isCompleted}
                            onChange={() => {
                                setLista(oldLista => {
                                    return oldLista.map(oldListItem => {
                                        const newisCompleted = oldListItem.title === listItem.title 
                                            ? !oldListItem.isCompleted
                                            : oldListItem.isCompleted
                                        return {
                                            ...oldListItem,
                                            isCompleted: newisCompleted
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