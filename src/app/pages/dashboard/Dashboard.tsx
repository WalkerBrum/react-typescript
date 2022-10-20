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

    // Adicionar tarefa ao apertar tecla enter
    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            // Função trim remove os espaços de uma string
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            // Validação para não adicionar coisas repetidas na lista
            if (lista.some((listItem) => listItem.title === value)) return;

            TarefasService.create({
                title: value,
                isCompleted: false
            })
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    // Forma errada de fazer
                    // setLista([...lista, e.currentTarget.value]);
                    setLista((oldLista) => {
                        return[
                            ...oldLista, 
                            {
                                title: value,
                                isCompleted: false,
                                id: oldLista.length,
                            }
                        ];
                    });
                }
            });
        }
    }, [lista]);

    const handleToggleComplete = useCallback((id: number) => {
        const tarefaToUpdate = lista.find((tarefa) => tarefa.id === id);

        if (!tarefaToUpdate) return;

        TarefasService.updateById(id, {
            ...tarefaToUpdate,
            isCompleted: !tarefaToUpdate.isCompleted
        })
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);

            } else {
                setLista(oldLista => {
                    return oldLista.map(oldListItem => {
                        if (oldListItem.id === id) return result;
                        return oldListItem;
                    })
                });
            }
        });

        
    }, [lista]);

    const handleDelete = useCallback((id: number) => {
        TarefasService.deleteById(id)
          .then((result) => {
            if (result instanceof ApiException) {
              alert(result.message);
            } else {
              setLista(oldLista => {
                return oldLista.filter(oldListItem => oldListItem.id !== id);
              });
            }
          });
      }, []);
    
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
                            onChange={() => handleToggleComplete(listItem.id)}
                        />

                        {listItem.title}

                        <button onClick={() => handleDelete(listItem.id)}>Apagar</button>
                    </li>;
                })};
            </ul>
        </div>
    )
}