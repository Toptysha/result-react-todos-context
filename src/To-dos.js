import { useContext } from "react"
import styles from './styles/index.module.css';
import { ToDosContext } from "./context";
import ChangeButtons from "./change-buttons";

export default function ToDos() {

    const {toDos} = useContext(ToDosContext)

    return (
        <>
          {toDos.map(({userName, id, toDo, completed}) => 
          <div key={id} className={styles.toDo}> 
            Имя: {userName} <br/> Задача: <span className='toDoSpan' style={{color: completed? 'green': 'red'}}>{toDo}</span>

              <ChangeButtons id={id}/>
          </div>
        )}
      </>
    )
}