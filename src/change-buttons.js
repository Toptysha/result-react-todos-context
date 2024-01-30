import { useContext } from "react"
import styles from './styles/index.module.css';
import { ToDosContext } from "./context";
import SetDisplayCurrentDiv from "./set-display-current-div";

export default function ChangeButtons({id}) {

    const {changeCompletedOnToDo, deleteToDo, setNewName, changeNameOnToDo, setNewToDo, changeToDoOnToDo} = useContext(ToDosContext)

    return (
        <>
          <div data-name-id={id} className={styles.changeInfo}>
              <input 
                  type='text' 
                  placeholder='Введите имя'
                  className={styles.newName}
                  onChange={({target}) => setNewName(target.value)}
              ></input>
              <button data-id={id} className={styles.confirmChanges} onClick={(event) => changeNameOnToDo(event.target.dataset.id)}>Подтвердить изменения</button>
            </div>

            <div data-to-do-id={id} className={styles.changeInfo}>
              <input
                  type='text'
                  placeholder='Введите новую задачу'
                  className={styles.newToDo}
                  onChange={({target}) => setNewToDo(target.value)}
              ></input>
              <button data-id={id} className={styles.confirmChanges} onClick={(event) => changeToDoOnToDo(event.target.dataset.id)}>Подтвердить изменения</button>
            </div>   

            <div className={styles.toDoButtons}>
              <button data-id={id} className={styles.changeInfoButton} disabled={false} onClick={(event) => {SetDisplayCurrentDiv(event.target.dataset.id, 'data-name-id')}}>
                Изменить имя
              </button>
              <button data-id={id} className={styles.changeInfoButton} disabled={false} onClick={(event) => {SetDisplayCurrentDiv(event.target.dataset.id, 'data-to-do-id')}}>
                Изменить задачу
              </button>
              <button data-id={id} onClick={(event) => changeCompletedOnToDo(event.target.dataset.id)} className={styles.changeInfoButton} disabled={false}>Изменить статус</button>
            </div>
            <button data-id={id} onClick={(event) => deleteToDo(event.target.dataset.id)} className={styles.deleteButton} disabled={false}>Удалить</button>
      </>
    )
}